import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { IoSend } from "react-icons/io5";
import {
  FaFileDownload,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Button from "../Button";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Tooltip from "../Tooltip";
import ReactSelect, { components, MultiValueGenericProps } from "react-select";
import {
  createPatientReports,
  fetchEditorPatientReportData,
  fetchInstitutionPromptAccess,
  fetchPatientReportByStudy,
  fetchReportSetting,
  fetchUsers,
  fetchViewerStudy,
  genAiRadiologyReporter,
  generateReportPdf,
  updateOrthancStudy,
  updatePatientReports,
  userToken,
} from "../ReportEditor/RequestHandler";
import "./AIReportEditor.css";
import { getUserInformation } from "../ReportEditor/getUserInformation";

const AiReportEditor = ({ apiData, user, keycloak_url }) => {
  const params = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const username = user?.profile?.name;

  const editorRef = useRef(null); // or DecoupledEditor
  const popupRef = useRef(null);
  const textareaRef = useRef(null);

  const [viewerStudy, setViewerStudy] = useState([]);
  const [patientReportDetail, setPatientReportDetail] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [aiReport, setAiReport] = useState("");
  const [aiEditorData, setAiEditorData] = useState("");
  const [transcriptText, setTranscriptText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupHeight, setPopupHeight] = useState(68);
  const [loader, setLoader] = useState(false);
  const [displayPromptStyleOptions, setDisplayPromptStyleOptions] = useState(
    []
  );
  const [selectedPrompt, setSelectedPrompt] = useState({});
  const [reportData, setReportData] = useState({});
  const [radiologistUserList, setRadiologistUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reportSetting, setReportSetting] = useState([]);
  const [assignUserDataFind, setAssignUserDataFind] = useState({});
  const [doctorInformation, setDoctorInformation] = useState({});
  const [patientFind, setPatientFind] = useState({});
  const [patientCritical, setPatientCritical] = useState({});
  const [editorData, setEditorData] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      try {
        const data = {
          token: user.access_token,
        };
        const response = await userToken(data, apiData);
        setToken(response);
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 1000);
  }, []);

  const studyInstanceUid = params.pathname.includes("report-editor")
    ? params.pathname?.split("report-editor/:")[1]
    : params?.search
        ?.slice(
          params?.search?.indexOf("StudyInstanceUIDs=") +
            "StudyInstanceUIDs=".length
        )
        ?.split("&")[0]
        ?.replace(/^=/, "");

  const getReportDetails = async () => {
    const patient = await fetchPatientReportByStudy(studyInstanceUid, apiData);
    setPatientFind(patient);
  };

  useEffect(() => {
    if (!studyInstanceUid && patientCritical) return;
    getReportDetails();
  }, [studyInstanceUid, patientCritical]);

  useEffect(() => {
    if (!apiData || !keycloak_url) return;
    fetchUsers(user?.access_token, keycloak_url)
      .then((data) => {
        setRadiologistUserList(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [user?.access_token, apiData, keycloak_url]);

  const fetchViewerStudys2 = async () => {
    const response = await fetchViewerStudy(studyInstanceUid, apiData);
    setViewerStudy(response);
    return response;
  };

  useEffect(() => {
    if (studyInstanceUid && apiData) {
      fetchViewerStudys2();
    }
  }, [studyInstanceUid, apiData]);

  useEffect(() => {
    const fetchReportSettings = async () => {
      if (
        fetchReportSetting &&
        viewerStudy?.length > 0 &&
        viewerStudy[0]?.MainDicomTags?.InstitutionName &&
        patientFind &&
        radiologistUserList?.length > 0
      ) {
        const fetchUserInformation = await getUserInformation(
          fetchReportSetting,
          viewerStudy[0].MainDicomTags.InstitutionName,
          patientFind,
          radiologistUserList,
          apiData
        );

        console.log(fetchUserInformation, "fetchUserInformation");
        setReportSetting(fetchUserInformation?.reportSetting);
        setAssignUserDataFind(fetchUserInformation?.assignUserDataFind);
        setDoctorInformation(fetchUserInformation?.doctorInformation);
      }
    };

    fetchReportSettings();
  }, [
    fetchReportSetting,
    viewerStudy,
    patientFind,
    radiologistUserList,
    apiData,
  ]);

  useEffect(() => {
    const processTranscript = async () => {
      if (transcript.length > 0) {
        let updatedText = `${inputValue} ${transcript}`;

        // Add basic punctuation rules (improving dictation accuracy)
        updatedText = updatedText
          .replace(/\scomma/gi, ",")
          .replace(/\speriod/gi, ".");

        setTranscriptText(updatedText);

        if (transcript.toLowerCase().includes("send")) {
          stopListening(); // Stop listening before sending
          const cleanedText = transcriptText.replace(/\bsend\b/gi, "").trim();
          sendClinicalIndication(new Event("submit"), cleanedText);
        }
      }
    };

    processTranscript();
  }, [transcript, inputValue]);

  const startListening = () => {
    textareaRef.current.focus();
    setTranscriptText("");
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
      interimResults: true, // Enable interim results for better accuracy and punctuation
    });
    setShowPopup(true); // Show popup when listening starts
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setTranscriptText("");
    if (transcriptText.trim() !== "") {
      setInputValue(transcriptText);
    }
    resetTranscript();
    setPopupHeight(68);
    setShowPopup(false); // Hide popup when listening stops
  };

  const promptOptions = [
    { label: "Default", value: "Default" },
    ...displayPromptStyleOptions
      ?.filter((prompt) => prompt !== "Default") // exclude 'Default' since it's already added
      ?.map((prompt) => ({
        label: prompt,
        value: prompt,
      })),
  ];

  useEffect(() => {
    const fetchInstitutionAIPrompt = async () => {
      await fetchInstitutionPromptAccess(user?.profile?.radiologyGroup, apiData)
        .then((result) => {
          if (result) {
            setDisplayPromptStyleOptions(result?.promptaccess);
          }
          setSelectedPrompt({
            label: "Default",
            value: "Default",
          });
        })
        .catch((err) => {
          console.error("Error fetching institution AIPrompt style:", err);
        });
    };

    fetchInstitutionAIPrompt();
  }, [user, apiData]);

  const fetchPatientData = async () => {
    const patientReportData = await fetchEditorPatientReportData(
      apiData,
      studyInstanceUid
    );

    const patient = await fetchPatientReportByStudy(
      patientReportData?.studyinstanceuid,
      apiData
    );
    const studyList = viewerStudy[0];

    setPatientReportDetail(patient);

    if (patientReportData) {
      const age =
        patientReportData?.patientage ||
        patientReportData?.patientname?.match(/\d/g)?.join("");
      const [name] = patientReportData?.patientname?.split(age);
      let sex;

      if (patientReportData?.patientsex?.toLowerCase() === "m") {
        sex = "Male";
      } else {
        sex = "Female";
      }
      const studyDate =
        patientReportData.studydate &&
        moment(
          patientReportData.studydate,
          ["YYYYMMDD", "YYYY.MM.DD"],
          true
        ).isValid() &&
        moment(patientReportData.studydate, ["YYYYMMDD", "YYYY.MM.DD"]).format(
          t("Common:localDateFormat", "MMM-DD-YYYY")
        );
      const studyTime =
        patientReportData.studytime &&
        moment(patientReportData.studytime, [
          "HH",
          "HHmm",
          "HHmmss",
          "HHmmss.SSS",
        ]).isValid() &&
        moment(patientReportData.studytime, [
          "HH",
          "HHmm",
          "HHmmss",
          "HHmmss.SSS",
        ]).format(t("Common:localTimeFormat", "hh:mm A"));

      if (
        (patient?.aiReportDetails !== null &&
          patient?.aiReportDetails !== undefined) ||
        (patient?.submitReportDetails !== null &&
          patient?.submitReportDetails !== undefined)
      ) {
        setAiEditorData(patient?.aiReportDetails);
        setPatientData(patient);
      } else {
        setPatientData({
          patient_name: name,
          // patient_age: age || parseInt(studyList?.RequestedTags?.PatientAge.replace(/\D/g, ''), 10) || 'Null',
          patient_age:
            age !== undefined
              ? parseInt(age.replace(/\D/g, ""))
              : patientReportData.patientage
              ? parseInt(patientReportData.patientage.replace(/\D/g, ""), 10)
              : 0,
          patient_gender: sex,
          patient_accession: patientReportData.accessionnumber,
          patient_id: patientReportData.patientid,
          patient_modality: patientReportData.modalitiesinstudy,
          study: patientReportData.studydescription,
          study_date: studyDate,
          study_time: studyTime,
          ref_physician: patientReportData.referringphysicianname,
          ref_doctor: patientReportData.referringphysicianname,
          accession_number:
            studyList?.MainDicomTags.AccessionNumber ||
            patientReportData.accessionnumber,
          uid: patientReportData?.studyInstanceUid,
          studyID: patientReportData?.studyid,
          institution_name:
            studyList?.MainDicomTags.InstitutionName ||
            patientReportData.institutionname,
          study_description:
            studyList?.MainDicomTags.StudyDescription ||
            patientReportData.studydescription,
          patient_dob: moment(patientReportData.patientbirthdate).format(
            "MM/DD/YYYY"
          ),
          document_status: patient?.document_status,
          clinical_history: patient?.clinical_history,
        });
      }
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, [viewerStudy, apiData]);

  const assignUserFind = patientFind?.assign?.map((item) => JSON.parse(item));

  const assignUserDetail =
    assignUserFind &&
    assignUserFind?.find(
      (item) => item.assign_name === user?.profile?.preferred_username
    );
  const permissions = user?.profile?.permission;
  const isPhysicianOrTechnologist =
    user?.profile?.roleType === "Physician" ||
    user?.profile?.roleType === "Technologist";

  const canEditReport = permissions?.includes("Edit Report");
  const isQaUser = token?.realm_access?.roles.includes("qa-user");
  const isSuperAndDeputyAdmin =
    token?.realm_access?.roles.includes("super-admin") ||
    token?.realm_access?.roles.includes("deputy-admin");

  const isApproved = patientReportDetail?.document_status === "Approved";

  const handleMessageType = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const sendClinicalIndication = async (e, transcriptText = "") => {
    e.preventDefault();
    if (transcriptText.trim() !== "" || inputValue.trim() !== "") {
      const data = {
        clinical_indication: transcriptText ? transcriptText : inputValue,
        style: selectedPrompt.value,
        patient_sex: patientData?.patient_gender,
        patient_age: parseInt(patientData?.patient_age),
        modality: patientData?.patient_modality,
        study_description: patientData?.study,
        clinicalHistory: patientData?.clinical_history || "None",
      };
      setInputValue("");
      setAiEditorData("");
      setLoader(true);
      try {
        const report = await genAiRadiologyReporter(apiData, data);

        const formattedText = report.report
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
          .replace(/\n\n/g, "<br/>") // double line break
          .replace(/\n/g, "<br/>"); // single line break

        setAiReport(formattedText);
      } catch (error) {
        console.error("Error generating AI report:", error);
        // Optionally show user-friendly error message
        setAiReport(
          '<span style="color:red;">Failed to generate report. Please try again later.</span>'
        );
        // Clear the error message after 5 seconds
        setTimeout(() => {
          setAiReport("");
        }, 5000);
      } finally {
        setLoader(false);
      }
    }
  };

  const handleDownloadPdf = async () => {
    try {
      setIsLoading(true);

      const editorDatas = editorData
        ? editorData
        : patientReportDetail?.aiEditorData;
      // 1. Find the last index of <figure
      const lastFigureIndex = editorDatas.lastIndexOf("<figure");

      let cleanedEditorDatas = editorDatas;

      if (lastFigureIndex !== -1) {
        // 2. Slice from the start to just before the last <figure>
        cleanedEditorDatas = editorDatas.slice(0, lastFigureIndex);
      }
      const parser = new DOMParser();
      const doc = parser.parseFromString(cleanedEditorDatas, "text/html");
      let tableData = doc.querySelector("table");
      let table = tableData ? tableData.outerHTML : "";
      let modifiedEditorData = doc.body.innerHTML;

      if (reportSetting?.remove_defualt_report) {
        // Create a temporary DOM element to manipulate the HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(modifiedEditorData, "text/html");

        // Remove the patient details table
        const table = doc.querySelector("table");
        if (table) {
          table.remove();
        }

        // Serialize the document back to a string
        modifiedEditorData = doc.body.innerHTML;
      }

      const headerStyle = `
        width: 98%;
        z-index: 1;
        padding-right: 10px;
        height: ${reportSetting?.header_height}px;
        `;

      const footerStyle = `
        width: 98%;
        z-index: 1;
        padding-right: 10px;
        height: ${reportSetting?.footer_height}px;
        `;

      const watermarkStyle = `
            position: fixed;
            width: 100%;
            height: auto;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.6;
            margin-top: 50px;
            margin-bottom: 50px;
            z-index: -1;
        `;

      const watermarkTextStyle = `
            font-size: 80px;
            color: #999;
        `;

      // signature image style
      const signatureStyle = `
            width: 200px;
            height: 100px;
        `;

      // report template style
      const reportDataStyle = `
             margin-top: ${reportSetting?.top}px;
             margin-left: ${reportSetting?.left}px;
             margin-right: ${reportSetting?.right}px;
             margin-bottom: ${reportSetting?.bottom}px;
            font-family: ${reportSetting?.font_style};
            font-size: ${reportSetting?.font_size}px !important;
            line-height: ${reportSetting?.line_spacing};
        `;

      const output = `
      <div style="line-height: 1.2;">
          ${doctorInformation?.displayName}
          ${doctorInformation?.qualificationName}
          ${doctorInformation?.registrationNoName}
          ${doctorInformation?.formattedTimesName}
          ${doctorInformation?.disclaimerDetailsName}
      </div>
  `;

      let pageHeaderSpace;
      if (reportSetting?.patient_details_in_header) {
        pageHeaderSpace = `
            height: ${
              Number(reportSetting?.header_height) +
              (reportSetting?.font_style === "Lucida Sans Unicode" ? 150 : 130)
            }px;
          `;
      } else {
        pageHeaderSpace = `
            height: ${reportSetting?.header_height}px;
          `;
      }

      const pageFooterSpace = `
      height: ${reportSetting?.footer_height}px;
      `;

      const pageFooter = `
        position: fixed;
        bottom: 0;
        width: 100%;

      `;

      const pageHeader = `
        position: fixed;
        top: 0;
        width: 100%;
      `;

      const page = `
          page-break-after: auto;
        `;

      const pageStyle = `

        @media print {
          thead {display: table-header-group;}
          tfoot {display: table-footer-group;}

          button {display: none;}

          body {margin: 0;}
      }`;

      let modifiedEditor = "";
      let tdCounter = 0;
      let tableCounter = 0;
      let colIndex = 0;

      const updateModifiedEditorData = modifiedEditorData
        .replace(/<figure class="table">/, "")
        .replace(/<\/figure>/, "")
        .replace(
          /<table /,
          reportSetting?.patient_details_in_header
            ? "<table " // Leave it unchanged
            : `<table style="font-size: ${reportSetting?.font_size}px !important; border-collapse: collapse; width: 100%" `
        )
        .replace(
          /<td(\s+style="[^"]*")?>/g, // Matches <td> with or without style
          (match) => {
            if (match.includes('style="')) {
              // If <td> already has a style, update width if it matches
              return match.replace(
                /width:\s*(\d+\.\d+)%/,
                (m, p1) =>
                  `width: ${
                    p1 === "17.7931"
                      ? "17.7931"
                      : p1 === "33.5161"
                      ? "33.5161"
                      : p1
                  }%`
              );
            } else {
              // If <td> has no style, determine its width based on position
              return `<td>`;
            }
          }
        )
        .replace(/<table[^>]*style="([^"]*)"/gi, (match, styles) => {
          tableCounter++;
          // Check if we should apply styles to the first table
          const shouldApplyToFirstTable =
            reportSetting?.patient_details_in_header;

          if (shouldApplyToFirstTable) {
            // Modify the first table only if patient_details_in_header is true
            return match.replace(
              styles,
              `width: auto; margin: auto; border-collapse: collapse; font-size: ${reportSetting?.font_size}px !important; font-family: ${reportSetting?.font_style}; page-break-inside: avoid;`
            );
          } else if (tableCounter > 1) {
            // Modify only child tables if patient_details_in_header is false
            return match.replace(
              styles,
              `width: auto; margin: auto; border-collapse: collapse; font-size: ${reportSetting?.font_size}px !important; font-family: ${reportSetting?.font_style}; page-break-inside: avoid;`
            );
          }

          return match; // Leave first table unchanged if condition is false
        })
        .replace(/<td(\s+style="[^"]*")?>/g, (match) => {
          colIndex++; // Increment column count

          // Reset column index after every fourth column (assuming 4 columns per row)
          if (colIndex > 4) colIndex = 1;

          // Remove `white-space: nowrap;` from second and fourth columns
          if (colIndex === 2 || colIndex === 4) {
            return match.replace(/white-space:\s*nowrap;?\s*/g, ""); // Remove white-space: nowrap
          }

          // Ensure first and third columns have `white-space: nowrap;`
          if (colIndex === 1 || colIndex === 3) {
            if (match.includes('style="')) {
              return match.replace(
                /style="([^"]*)"/,
                (m, styles) =>
                  `style="${styles.replace(
                    /width:\s*\d+\.\d+%/,
                    ""
                  )}; white-space: nowrap;"`
              );
            } else {
              return `<td style="white-space: nowrap;">`;
            }
          }

          return match; // Leave other columns unchanged
        });
      {
      }
      // Construct modified editor content
      if (reportSetting?.multiple_header_and_footer === true) {
        modifiedEditor = `
          <div style="${pageStyle}">
            <div class="page-header" style="${pageHeader}">
              ${
                reportSetting?.include_header && reportSetting?.header_image
                  ? `<img src="${reportSetting?.header_image}" alt="Header" style="${headerStyle}" />`
                  : ""
              }

              ${
                reportSetting?.patient_details_in_header
                  ? `
                  <div style=" margin-left: ${reportSetting?.left}px;
                    margin-right: ${reportSetting?.right}px; font-family: ${
                      reportSetting?.font_style
                    };font-size: ${
                      reportSetting?.font_size
                    }px !important;margin-top:20px">
                    ${table
                      .replace(
                        /<table /,
                        `<table style="font-size: ${reportSetting?.font_size}px !important;border-collapse:collapse; width:100%" `
                      )
                      .replace(
                        /<td(\s+style="[^"]*")?>/g, // Matches <td> with or without style
                        (match) => {
                          if (match.includes('style="')) {
                            // If <td> already has a style, update width if it matches
                            return match.replace(
                              /width:\s*(\d+\.\d+)%/,
                              (m, p1) =>
                                `width: ${
                                  p1 === "17.7931"
                                    ? "17.7931"
                                    : p1 === "33.5161"
                                    ? "33.5161"
                                    : p1
                                }%`
                            );
                          } else {
                            // If <td> has no style, determine its width based on position
                            return `<td>`;
                          }
                        }
                      )}
                  </div>
                `
                  : ""
              }
            </div>

            <div class="page-footer" style="${pageFooter}">
              ${
                reportSetting?.include_footer && reportSetting?.footer_image
                  ? `<img src="${reportSetting?.footer_image}" alt="Footer" style="${footerStyle}" />`
                  : ""
              }
            </div>

            <table style='width:100%'>
              <thead>
                <tr>
                  <td>
                    <div style="${pageHeaderSpace}" class="page-header-space"></div>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style="${page}">
                      <div style="${reportDataStyle}">
                        ${updateModifiedEditorData}
                        <div style="margin-top: 10px; line-height:1 !important;">
                          ${
                            reportSetting?.signature &&
                            assignUserDataFind?.attributes
                              ?.uploadSignature[0] &&
                            assignUserDataFind
                              ? `<img src="${assignUserDataFind?.attributes?.uploadSignature[0]}" alt="signature" style="${signatureStyle}" />`
                              : ""
                          }<br/>
                          ${output}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div class="page-footer-space" style="${pageFooterSpace}"></div>
                  </td>
                </tr>
              </tfoot>
            </table>

            ${
              reportSetting?.include_watermark && reportSetting?.watermark_image
                ? `
                <div style="${watermarkStyle}" class="watermark">
                  <span style="${watermarkTextStyle}" class="watermark-text">
                    <img src="${reportSetting?.watermark_image}" alt="watermark" width="100%" height="auto" />
                  </span>
                </div>
              `
                : ""
            }
          </div>
        `;
      } else {
        modifiedEditor = `
          <div>
            ${
              reportSetting?.include_header && reportSetting?.header_image
                ? `
            <img src="${reportSetting?.header_image}" alt="Header" style="${headerStyle}" />
          `
                : ""
            }
            <div class="page-header" style="${pageHeader}">
            <div style="${headerStyle}" ></div>
            ${
              reportSetting?.patient_details_in_header
                ? `
                <div style=" margin-left: ${reportSetting?.left}px;
              margin-right: ${reportSetting?.right}px; font-family: ${
                    reportSetting?.font_style
                  };font-size: ${
                    reportSetting?.font_size
                  }px !important;margin-top:20px">

                  ${table
                    .replace(
                      /<table /,
                      `<table style="font-size: ${reportSetting?.font_size}px !important;border-collapse:collapse;width:100%" `
                    )
                    .replace(
                      /<td(\s+style="[^"]*")?>/g, // Matches <td> with or without style
                      (match) => {
                        if (match.includes('style="')) {
                          // If <td> already has a style, update width if it matches
                          return match.replace(
                            /width:\s*(\d+\.\d+)%/,
                            (m, p1) =>
                              `width: ${
                                p1 === "17.7931"
                                  ? "17.7931"
                                  : p1 === "33.5161"
                                  ? "33.5161"
                                  : p1
                              }%`
                          );
                        } else {
                          // If <td> has no style, determine its width based on position
                          return `<td>`;
                        }
                      }
                    )}

              </div>
                    `
                : ``
            }

          </div >

              <table style='width:100%'>
              ${
                reportSetting?.patient_details_in_header
                  ? `
                <thead>
                  <tr>
                    <td>
                      <!--place holder for the fixed-position header-->
                      <div style="${pageHeaderSpace}" class="page-header-space"></div>
                    </td>
                  </tr>
                </thead>`
                  : ``
              }

                <tbody>
                  <tr>
                    <td>
                      <div style="${page}">
                        <div style="${reportDataStyle}">
                          ${updateModifiedEditorData}
                          <div style="margin-top: 10px">
                            ${
                              reportSetting?.signature &&
                              assignUserDataFind?.attributes?.uploadSignature &&
                              assignUserDataFind
                                ? `<img src="${assignUserDataFind?.attributes?.uploadSignature}" alt="signature" style="${signatureStyle}" />`
                                : ""
                            } <br/>
                            ${output}
                          </div >
                          </div>

                      </div>
                    </td>
                  </tr>
                </tbody>

              </table>

                ${
                  reportSetting?.include_footer && reportSetting?.footer_image
                    ? `
                <img src="${reportSetting?.footer_image}" alt="Footer" style="${footerStyle}" />
                `
                    : ""
                }
              </div >
              ${
                reportSetting?.include_watermark &&
                reportSetting?.watermark_image
                  ? `
                <div style="${watermarkStyle}" class="watermark">
                  <span style="${watermarkTextStyle}" class="watermark-text"><img src="${reportSetting?.watermark_image}" alt="watermark" width="100%" height="auto" /> </span>
                </div>
              `
                  : ""
              }
        `;
      }
      // Generate the PDF with the modified content
      generateReportPdf(
        apiData,
        modifiedEditor,
        setIsLoading,
        patientData?.patient_name
      );
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  useEffect(() => {
    let instance;

    const initializeEditor = async () => {
      const editorElement = document.querySelector("#ai-editor");
      const toolbarContainer = document.querySelector("#ai-toolbar-container");

      if (!editorElement || !patientData) return;

      const clinicalHistory = patientData?.clinical_history || "None";

      const reportDetails =
        (patientData &&
        (patientData?.document_status === "Approved" ||
          patientData?.document_status === "Addendum" ||
          patientData?.document_status === "Final") &&
        patientData?.submitReportDetails
          ? patientData?.submitReportDetails
          : aiReport || aiEditorData) || "";

      try {
        instance = await DecoupledEditor.create(editorElement, {
          fontSize: {
            options: [9, 11, 12, 13, "default", 15, 17, 19, 21],
            supportAllValues: true,
          },
          toolbar: {
            items: [
              "heading",
              "|",
              "alignment",
              "bold",
              "italic",
              "underline",
              "fontFamily",
              "fontSize",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bulletedList",
              "numberedList",
              "insertTable",
              "|",
              "undo",
              "redo",
            ],
          },
          heading: {
            options: [
              {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading1",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1",
              },
              {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "Heading 3",
                class: "ck-heading_heading3",
              },
              {
                model: "heading4",
                view: "h4",
                title: "Heading 4",
                class: "ck-heading_heading4",
              },
            ],
          },
          language: "en",
          initialData: '<p style="font-size:12px;"></p>',
        });

        editorRef.current = instance;

        if (toolbarContainer) {
          toolbarContainer.innerHTML = "";
          toolbarContainer.appendChild(instance.ui.view.toolbar.element);
        }

        // Set default styles
        instance.editing.view.change((writer) => {
          const editableRoot = instance.editing.view.document.getRoot();
          writer.setStyle("font-size", "12px", editableRoot);
        });

        // Set initial formatted HTML data
        const formattedHTML = generateFormattedHTML(
          patientData,
          reportDetails,
          clinicalHistory
        );
        instance.setData(formattedHTML);

        // ✅ Shared function to modify and update data
        const updateEditorState = () => {
          const newData = instance.getData();
          const modifyData = newData
            .replace(/class="text-tiny"(.*?)>/g, 'style="font-size:.7em;"$1>')
            .replace(/class="text-small"(.*?)>/g, 'style="font-size:.85em;"$1>')
            .replace(/class="text-big"(.*?)>/g, 'style="font-size:1.4em;"$1>')
            .replace(/class="text-huge"(.*?)>/g, 'style="font-size:1.8em;"$1>')
            .replace(
              /<table>/g,
              '<table border="1px;" style="border-collapse: collapse;">'
            )
            .replace(
              /<img style="height:200px;"/g,
              '<img style="height:400px;"'
            )
            .replace(/figure"/g, "")
            .replace(/&nbsp;/g, "")
            .replace(/<figure class="table">/g, "")
            .replace(/<\/figure>/g, "");

          setEditorData(modifyData);
        };

        // ✅ Run immediately after setting content
        updateEditorState();

        // Convert editor data changes
        instance.model.document.on("change:data", () => {
          updateEditorState();
        });

        // Handle image + doctor info if Approved
        if (patientReportDetail?.document_status === "Approved") {
          let imageUrl0 =
            assignUserDataFind?.attributes?.uploadSignature?.[0] || "";
          if (
            imageUrl0.includes(
              "telerappdevattachments.s3.ap-south-1.amazonaws.com"
            )
          ) {
            imageUrl0 = imageUrl0.replace(
              "https://telerappdevattachments.s3.ap-south-1.amazonaws.com/uploads/",
              "https://d3tx83aj1g4m0j.cloudfront.net/uploads/"
            );
          } else if (
            imageUrl0.includes(
              "prod-telerapp-attachments.s3.us-east-2.amazonaws.com"
            )
          ) {
            imageUrl0 = imageUrl0.replace(
              "https://prod-telerapp-attachments.s3.us-east-2.amazonaws.com/uploads/",
              "https://d256o3ycvhwumu.cloudfront.net/uploads/"
            );
          }

          const imageUrl = imageUrl0;

          instance.model.change((writer) => {
            const imageElement = writer.createElement("imageBlock", {
              src: imageUrl,
              alt: "Doctor Signature",
              style: "height:80px;",
              alignment: "left",
            });

            const root = instance.model.document.getRoot();
            const endPosition = writer.createPositionAt(root, "end");
            instance.model.insertContent(imageElement, endPosition);

            const extraDetailsHTML = `
            ${doctorInformation?.displayName}
            ${doctorInformation?.qualificationName}
            ${doctorInformation?.registrationNoName}
            ${doctorInformation?.formattedTimesName}
            ${doctorInformation?.disclaimerDetailsName}
          `;

            const viewFragment =
              instance.data.processor.toView(extraDetailsHTML);
            const modelFragment = instance.data.toModel(viewFragment);
            writer.insert(
              modelFragment,
              instance.model.createPositionAt(root, "end")
            );
          });

          instance.enableReadOnlyMode("approved-mode");
          const editorTable = document.querySelector(".ai_editor_table");
          if (editorTable) editorTable.classList.remove("ai_editor_table");
        }
      } catch (error) {
        console.error("Editor initialization failed:", error);
      }
    };

    initializeEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current
          .destroy()
          .catch((err) => console.error("Editor destroy error:", err));
      }
    };
  }, [
    patientData?.patient_name,
    aiReport,
    aiEditorData,
    assignUserDataFind,
    patientReportDetail,
    doctorInformation,
  ]);

  useEffect(() => {
    if (popupRef.current) {
      setPopupHeight(popupRef.current.scrollHeight);
    }
  }, [transcriptText]);

  const generateFormattedHTML = (patientData, aiReport, clinicalHistory) => {
    const aiReportFormatted = aiReport
      ?.replace(/\\n/g, "<br>") // Convert escaped newlines to HTML line breaks
      .replace(/\n\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Markdown-style bold to <strong>
      .replace(/<br><br>/g, "<br><br>");

    const patientTableHTML = `
      <table
        style="width: 100%; border-collapse: collapse; font-size: 14px; border: 3px double #b3b3b3; outline: 1px solid #dedede;"
      >
        <tbody>
          <tr>
            <td style="border: 1px solid #bfbfbf; padding: 0; font-weight: 700;">Patient Name:</td>
            <td style="border: 1px solid #bfbfbf; padding: 0;">
              ${patientData?.patient_name || ""}
            </td>
            <td style="border: 1px solid #bfbfbf; padding: 0; font-weight: 700;">Patient ID:</td>
            <td style="border: 1px solid #bfbfbf; padding: 0;">
              ${patientData?.patient_id || ""}
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #bfbfbf; padding: 0; font-weight: 700;">SEX:</td>
            <td style="border: 1px solid #bfbfbf; padding: 0;">
              ${patientData?.patient_gender || ""}
            </td>
            <td style="border: 1px solid #bfbfbf; padding: 0; font-weight: 700;">Age:</td>
            <td style="border: 1px solid #bfbfbf; padding: 0;">
              ${parseInt(patientData?.patient_age || "")}
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #bfbfbf; padding: 0; font-weight: 700;">Modality:</td>
            <td style="border: 1px solid #bfbfbf; padding: 0;">
              ${patientData?.patient_modality || ""}
            </td>
            <td style="border: 1px solid #bfbfbf; padding: 0; font-weight: 700;">Accession No.:</td>
            <td style="border: 1px solid #bfbfbf; padding: 0;">
              ${patientData?.accession_number || ""}
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #bfbfbf; padding: 0; font-weight: 700;">Study Date:</td>
            <td style="border: 1px solid #bfbfbf; padding: 0;">
              ${patientData?.study_date || ""}
            </td>
            <td style="border: 1px solid #bfbfbf; padding: 0; font-weight: 700;">Ref. Physician:</td>
            <td style="border: 1px solid #bfbfbf; padding: 0;">
              ${patientData?.ref_physician || ""}
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #bfbfbf; padding: 0; font-weight: 700;">Study:</td>
            <td style="border: 1px solid #bfbfbf; padding: 0;">
              ${patientData?.study || ""}
            </td>
            <td style="border: 1px solid #bfbfbf; padding: 0; font-weight: 700;">Institution Name:</td>
            <td style="border: 1px solid #bfbfbf; padding: 0;">
              ${patientData?.institution_name || ""}
            </td>
          </tr>
        </tbody>
      </table>
    `;

    // Check if aiReport already contains patient details
    const includesPatientInfo = /Patient Name:|Accession No:|Patient ID:/.test(
      aiReport
    );

    const formattedHTML = includesPatientInfo
      ? aiReportFormatted // Only aiReport
      : `${patientTableHTML}<p><strong>CLINICAL HISTORY:</strong> ${clinicalHistory}</p>
      ${aiReportFormatted}`; // Table + aiReport

    return formattedHTML;
  };

  const handleApprove = () => {
    if (aiReport) {
      setAiEditorData(editorData);
      setAiReport("");
    }
  };

  const handleReject = () => {
    setAiReport("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const handleConfirmation = async () => {
      const studyList = viewerStudy[0];
      const oldData = await fetchPatientReportByStudy(
        studyInstanceUid,
        apiData
      );
      const currentTime = new Date();
      const actionlog = "SubmitLogs";
      const currentReport = {
        aiReportDetails: editorData,
        submittedBy: user?.profile?.preferred_username,
        submittedAt: currentTime,
      };
      let reportHistory = [];

      if (oldData?.report_history?.length) {
        reportHistory = [...oldData.report_history];
      }

      reportHistory.push(currentReport);

      const resData = {
        ...patientData,
        aiReportDetails: editorData,
        submitReportDetails: editorData,
        report_history: reportHistory,
        study_UIDs: studyInstanceUid,
        study_IDS: studyList?.ID,
        study_priority: patientReportDetail?.study_priority || "Routine",
        document_status: "Final",
        report_submit_time: currentTime,
        // assign: assignUserDetail !== undefined ? [assignUserDetail] : null,
        firstSubmitUser: user?.profile?.roleType?.includes("Radiologist")
          ? user?.profile?.preferred_username
          : oldData?.firstSubmitUser,
        radiologyGroup: user?.profile?.radiologyGroup,
        created_by: user?.profile?.preferred_username,
        patient_accession: patientData?.patient_accession,
      };

      const studyData = {
        aianalysis: true,
      };

      if (studyData) {
        await updateOrthancStudy(apiData, studyData, studyInstanceUid);
      }

      if (!oldData) {
        createPatientReports(
          apiData,
          resData,
          setReportData,
          username,
          actionlog,
          patientData?.institution_name
        ).then((res) => {
          if (res.status === 200) {
            toast.success("Your report has been successfully submitted");
            setTimeout(() => {
              window.location.href = "/";
            }, 1500);
          }
        });
      } else {
        updatePatientReports(
          apiData,
          oldData.id,
          resData,
          setReportData.username,
          actionlog,
          patientData?.institution_name
        ).then((res) => {
          if (res.status === 200) {
            toast.success("Your report has been successfully updated");
            setTimeout(() => {
              window.location.href = "/";
            }, 1500);
          }
        });
      }
    };

    // Show SweetAlert Confirmation Dialog
    Swal.fire({
      text: `Are you certain you want to submit the report?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirmation();
      }
    });
  };

  const handleDraft = async (event) => {
    event.preventDefault();
    const studyList = viewerStudy[0];
    const oldData = await fetchPatientReportByStudy(studyInstanceUid, apiData);
    const actionlog = "DraftLogs";

    const resData = {
      ...patientData,
      aiReportDetails: editorData,
      study_UIDs: studyInstanceUid,
      study_IDS: studyList.ID,
      study_priority: patientReportDetail?.study_priority || null,
      isDrafted: true,
      document_status: "Read",
      // assign: assignUserDetail !== undefined ? [assignUserDetail] : null,
      radiologyGroup: user?.profile?.radiologyGroup,
      created_by: user?.profile?.preferred_username,
    };

    if (!oldData) {
      createPatientReports(
        apiData,
        resData,
        username,
        actionlog,
        patientData?.institution_name,
        setReportData
      ).then((res) => {
        if (res.status === 200) {
          toast.success("Your report was saved as draft successfully");
        }
      });
    } else {
      updatePatientReports(
        apiData,
        oldData.id,
        resData,
        username,
        actionlog,
        patientData?.institution_name,
        setReportData
      ).then((res) => {
        if (res.status === 200) {
          toast.success("Your report has been successfully updated");
        }
      });
    }
  };

  const handleClick = async (
    studyInstanceUid,
    patientId,
    accession,
    institutionName,
    studyID
  ) => {
    // const data = patientReportsDetails?.find(item => item.study_UIDs === studyInstanceUid);
    const data = await fetchPatientReportByStudy(studyInstanceUid, apiData);
    const isCritical = data ? !data.critical : true;
    if (isCritical === true) {
      toast.success("Critical status added successfully");
    } else {
      toast.success("Critical status removed successfully");
    }

    handlerCriticalToggle(
      studyInstanceUid,
      isCritical,
      patientId,
      accession,
      institutionName,
      studyID
    );
  };

  const handlerCriticalToggle = async (
    studyInstanceUid,
    isCriticalSet,
    patientId,
    accession,
    institutionName,
    studyID
  ) => {
    const data = await fetchPatientReportByStudy(studyInstanceUid, apiData);
    const actionlog = "CriticalLogs";

    if (!data) {
      const newData = {
        study_UIDs: studyInstanceUid,
        study_IDS: studyID,
        critical: isCriticalSet,
        patient_id: patientId,
        institution_name: institutionName,
        patient_accession: accession,
      };
      await createPatientReports(
        apiData,
        newData,
        username,
        actionlog,
        institutionName,
        setReportData
      );
      setPatientCritical(newData);
    } else {
      const updatedData = {
        ...data,
        critical: isCriticalSet,
      };
      await updatePatientReports(
        apiData,
        data.id,
        updatedData,
        username,
        actionlog,
        institutionName,
        setReportData
      );
      setPatientCritical(updatedData);
    }
  };

  return (
    <div className="h-full w-full py-2 bg-[#fff] flex flex-col justify-between">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="p-2">
        <ReactSelect
          id={"promptStyle"}
          classNamePrefix="customSelect"
          className="text-white telerapp-select customSelect__wrapper select-css flex flex-1 flex-col css-b62m3t-container"
          isClearable={false}
          onChange={(selected) => {
            setSelectedPrompt(selected);
          }}
          options={promptOptions}
          value={selectedPrompt}
          placeholder="Select prompt style"
        />
      </div>
      {/* Report Content */}
      {patientData?.patient_name ? (
        <div className="h-full overflow-y-auto">
          <div
            className={`ai_editor_table ${
              patientData?.document_status === "Approved"
                ? "pointer-events-none"
                : "pointer-events-auto"
            }`}
          >
            <div id="ai-toolbar-container"></div>
            <div
              id="ai-editor"
              className="h-full"
              style={{
                overflowY: "auto",
                transition: "max-height 0.3s ease",
              }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="flex h-[615px] !w-full grow flex-col items-center justify-center">
          <span className="loader01"></span>
        </div>
      )}
      {/* Textarea and Send Button */}
      <div className=" px-2">
        {loader && (
          <div className="flex items-center justify-center pb-4">
            <div className="dot-stretching"></div>
          </div>
        )}
        {patientData?.document_status !== "Approved" && editorData ? (
          <form
            className="flex items-center mb-2"
            onSubmit={sendClinicalIndication}
          >
            <div className="dark:bg-[#333333] bg-[#d4d4d4] relative w-full rounded-lg py-3 px-2">
              <div
                className="border-[#282828] dark:border-[#6d6d6d] dark:focus:border-[#ffffff] focus:border-[#a7adba] relative w-full rounded-lg border py-2 px-2 shadow"
                style={{ boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)" }}
              >
                <textarea
                  ref={textareaRef}
                  id="ai-textarea"
                  className={`memberScroll dark:bg-primary-dark bg-primary-light placeholder-inputfield-placeholder mb-5 w-full appearance-none rounded-lg text-[16px] leading-tight text-black transition duration-300 placeholder:text-black placeholder:text-opacity-50 focus:outline-none outline-none dark:text-white dark:placeholder:text-white ${
                    patientData?.document_status === "Approved"
                      ? "pointer-events-none"
                      : "pointer-events-auto"
                  }`}
                  style={{
                    minHeight: "63px",
                    maxHeight: "216px",
                    overflowY: "auto",
                  }}
                  value={transcriptText ? transcriptText : inputValue}
                  onChange={(e) => {
                    handleMessageType(e);
                    // e.target.style.height = "118px"; // Reset height first
                    // e.target.style.height = e.target.scrollHeight + "px"; // Set height dynamically
                  }}
                  placeholder="Clinical Indication"
                  onKeyDown={async (e) => {
                    if (listening) {
                      stopListening();
                    }
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendClinicalIndication(
                        e,
                        listening ? transcriptText : ""
                      );
                    }
                  }}
                  rows={3}
                ></textarea>

                <div className="absolute left-2 bottom-[6px] right-2 z-10 transform flex items-center justify-between">
                  {/* Mic Button (bottom-left) */}
                  <button
                    type="button"
                    id="mic-container"
                    className="mic-container cursor-pointer disabled:cursor-not-allowed"
                    onClick={listening ? stopListening : startListening}
                    disabled={patientData?.document_status === "Approved"}
                  >
                    <div className={`mic-icon-chat`}>
                      <div className={`${listening ? "pulse-ring" : ""}`}></div>
                      {listening ? (
                        <FaMicrophone className="text-[18px] text-white" />
                      ) : (
                        <FaMicrophoneSlash className="text-xl text-white" />
                      )}
                    </div>
                  </button>

                  {/* Send Button (bottom-right) */}
                  <button
                    type="submit"
                    id="send-button"
                    className=" text-xl dark:text-white text-black hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-30"
                    disabled={
                      loader ||
                      !inputValue.trim() ||
                      patientData?.document_status === "Approved"
                    }
                  >
                    <IoSend />
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : null}
        <div className="flex justify-between">
          <div className="flex justify-between gap-2">
            <Tooltip
              text="Submit Report"
              position="top"
              style={{ padding: "8px", fontWeight: "normal" }}
            >
              <button
                id="submit-button"
                onClick={handleSubmit}
                className="box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] px-[5px] sm:text-sm sm:px-[10px] text-[10px] cursor-pointer"
                disabled={
                  (assignUserDetail && isPhysicianOrTechnologist) ||
                  !aiEditorData ||
                  isApproved
                    ? true
                    : (!assignUserDetail &&
                        (canEditReport || isQaUser || isSuperAndDeputyAdmin)) ||
                      assignUserDetail ||
                      isSuperAndDeputyAdmin
                    ? false
                    : true
                }
              >
                Submit
              </button>
            </Tooltip>
            <Tooltip
              text="Save as Draft"
              position="top"
              style={{ padding: "8px", fontWeight: "normal" }}
            >
              <button
                onClick={handleDraft}
                id="draft-button"
                // className="ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
                className="box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] px-[5px] sm:text-sm sm:px-[10px] text-[10px] cursor-pointer"
                disabled={
                  (assignUserDetail && isPhysicianOrTechnologist) ||
                  !aiEditorData ||
                  isApproved
                    ? true
                    : (!assignUserDetail &&
                        (canEditReport || isQaUser || isSuperAndDeputyAdmin)) ||
                      assignUserDetail ||
                      isSuperAndDeputyAdmin
                    ? false
                    : true
                }
              >
                Draft
              </button>
            </Tooltip>
            <button
              onClick={() =>
                handleClick(
                  studyInstanceUid,
                  patientData?.patient_id,
                  patientData?.patient_accession,
                  patientData?.institution_name,
                  patientData?.studyID
                )
              }
              id="critical"
              className={`${
                !patientFind?.critical ? " text-white" : "bg-critical"
              } box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] px-[5px] sm:text-sm sm:px-[10px] text-[10px] cursor-pointer`}
              // className={`${
              //   !patientFind?.critical ? " text-white" : "bg-[#63b3ed] text-black"
              // } ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]`}
              disabled={
                assignUserDetail && isPhysicianOrTechnologist
                  ? true
                  : (!assignUserDetail &&
                      (canEditReport || isQaUser || isSuperAndDeputyAdmin)) ||
                    assignUserDetail ||
                    isSuperAndDeputyAdmin
                  ? false
                  : true
              }
            >
              Critical
            </button>
            <Tooltip
              text="Download PDF"
              position="top"
              style={{ padding: "8px", fontWeight: "normal" }}
            >
              <button
                id="fileDownload"
                // className="downloadbutton mx-3 max-[320px]:mr-4 px-[5px] text-sm max-[1440px]:mx-2 min-[425px]:px-[10px] min-[425px]:text-[14px]"
                className="downloadbutton box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] px-[5px] sm:text-sm sm:px-[10px] text-[10px] cursor-pointer"
                onClick={handleDownloadPdf}
              >
                {isLoading ? (
                  <span className="buttonloader"></span>
                ) : (
                  <span className="flex">
                    <FaFileDownload className="20px" />
                  </span>
                )}
              </button>
            </Tooltip>
          </div>
          {patientData?.document_status !== "Approved" && editorData && (
            <div className="flex items-center justify-between gap-2">
              <button
                id="approve-button"
                onClick={handleApprove}
                className="box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] px-[5px] sm:text-sm sm:px-[10px] text-[10px] cursor-pointer"
                disabled={!aiReport}
              >
                Approve
              </button>
              <button
                id="reject-button"
                onClick={handleReject}
                className="box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] px-[5px] sm:text-sm sm:px-[10px] text-[10px] cursor-pointer"
                disabled={!aiReport}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiReportEditor;
