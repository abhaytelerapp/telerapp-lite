"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _reactI18next = require("react-i18next");
var _handlebars = _interopRequireDefault(require("handlebars"));
var _moment = _interopRequireDefault(require("moment"));
var _reactToastify = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var _sweetalert = _interopRequireDefault(require("sweetalert2"));
require("./ReportEditor.css");
require("./Select.css");
var _reactSelect = _interopRequireWildcard(require("react-select"));
var _AttachMent = _interopRequireDefault(require("../AttachMent"));
var _html2canvas = _interopRequireDefault(require("html2canvas"));
var _debounce = _interopRequireDefault(require("lodash/debounce"));
var _reactSpeechRecognition = _interopRequireWildcard(require("react-speech-recognition"));
var _fa = require("react-icons/fa");
var _hi = require("react-icons/hi2");
var _gr = require("react-icons/gr");
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _SnackbarTypes = _interopRequireDefault(require("../Snackbar/SnackbarTypes"));
var _AddClinicalHistoryModel = _interopRequireDefault(require("../AddClinicalHistoryModel"));
var _bs = require("react-icons/bs");
var _io = require("react-icons/io5");
var _SaveReportTemplate = _interopRequireDefault(require("../ReportTemplate/SaveReportTemplate"));
var _md = require("react-icons/md");
var _RequestHandler = require("./RequestHandler");
var _contextProviders = require("../contextProviders");
var _getUserInformation = require("./getUserInformation");
var _PreviousReport = _interopRequireDefault(require("../PreviousReport/PreviousReport"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor.js';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import { useSearchParams } from '@ohif/app/src/hooks';

// import { useDocumentEditor, useModal, useReportEditor, useSnackbar, useUser } from '../../contextProviders';

// import Select from '../Select';

// import Button from '../Button';
// import Icon from '../Icon';

// import studyAndModality from './study_modality_list';

const ReportEditor = props => {
  const [patientData, setPatientData] = _react.default.useState(null);
  const [patientReportDetail, setPatientReportDetail] = _react.default.useState(null);
  const [selectedTemplateOptions, setSelectedTemplateOptions] = (0, _react.useState)([]);
  const [editorData, setEditorData] = _react.default.useState(null);
  const [template, setTemplate] = _react.default.useState(null);
  const [isLoading, setIsLoading] = _react.default.useState(false);
  const [editorData1, setEditorData1] = (0, _react.useState)("");
  const [imageDataUrl, setImageDataUrl] = (0, _react.useState)("");
  const [isMic, setIsMic] = (0, _react.useState)(false);
  const query = (0, _reactRouterDom.useSearchParams)();
  const params = (0, _reactRouterDom.useLocation)();
  const {
    show,
    hide
  } = (0, _contextProviders.useModal)();
  const [enableListening, setEnableListening] = (0, _react.useState)("");
  const [token, setToken] = (0, _react.useState)("");
  const [radiologistUserList, setRadiologistUserList] = (0, _react.useState)([]);
  const [acessTemplates, setAcessTemplates] = (0, _react.useState)(0);
  const [usersList, setUsersList] = (0, _react.useState)([]);
  const [availableReportTemplates, setAvailableReportTemplates] = (0, _react.useState)("");
  const [documentUploadDetails, setDocumentUploadDetails] = (0, _react.useState)("");
  const [reportData, setReportData] = (0, _react.useState)({});
  const [previouPatientReports, setPreviouPatientReports] = (0, _react.useState)([]);
  const [patientAllReport, setPatientAllReport] = (0, _react.useState)([]);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    show: display
  } = (0, _contextProviders.useSnackbar)();
  const hasFetchedReportsRef = (0, _react.useRef)(false);
  const {
    toggleDisplayReportEditor,
    setToggleDisplayReportEditor,
    isModelOpen,
    apiData,
    keycloak_url,
    user,
    toggleDisplayAiReportEditor
  } = props;
  const customStyles = {
    control: provided => ({
      ...provided,
      maxHeight: "40px",
      display: "flex",
      flexWrap: "nowrap",
      overflow: "hidden",
      // Prevent wrapping
      whiteSpace: "nowrap"
    }),
    valueContainer: provided => ({
      ...provided,
      display: "flex",
      flexWrap: "nowrap",
      overflowX: "auto",
      // Enables horizontal scrolling
      // width: "100%", // Ensure it spans the full width
      // maxWidth: "100%",// Prevent overflow restriction
      scrollbarWidth: "thin" // Ensure scrollbar appears
    }),
    multiValue: provided => ({
      ...provided,
      // minWidth: "60px", // Allow dynamic width but keep a minimum
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      // Prevent text overflow
      textOverflow: "ellipsis"
    }),
    multiValueLabel: provided => ({
      ...provided,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    })
  };
  const commands = [{
    command: "delete",
    callback: () => {
      if (window.confirm("Are you sure you want to delete all report data?")) {
        setSaveReports("");
        _reactSpeechRecognition.default.stopListening();
        resetTranscript();
        localStorage.clear();
        setIsAutoListening(false);
      } else {
        _reactSpeechRecognition.default.stopListening();
        resetTranscript();
      }
    }
  }, {
    command: "next line",
    callback: () => {
      stopListening();
      if (isAutoListening) {
        setTimeout(startListening, 500);
      }
    }
  }, {
    command: "title *",
    callback: title => {
      let upperCaseText = title.toUpperCase();
      const newValue = saveReports + `<h1 class="ql-align-center"><strong><u>${upperCaseText}</u></strong></h1><br/>`;
      setSaveReports(newValue);
      // localStorage.setItem(`test_transcript`, newValue);
      stopCommand();
      if (isAutoListening) {
        setTimeout(startListening, 500);
      }
    }
  }, {
    command: "history",
    callback: () => {
      stopListening();
      const newValue = saveReports + "<br/><h2><strong>CLINICAL HISTORY: </strong></h2>";
      setSaveReports(newValue);
      localStorage.setItem(`test_transcript`, newValue);
      if (isAutoListening) {
        setTimeout(startListening, 500);
      }
    }
  }, {
    command: "technique",
    callback: () => {
      stopListening();
      const newValue = saveReports + "<br/><h2><strong>TECHNIQUE: </strong></h2>";
      setSaveReports(newValue);
      localStorage.setItem(`test_transcript`, newValue);
      if (isAutoListening) {
        setTimeout(startListening, 500);
      }
    }
  }, {
    command: "findings",
    callback: () => {
      stopListening();
      const newValue = saveReports + "<br/><h2><strong>FINDINGS: </strong></h2>";
      setSaveReports(newValue);
      localStorage.setItem(`test_transcript`, newValue);
      if (isAutoListening) {
        setTimeout(startListening, 500);
      }
    }
  }, {
    command: "impression",
    callback: () => {
      stopListening();
      const newValue = saveReports + "<br/><h2><strong>IMPRESSION: </strong></h2>";
      setSaveReports(newValue);
      localStorage.setItem(`test_transcript`, newValue);
      if (isAutoListening) {
        setTimeout(startListening, 500);
      }
    }
  }, {
    command: "advice",
    callback: () => {
      stopListening();
      const newValue = saveReports + "<br/><h2><strong>ADVICE: </strong></h2>";
      setSaveReports(newValue);
      localStorage.setItem(`test_transcript`, newValue);
      if (isAutoListening) {
        setTimeout(startListening, 500);
      }
    }
  }, {
    command: "underline *",
    callback: underline => {
      const newValue = saveReports + `<u>${underline}</u>. `;
      setSaveReports(newValue);
      localStorage.setItem(`test_transcript`, newValue);
      stopCommand();
      if (isAutoListening) {
        setTimeout(startListening, 500);
      }
    }
  }, {
    command: "bold face *",
    callback: point => {
      const newValue = saveReports + `<strong>${point}</strong>. `;
      setSaveReports(newValue);
      localStorage.setItem(`test_transcript`, newValue);
      stopCommand();
      if (isAutoListening) {
        setTimeout(startListening, 500);
      }
    }
  }];
  const [saveReports, setSaveReports] = (0, _react.useState)("");
  const [isAutoListening, setIsAutoListening] = (0, _react.useState)(false);
  const [concurrentTemplate, setConcurrentTemplate] = (0, _react.useState)(template);
  const [lastTranscriptLength, setLastTranscriptLength] = (0, _react.useState)(0);
  const [viewerStudy, setViewerStudy] = (0, _react.useState)([]);
  const [reportSetting, setReportSetting] = (0, _react.useState)([]);
  const [assignUserDataFind, setAssignUserDataFind] = (0, _react.useState)({});
  const [doctorInformation, setDoctorInformation] = (0, _react.useState)({});
  const [patientFind, setPatientFind] = (0, _react.useState)({});
  const [patientCritical, setPatientCritical] = (0, _react.useState)({});
  const [institutionDemographics, setInstitutionDemographics] = (0, _react.useState)("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = (0, _reactSpeechRecognition.useSpeechRecognition)({
    commands
  });
  const transcriptRef = (0, _react.useRef)(transcript);

  // const navigate = useNavigate();

  (0, _react.useEffect)(() => {
    if (editorData1?.editing?.view && !enableListening) {
      setConcurrentTemplate(editorData1.getData());
      setEnableListening("listening");
    }
  }, [listening, enableListening]);

  // Removed early return to keep hooks order consistent across renders

  const startListening = () => {
    resetTranscript();
    setEnableListening("");
    _reactSpeechRecognition.default.startListening({
      continuous: true
    });
  };
  const stopListening = () => {
    _reactSpeechRecognition.default.stopListening();
    setLastTranscriptLength(0);
    // resetTranscript();
  };
  const stopCommand = () => {
    _reactSpeechRecognition.default.stopListening();
    resetTranscript();
  };
  if (listening && transcript?.length > lastTranscriptLength) {
    transcriptRef.current = transcript;

    // Apply your modifications to the transcript

    let modifiedTranscript = transcript.replace(/( stop| full stop| period\s*)+/g, ". ");
    modifiedTranscript = modifiedTranscript.replace(/(next\s*line\s*)+/g, "");
    modifiedTranscript = modifiedTranscript.replace(/(comma\s*)+/g, ", ");
    modifiedTranscript = modifiedTranscript.replace(/(hyphen\s*)+/g, "-");
    modifiedTranscript = modifiedTranscript.replace(/( underscore\s*)+/g, "_");
    modifiedTranscript = modifiedTranscript.replace(/(colon\s*)+/g, ": ");
    modifiedTranscript = modifiedTranscript.replace(/(semicolon\s*)+/g, "; ");
    modifiedTranscript = modifiedTranscript.replace(/(question mark\s*)+/g, "? ");
    modifiedTranscript = modifiedTranscript.replace(/(plus\s*)+/g, "+");
    modifiedTranscript = modifiedTranscript.replace(/(minus\s*)+/g, "-");
    modifiedTranscript = modifiedTranscript.replace(/(multiply\s*)+/g, "*");
    modifiedTranscript = modifiedTranscript.replace(/(divide\s*)+/g, "/");
    modifiedTranscript = modifiedTranscript.charAt(0).toUpperCase() + modifiedTranscript.slice(1);

    // Append the new modified transcript to the previously saved transcript
    const finalTranscript = modifiedTranscript ? modifiedTranscript : saveReports;

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
        token: user.access_token
      };
      const response = await (0, _RequestHandler.userToken)(data, apiData);
      setToken(response);
    } catch (error) {
      console.log(error);
    }
  };
  (0, _react.useEffect)(() => {
    if (!apiData) return; // <-- inside the useEffect now

    // getToken();

    (0, _RequestHandler.fetchDefaultReportTemplates)(apiData).then(data => setAvailableReportTemplates(data)).catch(error => console.error("Error fetching default templates:", error));
    (0, _RequestHandler.fetchDocumentUpload)(apiData).then(data => setDocumentUploadDetails(data)).catch(error => console.error("Error fetching document upload details:", error));
  }, [apiData]);
  (0, _react.useEffect)(() => {
    if (!apiData) return;
    (0, _RequestHandler.fetchUsers)(apiData).then(data => {
      setRadiologistUserList(data?.users);
      setUsersList(data?.users);
    }).catch(error => console.error("Error fetching users:", error));
  }, [apiData]);
  const studyInstanceUid = params.pathname.includes("report-editor") ? params.pathname?.split("report-editor/:")[1] : params?.search?.slice(params?.search?.indexOf("StudyInstanceUIDs=") + "StudyInstanceUIDs=".length)?.split("&")[0]?.split(",")[0]?.replace(/^=/, "");
  (0, _react.useEffect)(() => {
    const query = params?.search;
    const uids = query?.slice(query.indexOf("StudyInstanceUID=") + "StudyInstanceUID=".length)?.split("&")[0]?.split(",")?.map(uid => ({
      studyInstanceUid: uid.trim()
    })); // store objects

    if (uids?.length) {
      setPatientAllReport(uids);
    }
  }, [params?.search]);
  const getReportDetails = async () => {
    const patient = await (0, _RequestHandler.fetchPatientReportByStudy)(studyInstanceUid, apiData);
    setPatientFind(patient);
  };
  (0, _react.useEffect)(() => {
    if (!studyInstanceUid && patientCritical) return;
    getReportDetails();
  }, [studyInstanceUid, patientCritical]);
  (0, _react.useEffect)(() => {
    const fetchReports = async () => {
      if (hasFetchedReportsRef.current || patientAllReport.length === 0) return;
      hasFetchedReportsRef.current = true;
      if (!studyInstanceUid) {
        console.warn("studyInstanceUid missing");
        return;
      }
      const filtered = patientAllReport.filter(study => study.studyInstanceUid !== studyInstanceUid);
      if (filtered.length === 0) {
        setPreviouPatientReports([]);
        return;
      }
      const updatedStudies = await Promise.all(filtered.map(async study => {
        const reportDetails = await (0, _RequestHandler.fetchPatientReportByStudy)(study.studyInstanceUid, apiData);
        const viewerStudy = await (0, _RequestHandler.fetchViewerStudy)(reportDetails?.study_UIDs, apiData);
        let fetchUserInformation = null;
        if (_RequestHandler.fetchReportSetting && viewerStudy?.length > 0 && viewerStudy[0]?.MainDicomTags?.InstitutionName && patientFind) {
          fetchUserInformation = await (0, _getUserInformation.getUserInformation)(_RequestHandler.fetchReportSetting, viewerStudy?.[0]?.MainDicomTags?.InstitutionName, reportDetails, radiologistUserList, apiData);
        }
        return {
          studyData: viewerStudy?.[0]?.MainDicomTags?.StudyDate,
          modality: viewerStudy?.[0]?.RequestedTags?.ModalitiesInStudy,
          instances: viewerStudy?.[0]?.RequestedTags?.NumberOfStudyRelatedInstances,
          template: reportDetails?.reportdetails || null,
          document_status: reportDetails?.document_status || null,
          displayName: fetchUserInformation?.doctorInformation?.displayName,
          qualificationName: fetchUserInformation?.doctorInformation?.qualificationName,
          registrationNoName: fetchUserInformation?.doctorInformation?.registrationNoName,
          formattedTimesName: fetchUserInformation?.doctorInformation?.formattedTimesName,
          disclaimerDetailsName: fetchUserInformation?.doctorInformation?.disclaimerDetailsName,
          signature: fetchUserInformation?.doctorInformation?.signature
        };
      }));
      setPreviouPatientReports(updatedStudies);
    };
    fetchReports();
  }, [_RequestHandler.fetchReportSetting, radiologistUserList?.length > 0, studyInstanceUid, apiData]);
  const fetchViewerStudys2 = async () => {
    if (!apiData) return;
    const response = await (0, _RequestHandler.fetchViewerStudy)(studyInstanceUid, apiData);
    setViewerStudy(response);
    return response;
  };
  (0, _react.useEffect)(() => {
    if (studyInstanceUid) {
      fetchViewerStudys2();
    }
  }, [studyInstanceUid]);
  (0, _react.useEffect)(() => {
    const fetchReportSettings = async () => {
      if (_RequestHandler.fetchReportSetting && viewerStudy?.length > 0 && viewerStudy[0]?.MainDicomTags?.InstitutionName && patientFind) {
        const fetchUserInformation = await (0, _getUserInformation.getUserInformation)(_RequestHandler.fetchReportSetting, viewerStudy[0].MainDicomTags.InstitutionName, patientFind, radiologistUserList, apiData);
        setReportSetting(fetchUserInformation?.reportSetting);
        setAssignUserDataFind(fetchUserInformation?.assignUserDataFind);
        setDoctorInformation(fetchUserInformation?.doctorInformation);
      }
    };
    fetchReportSettings();
  }, [_RequestHandler.fetchReportSetting, viewerStudy, patientFind, radiologistUserList, apiData]);
  const isNewTab = params.pathname.includes("report-editor");
  const fetchPatientData = async () => {
    if (!apiData) return;
    // const data = await getCurrentPatient(params, query, studyInstanceUid);
    const data = await (0, _RequestHandler.fetchStudyData)(studyInstanceUid, apiData);
    const patientReportData = await (0, _RequestHandler.fetchEditorPatientReportData)(apiData, studyInstanceUid);
    // const patient = await patientReportsDetails && patientReportsDetails?.find(
    //   items => items.study_UIDs === data[0]?.studyInstanceUid
    // );
    const patient = await (0, _RequestHandler.fetchPatientReportByStudy)(patientReportData?.studyinstanceuid, apiData);
    const studyList = viewerStudy[0];
    setPatientReportDetail(patient);
    if (patientReportData) {
      const age = patientReportData?.patientage || patientReportData?.patientname?.match(/\d/g)?.join("");
      const [name] = patientReportData?.patientname?.split(age) || 'Unknown';
      let sex;
      if (patientReportData?.patientsex?.toLowerCase() === "m") {
        sex = "Male";
      } else if (patientReportData?.patientsex?.toLowerCase() === 'f') {
        sex = "Female";
      }
      const studyDate = patientReportData.studydate && (0, _moment.default)(patientReportData.studydate, ["YYYYMMDD", "YYYY.MM.DD"], true).isValid() && (0, _moment.default)(patientReportData.studydate, ["YYYYMMDD", "YYYY.MM.DD"]).format(t("Common:localDateFormat", "MMM-DD-YYYY"));
      const studyTime = patientReportData.studytime && (0, _moment.default)(patientReportData.studytime, ["HH", "HHmm", "HHmmss", "HHmmss.SSS"]).isValid() && (0, _moment.default)(patientReportData.studytime, ["HH", "HHmm", "HHmmss", "HHmmss.SSS"]).format(t("Common:localTimeFormat", "hh:mm A"));
      if (patient?.reportdetails !== null && patient?.reportdetails !== undefined) {
        setPatientData(patient);
      } else {
        setPatientData({
          patient_name: name === 'U' ? 'Unknown' : name,
          // patient_age: age || parseInt(studyList?.RequestedTags?.PatientAge.replace(/\D/g, ''), 10) || 'Null',
          patient_age: age !== undefined ? age && age !== '0' && age !== '0Y' ? age.replace(/(\d+)\s*(years?|y)/gi, '$1Y').replace(/(\d+)\s*(months?|m)/gi, '$1M').replace(/(\d+)\s*(days?|d)/gi, '$1D').replace(/\s+/g, ' ').trim().replace(/^(\d+)$/, '$1Y') : '0' : patientReportData?.patientage && patientReportData.patientage !== '0' && patientReportData.patientage !== '0Y' ? patientReportData.patientage.replace(/(\d+)\s*(years?|y)/gi, '$1Y').replace(/(\d+)\s*(months?|m)/gi, '$1M').replace(/(\d+)\s*(days?|d)/gi, '$1D').replace(/\s+/g, ' ').trim().replace(/^(\d+)$/, '$1Y') : '0',
          patient_gender: sex,
          patient_accession: patientReportData.accessionnumber,
          patient_id: patientReportData.patientid || 'Undefined',
          patient_modality: patientReportData.modalitiesinstudy,
          study: patientReportData.studydescription,
          study_date: studyDate,
          study_time: studyTime,
          ref_physician: patientReportData.referringphysicianname,
          ref_doctor: patientReportData.referringphysicianname,
          accession_number: studyList?.MainDicomTags.AccessionNumber || patientReportData.accessionnumber || 'Undefined',
          uid: patientReportData.studyinstanceuid || patientReportData?.studyInstanceUid,
          studyID: patientReportData?.studyid,
          document_status: patient?.document_status,
          priority: patient?.study_priority || "Routine",
          institution_name: studyList?.MainDicomTags.InstitutionName || patientReportData.institutionname,
          study_description: studyList?.MainDicomTags.StudyDescription || patientReportData.studydescription,
          patient_dob: (0, _moment.default)(patientReportData.patientbirthdate).format("MM/DD/YYYY"),
          clinical_history: patient?.clinical_history || "None",
          image_perview: imageDataUrl,
          report_time: patient?.report_submit_time && (0, _moment.default)(patient && patient?.report_submit_time).format("MM/DD/YYYY") || "None"
        });
      }
    }
  };
  _react.default.useEffect(() => {
    fetchPatientData();
  }, [viewerStudy, apiData]);

  // const { userAuthenticationService, viewportGridService } =
  //   servicesManager.services;
  // const { activeViewportId } = viewportGridService?.getState();

  // const user = userAuthenticationService?.getUser();

  const username = user?.profile?.name;
  const loginUserData = usersList?.filter(data => data.id === user.profile.sub);

  // const loginUseremplateName = loginUserData?.map(data => data?.attributes?.templates).flat();

  const loginUseremplateName = [...(loginUserData?.map(data => data?.attributes?.templates).flat() || []), user?.profile?.preferred_username].filter(Boolean);

  // const loginUserTemplateOption = availableReportTemplates?.filter(data =>
  //   loginUseremplateName.some(dat => dat === data.templategroup)
  // );

  // First, filter by 'templategroup'

  // First, filter by 'templategroup'

  // const templategroupFiltered = availableReportTemplates && availableReportTemplates?.filter(data =>
  //   loginUseremplateName.some(dat => dat === data.templategroup)
  // );
  // console.log(availableReportTemplates)

  const templategroupFiltered = Array.isArray(availableReportTemplates) && Array.isArray(loginUseremplateName) ? availableReportTemplates.filter(data => {
    // Normal filter check
    const inUserTemplates = loginUseremplateName.some(dat => dat === data.templategroup);

    // Special case: if "IND 1" not in loginUseremplateName, include "Default Template"
    const allowDefaultTemplate = !loginUseremplateName.includes("IND 1") && data.name === "Default Template";
    return inUserTemplates || allowDefaultTemplate;
  }) : [];

  // Then, add additional matches for 'name' if they aren't already included
  const loginUserTemplateOption = [...(templategroupFiltered?.length > 0 ? templategroupFiltered : []), ...(availableReportTemplates?.length > 0 ? availableReportTemplates?.filter(data => !templategroupFiltered?.includes(data) && loginUseremplateName.some(dat => dat === data.name)) : [])];

  //permission
  // const isAttachment =
  //   user?.profile?.roleType?.includes("Radiologist") ||
  //   user?.profile?.roleType?.includes("QaUsers") ||
  //   user?.profile?.roleType?.includes("super-admin") ||
  //   user?.profile?.roleType?.includes("TelerappManager") ||
  //   user?.profile?.roleType?.includes("DeputyAdmin") ||
  //   user?.profile?.roleType?.includes("deputy-admin");

  const allTemaplateAccess = user?.profile?.roleType?.includes("super-admin") || user?.profile?.roleType?.includes("deputy-admin");
  const isRadiologist = user?.profile?.roleType?.includes('Radiologist');
  const shouldHideSubmitButton = window.location.href.includes('quantum-os.telerapp.com') && isRadiologist && !canEditReport;

  // filterData = priorityStudiesFilter.length > 0 ? priorityStudiesFilter : filterStudies;
  const templateOptions = loginUseremplateName.includes("Select All") || allTemaplateAccess ? availableReportTemplates || [] : loginUserTemplateOption;
  const [displayTemplateOptions, setDisplayTemplateOptions] = (0, _react.useState)(() => {
    return templateOptions?.map(_ref => {
      let {
        id,
        name,
        templates,
        isCapture
      } = _ref;
      return {
        id,
        label: name,
        value: name,
        isCapture: isCapture,
        template: templates
      };
    });
  });
  (0, _react.useEffect)(() => {
    if (displayTemplateOptions?.length) {
      setAcessTemplates(displayTemplateOptions?.length);
    }
  }, [displayTemplateOptions]);
  (0, _react.useEffect)(() => {
    const fetchInstitutionDemographics = async () => {
      if (patientData?.institution_name) {
        await (0, _RequestHandler.fetchReportTemplatesWithInstitution)(apiData, patientData?.institution_name).then(institutionData => {
          if (!institutionData || institutionData.length === 0 || institutionData[0]?.customDemographics === null) {
            setInstitutionDemographics("");
            return;
          }
          // const orderedItems = institutionData[0]?.demographicsAttribute[0]
          //   ?.map((str) => {
          //     try {
          //       return JSON.parse(str);
          //     } catch (e) {
          //       console.warn("Failed to parse item:", str);
          //       return null;
          //     }
          //   })
          //   ?.filter(Boolean); // remove any nulls
          // const itemsValues = orderedItems.map((item) => item.name);
          // const columnCount = 2;

          // const rowCount = Math.ceil(itemsValues.length / columnCount);

          // function capitalizeFirstLetter(string) {
          //   return string.replace(/\b\w/g, (match) => match.toUpperCase());
          // }

          // const exactLabelMap = {
          //   patient_dob: "DOB",
          //   patient_id: "Patient ID",
          //   uid: "UID",
          //   ref_physician: "Ref. Physician",
          //   study_tat: "Study TAT",
          //   accession_number: "Accession No.",
          //   patient_gender: "SEX",
          //   patient_modality: "Modality",
          //   patient_age: "Age",
          // };

          // function formatLabel(key) {
          //   return (
          //     exactLabelMap[key] ||
          //     capitalizeFirstLetter(key.replace(/_/g, " "))
          //   );
          // }

          // let tableRows = "";
          // for (let i = 0; i < rowCount; i++) {
          //   const startIdx = i * columnCount;
          //   const endIdx = startIdx + columnCount;
          //   const rowData = itemsValues.slice(startIdx, endIdx);

          //   const rowCells = rowData
          //     .map(
          //       (key) =>
          //         `<td style="width: 17.7931%;"><strong>${formatLabel(
          //           key
          //         )}:</strong></td><td style="width: 33.5161%;"> {{${key}}}</td>`
          //     )
          //     .join("");
          //   tableRows += `<tr>${rowCells}</tr>`;
          // }

          // const Table = `
          //     <table style="border-collapse: collapse; width: 100%;" border="1">
          //       <tbody>
          //         ${tableRows}
          //       </tbody>
          //     </table>
          //   `;
          const cleanedDemographics = institutionData[0]?.customDemographics?.replace(/^<figure[^>]*>/, '') // Remove opening <figure> tag
          ?.replace(/<\/figure>$/, '');
          setInstitutionDemographics(cleanedDemographics);
        });
      } else {
        setInstitutionDemographics("");
      }
    };
    if (patientData?.institution_name) {
      fetchInstitutionDemographics();
    }
  }, [patientData?.institution_name]);

  // Map template options only if they have changed
  const mappedOptions = templateOptions && templateOptions?.map(_ref2 => {
    let {
      id,
      name,
      templates,
      isCapture
    } = _ref2;
    return {
      id,
      label: name,
      value: name,
      isCapture,
      template: templates
    };
  });
  const [selectedItems, setSelectedItems] = (0, _react.useState)(displayTemplateOptions && displayTemplateOptions?.filter(data => data.label === "Default Template"));
  (0, _react.useEffect)(() => {
    setSelectedTemplateOptions(prevSelected => {
      if (prevSelected && displayTemplateOptions?.some(opt => opt.id === prevSelected.id)) {
        return prevSelected; // Keep user-selected template
      }

      // Otherwise, select the default template
      const template = displayTemplateOptions?.filter(option => option.label === "Default Template");
      setSelectedItems(template);
      return template;
    });
  }, [displayTemplateOptions]);
  (0, _react.useEffect)(() => {
    if (!Array.isArray(templateOptions) || templateOptions?.length === 0) return;

    // Update displayTemplateOptions only if different
    setDisplayTemplateOptions(prevOptions => {
      const isSame = prevOptions?.length === mappedOptions?.length && prevOptions.every((opt, i) => opt.id === mappedOptions[i].id);
      return isSame ? prevOptions : mappedOptions;
    });
  }, [templateOptions]); // Runs only when `templateOptions` changes

  const onSelectChange = newSelected => {
    if (!newSelected || newSelected.length === 0) {
      const reportData = displayTemplateOptions.filter(data => data.label === "Default Template");
      setSelectedTemplateOptions(reportData);
      setSelectedItems(reportData);
    } else {
      // Maintain custom order
      const existingIds = selectedItems.map(item => item.id);
      const newItems = newSelected.filter(item => !existingIds.includes(item.id));
      const updatedSelected = [...selectedItems, ...newItems].filter(item => newSelected.some(sel => sel.id === item.id));
      const orderedData = updatedSelected.map(sel => displayTemplateOptions.find(data => data.id === sel.id)).filter(data => data && data.label !== "Default Template");
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
    setToggleDisplayReportEditor(show => !show);

    // window features
    const strWindowFeatures = "location=yes,height=800,width=1400,scrollbars=yes,status=yes";

    // opening the new window with custom features
    window.open(`${window.location.origin}/report-editor/:${studyInstanceUid}`, "_blank", strWindowFeatures);
  };

  // const patientFind =
  //   patientReportsDetails &&
  //   patientReportsDetails?.find((item) => item.study_UIDs === studyInstanceUid);

  // let patientFind;

  const assignUserFind = patientFind?.assign?.map(item => JSON.parse(item));
  const assignUserDetail = assignUserFind && assignUserFind?.find(item => item.assign_name === user?.profile?.preferred_username);
  const permissions = user?.profile?.permission;
  const isPhysicianOrTechnologist = user?.profile?.roleType === "Physician" || user?.profile?.roleType === "Technologist";
  const canEditReport = permissions?.includes("Edit Report");
  const isQaUser = user?.profile?.roleType?.includes("qa-user");
  const isSuperAndDeputyAdmin = user?.profile?.roleType?.includes("super-admin") || user?.profile?.roleType?.includes("deputy-admin");
  const isApproved = patientReportDetail?.document_status === "Approved";

  // attachment
  const handleAttachmentChange = async (studyInstanceUid, attachmentData) => {
    // const data = documentUploadDetails?.find(
    //   (item) => item.study_UIDs === studyInstanceUid
    // );
    const documentData = await (0, _RequestHandler.fetchDocumentUploadForStudy)(apiData, studyInstanceUid);
    if (documentData.length === 0) {
      await (0, _RequestHandler.createDocument)(apiData, studyInstanceUid, attachmentData, setDocumentUploadDetails, documentUploadDetails);
    } else {
      await (0, _RequestHandler.updateDocument)(apiData, documentData.id, attachmentData, setDocumentUploadDetails, documentUploadDetails);
    }
  };
  const handleAttachmentRemove = async (attachment, instance, studyInstanceUid) => {
    const updateDocumnet = attachment?.filter(item => item.attachment !== instance);
    // const data = documentUploadDetails?.find(
    //   (item) => item.study_UIDs === studyInstanceUid
    // );
    const documentData = await (0, _RequestHandler.fetchDocumentUploadForStudy)(apiData, studyInstanceUid);
    const pattern = /\d+-([^/]+)$/;
    // const pattern = /\/(\d+-([\w-]+\.pdf))$/;

    const removeDocumentName = instance.match(pattern);
    const resData = {
      ...documentData,
      updateData: updateDocumnet && updateDocumnet?.length > 0 ? updateDocumnet : null,
      removeDocument: removeDocumentName[0].replaceAll("/", "")
    };
    await (0, _RequestHandler.deleteDocumentUrl)(apiData, documentData.id, resData, setDocumentUploadDetails, documentUploadDetails);
  };
  const handleAttachment = async (studyInstanceUid, patientName) => {
    const documentData = await (0, _RequestHandler.fetchDocumentUploadForStudy)(apiData, studyInstanceUid);
    show({
      content: _AttachMent.default,
      title: t("Attachment"),
      contentProps: {
        hide,
        studyInstanceUid,
        handleAttachmentChange,
        handleAttachmentRemove,
        documentData,
        patientName,
        modelOpen: show,
        toggleDisplayReportEditor,
        toggleDisplayAiReportEditor
      }
    });
  };

  // Clinical History
  const handleClinicalHistoryChange = async (studyInstanceUid, clinicalData, patientId, accession, institutionName) => {
    // const data = patientReportsDetails?.find(item => item.study_UIDs === studyInstanceUid);
    const data = await (0, _RequestHandler.fetchPatientReportByStudy)(studyInstanceUid, apiData);
    const actionlog = "HistoryLogs";
    if (!data) {
      const newData = {
        clinical_history: clinicalData,
        study_UIDs: studyInstanceUid,
        radiologyGroup: user?.profile?.radiologyGroup,
        patient_id: patientId,
        patient_accession: accession,
        clinical_history_timestamp: (0, _moment.default)().format('DD-MMM-YYYY HH:mm:ss')
      };
      await (0, _RequestHandler.createPatientReports)(apiData, newData, setReportData, username, actionlog, institutionName);
    } else {
      const resData = {
        ...data,
        clinical_history: clinicalData,
        radiologyGroup: user?.profile?.radiologyGroup,
        clinical_history_timestamp: (0, _moment.default)().format('DD-MMM-YYYY HH:mm:ss')
      };
      await (0, _RequestHandler.updatePatientReports)(apiData, data.id, resData, setReportData, username, actionlog, institutionName);
    }
  };
  const handleClinicalHistory = async (studyInstanceUid, patientId, accession, patientName, institutionName) => {
    const findHistory = await (0, _RequestHandler.fetchPatientReportByStudy)(studyInstanceUid, apiData);
    show({
      content: _AddClinicalHistoryModel.default,
      title: t("Clinical History"),
      contentProps: {
        hide,
        studyInstanceUid,
        handleClinicalHistoryChange,
        findHistory,
        patientId,
        accession,
        patientName,
        institutionName
      }
    });
  };
  const handleSaveReportTemaplate = () => {
    // setToggleDisplayReportEditor((show: boolean) => !show);
    show({
      content: _SaveReportTemplate.default,
      title: t("ReportTemplate:Save Report Template"),
      contentProps: {
        hide,
        createDefaultTemplates: _RequestHandler.createDefaultTemplates,
        fetchDefaultReportTemplates: _RequestHandler.fetchDefaultReportTemplates,
        setAvailableReportTemplates,
        editorData,
        loginUserData,
        user,
        apiData
      }
    });
  };
  const handleSubmit = event => {
    event.preventDefault();
    // Function to handle submit after confirmation
    const handleConfirmation = async () => {
      // const studyList = allStudy.find(
      //   data => data?.studyInstanceUid === studyInstanceUid
      // );

      const studyList = viewerStudy[0];
      const oldData = await (0, _RequestHandler.fetchPatientReportByStudy)(studyInstanceUid, apiData);
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
        firstSubmitUser: user?.profile?.roleType?.includes("Radiologist") ? user?.profile?.preferred_username : oldData?.firstSubmitUser,
        radiologyGroup: user?.profile?.radiologyGroup,
        created_by: user?.profile?.preferred_username
      };
      if (!oldData) {
        (0, _RequestHandler.createPatientReports)(apiData, resData, setReportData, username, actionlog, patientData?.institution_name).then(res => {
          if (res.status === 200) {
            _reactToastify.toast.success("Your report has been successfully submitted");
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
        (0, _RequestHandler.updatePatientReports)(apiData, oldData.id, resData, setReportData, username, actionlog, patientData?.institution_name).then(res => {
          if (res.status === 200) {
            _reactToastify.toast.success("Your report has been successfully updated");
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
    _sweetalert.default.fire({
      text: `Are you certain you want to submit the report?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!"
    }).then(result => {
      if (result.isConfirmed) {
        handleConfirmation();
      }
    });
  };
  const handleDraft = async event => {
    event.preventDefault();

    // const studyList = allStudy.find(
    //   data => data?.studyInstanceUid === studyInstanceUid
    // );

    const studyList = viewerStudy[0];
    const oldData = await (0, _RequestHandler.fetchPatientReportByStudy)(studyInstanceUid, apiData);
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
      created_by: user?.profile?.preferred_username
    };
    if (!oldData) {
      (0, _RequestHandler.createPatientReports)(apiData, resData, setReportData, username, actionlog, patientData?.institution_name).then(res => {
        if (res.status === 200) {
          _reactToastify.toast.success("Your report was saved as draft successfully");
        }
      });
    } else {
      (0, _RequestHandler.updatePatientReports)(apiData, oldData.id, resData, setReportData, username, actionlog, patientData?.institution_name).then(res => {
        if (res.status === 200) {
          _reactToastify.toast.success("Your report has been successfully updated");
        }
      });
    }
  };
  const handlerCriticalToggle = async (studyInstanceUid, isCriticalSet, patientId, accession, institutionName, studyID) => {
    const data = await (0, _RequestHandler.fetchPatientReportByStudy)(studyInstanceUid, apiData);
    const actionlog = "CriticalLogs";
    if (!data) {
      const newData = {
        study_UIDs: studyInstanceUid,
        study_IDS: studyID,
        critical: isCriticalSet,
        patient_id: patientId,
        institution_name: institutionName,
        patient_accession: accession
      };
      await (0, _RequestHandler.createPatientReports)(apiData, newData, setReportData, username, actionlog, institutionName);
      setPatientCritical(newData);
    } else {
      const updatedData = {
        ...data,
        critical: isCriticalSet
      };
      await (0, _RequestHandler.updatePatientReports)(apiData, data.id, updatedData, setReportData, username, actionlog, institutionName);
      setPatientCritical(updatedData);
    }
  };
  const handleClick = async (studyInstanceUid, patientId, accession, institutionName, studyID) => {
    const data = await (0, _RequestHandler.fetchPatientReportByStudy)(studyInstanceUid, apiData);
    const isCritical = data ? !data.critical : true;
    if (isCritical === true) {
      _reactToastify.toast.success("Critical status added successfully");
    } else {
      _reactToastify.toast.success("Critical status removed successfully");
    }
    handlerCriticalToggle(studyInstanceUid, isCritical, patientId, accession, institutionName, studyID);
  };
  function formatCustomDateTime(input) {
    let format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dd-MMM-yyyy';
    let date;
    let gmtPart = '';

    // Case: input is Date or string
    if (input instanceof Date) {
      date = input;
    } else if (typeof input === 'string') {
      const match = input.match(/GMT[+-].*$/);
      gmtPart = match ? match[0] : '';
      const cleanStr = input.replace(gmtPart, '').trim();
      date = new Date(cleanStr);
    } else {
      return 'Invalid input';
    }
    if (isNaN(date)) return 'Invalid Date';
    const dd = String(date.getDate()).padStart(2, '0');
    const MMM = date.toLocaleString('en-US', {
      month: 'short'
    });
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const HH = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    // Use format string to build date
    let formattedDate = format.replace(/dd/i, dd).replace(/mmm/i, MMM).replace(/mm/i, MM).replace(/yyyy/i, yyyy);

    // Handle GMT offset
    if (!gmtPart) {
      const offset = -date.getTimezoneOffset(); // in minutes
      const sign = offset >= 0 ? '+' : '-';
      const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
      const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');
      gmtPart = `GMT${sign}${offsetHours}:${offsetMinutes}`;
    }
    return `${formattedDate} ${HH}:${mm}:${ss} ${gmtPart}`;
  }
  const handleDownloadPdf = async () => {
    try {
      setIsLoading(true);
      const editorDatas = editorData ? editorData : patientReportDetail?.reportdetails;
      const parser = new DOMParser();
      const doc = parser.parseFromString(editorDatas, "text/html");
      let tableData = doc.querySelector("table");
      let table = tableData ? tableData.outerHTML : "";
      let modifiedEditorData = doc.body.innerHTML;
      if (reportSetting?.remove_defualt_report) {
        // Create a temporary DOM element to manipulate the HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(modifiedEditorData, "text/html");

        // // Remove the patient details table
        // const table = doc.querySelector("table");
        // if (table) {
        //   table.remove();
        // }

        // Serialize the document back to a string
        modifiedEditorData = modifiedEditorData.replace(/<table[\s\S]*?>[\s\S]*?Patient Name:[\s\S]*?<\/table>/i, '');
      }
      const demographicsTableMatch = modifiedEditorData?.match(/<table[\s\S]*?>[\s\S]*?Patient Name:[\s\S]*?<\/table>/i);
      const demographicsTable = demographicsTableMatch ? demographicsTableMatch[0] : '';
      const cleanedEditorData = modifiedEditorData.replace(/<table[\s\S]*?>[\s\S]*?Patient Name:[\s\S]*?<\/table>/i, '');
      const sections = cleanedEditorData.split(/(?=<h3[^>]*>)/);
      const contentWithTables = sections.map((section, index) => {
        const pMatch = section.match(/^<h3[^>]*>.*?<\/h3>/i);
        const pTag = pMatch ? pMatch[0] : '';
        const restOfSection = pMatch ? section.replace(pTag, '') : section;
        if (index === 0) {
          return `${demographicsTable}${pTag}${restOfSection}`; // first title: no page break
        }
        return `
          ${reportSetting?.patient_details_in_header ? '<div style="page-break-before: always;">&nbsp;</div>' : '<div style="page-break-before: always;">&nbsp;</div>'}
          ${demographicsTable}
          ${pTag}
          ${restOfSection}
        `;
      }).join('');
      const headerStyle = `
        width: 98%;
        z-index: 1;
        padding-right: 10px;
        height: ${reportSetting?.include_header ? reportSetting?.header_height || 50 : 50}px;
        `;
      const footerStyle = `
        width: 98%;
        z-index: 1;
        padding-right: 10px;
        height: ${reportSetting?.footer_height || 50}px;
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
             margin-top: ${reportSetting?.multiple_header_and_footer || reportSetting?.patient_details_in_header ? '5px' : reportSetting?.top}px;
             margin-left: ${reportSetting?.left}px;
             margin-right: ${reportSetting?.right}px;
             margin-bottom: ${reportSetting?.bottom}px;
            font-family: ${reportSetting?.font_style};
            font-size: ${reportSetting?.font_size}px !important;
            line-height: ${reportSetting?.line_spacing || 1.2};
        `;
      const reportTime = (0, _moment.default)(patientData.report_submit_time).format(`${reportSetting?.date_format} HH:mm:ss`);
      const output = `
      <div>
        <strong><span style="font-size: 11pt; font-weight: 600; font-family: Arial;">${doctorInformation?.displayName}</span></strong>
        <strong><span style="font-size: 11pt; font-weight: 600; font-family: Arial;"> ${doctorInformation?.qualificationName}</span></strong>
        ${reportSetting?.consultant ? `<strong><span style="font-size: 11pt; font-weight: 600; font-family: Arial;">${doctorInformation?.userTitle}</span></strong>` : ''}
        <strong><span style="font-size: 11pt; font-weight: 600; font-family: Arial;"> ${doctorInformation?.registrationNoName}</span></strong>
        <span style="font-size: 11pt; font-family: Arial;">${doctorInformation?.disclaimerDetailsName}</span>
        <span style="font-size: 10pt; font-family: Arial;">Electronically signed on :- ${formatCustomDateTime(doctorInformation?.formattedTimesName, reportSetting?.date_format)}</span>
      </div>
  `;
      let pageHeaderSpace;
      if (reportSetting?.patient_details_in_header) {
        const headerHeight = reportSetting?.header_height ? Number(reportSetting.header_height) : 50;
        pageHeaderSpace = `
            height: ${headerHeight + (reportSetting?.font_style === "Lucida Sans Unicode" ? 150 : 130)}px;
          `;
      } else {
        pageHeaderSpace = `
            height: ${reportSetting?.header_height || 50}px;
          `;
      }
      const pageFooterSpace = `
      height: ${reportSetting?.footer_height || 50}px;
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
      const updateModifiedEditorData = contentWithTables.replace(/<figure class="table">/, "").replace(/<\/figure>/, "").replace(/<table /, reportSetting?.patient_details_in_header ? "<table " // Leave it unchanged
      : `<table style="font-size: ${reportSetting?.font_size}px !important; border-collapse: collapse; width: 100%" `).replace(/<td(\s+style="[^"]*")?>/g,
      // Matches <td> with or without style
      match => {
        if (match.includes('style="')) {
          // If <td> already has a style, update width if it matches
          return match.replace(/width:\s*(\d+\.\d+)%/, (m, p1) => `width: ${p1 === "17.7931" ? "17.7931" : p1 === "33.5161" ? "33.5161" : p1}%`);
        } else {
          // If <td> has no style, determine its width based on position
          return `<td>`;
        }
      })?.replace(/<table\b[^>]*>[\s\S]*?<\/table>/gi,
      // Match full table blocks
      match => {
        if (/Patient Name/i.test(match) && !/width="100%"/i.test(match)) {
          // Modify only the opening <table> tag
          return match.replace(/<table(?![^]*?width="100%")/g, `<table  width="100%" style=" border-collapse: collapse; margin-bottom: 10px; margin-top: ${reportSetting?.top}px; font-size: ${reportSetting?.font_size}px !important; width: 100%;"`);
        } else {
          return match.replace(/<table(?![^]*?width="100%")/g, `<table style=" border-collapse: collapse; text-align: center; margin: 0 auto;"`);
        }
      })?.replace(/(<td[^>]*?>.*?Report Time:.*?<\/td>\s*<td[^>]*?>)(.*?)(<\/td>)/g, (match, p1, p2, p3) => {
        // Extract wrapping tags (e.g., <i>, <strong>, etc.)
        const openingTags = (p2.match(/^(<[^>]+>)+/) || [''])[0];
        const closingTags = (p2.match(/(<\/[^>]+>)+$/) || [''])[0];
        return `${p1}${openingTags}${reportTime}${closingTags}${p3}`;
      }).replace(/<table[^>]*style="([^"]*)"/gi, (match, styles) => {
        tableCounter++;
        // Check if we should apply styles to the first table
        const shouldApplyToFirstTable = reportSetting?.patient_details_in_header;
        if (shouldApplyToFirstTable) {
          // Modify the first table only if patient_details_in_header is true
          return match.replace(styles, `width: auto; margin: auto; border-collapse: collapse; font-size: ${reportSetting?.font_size}px !important; font-family: ${reportSetting?.font_style}; page-break-inside: avoid;`);
        } else if (tableCounter > 1) {
          // Modify only child tables if patient_details_in_header is false
          return match.replace(styles, `width: auto; margin: auto; border-collapse: collapse; font-size: ${reportSetting?.font_size}px !important; font-family: ${reportSetting?.font_style}; page-break-inside: avoid;`);
        }
        return match; // Leave first table unchanged if condition is false
      }).replace(/<td(\s+style="[^"]*")?>/g, match => {
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
            return match.replace(/style="([^"]*)"/, (m, styles) => `style="${styles.replace(/width:\s*\d+\.\d+%/, "")}; white-space: nowrap;"`);
          } else {
            return `<td style="white-space: nowrap;">`;
          }
        }
        return match; // Leave other columns unchanged
      }).replace(/(<td[^>]*?>\s*(?:<[^>]+>)*\s*Study Date:\s*(?:<\/[^>]+>)*\s*<\/td>\s*<td[^>]*?>)([\s\S]*?)(<\/td>)/i, (match, p1, dateHtml, p3) => {
        // Extract plain date text from the HTML inside the cell
        const dateText = dateHtml.replace(/<[^>]*>/g, "").trim();
        const parsedDate = (0, _moment.default)(new Date(dateText));
        if (parsedDate.isValid()) {
          // Replace only the date text inside the original HTML tags
          const newDateHtml = dateHtml.replace(dateText, parsedDate.format(reportSetting?.date_format));
          return `${p1}${newDateHtml}${p3}`;
        }
        return match;
      }).replace(/<p>\s*<\/p>/g, '<p style="margin: 0; padding: 0;"><br></p>').replace(/<(p|li|h[1-4])(\s+[^>]*)?>/gi, function (match, tag) {
        let attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        if (attrs.includes('style=')) {
          return match.replace(/style="([^"]*)"/i, (m, styleContent) => {
            // Preserve existing styles and add font-size if not present
            const updatedStyle = styleContent.includes('font-size') ? styleContent : `${styleContent} font-size: ${reportSetting?.font_size}px;`;
            return `style="${updatedStyle} margin: 0; padding: 0;"`;
          });
        } else {
          return `<${tag} style="font-size: ${reportSetting?.font_size}px; margin: 0; padding: 0;"${attrs || ''}>`;
        }
      }).replace(/<h3 style="([^"]*text-align:\s*center;[^"]*)">/g, (match, styleContent) => {
        const newStyle = styleContent.includes('margin-bottom') ? styleContent : `${styleContent} margin-bottom:10px;`;
        return `<h3 style="${newStyle}">`;
      }).replace(/<p style="margin-left:0cm; font-size: 13px; margin: 0; padding: 0;"><br><\/p>\s*(<div[^>]*page-break-before:[^>]*?>)/g, '$1');

      // Construct modified editor content
      if (reportSetting?.multiple_header_and_footer === true) {
        modifiedEditor = `
  <div style="${pageStyle}">
    <div class="page-header" style="${pageHeader}">
      ${reportSetting?.include_header && reportSetting?.header_image ? `<img src="${reportSetting?.header_image}" alt="Header" style="${headerStyle}" />` : ""}

      ${reportSetting?.patient_details_in_header ? `
          <div style=" margin-left: ${reportSetting?.left}px;
             margin-right: ${reportSetting?.right}px; font-family: ${reportSetting?.font_style};font-size: ${reportSetting?.font_size}px !important; margin-top:20px; margin-bottom: 10px;">
             ${table.replace(/<table /, `<table style="font-size: ${reportSetting?.font_size}px !important;border-collapse:collapse;width:100%" `)?.replace(/(<td[^>]*?>.*?Report Time:.*?<\/td>\s*<td[^>]*?>)(.*?)(<\/td>)/g, (match, p1, p2, p3) => {
          // Extract wrapping tags (e.g., <i>, <strong>, etc.)
          const openingTags = (p2.match(/^(<[^>]+>)+/) || [''])[0];
          const closingTags = (p2.match(/(<\/[^>]+>)+$/) || [''])[0];
          return `${p1}${openingTags}${reportTime}${closingTags}${p3}`;
        }).replace(/(<td[^>]*?>\s*(?:<[^>]+>)*\s*Study Date:\s*(?:<\/[^>]+>)*\s*<\/td>\s*<td[^>]*?>)([\s\S]*?)(<\/td>)/i, (match, p1, dateHtml, p3) => {
          // Extract plain date text from the HTML inside the cell
          const dateText = dateHtml.replace(/<[^>]*>/g, "").trim();
          const parsedDate = (0, _moment.default)(new Date(dateText));
          if (parsedDate.isValid()) {
            // Replace only the date text inside the original HTML tags
            const newDateHtml = dateHtml.replace(dateText, parsedDate.format(reportSetting?.date_format));
            return `${p1}${newDateHtml}${p3}`;
          }
          return match;
        }).replace(/<td(\s+style="[^"]*")?>/g,
        // Matches <td> with or without style
        match => {
          if (match.includes('style="')) {
            // If <td> already has a style, update width if it matches
            return match.replace(/width:\s*(\d+\.\d+)%/, (m, p1) => `width: ${p1 === "17.7931" ? "17.7931" : p1 === "33.5161" ? "33.5161" : p1}%`);
          } else {
            // If <td> has no style, determine its width based on position
            return `<td>`;
          }
        })}
          </div>
        ` : ""}
    </div>

    <div class="page-footer" style="${pageFooter}">
      ${reportSetting?.include_footer && reportSetting?.footer_image ? `<img src="${reportSetting?.footer_image}" alt="Footer" style="${footerStyle}" />` : ""}
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
                  ${reportSetting?.signature && assignUserDataFind?.attributes?.uploadSignature && assignUserDataFind ? `<img src="${assignUserDataFind?.attributes?.uploadSignature}" alt="signature" style="${signatureStyle}" />` : ""}<br/>
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

    ${reportSetting?.include_watermark && reportSetting?.watermark_image ? `
        <div style="${watermarkStyle}" class="watermark">
          <span style="${watermarkTextStyle}" class="watermark-text">
            <img src="${reportSetting?.watermark_image}" alt="watermark" width="100%" height="auto" />
          </span>
        </div>
      ` : ""}
  </div>
`;
      } else {
        modifiedEditor = `
        <div>
          ${reportSetting?.include_header && reportSetting?.header_image ? `
          <img src="${reportSetting?.header_image}" alt="Header" style="${headerStyle}" />
        ` : ""}
          <div class="page-header" style="${pageHeader}">
          <div style="${headerStyle}" ></div>
           ${reportSetting?.patient_details_in_header ? `
               <div style=" margin-left: ${reportSetting?.left}px;
             margin-right: ${reportSetting?.right}px; font-family: ${reportSetting?.font_style};font-size: ${reportSetting?.font_size}px !important; margin-top:20px; margin-bottom: 10px;">

                 ${table.replace(/<table /, `<table style="font-size: ${reportSetting?.font_size}px !important;border-collapse:collapse;width:100%" `)?.replace(/(<td[^>]*?>.*?Report Time:.*?<\/td>\s*<td[^>]*?>)(.*?)(<\/td>)/g, (match, p1, p2, p3) => {
          // Extract wrapping tags (e.g., <i>, <strong>, etc.)
          const openingTags = (p2.match(/^(<[^>]+>)+/) || [''])[0];
          const closingTags = (p2.match(/(<\/[^>]+>)+$/) || [''])[0];
          return `${p1}${openingTags}${reportTime}${closingTags}${p3}`;
        }).replace(/(<td[^>]*?>\s*(?:<[^>]+>)*\s*Study Date:\s*(?:<\/[^>]+>)*\s*<\/td>\s*<td[^>]*?>)([\s\S]*?)(<\/td>)/i, (match, p1, dateHtml, p3) => {
          // Extract plain date text from the HTML inside the cell
          const dateText = dateHtml.replace(/<[^>]*>/g, "").trim();
          const parsedDate = (0, _moment.default)(new Date(dateText));
          if (parsedDate.isValid()) {
            // Replace only the date text inside the original HTML tags
            const newDateHtml = dateHtml.replace(dateText, parsedDate.format(reportSetting?.date_format));
            return `${p1}${newDateHtml}${p3}`;
          }
          return match;
        }).replace(/<td(\s+style="[^"]*")?>/g,
        // Matches <td> with or without style
        match => {
          if (match.includes('style="')) {
            // If <td> already has a style, update width if it matches
            return match.replace(/width:\s*(\d+\.\d+)%/, (m, p1) => `width: ${p1 === "17.7931" ? "17.7931" : p1 === "33.5161" ? "33.5161" : p1}%`);
          } else {
            // If <td> has no style, determine its width based on position
            return `<td>`;
          }
        })}

        </div>
                ` : ``}

        </div >

        <table style='width:100%'>
        ${reportSetting?.patient_details_in_header ? `
          <thead>
            <tr>
              <td>
                <!--place holder for the fixed-position header-->
                <div style="${pageHeaderSpace}" class="page-header-space"></div>
              </td>
            </tr>
          </thead>` : ``}

          <tbody>
            <tr>
              <td>
                <div style="${page}">
                  <div style="${reportDataStyle}">
                     ${updateModifiedEditorData}
                    <div style="margin-top: 10px">
                      ${reportSetting?.signature && assignUserDataFind?.attributes?.uploadSignature && assignUserDataFind ? `<img src="${assignUserDataFind?.attributes?.uploadSignature}" alt="signature" style="${signatureStyle}" />` : ""} <br/>
                      ${output}
                    </div >
                    </div>

                </div>
              </td>
            </tr>
          </tbody>

        </table>

          ${reportSetting?.include_footer && reportSetting?.footer_image ? `
          <img src="${reportSetting?.footer_image}" alt="Footer" style="${footerStyle}" />
          ` : ""}
        </div >
        ${reportSetting?.include_watermark && reportSetting?.watermark_image ? `
          <div style="${watermarkStyle}" class="watermark">
            <span style="${watermarkTextStyle}" class="watermark-text"><img src="${reportSetting?.watermark_image}" alt="watermark" width="100%" height="auto" /> </span>
          </div>
        ` : ""}
  `;
      }
      // Generate the PDF with the modified content
      (0, _RequestHandler.generateReportPdf)(apiData, modifiedEditor, setIsLoading, patientData?.patient_name, reportSetting);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };
  const handleCaptureImage = async () => {
    // const divForDownloadViewport: any = document.querySelector(
    //   `div[data-viewport-uid="${activeViewportId}"]`
    // );
    const divForDownloadViewport = document.querySelector(".DicomCanvas");
    (0, _html2canvas.default)(divForDownloadViewport).then(canvas => {
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
  const highlightText = content => {
    const containsMale = /\b(Male|male)\b/.test(content);
    const containsFemale = /\b(Female|female)\b/.test(content);
    const femaleKeywords = ["Ovary", "Ovarii", "Fallopian tube", "Uterus", "cervix", "vagina", "Epoophoron", "Garner’s duct", "Paroophoron", "Skene's glands", "Bartholin's gland", "Labia minora", "Clitoris", "Clitoridis", "Clitoral", "Canal of Nuck", "Vulva", "Breast"];
    const maleKeywords = ["Testicle", "Testis", "Prostatic utricle", "Epididymis", "Vas deferens", "Seminal vesicle", "Paradidymis", "Prostate", "Bulbourethral gland", "Scrotum", "Penile raphe", "Penis", "Penile", "Processus vaginalis", "testes", "Ducts deferens", "Ejaculatory ducts"];
    const highlightWords = (content, wordsToHighlight) => {
      wordsToHighlight.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi");
        content = content.replace(regex, match => `<span style="background-color:yellow;">${match}</span>`);
      });
      return content;
    };
    const removeHighlight = content => {
      return content.replace(/<span style="background-color:yellow;">(.*?)<\/span>/gi, "$1");
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
  const lastDocumentVersionRef = (0, _react.useRef)(null);
  const lastHighlightedContentRef = (0, _react.useRef)("");
  const debouncedHandleChange = (0, _react.useCallback)((0, _debounce.default)(editor => {
    const newVersion = editor.model.document.version;
    if (lastDocumentVersionRef.current === newVersion) {
      return;
    }
    lastDocumentVersionRef.current = newVersion;
    const editorContent = editor.getData();
    const highlightedContent = highlightText(editorContent);
    if (editorContent !== highlightedContent && highlightedContent !== lastHighlightedContentRef.current) {
      lastHighlightedContentRef.current = highlightedContent;

      // Save the current selection
      const selection = editor.model.document.selection;
      const ranges = Array.from(selection.getRanges()).map(range => editor.model.createRange(editor.model.createPositionAt(range.start.parent, range.start.offset), editor.model.createPositionAt(range.end.parent, range.end.offset)));

      // Update the model without resetting the content
      editor.model.change(writer => {
        const root = editor.model.document.getRoot();
        const viewFragment = editor.data.processor.toView(highlightedContent);
        const modelFragment = editor.data.toModel(viewFragment);

        // Clear existing content
        writer.remove(writer.createRange(writer.createPositionAt(root, 0), writer.createPositionAt(root, root.childCount)));

        // Insert new content
        writer.insert(modelFragment, root, 0);

        // Restore the selection
        writer.setSelection(ranges);
      });
    }
  }, 800), []);

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

  (0, _react.useEffect)(() => {
    let matchCount = 0;
    const interval = setInterval(() => {
      if (selectedTemplateOptions && patientData && viewerStudy?.length > 0 && patientData?.institution_name?.trim() !== '') {
        clearInterval(interval); // Stop checking once data is available
        // Ensure selectedTemplateOptions is an array before mapping
        const hasDefaultTemplate = Array.isArray(selectedTemplateOptions) && selectedTemplateOptions.some(option => option.label === "Default Template");
        const templates = patientReportDetail?.reportdetails && hasDefaultTemplate ? [] : Array.isArray(selectedTemplateOptions) ? selectedTemplateOptions.map(data => data.template) : [];

        // Function to replace the table in templates[0] with institutionDemographics
        const replaceDemographicsTable = (templateStr, newTable) => {
          if (newTable && newTable?.trim()) {
            // Replace first table in template with newTable
            return templateStr.replace(/<table[^>]*>[\s\S]*?<\/table>/, newTable?.trim());
          } else {
            // No replacement needed, return original
            return templateStr;
          }
        };

        // Ensure templates is an array before calling Object.values
        const data = templates.length ? Object.values(templates).join("<p></p>") : "";
        const notApproved = (patientReportDetail?.document_status === "Approved" || patientReportDetail?.document_status === "Addendum" || patientReportDetail?.document_status === "Final") && data.length !== 0 ? "" : data;
        const templateData1 = data.replace(/<table style="border-collapse: collapse; width: 100%;" border="1"[\s\S]*?<\/table>/g, match => {
          matchCount++;
          return matchCount > 1 ? "" : match; // Remove only the second occurrence of the table
        });
        const updatedTemplatesTable = replaceDemographicsTable(templateData1, institutionDemographics);
        const institutionNameFromStorage = viewerStudy[0]?.MainDicomTags?.InstitutionName;
        const patientReportDetail1 = patientReportDetail?.reportdetails ? Object.values(patientReportDetail?.reportdetails).join("") : "";
        const temaplateDataReport = patientReportDetail1 + notApproved;
        const patientTemaplateDataReport = temaplateDataReport.replace(/<table style="border-collapse: collapse; width: 100%;" border="1"[\s\S]*?<\/table>/g, match => {
          matchCount++;
          return matchCount > 1 ? "" : match;
        });
        if (typeof _handlebars.default !== "undefined") {
          const compiledTemplate = _handlebars.default.compile(patientReportDetail?.reportdetails ? patientTemaplateDataReport : updatedTemplatesTable);
          const templateData = compiledTemplate(patientData);
          const cleanedTemplateData = templateData.replace(/Default Template/g, "");
          let addReportSubmitTime = cleanedTemplateData;
          // Replace "Report Time: None" or "Report Time:" (if empty) with actual time if available
          if (patientData?.report_submit_time) {
            const formattedTime = (0, _moment.default)(patientData.report_submit_time).format(`${reportSetting?.date_format} HH:mm:ss`);
            addReportSubmitTime = cleanedTemplateData.replace(/(<td[^>]*?>.*?Report Time:.*?<\/td>\s*<td[^>]*?>)(.*?)(<\/td>)/g, (match, p1, p2, p3) => {
              // Extract wrapping tags (e.g., <i>, <strong>, etc.)
              const openingTags = (p2.match(/^(<[^>]+>)+/) || [''])[0];
              const closingTags = (p2.match(/(<\/[^>]+>)+$/) || [''])[0];
              return `${p1}${openingTags}${formattedTime}${closingTags}${p3}`;
            });
          }
          const updatedTemplateData = addReportSubmitTime.replace(/(<td[^>]*>\s*<strong>\s*Institution Name:\s*<\/strong>\s*<\/td>\s*<td[^>]*>)(\s*<\/td>)/i, (match, prefix, emptyTd) => {
            return `${prefix}${institutionNameFromStorage}</td>`;
          })?.replace(/(CLINICAL HISTORY)(\s*:?)/gi, (match, p1, p2) => {
            return `<u><strong style="text-transform: uppercase;">${p1}</strong></u>${p2}`;
          })?.replace(/(<td[^>]*>[\s\S]*?Age[\s\S]*?<\/td>\s*<td[^>]*>)([\s\S]*?)(<\/td>)/gi, (match, p1, ageValue, p3) => {
            // console.log('Raw ageValue:', ageValue); // Debug log

            // Apply the same formatting logic as your study.patientAge
            const formattedAge = ageValue && ageValue.trim() !== '0' && ageValue.trim() !== '0Y' ? ageValue.replace(/(\d+)\s*(years?|y)/gi, '$1Y').replace(/(\d+)\s*(months?|m)/gi, '$1M').replace(/(\d+)\s*(days?|d)/gi, '$1D').replace(/\s+/g, ' ').trim().replace(/^(\d+)$/, '$1Y') : '0';

            // console.log('Formatted age:', formattedAge); // Debug log

            return `${p1}${formattedAge}${p3}`;
          })?.replace(/(<td[^>]*?>\s*(?:<[^>]+>)*\s*Study Date:\s*(?:<\/[^>]+>)*\s*<\/td>\s*<td[^>]*?>)([\s\S]*?)(<\/td>)/i, (match, p1, dateHtml, p3) => {
            // Extract plain date text from the HTML inside the cell
            const dateText = dateHtml.replace(/<[^>]*>/g, "").trim();
            const parsedDate = (0, _moment.default)(new Date(dateText));
            if (parsedDate.isValid()) {
              // Replace only the date text inside the original HTML tags
              const newDateHtml = dateHtml.replace(dateText, parsedDate.format(reportSetting?.date_format));
              return `${p1}${newDateHtml}${p3}`;
            }
            return match;
          });
          setEditorData(updatedTemplateData);
          setTemplate(updatedTemplateData);
        } else {
          console.error("Handlebars is not defined");
        }
      }
    }, 500); // Check every 500ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, [selectedTemplateOptions, patientData?.institution_name, patientReportDetail, viewerStudy, institutionDemographics]);
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
      editor.model.change(writer => {
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
  function cleanNode(node, editor) {
    const writer = editor.editing.view;
    if (node.is('element')) {
      // Remove style & class attributes
      node._removeAttribute('style');
      node._removeAttribute('class');

      // Apply only default font size
      // node._setAttribute('style', `font-size: ${reportSetting?.font_size}px;`);
      // Recursively clean children
      for (const child of node.getChildren()) {
        cleanNode(child, editor);
      }
    }
  }
  const editorRef = (0, _react.useRef)(null); // CKEditor instance
  (0, _react.useEffect)(() => {
    let instance;
    const initializeEditor = async () => {
      const editorElement = document.querySelector("#editor");
      const toolbarContainer = document.querySelector("#toolbar-container");
      let lineHeightEditor;
      let editorData01 = null;
      if (!editorElement || !selectedTemplateOptions || !template) return;
      try {
        instance = await window.DecoupledEditor.create(editorElement, {
          fontSize: {
            options: [9, 11, 12, 13, "default", 15, 17, 19, 21],
            supportAllValues: true
          },
          toolbar: {
            items: ["heading", "bold", "italic", "underline", "fontFamily", "fontSize", "fontColor", "fontBackgroundColor", "|", "bulletedList", "numberedList", "insertTable", "|", "undo", "redo", "alignment"]
          },
          heading: {
            options: [{
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph"
            }, {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1"
            }, {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2"
            }, {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3"
            }, {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4"
            }]
          },
          language: "en",
          initialData: '<p style="font-size:12px;"></p>'
        });
        if (toolbarContainer) {
          toolbarContainer.innerHTML = "";
          toolbarContainer.appendChild(instance.ui.view.toolbar.element);
        }
        instance.plugins.get('ClipboardPipeline').on('inputTransformation', (evt, data) => {
          if (!data.content) return;
          const viewFragment = data.content;

          // Traverse through all nodes and remove style/class attributes
          for (const child of viewFragment.getChildren()) {
            cleanNode(child, instance);
          }
        });

        // Set line height & font size
        instance.editing.view.change(writer => {
          const editableRoot = instance.editing.view.document.getRoot();
          writer.setStyle("line-height", (parseFloat(reportSetting?.line_spacing) + 0.2 || 1.5).toString(), editableRoot);
          writer.setStyle("font-size", `${reportSetting?.font_size}px`, editableRoot);
          writer.setStyle('font-family', `${reportSetting?.font_style}`, editableRoot);
        });

        // Set initial data
        let initialData = highlightText(template);
        if (patientReportDetail?.document_status === "Addendum") {
          initialData += `<p> Addendum begin &lt; &gt; Addendum end </p>`;
        }
        instance.setData(initialData);
        if (patientReportDetail?.document_status === "Approved") {
          let imageUrl0 = assignUserDataFind?.attributes?.uploadSignature || "";
          if (imageUrl0.includes("telerappdevattachments.s3.ap-south-1.amazonaws.com")) {
            imageUrl0 = imageUrl0.replace("https://telerappdevattachments.s3.ap-south-1.amazonaws.com/uploads/", "https://d3tx83aj1g4m0j.cloudfront.net/uploads/");
          } else if (imageUrl0.includes("prod-telerapp-attachments.s3.us-east-2.amazonaws.com")) {
            imageUrl0 = imageUrl0.replace("https://prod-telerapp-attachments.s3.us-east-2.amazonaws.com/uploads/", "https://d256o3ycvhwumu.cloudfront.net/uploads/");
          }
          const imageUrl = imageUrl0; // Replace with your actual image URL
          // console.log(imageUrl)
          //const imageUrl = assignUserDataFind?.attributes?.uploadSignature[0]; // Replace with your actual image URL
          instance.model.change(writer => {
            const imageElement = writer.createElement("imageBlock", {
              src: imageUrl,
              alt: "Doctor Signature",
              style: "height:80px;",
              alignment: "left" // key part
            });

            // Insert image at the END of the document
            const root = instance.model.document.getRoot();
            const endPosition = writer.createPositionAt(root, "end");
            instance.model.insertContent(imageElement, endPosition);

            // Build HTML string
            const extraDetailsHTML = `
              <span style="font-size: 11pt !important; font-weight: 600; font-family: Arial;">${doctorInformation?.displayName}</span>
              <span style="font-size: 11pt !important; font-weight: 600; font-family: Arial;"> ${doctorInformation?.qualificationName}</span>
              <span style="font-size: 11pt !important; font-weight: 600; font-family: Arial;">${doctorInformation?.userTitle}</span>
              <span style="font-size: 11pt !important; font-weight: 600; font-family: Arial;"> ${doctorInformation?.registrationNoName}</span>
              <span style="font-size: 11pt !important; font-family: Arial;">${doctorInformation?.disclaimerDetailsName}</span>
              <span style="font-size: 10pt !important; font-family: Arial;">Electronically signed on :- ${formatCustomDateTime(doctorInformation?.formattedTimesName, reportSetting?.date_format)}</span>
            `;
            // Insert formatted text below the image
            const viewFragment = instance.data.processor.toView(extraDetailsHTML);
            const modelFragment = instance.data.toModel(viewFragment);
            const newPosition = writer.createPositionAt(root, "end");
            writer.insert(modelFragment, newPosition);
          });
          // Make editor read-only after inserting the image
          instance.enableReadOnlyMode("approved-mode");
          const editorTable = document?.querySelector(".editor_table");
          if (editorTable) {
            editorTable?.classList?.remove("editor_table");
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
          const modifyData = newData.replace(/class="text-tiny"(.*?)>/g, 'style="font-size:.7em;"$1>').replace(/class="text-small"(.*?)>/g, 'style="font-size:.85em;"$1>').replace(/class="text-big"(.*?)>/g, 'style="font-size:1.4em;"$1>').replace(/class="text-huge"(.*?)>/g, 'style="font-size:1.8em;"$1>').replace(/<table>/g, '<table border="1px;" style="border-collapse: collapse;">').replace(/<img style="height:200px;"/g, '<img style="height:400px;"').replace(/figure"/g, "").replace(/&nbsp;/g, "").replace(/<figure class="table">/g, "").replace(/<\/figure>/g, "").replace(/<p([^>]*)>\s*<\/p>/g, (match, attrs) => {
            // Skip if already contains <br>
            if (/>[\s]*<br\s*\/?>[\s]*<\/p>/.test(match)) {
              return match;
            }
            // Ensure attributes are preserved, and reinsert <br> inside
            return `<p${attrs}><br></p>`;
          });
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
        instance.destroy().catch(err => console.error("Editor destroy error:", err));
      }
    };
  }, [selectedTemplateOptions, template,
  // imageDataUrl,
  patientReportDetail, saveReports, assignUserDataFind, reportSetting
  // editorData1,
  ]);
  (0, _react.useEffect)(() => {
    if (imageDataUrl && editorData1?.editing.view) {
      editorData1?.editing?.view.change(writer => {
        const currentContent = editorData1.getData();
        const newContent = currentContent + `<img class="captured-image" src="${imageDataUrl}" alt="Captured Image" style="height:200px;"/>`;
        editorData1.setData(newContent);
      });
    } else if (saveReports && editorData1?.editing?.view) {
      editorData1?.editing?.view?.change(writer => {
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
  const findDocument = documentUploadDetails && documentUploadDetails?.find(item => item.study_UIDs === studyInstanceUid);
  const MultiValueContainer = props => {
    return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
      text: props.data.label,
      position: `${isNewTab ? "bottom" : "top"}`,
      style: {
        padding: "8px",
        fontWeight: "lighter"
      }
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactSelect.components.MultiValueContainer, props)));
  };

  // see previous report
  const handleSeePreviousReport = () => {
    // setToggleDisplayReportEditor((show: boolean) => !show);
    show({
      content: _PreviousReport.default,
      title: t("Previous Reports"),
      contentProps: {
        show,
        hide,
        previouPatientReports
      }
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: ` z-10 flex h-full w-full flex-col justify-between bg-[#fff] dark:bg-[#333] dark:text-[#d6d6d6] text-black`
    // style={{ height: isNewTab ? '95vh' : '100%' }}
  }, !browserSupportsSpeechRecognition && /*#__PURE__*/_react.default.createElement("div", {
    className: "p-2 text-red-600"
  }, "Browser doesn't support speech recognition."), /*#__PURE__*/_react.default.createElement(_reactToastify.ToastContainer, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: false,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "light"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "my-2 ml-2 flex justify-between"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: " w-[60%]"
  }, /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
    id: "display-set-selector",
    classNamePrefix: "customSelect",
    isMulti: true,
    isClearable: false,
    onChange: onSelectChange,
    options: displayTemplateOptions
    // value={displayTemplateOptions && displayTemplateOptions?.find(ds => ds?.id === selectedTemplateOptions?.id)}
    // value={displayTemplateOptions?.filter(ds => selectedTemplateOptions?.some(st => st.id === ds.id))}
    ,
    value: selectedItems
    // value={displayTemplateOptions[0]}
    ,
    className: "text-white telerapp-select customSelect__wrapper select-css flex flex-1 flex-col css-b62m3t-container",
    placeholder: "Select one template",
    styles: customStyles // Apply custom styles
    ,
    components: {
      MultiValueContainer
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: " flex justify-between items-center pr-2"
  }, previouPatientReports?.length > 0 && previouPatientReports?.some(report => report?.document_status === "Approved") && /*#__PURE__*/_react.default.createElement("div", {
    onClick: handleSeePreviousReport,
    className: "text-primary-main dark:text-[#d6d6d6] dark:hover:text-[#333] rounded p-[6px] hover:bg-[#dedede] flex"
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "See Previous Reports",
    position: "bottom",
    style: {
      padding: "8px",
      fontWeight: "normal"
    }
  }, /*#__PURE__*/_react.default.createElement(_hi.HiClipboardDocumentCheck, {
    className: `text-2xl`
  }))), /*#__PURE__*/_react.default.createElement("div", {
    onClick: handleSaveReportTemaplate,
    className: "text-primary-main dark:text-[#d6d6d6] dark:hover:text-[#333] p-[6px] hover:bg-[#dedede] rounded inline-flex"
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "Save Template",
    position: "left",
    style: {
      padding: "8px",
      fontWeight: "normal"
    }
  }, /*#__PURE__*/_react.default.createElement(_md.MdDataSaverOn, {
    className: ` text-2xl `
  }))), /*#__PURE__*/_react.default.createElement("div", {
    onClick: () => handleAttachment(studyInstanceUid, patientData?.patient_name),
    className: " text-primary-main dark:text-[#d6d6d6] dark:hover:text-[#333] flex items-center p-[6px] hover:bg-[#dedede] rounded inline-flex"
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "See Attachments",
    position: "left",
    style: {
      padding: "8px",
      fontWeight: "normal"
    }
  }, /*#__PURE__*/_react.default.createElement(_io.IoDocumentAttachSharp, {
    className: `text-2xl`
  }))), /*#__PURE__*/_react.default.createElement("div", {
    onClick: () => handleClinicalHistory(studyInstanceUid, patientData?.patientId, patientData?.accession, patientData?.patientName, patientData?.institution_name),
    className: "text-primary-main dark:text-[#d6d6d6] dark:hover:text-[#333] p-[6px] hover:bg-[#dedede] rounded inline-flex"
  }, patientFind?.clinical_history ?
  /*#__PURE__*/
  // <BsFileMedicalFill
  //   className={`${findData[0]?.clinical_history ? 'border-0 text-primary-dark dark:text-primary-light transition-all hover:opacity-70' : ''} text-2xl`}
  //   title="Clinical History"
  // />
  _react.default.createElement(_Tooltip.default, {
    text: "Clinical History",
    position: "left",
    style: {
      padding: "8px",
      fontWeight: "normal"
    }
  }, /*#__PURE__*/_react.default.createElement(_bs.BsFileMedicalFill, {
    className: " text-2xl"
  })) : /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "Clinical History",
    position: "left",
    style: {
      padding: "8px",
      fontWeight: "normal"
    }
  }, /*#__PURE__*/_react.default.createElement(_fa.FaNotesMedical, {
    className: " text-2xl"
  }))
  // <FaNotesMedical className=" text-2xl transition-all hover:opacity-70" title="Add Clinical History" />
  ))), editorData ? /*#__PURE__*/_react.default.createElement("div", {
    className: "h-full overflow-y-auto overflow-hidden "
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: ` ${patientData?.document_status === "Approved" ? " pointer-events-auto" : " pointer-events-auto"}`,
    style: {
      height: '90%'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "toolbar-container",
    className: " px-2"
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "editor",
    className: `${isModelOpen ? "h-[40vh] overflow-y-auto" : `${!toggleDisplayReportEditor ? "h-[100vh]" : "h-full"}`}`
    // style={{height:'40vh',overflowY: 'auto'}}
  }))) : /*#__PURE__*/_react.default.createElement("div", {
    className: "flex h-[615px] !w-full grow flex-col items-center justify-center"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "loader01"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: `flex flex-shrink-0 items-center overflow-x-auto px-2 mb-2 items-center`
  }, /*#__PURE__*/_react.default.createElement("button", {
    id: "mic-container",
    className: "mic-container ml-1 cursor-pointer min-[425px]:ml-2",
    onClick: listening ? stopListening : startListening
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `mic-icon ${listening ? "" : ""}`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${listening ? "pulse-ring" : ""}`
  }), listening ? /*#__PURE__*/_react.default.createElement(_fa.FaMicrophone, {
    className: " text-xl text-white "
  }) : /*#__PURE__*/_react.default.createElement(_fa.FaMicrophoneSlash, {
    className: " text-xl text-white"
  }))), !shouldHideSubmitButton && /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "Submit Report",
    position: "top",
    style: {
      padding: "8px",
      fontWeight: "normal"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleSubmit,
    id: "submit"
    // className="ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
    ,
    className: "box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]",
    disabled: assignUserDetail && isPhysicianOrTechnologist || isApproved ? true : !assignUserDetail && (canEditReport || isQaUser || isSuperAndDeputyAdmin) || assignUserDetail || isSuperAndDeputyAdmin ? false : true
  }, "Submit")), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "Save as Draft",
    position: "top",
    style: {
      padding: "8px",
      fontWeight: "normal"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleDraft,
    id: "draft"
    // className="ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
    ,
    className: "box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]",
    disabled: assignUserDetail && isPhysicianOrTechnologist || isApproved ? true : !assignUserDetail && (canEditReport || isQaUser || isSuperAndDeputyAdmin) || assignUserDetail || isSuperAndDeputyAdmin ? false : true
  }, "Draft")), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => handleClick(studyInstanceUid, patientData?.patient_id, patientData?.patient_accession, patientData?.institution_name, patientData?.studyID),
    id: "critical",
    className: `${!patientFind?.critical ? " text-white" : "bg-critical"} box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]`
    // className={`${
    //   !patientFind?.critical ? " text-white" : "bg-[#63b3ed] text-black"
    // } ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]`}
    ,
    disabled: assignUserDetail && isPhysicianOrTechnologist ? true : !assignUserDetail && (canEditReport || isQaUser || isSuperAndDeputyAdmin) || assignUserDetail || isSuperAndDeputyAdmin ? false : true
  }, "Critical"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => setToggleDisplayReportEditor(false),
    id: "discard",
    className: "box-content inline-flex flex-row items-center justify-center gap-[5px] justify center px-[10px] outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] text-[14px] min-w-[32px] ml-3 px-[5px] sm:text-sm max-[1440px]:ml-2 sm:px-[10px] text-[10px]"
  }, "Discard"), selectedTemplateOptions && selectedTemplateOptions.some(option => option.isCapture) && !isFullEditor && /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "Capture Image",
    position: "top",
    style: {
      padding: "8px",
      fontWeight: "normal"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleCaptureImage,
    id: "captureImage"
    // className="ml-3 px-[5px] text-sm max-[1440px]:ml-2 min-[425px]:px-[10px] min-[425px]:text-[14px]"
    ,
    className: "box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] ml-3 sm:text-sm max-[1440px]:ml-2 text-[10px]"
  }, /*#__PURE__*/_react.default.createElement(_bs.BsCameraFill, {
    className: "text-20px"
  }))), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "Download PDF",
    position: "top",
    style: {
      padding: "8px",
      fontWeight: "normal"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    id: "fileDownload"
    // className="downloadbutton mx-3 max-[320px]:mr-4 px-[5px] text-sm max-[1440px]:mx-2 min-[425px]:px-[10px] min-[425px]:text-[14px]"
    ,
    className: "downloadbutton mx-3 box-content inline-flex flex-row items-center justify-center gap-[5px] justify center outline-none rounded leading-[1.2] font-sans text-center whitespace-nowrap font-semibold bg-primary-main text-white transition duration-300 ease-in-out focus:outline-none hover:opacity-80 active:bg-opacity-50 h-[32px] min-w-[32px] ml-3 sm:text-sm max-[1440px]:ml-2 text-[10px]",
    onClick: handleDownloadPdf
  }, isLoading ? /*#__PURE__*/_react.default.createElement("span", {
    className: "buttonloader"
  }) : /*#__PURE__*/_react.default.createElement("span", {
    className: "flex"
  }, /*#__PURE__*/_react.default.createElement(_fa.FaFileDownload, {
    className: "text-20px"
  }))))));
};
var _default = exports.default = ReportEditor;