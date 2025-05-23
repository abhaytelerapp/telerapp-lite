import React, { useEffect, useRef, useState, useCallback } from "react";

import { useLocation, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Handlebars from "handlebars";
import moment from "moment";
// import '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor.js';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import { useSearchParams } from '@ohif/app/src/hooks';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
// import { useDocumentEditor, useModal, useReportEditor, useSnackbar, useUser } from '../../contextProviders';
import "./ReportEditor.css";
import "./Select.css";
// import Select from '../Select';
import ReactSelect, { components, MultiValueGenericProps } from "react-select";
// import Button from '../Button';
// import Icon from '../Icon';
import AddAttachmentModel from "../AttachMent";
// import studyAndModality from './study_modality_list';
import html2canvas from "html2canvas";
import debounce from "lodash/debounce";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  FaArrowRight,
  FaFileDownload,
  FaMicrophone,
  FaMicrophoneSlash,
  FaNotesMedical,
} from "react-icons/fa";
import { HiMiniDocumentPlus } from "react-icons/hi2";
import { GrDocumentUpdate } from "react-icons/gr";
import Tooltip from "../Tooltip";
import SnackbarTypes from "../Snackbar/SnackbarTypes";
import { useNavigate } from "react-router-dom";
import AddClinicalHistoryModel from "../AddClinicalHistoryModel";
import { BsCameraFill, BsFileMedicalFill } from "react-icons/bs";

import { IoDocumentAttachSharp } from "react-icons/io5";
import SaveReportTemplate from "../ReportTemplate/SaveReportTemplate";
import { MdDataSaverOn } from "react-icons/md";
import {
  createDefaultTemplates,
  createDocument,
  createPatientReports,
  deleteDocumentUrl,
  fetchDefaultReportTemplates,
  fetchDocumentUpload,
  fetchDocumentUploadForStudy,
  fetchPatientReportByStudy,
  fetchPatientReports,
  fetchReportSetting,
  fetchStudyData,
  fetchUsers,
  fetchViewerStudy,
  generateReportPdf,
  updateDocument,
  updatePatientReports,
  userToken,
} from "./RequestHandler";
import { useModal, useSnackbar } from "../contextProviders";
import { getUserInformation } from "./getUserInformation";

