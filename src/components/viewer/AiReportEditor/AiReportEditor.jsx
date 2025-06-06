import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { IoSend } from "react-icons/io5";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Button from "../Button";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Tooltip from "../Tooltip";
import ReactSelect, { components, MultiValueGenericProps } from "react-select";
import {
  fetchEditorPatientReportData,
  fetchInstitutionPromptAccess,
  fetchPatientReportByStudy,
  fetchViewerStudy,
  genAiRadiologyReporter,
  updateOrthancStudy,
} from "../ReportEditor/RequestHandler";
import "./AIReportEditor.css";

const AiReportEditor = ({ apiData, user }) => {
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

  const inputRef = useRef(null);
  const reportRef = useRef(null);
  const editorRef = useRef(null); // or DecoupledEditor
  const popupRef = useRef(null);

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

  const studyInstanceUid = params.pathname.includes("report-editor")
    ? params.pathname?.split("report-editor/:")[1]
    : params?.search
        ?.slice(
          params?.search?.indexOf("StudyInstanceUIDs=") +
            "StudyInstanceUIDs=".length
        )
        ?.split("&")[0]
        ?.replace(/^=/, "");

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
      });
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, [viewerStudy, apiData]);

  const handleMessageType = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
      inputRef.current.focus();
      inputRef.current.style.height = "118px"; // Reset height
      inputRef.current.style.height = inputRef.current.scrollHeight + "px"; // Adjust based on content
    }
  }, [inputValue]);

  useEffect(() => {
    const textarea = inputRef.current;
    const reportDiv = reportRef.current;

    if (textarea && reportDiv) {
      textarea.style.height = "118px"; // Reset height
      textarea.style.height = textarea.scrollHeight + "px"; // Set height dynamically

      const totalAvailableHeight = 691; // Adjust as per your layout
      const calculatedReportHeight =
        totalAvailableHeight - textarea.scrollHeight;

      reportDiv.style.maxHeight = `${Math.max(100, calculatedReportHeight)}px`; // 100px is the minimum height
    }
  }, [inputValue]);

  const sendClinicalIndication = async (e) => {
    e.preventDefault();
    const data = {
      clinical_indication: inputValue,
      style: selectedPrompt.value,
      patient_sex: patientData?.patient_gender,
      patient_age: parseInt(patientData?.patient_age),
      modality: patientData?.patient_modality,
      study_description: patientData?.study,
      clinicalHistory: patientData?.clinicalHistory || "None",
    };
    setInputValue("");
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
  };

  useEffect(() => {
    const editorElement = document.querySelector("#ai-editor");
    if (!editorElement) return;

    const clinicalHistory = patientData?.clinicalHistory || "None";

    if (editorRef.current) {
      // Just update the data if the editor already exists
      const formattedHTML = generateFormattedHTML(
        patientData,
        aiReport || aiEditorData,
        clinicalHistory
      );
      editorRef.current.setData(formattedHTML);
      return;
    }

    DecoupledEditor.create(editorElement, {
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
    })
      .then((editor) => {
        editorRef.current = editor;

        const toolbarContainer = document.querySelector(
          "#ai-toolbar-container"
        );
        if (toolbarContainer) {
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        }

        editor.editing.view.change((writer) => {
          const editableRoot = editor.editing.view.document.getRoot();
          writer.setStyle("font-size", "12px", editableRoot);
        });

        const formattedHTML = generateFormattedHTML(
          patientData,
          aiReport || aiEditorData,
          clinicalHistory
        );
        editor.setData(formattedHTML);
      })
      .catch(console.error);
  }, [patientData, aiReport, aiEditorData]);

  useEffect(() => {
    if (popupRef.current) {
      setPopupHeight(popupRef.current.scrollHeight);
    }
  }, [transcriptText]);

  useEffect(() => {
    if (transcript.length > 0) {
      let updatedText = `${inputValue} ${transcript}`;

      // Add basic punctuation rules (improving dictation accuracy)
      updatedText = updatedText
        .replace(/\scomma/gi, ",") // User says "comma" → Converts to ","
        .replace(/\speriod/gi, "."); // User says "period" → Converts to "."

      setTranscriptText(updatedText);

      if (transcript.toLowerCase().includes("send")) {
        stopListening(); // Stop listening before sending
        sendClinicalIndication(new Event("submit")); // Simulate form submission
      }
    }
  }, [transcript, inputValue]);

  const startListening = () => {
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
    setInputValue(transcriptText);
    setTranscriptText("");
    resetTranscript();
    setPopupHeight(68);
    setShowPopup(false); // Hide popup when listening stops
  };

  const generateFormattedHTML = (patientData, aiReport, clinicalHistory) => {
    const aiReportFormatted = aiReport
      ?.replace(/\\n/g, "<br>") // Convert escaped newlines to HTML line breaks
      .replace(/\n\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Markdown-style bold to <strong>
      .replace(/<br><br>/g, "<br><br>");

    const patientTableHTML = `
      <table
        className="w-full table-auto border-collapse border-spacing-0 border border-double border-[#b3b3b3] text-sm outline outline-[#dedede]"
      >
        <tbody>
          <tr>
            <td className="border border-solid border-[#bfbfbf] p-0 font-bold">Patient Name:</td>
            <td className="border border-solid border-[#bfbfbf] p-0">
              ${patientData?.patient_name || ""}
            </td>
            <td className="border border-solid border-[#bfbfbf] p-0 font-bold">Patient ID:</td>
            <td className="border border-solid border-[#bfbfbf] p-0">
              ${patientData?.patient_id || ""}
            </td>
          </tr>
          <tr>
            <td className="border border-solid border-[#bfbfbf] p-0 font-bold">SEX:</td>
            <td className="border border-solid border-[#bfbfbf] p-0">
              ${patientData?.patient_gender || ""}
            </td>
            <td className="border border-solid border-[#bfbfbf] p-0 font-bold">Age:</td>
            <td className="border border-solid border-[#bfbfbf] p-0">
              ${parseInt(patientData?.patient_age || "")}
            </td>
          </tr>
          <tr>
            <td className="border border-solid border-[#bfbfbf] p-0 font-bold">Modality:</td>
            <td className="border border-solid border-[#bfbfbf] p-0">
              ${patientData?.patient_modality || ""}
            </td>
            <td className="border border-solid border-[#bfbfbf] p-0 font-bold">Accession No.:</td>
            <td className="border border-solid border-[#bfbfbf] p-0">
              ${patientData?.accession_number || ""}
            </td>
          </tr>
          <tr>
            <td className="border border-solid border-[#bfbfbf] p-0 font-bold">Study Date:</td>
            <td className="border border-solid border-[#bfbfbf] p-0">
              ${patientData?.study_date || ""}
            </td>
            <td className="border border-solid border-[#bfbfbf] p-0 font-bold">Ref. Physician:</td>
            <td className="border border-solid border-[#bfbfbf] p-0">
              ${patientData?.ref_physician || ""}
            </td>
          </tr>
          <tr>
            <td className="border border-solid border-[#bfbfbf] p-0 font-bold">Study:</td>
            <td className="border border-solid border-[#bfbfbf] p-0">
              ${patientData?.study || ""}
            </td>
            <td className="border border-solid border-[#bfbfbf] p-0 font-bold">
              Institution Name:
            </td>
            <td className="border border-solid border-[#bfbfbf] p-0">
              ${patientData?.institution_name || ""}
            </td>
          </tr>
        </tbody>
      </table>`;

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
      setAiEditorData(editorRef.current.getData());
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
      const oldData = await fetchPatientReportByStudy(studyInstanceUid);
      const currentTime = new Date();
      const actionlog = "AiSubmitLogs";
      const currentReport = {
        aiReportDetails: aiEditorData,
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
        aiReportDetails: aiEditorData,
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
              navigate({ pathname: "/" });
            }, 1500);
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
            setTimeout(() => {
              navigate({ pathname: "/" });
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

  return (
    <div className="h-full w-full py-2">
      <div className="p-2 z-[9] relative ">
        <ReactSelect
          id={"promptStyle"}
          className="customSelect__wrapper"
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
      <div
        className={`editor_table ${
          patientData?.document_status === "Approved"
            ? "pointer-events-none"
            : "pointer-events-auto"
        }`}
      >
        <div id="ai-toolbar-container"></div>
        <div
          id="ai-editor"
          ref={reportRef}
          style={{
            overflowY: "auto",
            maxHeight: "691px",
            minHeight: "475px",
            height: "555px",
            transition: "max-height 0.3s ease",
          }}
        ></div>
      </div>
      {/* Textarea and Send Button */}
      <div className="absolute bottom-[12px] right-0 left-0 px-2">
        {loader && (
          <div className="flex items-center justify-center pb-4">
            <div className="dot-stretching"></div>
          </div>
        )}
        <form
          className="flex items-center mb-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendClinicalIndication(e);
          }}
        >
          <div className="dark:bg-primary-dark relative w-full rounded-lg bg-primary-light py-3 px-2">
            <textarea
              id="ai-textarea"
              className="memberScroll dark:bg-primary-dark bg-primary-light border-secondary-dark dark:border-primary-main dark:focus:border-inputfield-focus focus:border-inputfield-main  placeholder-inputfield-placeholder w-full appearance-none rounded-lg border p-2 pr-3 pl-3 text-[16px] leading-tight text-black shadow transition duration-300 placeholder:text-black placeholder:text-opacity-50 focus:outline-none dark:text-white dark:placeholder:text-white mb-6"
              style={{
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                minHeight: "118px",
                maxHeight: "216px",
                overflowY: "auto",
              }}
              ref={inputRef}
              value={inputValue}
              onChange={(e) => {
                handleMessageType(e);
                e.target.style.height = "118px"; // Reset height first
                e.target.style.height = e.target.scrollHeight + "px"; // Set height dynamically
              }}
              placeholder="Clinical Indication"
              rows={5}
            ></textarea>

            <div className="absolute left-2 bottom-2 z-10 transform flex items-center justify-between w-[96%]">
              {/* Mic Button (bottom-left) */}
              <button
                type="button"
                id="mic-container"
                className="mic-container cursor-pointer"
                onClick={listening ? stopListening : startListening}
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
                disabled={loader}
              >
                <IoSend />
              </button>
            </div>

            {/* Listening Popup */}
            {showPopup && (
              <div
                ref={popupRef}
                className="bg-[#333333] dark:bg-[#d4d4d4] absolute top-[-70px] right-[50px] z-10 w-72 rounded-lg p-3 text-center opacity-90 shadow-lg"
                style={{ top: `-${popupHeight}px` }} // Adjust top dynamically
              >
                <h2 className="text-sm font-semibold text-white dark:text-black">
                  Listening...
                </h2>
                <p className="mt-1 text-lg text-white dark:text-black">
                  {transcriptText || "Start speaking..."}
                </p>
              </div>
            )}
          </div>
          {/* <button
            type="submit"
            className="pb-[4px] pl-3 text-xl text-black hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-30"
            disabled={loader}
          >
            <IoSend />
          </button> */}
        </form>
        <div className="flex justify-between">
          <Tooltip
            text="Submit Report"
            position="top"
            style={{ padding: "8px", fontWeight: "normal" }}
          >
            <button
              id="submit-button"
              onClick={handleSubmit}
              className="box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
              disabled={!aiEditorData}
            >
              Submit
            </button>
          </Tooltip>
          <div>
            <button
              id="approve-button"
              onClick={handleApprove}
              className="box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
              disabled={!aiReport}
            >
              Approve
            </button>
            <button
              id="reject-button"
              onClick={handleReject}
              className="box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
              disabled={!aiReport}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiReportEditor;