const ReportEditor = (props) => {
  const [patientData, setPatientData] = React.useState(null);
  const [patientReportDetail, setPatientReportDetail] = React.useState(null);
  const [selectedTemplateOptions, setSelectedTemplateOptions] = useState([]);
  const [editorData, setEditorData] = React.useState(null);
  const [template, setTemplate] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [editorData1, setEditorData1] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [isMic, setIsMic] = useState(false);
  const query = useSearchParams();
  const params = useLocation();
  const { show, hide } = useModal();
  const [enableListening, setEnableListening] = useState("");
  const [token, setToken] = useState("");
  const [radiologistUserList, setRadiologistUserList] = useState([]);
  const [acessTemplates, setAcessTemplates] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [availableReportTemplates, setAvailableReportTemplates] = useState("");
  const [documentUploadDetails, setDocumentUploadDetails] = useState("");
  const [reportData, setReportData] = useState({});
  const { t } = useTranslation();
  const { show: display } = useSnackbar();

  const {
    toggleDisplayReportEditor,
    setToggleDisplayReportEditor,
    isModelOpen,
    apiData,
    keycloak_url,
    user,
  } = props;

  const customStyles = {
    control: (provided) => ({
      ...provided,
      maxHeight: "40px",
      display: "flex",
      flexWrap: "nowrap",
      overflow: "hidden", // Prevent wrapping
      whiteSpace: "nowrap",
    }),
    valueContainer: (provided) => ({
      ...provided,
      display: "flex",
      flexWrap: "nowrap",
      overflowX: "auto", // Enables horizontal scrolling
      // width: "100%", // Ensure it spans the full width
      // maxWidth: "100%",// Prevent overflow restriction
      scrollbarWidth: "thin", // Ensure scrollbar appears
    }),
    multiValue: (provided) => ({
      ...provided,
      // minWidth: "60px", // Allow dynamic width but keep a minimum
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden", // Prevent text overflow
      textOverflow: "ellipsis",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
  };

  const commands = [
    {
      command: "delete",
      callback: () => {
        if (
          window.confirm("Are you sure you want to delete all report data?")
        ) {
          setSaveReports("");
          SpeechRecognition.stopListening();
          resetTranscript();
          localStorage.clear();
          setIsAutoListening(false);
        } else {
          SpeechRecognition.stopListening();
          resetTranscript();
        }
      },
    },
    {
      command: "next line",
      callback: () => {
        stopListening();
        if (isAutoListening) {
          setTimeout(startListening, 500);
        }
      },
    },
    {
      command: "title *",
      callback: (title) => {
        let upperCaseText = title.toUpperCase();
        const newValue =
          saveReports +
          `<h1 class="ql-align-center"><strong><u>${upperCaseText}</u></strong></h1><br/>`;
        setSaveReports(newValue);
        // localStorage.setItem(`test_transcript`, newValue);
        stopCommand();
        if (isAutoListening) {
          setTimeout(startListening, 500);
        }
      },
    },

    {
      command: "history",
      callback: () => {
        stopListening();
        const newValue =
          saveReports + "<br/><h2><strong>CLINICAL HISTORY: </strong></h2>";
        setSaveReports(newValue);
        localStorage.setItem(`test_transcript`, newValue);
        if (isAutoListening) {
          setTimeout(startListening, 500);
        }
      },
    },

    {
      command: "technique",
      callback: () => {
        stopListening();
        const newValue =
          saveReports + "<br/><h2><strong>TECHNIQUE: </strong></h2>";
        setSaveReports(newValue);
        localStorage.setItem(`test_transcript`, newValue);
        if (isAutoListening) {
          setTimeout(startListening, 500);
        }
      },
    },

    {
      command: "findings",
      callback: () => {
        stopListening();
        const newValue =
          saveReports + "<br/><h2><strong>FINDINGS: </strong></h2>";
        setSaveReports(newValue);
        localStorage.setItem(`test_transcript`, newValue);
        if (isAutoListening) {
          setTimeout(startListening, 500);
        }
      },
    },

    {
      command: "impression",
      callback: () => {
        stopListening();
        const newValue =
          saveReports + "<br/><h2><strong>IMPRESSION: </strong></h2>";
        setSaveReports(newValue);
        localStorage.setItem(`test_transcript`, newValue);
        if (isAutoListening) {
          setTimeout(startListening, 500);
        }
      },
    },

    {
      command: "advice",
      callback: () => {
        stopListening();
        const newValue =
          saveReports + "<br/><h2><strong>ADVICE: </strong></h2>";
        setSaveReports(newValue);
        localStorage.setItem(`test_transcript`, newValue);
        if (isAutoListening) {
          setTimeout(startListening, 500);
        }
      },
    },

    {
      command: "underline *",
      callback: (underline) => {
        const newValue = saveReports + `<u>${underline}</u>. `;
        setSaveReports(newValue);
        localStorage.setItem(`test_transcript`, newValue);
        stopCommand();
        if (isAutoListening) {
          setTimeout(startListening, 500);
        }
      },
    },
    {
      command: "bold face *",
      callback: (point) => {
        const newValue = saveReports + `<strong>${point}</strong>. `;
        setSaveReports(newValue);
        localStorage.setItem(`test_transcript`, newValue);
        stopCommand();
        if (isAutoListening) {
          setTimeout(startListening, 500);
        }
      },
    },
  ];

  const [saveReports, setSaveReports] = useState("");
  const [isAutoListening, setIsAutoListening] = useState(false);
  const [concurrentTemplate, setConcurrentTemplate] = useState(template);
  const [lastTranscriptLength, setLastTranscriptLength] = useState(0);
  const [viewerStudy, setViewerStudy] = useState([]);
  const [reportSetting, setReportSetting] = useState([]);
  const [assignUserDataFind, setAssignUserDataFind] = useState({});
  const [doctorInformation, setDoctorInformation] = useState({});

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  const transcriptRef = useRef(transcript);

  // const navigate = useNavigate();

  useEffect(() => {
    if (editorData1?.editing?.view && !enableListening) {
      setConcurrentTemplate(editorData1.getData());
      setEnableListening("listening");
    }
  }, [listening, enableListening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => {
    resetTranscript();
    setEnableListening("");
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setLastTranscriptLength(0);
    // resetTranscript();
  };

  const stopCommand = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  if (listening && transcript?.length > lastTranscriptLength) {
    transcriptRef.current = transcript;

    // Apply your modifications to the transcript

    let modifiedTranscript = transcript.replace(
      /( stop| full stop| period\s*)+/g,
      ". "
    );
    modifiedTranscript = modifiedTranscript.replace(/(next\s*line\s*)+/g, "");
    modifiedTranscript = modifiedTranscript.replace(/(comma\s*)+/g, ", ");
    modifiedTranscript = modifiedTranscript.replace(/(hyphen\s*)+/g, "-");
    modifiedTranscript = modifiedTranscript.replace(/( underscore\s*)+/g, "_");
    modifiedTranscript = modifiedTranscript.replace(/(colon\s*)+/g, ": ");
    modifiedTranscript = modifiedTranscript.replace(/(semicolon\s*)+/g, "; ");
    modifiedTranscript = modifiedTranscript.replace(
      /(question mark\s*)+/g,
      "? "
    );
    modifiedTranscript = modifiedTranscript.replace(/(plus\s*)+/g, "+");
    modifiedTranscript = modifiedTranscript.replace(/(minus\s*)+/g, "-");
    modifiedTranscript = modifiedTranscript.replace(/(multiply\s*)+/g, "*");
    modifiedTranscript = modifiedTranscript.replace(/(divide\s*)+/g, "/");
    modifiedTranscript =
      modifiedTranscript.charAt(0).toUpperCase() + modifiedTranscript.slice(1);

    // Append the new modified transcript to the previously saved transcript
    const finalTranscript = modifiedTranscript
      ? modifiedTranscript
      : saveReports;

    // Update the saveReports with the combined transcript
    setSaveReports(finalTranscript);

    // Update lastTranscriptLength to keep track of the length of the transcript processed

    setLastTranscriptLength(transcript?.length);

    // Save the final transcript to localStorage

    localStorage.setItem("test_transcript", finalTranscript);
  }

  const isFullEditor = window.location.pathname.includes("/report-editor/");

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

  useEffect(() => {
    if (!apiData) return; // <-- inside the useEffect now

    getToken();

    fetchDefaultReportTemplates(apiData)
      .then((data) => setAvailableReportTemplates(data))
      .catch((error) =>
        console.error("Error fetching default templates:", error)
      );


    fetchDocumentUpload(apiData)
      .then((data) => setDocumentUploadDetails(data))
      .catch((error) =>
        console.error("Error fetching document upload details:", error)
      );
  }, [apiData]);

  useEffect(() => {
    if (!apiData || !keycloak_url) return;
    fetchUsers(user.access_token, keycloak_url)
      .then((data) => {
        setRadiologistUserList(data);
        setUsersList(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [user.access_token, apiData, keycloak_url]);

  const studyInstanceUid = params.pathname.includes("report-editor")
    ? params.pathname?.split("report-editor/:")[1]
    : params?.search
        ?.slice(
          params?.search?.indexOf("StudyInstanceUIDs=") +
            "StudyInstanceUIDs=".length
        )
        ?.split("&")[0]
        ?.replace(/^=/, "");

  useEffect(() => {
    const fetchReportSettings = async () => {
      if (fetchReportSetting && apiData) {
        const fetchUserInformation = await getUserInformation(fetchReportSetting, viewerStudy[0]?.MainDicomTags.InstitutionName, patientFind, radiologistUserList, apiData);
        setReportSetting(fetchUserInformation?.reportSetting);
        setAssignUserDataFind(fetchUserInformation?.assignUserDataFind);
        setDoctorInformation(fetchUserInformation?.doctorInformation);
      }
    }

    fetchReportSettings();
  }, [viewerStudy]);

  const fetchViewerStudys2 = async () => {
    if (!apiData) return;
    const response = await fetchViewerStudy(studyInstanceUid, apiData);
    setViewerStudy(response);
    return response;
  };

  useEffect(() => {
    if (studyInstanceUid) {
      fetchViewerStudys2();
    }
  }, [studyInstanceUid]);

  const isNewTab = params.pathname.includes("report-editor");

  const fetchPatientData = async () => {
    if (!apiData) return;
    // const data = await getCurrentPatient(params, query, studyInstanceUid);
    const data = await fetchStudyData(studyInstanceUid, apiData);

    // const patient = await patientReportsDetails && patientReportsDetails?.find(
    //   items => items.study_UIDs === data[0]?.studyInstanceUid
    // );
    const patient = await fetchPatientReportByStudy(
      data[0]?.MainDicomTags?.StudyInstanceUID,
      apiData
    );

    const studyList = viewerStudy[0];

    setPatientReportDetail(patient);

    if (Array.isArray(data) && data?.length) {
      const age =
        data[0]?.age ||
        data[0]?.PatientMainDicomTags?.PatientName?.match(/\d/g)?.join("");
      const [name] = data[0].PatientMainDicomTags?.PatientName?.split(age);
      let sex;

      if (data[0].PatientMainDicomTags?.PatientSex?.toLowerCase() === "m") {
        sex = "Male";
      } else {
        sex = "Female";
      }
      const studyDate =
        data[0].MainDicomTags?.StudyDate &&
        moment(
          data[0].MainDicomTags?.StudyDate,
          ["YYYYMMDD", "YYYY.MM.DD"],
          true
        ).isValid() &&
        moment(data[0].MainDicomTags?.StudyDate, [
          "YYYYMMDD",
          "YYYY.MM.DD",
        ]).format(t("Common:localDateFormat", "MMM-DD-YYYY"));
      const studyTime =
        data[0].MainDicomTags?.StudyTime &&
        moment(data[0].MainDicomTags?.StudyTime, [
          "HH",
          "HHmm",
          "HHmmss",
          "HHmmss.SSS",
        ]).isValid() &&
        moment(data[0].MainDicomTags?.StudyTime, [
          "HH",
          "HHmm",
          "HHmmss",
          "HHmmss.SSS",
        ]).format(t("Common:localTimeFormat", "hh:mm A"));

      if (
        patient?.reportdetails !== null &&
        patient?.reportdetails !== undefined
      ) {
        setPatientData(patient);
      } else {
        setPatientData({
          patient_name: name,
          // patient_age: age || parseInt(studyList?.RequestedTags?.PatientAge.replace(/\D/g, ''), 10) || 'Null',
          patient_age:
            age !== undefined
              ? age
              : studyList?.RequestedTags?.PatientAge
              ? parseInt(
                  studyList?.RequestedTags?.PatientAge.replace(/\D/g, ""),
                  10
                )
              : 0,
          patient_gender: sex,
          patient_accession: data[0].MainDicomTags?.AccessionNumber,
          patient_id: data[0].PatientMainDicomTags?.PatientID,
          patient_modality: data[0].RequestedTags?.ModalitiesInStudy,
          study: data[0].MainDicomTags?.StudyDescription,
          study_date: studyDate,
          study_time: studyTime,
          ref_physician: data[0].MainDicomTags?.ReferringPhysicianName,
          ref_doctor: data[0].MainDicomTags?.ReferringPhysicianName,
          accession_number:
            studyList?.MainDicomTags.AccessionNumber ||
            data[0].MainDicomTags?.AccessionNumber,
          uid: data[0]?.MainDicomTags?.StudyInstanceUID,
          studyID: studyList?.ID,
          document_status: data[0].document_status,
          priority: patient?.study_priority || "Routine",
          institution_name: studyList?.MainDicomTags.InstitutionName,
          study_description: studyList?.MainDicomTags.StudyDescription,
          patient_dob: moment(
            studyList?.PatientMainDicomTags.PatientBirthDate
          ).format("MM/DD/YYYY"),
          clinical_history: patient?.clinical_history || "None",
          image_perview: imageDataUrl,
        });
      }
    }
  };

  React.useEffect(() => {
    fetchPatientData();
  }, [viewerStudy, apiData]);

  // const { userAuthenticationService, viewportGridService } =
  //   servicesManager.services;
  // const { activeViewportId } = viewportGridService?.getState();

  // const user = userAuthenticationService?.getUser();

  const username = user?.profile?.name;

  const loginUserData = usersList?.filter(
    (data) => data.id === user.profile.sub
  );

  // const loginUseremplateName = loginUserData?.map(data => data?.attributes?.templates).flat();

  const loginUseremplateName = [
    ...(loginUserData?.map((data) => data?.attributes?.templates).flat() || []),
    user?.profile?.preferred_username,
  ].filter(Boolean);

  // const loginUserTemplateOption = availableReportTemplates?.filter(data =>
  //   loginUseremplateName.some(dat => dat === data.templategroup)
  // );

  // First, filter by 'templategroup'

  // First, filter by 'templategroup'

  // const templategroupFiltered = availableReportTemplates && availableReportTemplates?.filter(data =>
  //   loginUseremplateName.some(dat => dat === data.templategroup)
  // );
  // console.log(availableReportTemplates)

  const templategroupFiltered =
    Array.isArray(availableReportTemplates) &&
    Array.isArray(loginUseremplateName)
      ? availableReportTemplates.filter((data) =>
          loginUseremplateName.some((dat) => dat === data.templategroup)
        )
      : [];

  // Then, add additional matches for 'name' if they aren't already included
  const loginUserTemplateOption = [
    ...(templategroupFiltered?.length > 0 ? templategroupFiltered : []),
    ...(availableReportTemplates?.length > 0
      ? availableReportTemplates?.filter(
          (data) =>
            !templategroupFiltered?.includes(data) &&
            loginUseremplateName.some((dat) => dat === data.name)
        )
      : []),
  ];

  //permission
  const isAttachment =
    user?.profile?.roleType?.includes("Radiologist") ||
    user?.profile?.roleType?.includes("QaUsers") ||
    token?.realm_access?.roles?.includes("super-admin") ||
    token?.realm_access?.roles?.includes("deputy-admin");

  const allTemaplateAccess =
    token?.realm_access?.roles?.includes("super-admin") ||
    token?.realm_access?.roles?.includes("deputy-admin");

  // filterData = priorityStudiesFilter.length > 0 ? priorityStudiesFilter : filterStudies;
  const templateOptions =
    loginUseremplateName.includes("Select All") || allTemaplateAccess
      ? availableReportTemplates
      : loginUserTemplateOption;

  const [displayTemplateOptions, setDisplayTemplateOptions] = useState(() => {
    return templateOptions?.map(({ id, name, templates, isCapture }) => {
      return {
        id,
        label: name,
        value: name,
        isCapture: isCapture,
        template: templates
      };
    });
  });

  useEffect(() => {
    if (displayTemplateOptions?.length) {
      setAcessTemplates(displayTemplateOptions?.length);
    }
  }, [displayTemplateOptions]);

  // Map template options only if they have changed
  const mappedOptions =
    templateOptions &&
    templateOptions?.map(({ id, name, templates, isCapture }) => ({
      id,
      label: name,
      value: name,
      isCapture,
      template: templates
    }));

  const [selectedItems, setSelectedItems] = useState(
    displayTemplateOptions &&
      displayTemplateOptions?.filter(
        (data) => data.label === "Default Template"
      )
  );

  useEffect(() => {
    setSelectedTemplateOptions((prevSelected) => {
      if (
        prevSelected &&
        displayTemplateOptions?.some((opt) => opt.id === prevSelected.id)
      ) {
        return prevSelected; // Keep user-selected template
      }

      // Otherwise, select the default template
      const template = displayTemplateOptions?.filter(
        (option) => option.label === "Default Template"
      );
      setSelectedItems(template);
      return template;
    });
  }, [displayTemplateOptions]);
  useEffect(() => {
    if (!Array.isArray(templateOptions) || templateOptions?.length === 0)
      return;

    // Update displayTemplateOptions only if different
    setDisplayTemplateOptions((prevOptions) => {
      const isSame =
        prevOptions?.length === mappedOptions?.length &&
        prevOptions.every((opt, i) => opt.id === mappedOptions[i].id);

      return isSame ? prevOptions : mappedOptions;
    });
  }, [templateOptions]); // Runs only when `templateOptions` changes

  const onSelectChange = (newSelected) => {
    if (!newSelected || newSelected.length === 0) {
      const reportData = displayTemplateOptions.filter(
        (data) => data.label === "Default Template"
      );
      setSelectedTemplateOptions(reportData);
      setSelectedItems(reportData);
    } else {
      // Maintain custom order
      const existingIds = selectedItems.map((item) => item.id);
      const newItems = newSelected.filter(
        (item) => !existingIds.includes(item.id)
      );
      const updatedSelected = [...selectedItems, ...newItems].filter((item) =>
        newSelected.some((sel) => sel.id === item.id)
      );
      const orderedData = updatedSelected
        .map((sel) => displayTemplateOptions.find((data) => data.id === sel.id))
        .filter((data) => data && data.label !== "Default Template");

      setSelectedTemplateOptions(orderedData);
      setSelectedItems(orderedData);
    }

    setImageDataUrl("");
    setSaveReports("");
    stopListening();
  };

  // useEffect(() => {
  //   const studyList1 = allStudy && allStudy?.find(
  //     data => data?.studyInstanceUid === studyInstanceUid
  //   );

  //   const studyList2 = localStorage.getItem("study")
  //   const studyList = JSON.parse(studyList2)
  //   if (studyList?.studyInstanceUid !== studyInstanceUid) {
  //     localStorage.setItem("study", JSON.stringify(studyList1 ? studyList1 : {}))
  //   }

  //   const patient = patientReportsDetails && patientReportsDetails?.find(
  //     items => items.patient_id === studyList1?.patientId
  //   );

  //   // localStorage.setItem("selectedTemplateOptions", JSON.stringify(selectedTemplateOptions));
  //   // patient && localStorage.setItem("patientReportDetail", JSON.stringify(patient));

  // }, [selectedTemplateOptions, allStudy])

  const handleNewWindowOpen = () => {
    // closing the report editor pop-up
    setToggleDisplayReportEditor((show) => !show);

    // window features
    const strWindowFeatures =
      "location=yes,height=800,width=1400,scrollbars=yes,status=yes";

    // opening the new window with custom features
    window.open(
      `${window.location.origin}/report-editor/:${studyInstanceUid}`,
      "_blank",
      strWindowFeatures
    );
  };

  // const patientFind =
  //   patientReportsDetails &&
  //   patientReportsDetails?.find((item) => item.study_UIDs === studyInstanceUid);

  // let patientFind;
  const [patientFind, setPatientFind] = useState({});
  const [patientCritical, setPatientCritical] = useState({});

  const getReportDetails = async () => {
    const patient = await fetchPatientReportByStudy(studyInstanceUid, apiData);
    setPatientFind(patient);
  };

  useEffect(() => {
    if (!studyInstanceUid && patientCritical) return;
    getReportDetails();
  }, [studyInstanceUid, patientCritical]);

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

  // attachment
  const handleAttachmentChange = async (studyInstanceUid, attachmentData) => {
    // const data = documentUploadDetails?.find(
    //   (item) => item.study_UIDs === studyInstanceUid
    // );
    const documentData = await fetchDocumentUploadForStudy(
      apiData,
      studyInstanceUid
    );
    if (documentData.length === 0) {
      await createDocument(
        apiData,
        studyInstanceUid,
        attachmentData,
        setDocumentUploadDetails,
        documentUploadDetails
      );
    } else {
      await updateDocument(
        apiData,
        documentData.id,
        attachmentData,
        setDocumentUploadDetails,
        documentUploadDetails
      );
    }
  };

  const handleAttachmentRemove = async (
    attachment,
    instance,
    studyInstanceUid
  ) => {
    const updateDocumnet = attachment?.filter(
      (item) => item.attachment !== instance
    );
    // const data = documentUploadDetails?.find(
    //   (item) => item.study_UIDs === studyInstanceUid
    // );
    const documentData = await fetchDocumentUploadForStudy(
      apiData,
      studyInstanceUid
    );

    const pattern = /\d+-([^/]+)$/;
    // const pattern = /\/(\d+-([\w-]+\.pdf))$/;

    const removeDocumentName = instance.match(pattern);

    const resData = {
      ...documentData,
      updateData:
        updateDocumnet && updateDocumnet?.length > 0 ? updateDocumnet : null,
      removeDocument: removeDocumentName[0].replaceAll("/", ""),
    };

    await deleteDocumentUrl(
      apiData,
      documentData.id,
      resData,
      setDocumentUploadDetails,
      documentUploadDetails
    );
  };

  const handleAttachment = async (studyInstanceUid, patientName) => {
    const documentData = await fetchDocumentUploadForStudy(
      apiData,
      studyInstanceUid
    );
    show({
      content: AddAttachmentModel,
      title: t("ReportStatus:Attachment"),
      contentProps: {
        hide,
        studyInstanceUid,
        handleAttachmentChange,
        handleAttachmentRemove,
        documentData,
        patientName,
        modelOpen: show,
        toggleDisplayReportEditor,
      },
    });
  };

  // Clinical History
  const handleClinicalHistoryChange = async (
    studyInstanceUid,
    clinicalData,
    patientId,
    accession,
    institutionName
  ) => {
    // const data = patientReportsDetails?.find(item => item.study_UIDs === studyInstanceUid);
    const data = await fetchPatientReportByStudy(studyInstanceUid, apiData);

    const actionlog = "HistoryLogs";

    if (!data) {
      const newData = {
        clinical_history: clinicalData,
        study_UIDs: studyInstanceUid,
        radiologyGroup: user?.profile?.radiologyGroup,
        patient_id: patientId,
        patient_accession: accession,
      };
      await createPatientReports(
        apiData,
        newData,
        setReportData,
        username,
        actionlog,
        institutionName
      );
    } else {
      const resData = {
        ...data,
        clinical_history: clinicalData,
        radiologyGroup: user?.profile?.radiologyGroup,
      };
      await updatePatientReports(
        apiData,
        data.id,
        resData,
        setReportData,
        username,
        actionlog,
        institutionName
      );
    }
  };

  const handleClinicalHistory = async (
    studyInstanceUid,
    patientId,
    accession,
    patientName,
    institutionName
  ) => {
    const findHistory = await fetchPatientReportByStudy(studyInstanceUid, apiData);
    show({
      content: AddClinicalHistoryModel,
      title: t("ReportStatus:Clinical History"),
      contentProps: {
        hide,
        studyInstanceUid,
        handleClinicalHistoryChange,
        findHistory,
        patientId,
        accession,
        patientName,
        institutionName,
      },
    });
  };

  const handleSaveReportTemaplate = () => {
    // setToggleDisplayReportEditor((show: boolean) => !show);
    show({
      content: SaveReportTemplate,
      title: t("ReportTemplate:Save Report Template"),
      contentProps: {
        hide,
        createDefaultTemplates,
        fetchDefaultReportTemplates,
        setAvailableReportTemplates,
        editorData,
        loginUserData,
        user,
        apiData,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Function to handle submit after confirmation
    const handleConfirmation = async () => {
      // const studyList = allStudy.find(
      //   data => data?.studyInstanceUid === studyInstanceUid
      // );

      const studyList = viewerStudy[0];
      const oldData = await fetchPatientReportByStudy(studyInstanceUid, apiData);
      const currentTime = new Date();
      const actionlog = "SubmitLogs";

      const resData = {
        ...patientData,
        reportdetails: editorData,
        study_UIDs: studyInstanceUid,
        study_IDS: studyList?.ID,
        study_priority: patientReportDetail?.study_priority || "Routine",
        isDrafted: false,
        document_status: "Final",
        report_submit_time: currentTime,
        // assign: assignUserDetail !== undefined ? [assignUserDetail] : null,
        firstSubmitUser: user?.profile?.roleType?.includes("Radiologist")
          ? user?.profile?.preferred_username
          : oldData?.firstSubmitUser,
        radiologyGroup: user?.profile?.radiologyGroup,
        created_by: user?.profile?.preferred_username,
      };

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
              // navigate({ pathname: "/" });
              window.location.href = "/";
              if (isFullEditor) {
                window.close(); // Closes the tab if it's a full editor
              }
            }, 1500);
          }
        });
      } else {
        updatePatientReports(
          apiData,
          oldData.id,
          resData,
          setReportData,
          username,
          actionlog,
          patientData?.institution_name
        ).then((res) => {
          if (res.status === 200) {
            toast.success("Your report has been successfully updated");
            setTimeout(() => {
              // navigate({ pathname: "/" });
              window.location.href = "/";
              if (isFullEditor) {
                window.close(); // Closes the tab if it's a full editor
              }
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

    // const studyList = allStudy.find(
    //   data => data?.studyInstanceUid === studyInstanceUid
    // );

    const studyList = viewerStudy[0];

    const oldData = await fetchPatientReportByStudy(studyInstanceUid, apiData);

    const actionlog = "DraftLogs";

    const resData = {
      ...patientData,
      reportdetails: editorData,
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
        setReportData,
        username,
        actionlog,
        patientData?.institution_name
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
        setReportData,
        username,
        actionlog,
        patientData?.institution_name
      ).then((res) => {
        if (res.status === 200) {
          toast.success("Your report has been successfully updated");
        }
      });
    }
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
        setReportData,
        username,
        actionlog,
        institutionName
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
        setReportData,
        username,
        actionlog,
        institutionName
      );
      setPatientCritical(updatedData);
    }
  };

  const handleClick = async (
    studyInstanceUid,
    patientId,
    accession,
    institutionName,
    studyID
  ) => {
    const data = await fetchPatientReportByStudy(studyInstanceUid, apiData);
    const isCritical = data ? !data.critical : true;
    if (isCritical === true) {
      display({
        title: "Success!",
        message: "Critical status added successfully",
        type: SnackbarTypes.SUCCESS,
        position: "topRight",
      });
    } else {
      display({
        title: "Success!",
        message: "Critical status removed successfully",
        type: SnackbarTypes.SUCCESS,
        position: "topRight",
      });
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

  const handleDownloadPdf = async () => {
    try {
      setIsLoading(true);

      const editorDatas = editorData
        ? editorData
        : patientReportDetail?.reportdetails;
      const parser = new DOMParser();
      const doc = parser.parseFromString(editorDatas, "text/html");
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
                    assignUserDataFind?.attributes?.uploadSignature[0] &&
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
          reportSetting?.include_watermark && reportSetting?.watermark_image
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

  const handleCaptureImage = async () => {
    // const divForDownloadViewport: any = document.querySelector(
    //   `div[data-viewport-uid="${activeViewportId}"]`
    // );
    const divForDownloadViewport = document.querySelector(".DicomCanvas");
    html2canvas(divForDownloadViewport).then((canvas) => {
      const scale = 0.5;
      const resizedCanvas = document.createElement("canvas");
      const ctx = resizedCanvas.getContext("2d");
      resizedCanvas.width = canvas.width * scale;
      resizedCanvas.height = canvas.height * scale;
      ctx.drawImage(canvas, 0, 0, resizedCanvas.width, resizedCanvas.height);
      const quality = 0.7;
      const imageDataUrl = resizedCanvas.toDataURL("image/jpeg", quality);
      setImageDataUrl(imageDataUrl);
    });
  };

  const highlightText = (content) => {
    const containsMale = /\b(Male|male)\b/.test(content);
    const containsFemale = /\b(Female|female)\b/.test(content);

    const femaleKeywords = [
      "Ovary",
      "Ovarii",
      "Fallopian tube",
      "Uterus",
      "cervix",
      "vagina",
      "Epoophoron",
      "Garner’s duct",
      "Paroophoron",
      "Skene's glands",
      "Bartholin's gland",
      "Labia minora",
      "Clitoris",
      "Clitoridis",
      "Clitoral",
      "Canal of Nuck",
      "Vulva",
      "Breast",
    ];

    const maleKeywords = [
      "Testicle",
      "Testis",
      "Prostatic utricle",
      "Epididymis",
      "Vas deferens",
      "Seminal vesicle",
      "Paradidymis",
      "Prostate",
      "Bulbourethral gland",
      "Scrotum",
      "Penile raphe",
      "Penis",
      "Penile",
      "Processus vaginalis",
      "testes",
      "Ducts deferens",
      "Ejaculatory ducts",
    ];

    const highlightWords = (content, wordsToHighlight) => {
      wordsToHighlight.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi");
        content = content.replace(
          regex,
          (match) => `<span style="background-color:yellow;">${match}</span>`
        );
      });
      return content;
    };

    const removeHighlight = (content) => {
      return content.replace(
        /<span style="background-color:yellow;">(.*?)<\/span>/gi,
        "$1"
      );
    };

    // Remove existing highlights
    content = removeHighlight(content);

    // Apply new highlights
    if (containsFemale) {
      content = highlightWords(content, maleKeywords);
    }

    if (containsMale) {
      content = highlightWords(content, femaleKeywords);
    }
    return content;
  };

  const lastDocumentVersionRef = useRef(null);
  const lastHighlightedContentRef = useRef("");

  const debouncedHandleChange = useCallback(
    debounce((editor) => {
      const newVersion = editor.model.document.version;
      if (lastDocumentVersionRef.current === newVersion) {
        return;
      }
      lastDocumentVersionRef.current = newVersion;

      const editorContent = editor.getData();
      const highlightedContent = highlightText(editorContent);

      if (
        editorContent !== highlightedContent &&
        highlightedContent !== lastHighlightedContentRef.current
      ) {
        lastHighlightedContentRef.current = highlightedContent;

        // Save the current selection
        const selection = editor.model.document.selection;
        const ranges = Array.from(selection.getRanges()).map((range) =>
          editor.model.createRange(
            editor.model.createPositionAt(
              range.start.parent,
              range.start.offset
            ),
            editor.model.createPositionAt(range.end.parent, range.end.offset)
          )
        );

        // Update the model without resetting the content
        editor.model.change((writer) => {
          const root = editor.model.document.getRoot();
          const viewFragment = editor.data.processor.toView(highlightedContent);
          const modelFragment = editor.data.toModel(viewFragment);

          // Clear existing content
          writer.remove(
            writer.createRange(
              writer.createPositionAt(root, 0),
              writer.createPositionAt(root, root.childCount)
            )
          );

          // Insert new content
          writer.insert(modelFragment, root, 0);

          // Restore the selection
          writer.setSelection(ranges);
        });
      }
    }, 800),
    []
  );

  // useEffect(() => {
  //   let matchCount = 0;
  //   const interval = setInterval(() => {
  //     if (
  //       selectedTemplateOptions &&
  //       patientData &&
  //       viewerStudy?.length > 0
  //     ) {
  //       clearInterval(interval); // Stop checking once data is available

  //       console.log(selectedTemplateOptions, "selectedTemplateOptions")

  //       const templates = selectedTemplateOptions.map(data => data.value) as string[];
  //       console.log(templates, "templates")
  //       console.log(Object.values(templates), "templates1234")
  //       const data = Object.values(templates).join("")
  //       const templateData1 = data.replace(/<table style="border-collapse: collapse; width: 100%;" border="1"[\s\S]*?<\/table>/g, (match) => {
  //         matchCount++;
  //         return matchCount > 1 ? "" : match; // Remove only the second occurrence of the specific table
  //       })

  //       const institutionNameFromStorage = viewerStudy[0]?.MainDicomTags?.InstitutionName;

  //       const patientReportDetail1 = Object.values(patientReportDetail?.reportdetails).join("")

  //       const temaplateDataReport = patientReportDetail1 + data

  //       const patientTemaplateDataReport = temaplateDataReport.replace(/<table style="border-collapse: collapse; width: 100%;" border="1"[\s\S]*?<\/table>/g, (match) => {
  //         matchCount++;
  //         return matchCount > 1 ? "" : match; // Remove only the second occurrence of the specific table
  //       })

  //       console.log(temaplateDataReport, "temaplateDataReport")
  //       console.log(patientReportDetail1, "patientReportDetail1")

  //       console.log(patientReportDetail, "patientReportDetail")
  //       console.log(patientReportDetail?.reportdetails, "patientReportDetail?.reportdetails")
  //       console.log(templateData1, "templateData1")
  //       const compiledTemplate = Handlebars.compile(
  //         patientReportDetail?.reportdetails ? patientTemaplateDataReport : templateData1
  //       );
  //       const templateData = compiledTemplate(patientData);

  //       const updatedTemplateData = templateData.replace(
  //         /(<td[^>]*>\s*<strong>\s*Institution Name:\s*<\/strong>\s*<\/td>\s*<td[^>]*>)(\s*<\/td>)/i,
  //         (match, prefix, emptyTd) => {
  //           return `${prefix}${institutionNameFromStorage}</td>`;
  //         }
  //       );

  //       setEditorData(updatedTemplateData);
  //       setTemplate(updatedTemplateData);
  //       // console.log(updatedTemplateData);
  //     }
  //   }, 500); // Check every 500ms (adjust as needed)

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, [selectedTemplateOptions, patientData, patientReportDetail, viewerStudy]);

  // Custom plugin to set default font size

  useEffect(() => {
    let matchCount = 0;
    const interval = setInterval(() => {
      if (selectedTemplateOptions && patientData && viewerStudy?.length > 0) {
        clearInterval(interval); // Stop checking once data is available
        // Ensure selectedTemplateOptions is an array before mapping
        const hasDefaultTemplate =
          Array.isArray(selectedTemplateOptions) &&
          selectedTemplateOptions.some(
            (option) => option.label === "Default Template"
          );

        const templates =
          patientReportDetail?.reportdetails && hasDefaultTemplate
            ? []
            : Array.isArray(selectedTemplateOptions)
            ? selectedTemplateOptions.map((data) => data.template)
            : [];

        // Ensure templates is an array before calling Object.values
        const data = templates.length
          ? Object.values(templates).join("<p></p>")
          : "";

        const notApproved =
          patientReportDetail?.document_status === "Approved" &&
          data.length !== 0
            ? ""
            : data;

        const templateData1 = data.replace(
          /<table style="border-collapse: collapse; width: 100%;" border="1"[\s\S]*?<\/table>/g,
          (match) => {
            matchCount++;
            return matchCount > 1 ? "" : match; // Remove only the second occurrence of the table
          }
        );

        const institutionNameFromStorage =
          viewerStudy[0]?.MainDicomTags?.InstitutionName;

        // Ensure patientReportDetail.reportdetails is defined
        const patientReportDetail1 = patientReportDetail?.reportdetails
          ? Object.values(patientReportDetail.reportdetails).join("")
          : "";

        const temaplateDataReport = patientReportDetail1 + notApproved;

        const patientTemaplateDataReport = temaplateDataReport.replace(
          /<table style="border-collapse: collapse; width: 100%;" border="1"[\s\S]*?<\/table>/g,
          (match) => {
            matchCount++;
            return matchCount > 1 ? "" : match;
          }
        );

        if (typeof Handlebars !== "undefined") {
          const compiledTemplate = Handlebars.compile(
            patientReportDetail?.reportdetails
              ? patientTemaplateDataReport
              : templateData1
          );
          const templateData = compiledTemplate(patientData);
          const cleanedTemplateData = templateData.replace(
            /Default Template/g,
            ""
          );
          const updatedTemplateData = cleanedTemplateData.replace(
            /(<td[^>]*>\s*<strong>\s*Institution Name:\s*<\/strong>\s*<\/td>\s*<td[^>]*>)(\s*<\/td>)/i,
            (match, prefix, emptyTd) => {
              return `${prefix}${institutionNameFromStorage}</td>`;
            }
          );

          setEditorData(updatedTemplateData);
          setTemplate(updatedTemplateData);
        } else {
          console.error("Handlebars is not defined");
        }
      }
    }, 500); // Check every 500ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, [selectedTemplateOptions, patientData, patientReportDetail, viewerStudy]);

  function DefaultFontSizePlugin(editor) {
    // editor.model.schema.extend('$text', { allowAttributes: 'fontSize' });
    // editor.conversion.attributeToElement({
    //   model: 'fontSize',
    //   view: (modelAttributeValue, { writer }) => {
    //     const span = writer.createAttributeElement('span', {
    //       style: `font-size:${modelAttributeValue}`,
    //     });
    //     writer.setCustomProperty('fontSize', true, span);
    //     return span;
    //   },
    // });

    editor.model.document.on("change:data", (event, data) => {
      editor.model.change((writer) => {
        const selection = editor.model.document.selection;
        const ranges = selection.getRanges();

        for (const range of ranges) {
          if (!range.isCollapsed) {
            writer.setAttribute("fontSize", "12px", range);
          }
        }
      });
    });
  }

  const editorRef = useRef(null); // CKEditor instance
  useEffect(() => {
    let instance;
    const initializeEditor = async () => {
      const editorElement = document.querySelector("#editor");
      const toolbarContainer = document.querySelector("#toolbar-container");
      let lineHeightEditor;
      let editorData01 = null;

      if (!editorElement || !selectedTemplateOptions || !template) return;

      try {
        instance = await DecoupledEditor.create(editorElement, {
          fontSize: {
            options: [9, 11, 12, 13, "default", 15, 17, 19, 21],
            supportAllValues: true,
          },
          toolbar: {
            items: [
              "heading",
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
              "alignment",
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

        if (toolbarContainer) {
          toolbarContainer.innerHTML = "";
          toolbarContainer.appendChild(instance.ui.view.toolbar.element);
        }

        // Set line height & font size
        instance.editing.view.change((writer) => {
          const editableRoot = instance.editing.view.document.getRoot();
          writer.setStyle("line-height", lineHeightEditor, editableRoot);
          writer.setStyle("font-size", "12px", editableRoot);
        });

        // Set initial data
        let initialData = highlightText(template);
        if (patientReportDetail?.document_status === "Addendum") {
          initialData += `<p> Addendum begin &lt; &gt; Addendum end </p>`;
        }
        instance.setData(initialData);

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
          const imageUrl = imageUrl0; // Replace with your actual image URL
          // console.log(imageUrl)
          //const imageUrl = assignUserDataFind?.attributes?.uploadSignature[0]; // Replace with your actual image URL
          instance.model.change((writer) => {
            const imageElement = writer.createElement("imageBlock", {
              src: imageUrl,
              alt: "Doctor Signature",
              style: "height:80px;",
              alignment: "left", // key part
            });

            // Insert image at the END of the document
            const root = instance.model.document.getRoot();
            const endPosition = writer.createPositionAt(root, "end");
            instance.model.insertContent(imageElement, endPosition);

            // Build HTML string
            const extraDetailsHTML = `
              ${doctorInformation?.displayName}
              ${doctorInformation?.qualificationName}
              ${doctorInformation?.registrationNoName}
              ${doctorInformation?.formattedTimesName}
              ${doctorInformation?.disclaimerDetailsName}
            `;
            // Insert formatted text below the image
            const viewFragment =
              instance.data.processor.toView(extraDetailsHTML);
            const modelFragment = instance.data.toModel(viewFragment);
            const newPosition = writer.createPositionAt(root, "end");
            writer.insert(modelFragment, newPosition);
          });
          // Make editor read-only after inserting the image
          instance.enableReadOnlyMode("approved-mode");
          const editorTable = document?.querySelector(".editor_table");
          if (editorTable) {
            editorTable.classList.remove("editor_table");
          }
        }

        // Apply read-only mode if approved
        const editorTable = document?.querySelector(".editor_table");
        if (patientReportDetail?.document_status === "Approved") {
          instance.enableReadOnlyMode("approved-mode");
          editorTable.classList.remove("editor_table");
        }

        // Handle changes and convert classes to inline styles
        instance.model.document.on("change:data", () => {
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
          // onChangeHandler(modifyData);
        });

        editorRef.current = instance;
        setEditorData1(instance);
      } catch (error) {
        console.error("Editor initialization failed:", error);
      }
    };

    initializeEditor();

    return () => {
      if (instance) {
        instance
          .destroy()
          .catch((err) => console.error("Editor destroy error:", err));
      }
    };
  }, [
    selectedTemplateOptions,
    template,
    // imageDataUrl,
    patientReportDetail,
    saveReports,
    // editorData1,
  ]);

  useEffect(() => {
    if (imageDataUrl && editorData1?.editing.view) {
      editorData1?.editing?.view.change((writer) => {
        const currentContent = editorData1.getData();
        const newContent =
          currentContent +
          `<img class="captured-image" src="${imageDataUrl}" alt="Captured Image" style="height:200px;"/>`;
        editorData1.setData(newContent);
      });
    } else if (saveReports && editorData1?.editing?.view) {
      editorData1?.editing?.view?.change((writer) => {
        // const currentContent = editorData1?.getData();
        //  const newContent = currentContent + saveReports;
        const newContent = concurrentTemplate + saveReports;
        localStorage.setItem("test_transcript", newContent);
        editorData1.setData(newContent);
        // setSaveReports("")
      });
    } else {
      if (editorData1?.setData) {
        editorData1?.setData(template);
      }
    }
  }, [editorData1, imageDataUrl]);

  const handleMic = () => {
    setIsMic(!isMic);
  };

  const findDocument =
    documentUploadDetails &&
    documentUploadDetails?.find((item) => item.study_UIDs === studyInstanceUid);

  const MultiValueContainer = (props) => {
    return (
      <Tooltip
        text={props.data.label}
        position={`${isNewTab ? "bottom" : "top"}`}
        style={{ padding: "8px", fontWeight: "lighter" }}
      >
        <div>
          <components.MultiValueContainer {...props} />
        </div>
      </Tooltip>
    );
  };

  return (
    <div
      className={` report_ckeditor z-10 h-full overflow-y-auto md:h-[96%] h-[83%]`}
      // style={{ height: isNewTab ? '95vh' : '100%' }}
    >
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
      <div className="my-2 ml-2 flex justify-between">
        <div className=" w-[60%]">
          <ReactSelect
            id="display-set-selector"
            classNamePrefix="customSelect"
            isMulti={true}
            isClearable={false}
            onChange={onSelectChange}
            options={displayTemplateOptions}
            // value={displayTemplateOptions && displayTemplateOptions?.find(ds => ds?.id === selectedTemplateOptions?.id)}
            // value={displayTemplateOptions?.filter(ds => selectedTemplateOptions?.some(st => st.id === ds.id))}
            value={selectedItems}
            // value={displayTemplateOptions[0]}
            className="text-white telerapp-select customSelect__wrapper select-css flex flex-1 flex-col css-b62m3t-container"
            placeholder="Select one template"
            styles={customStyles} // Apply custom styles
            components={{ MultiValueContainer }}
          />
        </div>

        <div className=" flex justify-between items-center">
          <div
            onClick={handleSaveReportTemaplate}
            className="text-primary-main p-[6px] hover:bg-[#dedede] rounded inline-flex"
          >
            <Tooltip
              text="Save Template"
              position="left"
              style={{ padding: "8px", fontWeight: "normal" }}
            >
              <MdDataSaverOn className={` text-2xl `} />
            </Tooltip>
          </div>
          <div
            onClick={
              isAttachment
                ? () =>
                    handleAttachment(
                      studyInstanceUid,
                      patientData?.patient_name
                    )
                : undefined
            }
            className=" flex items-center text-primary-main p-[6px] hover:bg-[#dedede] rounded inline-flex"
          >
            <Tooltip
              text="See Attachments"
              position="left"
              style={{ padding: "8px", fontWeight: "normal" }}
            >
              <IoDocumentAttachSharp className={`text-2xl`} />
            </Tooltip>
          </div>

          <div
            onClick={() =>
              handleClinicalHistory(
                studyInstanceUid,
                patientData?.patientId,
                patientData?.accession,
                patientData?.patientName,
                patientData?.institution_name
              )
            }
            className="text-primary-main p-[6px] hover:bg-[#dedede] rounded inline-flex"
          >
            {patientFind?.clinical_history ? (
              // <BsFileMedicalFill
              //   className={`${findData[0]?.clinical_history ? 'border-0 text-primary-dark dark:text-primary-light transition-all hover:opacity-70' : ''} text-2xl`}
              //   title="Clinical History"
              // />
              <Tooltip
                text="Clinical History"
                position="left"
                style={{ padding: "8px", fontWeight: "normal" }}
              >
                <BsFileMedicalFill className=" text-2xl" />
              </Tooltip>
            ) : (
              <Tooltip
                text="Clinical History"
                position="left"
                style={{ padding: "8px", fontWeight: "normal" }}
              >
                <FaNotesMedical className=" text-2xl" />
              </Tooltip>
              // <FaNotesMedical className=" text-2xl transition-all hover:opacity-70" title="Add Clinical History" />
            )}
          </div>

          {/* {params.pathname.includes("report-editor") ? null : (
            <div
              onClick={handleNewWindowOpen}
              className="text-primary-main p-[6px] hover:bg-[#dedede] rounded"
            >
              <FaArrowRight className=" text-xl" />
            </div>
          )} */}
        </div>
      </div>

      {/* {console.log(editorData, "editorData")} */}

      {editorData ? (
        <div
          className={`editor_table ${
            patientData?.document_status === "Approved"
              ? " pointer-events-none"
              : " pointer-events-auto"
          }`}
        >
          <div id="toolbar-container"></div>
          <div
            id="editor"
            className={`${
              isModelOpen
                ? "h-[40vh] overflow-y-auto"
                : `${!toggleDisplayReportEditor ? "h-[100vh]" : "h-full"}`
            }`}
            // style={{height:'40vh',overflowY: 'auto'}}
          ></div>
        </div>
      ) : (
        <div className="flex h-[615px] !w-full grow flex-col items-center justify-center">
          <span className="loader01"></span>
        </div>
      )}

      <div className="fixed bottom-[-5px] z-10 mt-2.5 flex max-[340px]:w-[350px] items-center p-1 max-sm:overflow-x-auto">
        <button
          id="mic-container"
          className="mic-container ml-1 cursor-pointer min-[425px]:ml-2"
          onClick={listening ? stopListening : startListening}
        >
          <div className={`mic-icon ${listening ? "" : ""}`}>
            <div className={`${listening ? "pulse-ring" : ""}`}></div>
            {listening ? (
              <FaMicrophone className=" text-xl text-white " />
            ) : (
              <FaMicrophoneSlash className=" text-xl text-white" />
            )}
          </div>
        </button>

        <Tooltip
          text="Submit Report"
          position="top"
          style={{ padding: "8px", fontWeight: "normal" }}
        >
          <button
            onClick={handleSubmit}
            id="submit"
            // className="ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
            className="box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
            disabled={
              (assignUserDetail && isPhysicianOrTechnologist) || isApproved
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
            id="draft"
            // className="ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
            className="box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
            disabled={
              (assignUserDetail && isPhysicianOrTechnologist) || isApproved
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
          } box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]`}
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
        <button
          onClick={() => setToggleDisplayReportEditor(false)}
          id="discard"
          className="box-content inline-flex flex-row items-center justify-center gap-[5px] justify center px-[10px] outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] text-[14px] min-w-[32px] ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
        >
          Discard
        </button>
        {selectedTemplateOptions &&
          selectedTemplateOptions.some((option) => option.isCapture) &&
          !isFullEditor && (
            <Tooltip
              text="Capture Image"
              position="top"
              style={{ padding: "8px", fontWeight: "normal" }}
            >
              <button
                onClick={handleCaptureImage}
                id="captureImage"
                // className="ml-3 px-[5px] text-sm max-[1440px]:ml-2 min-[425px]:px-[10px] min-[425px]:text-[14px]"
                className="box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
              >
                <BsCameraFill className="20px" />
              </button>
            </Tooltip>
          )}
        <Tooltip
          text="Download PDF"
          position="top"
          style={{ padding: "8px", fontWeight: "normal" }}
        >
          <button
            id="fileDownload"
            // className="downloadbutton mx-3 max-[320px]:mr-4 px-[5px] text-sm max-[1440px]:mx-2 min-[425px]:px-[10px] min-[425px]:text-[14px]"
            className="downloadbutton mx-3 box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
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
    </div>
  );
};

export default ReportEditor;
