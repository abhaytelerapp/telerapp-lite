let studyData = [];
let patientReportsDetails = [];
let toggleDisplayReportEditor = false;
let isModelOpen = false;
let patientReportDetail = null;
let imageDataUrl = "";
let patientData = null;
let availableReportTemplates = "";
let token = "";
let usersList = [];
let documentUploadDetails = [];
let reportSettingDetails = [];
let selectedTemplateOptions = "";
let editorData = null;
let template = null;
let editorData1 = "";
let concurrentTemplate = template;
let editorInstance;
let username = "";
let reportSetting = "";
let assignUserDataFind = "";
let formattedTime = "";
let clinicalHistory = "";

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const studyInstanceUID = urlParams.get("StudyInstanceUID");

const user = {
  id_token:
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJrMFJTQ0h1SkFjS0VuSU9JelN1a2tSY3NEQUpzTnNmemV1SHUxeURnc3ZJIn0.eyJleHAiOjE3NDA1MTI1NDgsImlhdCI6MTc0MDQ4Mzc0OCwiYXV0aF90aW1lIjoxNzQwNDgwODg5LCJqdGkiOiIxNDI0MTQzOS1iNGJhLTQ5MjUtODYzMy05ODBmZDU2MDI3YTIiLCJpc3MiOiJodHRwczovL2F1dGgudGVsZXJhcHAubmV0L3JlYWxtcy9UZWxlcmFwcCIsImF1ZCI6InRlbGVyYXBwcy1sb2NhbCIsInN1YiI6ImRiNjk2YjNiLTk4YTYtNGY3MS04MWZiLTkwNGVjNWI2Njk1ZSIsInR5cCI6IklEIiwiYXpwIjoidGVsZXJhcHBzLWxvY2FsIiwic2Vzc2lvbl9zdGF0ZSI6IjdlYTJiYjIxLTdhMmUtNDAwYS05Yjk2LTJhZGYzNDA5MTE4ZiIsImF0X2hhc2giOiJTRzBsRTdDX2dac0tKTVVFNXJXSVpnIiwic2lkIjoiN2VhMmJiMjEtN2EyZS00MDBhLTliOTYtMmFkZjM0MDkxMThmIiwicmFkaW9sb2d5R3JvdXAiOiJFdXJhY2FyZSwgR2hhbmEiLCJncm91cEVtYWlsIjpbIi9FdXJhY2FyZSwgR2hhbmEiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm1vYmlsZU51bWJlciI6WyIxMjM2NTQ3ODkwIl0sInRlbXBsYXRlcyI6WyJJTkQtTVItMDEiXSwicGVybWlzc2lvbiI6WyJCb25lIGZyYWN0dXJlIiwiQnJhaW4gU3Ryb2tlIl0sInByZWZlcnJlZF91c2VybmFtZSI6Im1heXVyX3YiLCJnaXZlbl9uYW1lIjoibWF5dXIiLCJ0aXRsZSI6Im1heXVyX3YiLCJncm91cEFFVGl0bGUiOlsiL0V1cmFjYXJlLCBHaGFuYSJdLCJxdWFsaWZpY2F0aW9uIjoiTS5CLkEiLCJ1cGxvYWRTaWduYXR1cmUiOiJodHRwczovL3RlbGVyYXBwZGV2YXR0YWNobWVudHMuczMuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL3VwbG9hZHMvMTczMTA0NDMxODU2OS1pbWFnZS5wbmciLCJncm91cE1vYmlsZU51bWJlciI6WyIvRXVyYWNhcmUsIEdoYW5hIl0sInJlZ2lzdHJhdGlvbk5vIjoiMjEyMSIsImdyb3VwQWRkcmVzcyI6WyIvRXVyYWNhcmUsIEdoYW5hIl0sIm5hbWUiOiJtYXl1ciB2IiwiZ3JvdXBQb3J0TnVtYmVyIjpbIi9FdXJhY2FyZSwgR2hhbmEiXSwiZ3JvdXBJUCI6WyIvRXVyYWNhcmUsIEdoYW5hIl0sImZhbWlseV9uYW1lIjoidiIsImVtYWlsIjoibWF5dXJ2QGdtYWlsLmNvbSIsImdyb3VwUGVybWlzc2lvbiI6WyIvRXVyYWNhcmUsIEdoYW5hIl19.pwSZszSmSxdkWk9ul3PrWuCUf333PyYiWO2JaQbQc9P_ayT0Z1XsCKv6lvgYoLVBypG3Gxc4zNYuEC53un_6-NBbUDpFmklQ6k9lZ0rbhGw3VZAVLnbPr5S-WWIxEroT2GWKgHuGOQCIy9MWOsGKILJbQWcj-J406D_zjhlOkQzB2v8Y6AR9omMEWDIFFgXoOYnn1EgE862qyfAVtkPzkmtfdkgF5WHvnJu1GumokQNV8ZvEXX6ObWHLa6TWy2wiK1ijXS_UXJFtdB2XwCeJLj4IAjcOL28b6Et0YygfGpDajcz9GJD63ELZaFvOW25LNXkPpk8aRG5AtSQVlE1jKg",
  session_state: "7ea2bb21-7a2e-400a-9b96-2adf3409118f",
  access_token:
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJrMFJTQ0h1SkFjS0VuSU9JelN1a2tSY3NEQUpzTnNmemV1SHUxeURnc3ZJIn0.eyJleHAiOjE3NDA2NjQ2OTIsImlhdCI6MTc0MDY2MjM5NiwiYXV0aF90aW1lIjoxNzQwNjI4NjkyLCJqdGkiOiJiNzFmNzEzNS0xZjdiLTRmZjgtYjg5OS05NmNmNzkxOTJiN2QiLCJpc3MiOiJodHRwczovL2F1dGgudGVsZXJhcHAubmV0L3JlYWxtcy9UZWxlcmFwcCIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYnJva2VyIiwiYWNjb3VudCJdLCJzdWIiOiJkYjY5NmIzYi05OGE2LTRmNzEtODFmYi05MDRlYzViNjY5NWUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ0ZWxlcmFwcHMtbG9jYWwiLCJzZXNzaW9uX3N0YXRlIjoiZmE4MTE0YTktOTFlMS00MzQ4LTg3N2MtMzJhYjhiMjlhMmQ1IiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vcXVhbnR1bS50ZWxlcmFwcC5jb20iLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJodHRwOi8vdGVzdC1wcm9kdWN0aW9uLWZyb250ZW5kLnMzLXdlYnNpdGUudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20iLCJodHRwczovL3RlbGVyYXBwLm5ldCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy10ZWxlcmFwcCIsIm9mZmxpbmVfYWNjZXNzIiwic3VwZXItYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYnJva2VyIjp7InJvbGVzIjpbInJlYWQtdG9rZW4iXX0sInRlbGVyYXBwcy1sb2NhbCI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctYXBwbGljYXRpb25zIiwidmlldy1jb25zZW50Iiwidmlldy1ncm91cHMiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsImRlbGV0ZS1hY2NvdW50IiwibWFuYWdlLWNvbnNlbnQiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZmE4MTE0YTktOTFlMS00MzQ4LTg3N2MtMzJhYjhiMjlhMmQ1IiwicmFkaW9sb2d5R3JvdXAiOiJFdXJhY2FyZSwgR2hhbmEiLCJncm91cEVtYWlsIjpbIi9FdXJhY2FyZSwgR2hhbmEiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm1vYmlsZU51bWJlciI6WyIxMjM2NTQ3ODkwIl0sInRlbXBsYXRlcyI6WyJJTkQtTVItMDEiXSwicGVybWlzc2lvbiI6WyJCb25lIGZyYWN0dXJlIiwiQnJhaW4gU3Ryb2tlIl0sInByZWZlcnJlZF91c2VybmFtZSI6Im1heXVyX3YiLCJnaXZlbl9uYW1lIjoibWF5dXIiLCJ0aXRsZSI6Im1heXVyX3YiLCJncm91cEFFVGl0bGUiOlsiL0V1cmFjYXJlLCBHaGFuYSJdLCJxdWFsaWZpY2F0aW9uIjoiTS5CLkEiLCJ1cGxvYWRTaWduYXR1cmUiOiJodHRwczovL3RlbGVyYXBwZGV2YXR0YWNobWVudHMuczMuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL3VwbG9hZHMvMTczMTA0NDMxODU2OS1pbWFnZS5wbmciLCJncm91cE1vYmlsZU51bWJlciI6WyIvRXVyYWNhcmUsIEdoYW5hIl0sInJlZ2lzdHJhdGlvbk5vIjoiMjEyMSIsImdyb3VwQWRkcmVzcyI6WyIvRXVyYWNhcmUsIEdoYW5hIl0sIm5hbWUiOiJtYXl1ciB2IiwiZ3JvdXBQb3J0TnVtYmVyIjpbIi9FdXJhY2FyZSwgR2hhbmEiXSwiZ3JvdXBJUCI6WyIvRXVyYWNhcmUsIEdoYW5hIl0sImZhbWlseV9uYW1lIjoidiIsImVtYWlsIjoibWF5dXJ2QGdtYWlsLmNvbSIsImdyb3VwUGVybWlzc2lvbiI6WyIvRXVyYWNhcmUsIEdoYW5hIl19.iFkuam9cGxewrjVMOot5c0CVwZAFkTCq5kSMRfmEDQJc71m6bAMFOEcuQQecN-65mm0oqjnNHbiALRbhQ_6ktqcBpyhgGpMrKCLdIgvbN8YeX6c35cBRwIfgCrtHHqSCgsa1L8aJO2m2_PyhHdlT9j0XzoeDm63EnzF91Xy510MpCFm55azRYBjbW2jAGapzKso0JG_I-5ZE3CQsimXBcOr89COe50V2czAlBPzYchNZKCZ7_HoT7dRDAwUEIKw5OV2_9rSqj56j0Rzpqq7sA_pyOMjE3h9VyzXjcH2jeY3GeHNeX695yY95kYubo1YpKs67IcAoHcueQd7qI3nGWg",
  refresh_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzYzlkNTViNC05ZGUxLTRhY2QtYWU2Yi1hMjAwMjg4ZmFhODkifQ.eyJleHAiOjE3NDA1MTI1NDQsImlhdCI6MTc0MDQ4Mzc0OCwianRpIjoiODllM2I5ZjQtNGJlNC00NjY1LTkwOWYtODIzYjgxM2E3NDdiIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnRlbGVyYXBwLm5ldC9yZWFsbXMvVGVsZXJhcHAiLCJhdWQiOiJodHRwczovL2F1dGgudGVsZXJhcHAubmV0L3JlYWxtcy9UZWxlcmFwcCIsInN1YiI6ImRiNjk2YjNiLTk4YTYtNGY3MS04MWZiLTkwNGVjNWI2Njk1ZSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJ0ZWxlcmFwcHMtbG9jYWwiLCJzZXNzaW9uX3N0YXRlIjoiN2VhMmJiMjEtN2EyZS00MDBhLTliOTYtMmFkZjM0MDkxMThmIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjdlYTJiYjIxLTdhMmUtNDAwYS05Yjk2LTJhZGYzNDA5MTE4ZiJ9.0dJClQ65nbE8g9G2I2IQvlxtYmBnMRicS5H5EztSeoY",
  token_type: "Bearer",
  cope: "openid profile email",
  profile: {
    auth_time: 1740480889,
    jti: "14241439-b4ba-4925-8633-980fd56027a2",
    sub: "db696b3b-98a6-4f71-81fb-904ec5b6695e",
    typ: "ID",
    azp: "telerapps-local",
    session_state: "7ea2bb21-7a2e-400a-9b96-2adf3409118f",
    sid: "7ea2bb21-7a2e-400a-9b96-2adf3409118f",
    radiologyGroup: "Euracare, Ghana",
    groupEmail: ["/Euracare, Ghana"],
    email_verified: true,
    mobileNumber: ["1236547890"],
    templates: ["IND-MR-01"],
    permission: ["Bone fracture", "Brain Stroke"],
    preferred_username: "mayur_v",
    given_name: "mayur",
    title: "mayur_v",
    groupAETitle: ["/Euracare, Ghana"],
    qualification: "M.B.A",
    uploadSignature:
      "https://telerappdevattachments.s3.ap-south-1.amazonaws.com/uploads/1731044318569-image.png",
    groupMobileNumber: ["/Euracare, Ghana"],
    registrationNo: "2121",
    groupAddress: ["/Euracare, Ghana"],
    name: "mayur v",
    groupPortNumber: ["/Euracare, Ghana"],
    groupIP: ["/Euracare, Ghana"],
    family_name: "v",
    email: "mayurv@gmail.com",
    groupPermission: ["/Euracare, Ghana"],
  },
  expires_at: 1740512549,
};

let users = {
  id: "db696b3b-98a6-4f71-81fb-904ec5b6695e",
  createdTimestamp: 1726662176550,
  username: "mayur_v",
  enabled: true,
  totp: false,
  emailVerified: true,
  firstName: "mayur",
  lastName: "v",
  email: "mayurv@gmail.com",
  attributes: {
    radiologyGroup: ["Euracare, Ghana"],
    qualification: ["M.B.A"],
    uploadSignature: [
      "https://telerappdevattachments.s3.ap-south-1.amazonaws.com/uploads/1731044318569-image.png",
    ],
    mobileNumber: ["1236547890"],
    registrationNo: ["2121"],
    userCountryid: ["0"],
    templates: ["IND-MR-01"],
    permission: ["Bone fracture", "Brain Stroke"],
    title: ["mayur_v"],
    userStateid: ["0"],
    userCityid: ["0"],
  },
  disableableCredentialTypes: [],
  requiredActions: [],
  notBefore: 0,
  access: {
    manageGroupMembership: true,
    view: true,
    mapRoles: true,
    impersonate: true,
    manage: true,
  },
};

usersList.push(users);

const fetchStudyData = async () => {
  const response = await fetch(
    `http://localhost:4000/viewer_study?StudyInstanceUID=${studyInstanceUID}`
  );
  studyData = await response.json();
};

const fetchPatientReports = async () => {
  const response = await fetch(`http://localhost:4000/reports`);
  patientReportsDetails = await response.json();
};

const fetchDefaultReportTemplates = async () => {
  const response = await fetch(`http://localhost:4000/report-templates`);
  availableReportTemplates = await response.json();
};

const userToken = async (accessToken) => {
  const response = await fetch(`http://localhost:4000/user-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accessToken),
  });
  token = await response.json();
};

const fetchPatientReportByStudy = async (studyInstanceUid) => {
  if(studyInstanceUid){
    const response = await fetch(`http://localhost:4000/report-by-study?studyInstanceUid=${studyInstanceUid}`);
    return await response.json();
  }
};

const fetchDocumentUpload = async () => {
  const response = await fetch(`http://localhost:4000/document-upload`);
  documentUploadDetails = await response.json();
};

const fetchReportSetting = async () => {
  const response = await fetch(`http://localhost:4000/reports-setting`);
  reportSettingDetails = await response.json();
};

const generateReportPdf = (reportdetails, patientName, notDownload) => {
  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getMonth() + 1).padStart(
    2,
    "0"
  )}_${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}_${currentDate.getFullYear()}`;
  const fileName = `${patientName}_${formattedDate}.pdf`;

  return fetch(`http://localhost:4000/download-pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ html: reportdetails }),
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // a.download = `${patientName}.pdf`;
      a.download = fileName;
      !notDownload ? document.body.appendChild(a) : null;
      !notDownload ? a.click() : null;
      notDownload ? window.open(url, "_blank") : null;
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => console.error("Error:", error));
};

const createPatientReports = async (
  patientDetail,
  username,
  actionlog,
  institutionName
) => {
  const updatedPatientDetail = {
    ...patientDetail,
    username: username,
    actionlog: actionlog,
    institution_name: institutionName,
  };
  const response = await fetch(`http://localhost:4000/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPatientDetail),
  });
  await fetchPatientReports();
  return response;
};

const updatePatientReports = async (
  id,
  patientDetail,
  username,
  actionlog,
  institutionName
) => {
  const updatedPatientDetail = {
    ...patientDetail,
    username: username,
    actionlog: actionlog,
    institution_name: institutionName
  };
  const response = await fetch(`http://localhost:4000/reports/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPatientDetail),
  });
  await fetchPatientReports();
  return response;
};

const toggleDisplayReportEditorView = () => {
  toggleDisplayReportEditor = !toggleDisplayReportEditor;
  const pages = document.getElementById("pages");
  pages.style.width = toggleDisplayReportEditor ? "75%" : "100%";
  isModelOpen = false;
};

async function fetchPatientData() {
  await fetchStudyData();
  await fetchPatientReports();
  await fetchDefaultReportTemplates();

  // const patient = await patientReportsDetails.find(
  //   (item) => item.study_UIDs === studyData[0]?.MainDicomTags?.StudyInstanceUID
  // );
  const patient = await fetchPatientReportByStudy(studyData[0]?.MainDicomTags?.StudyInstanceUID);
  patientReportDetail = patient;
  const priorityData =
    patientReportsDetails &&
    patientReportsDetails?.find((data) => data.study_UIDs === studyInstanceUID);

  if (Array.isArray(studyData) && studyData.length) {
    const age =
      studyData[0]?.age ||
      studyData[0]?.PatientMainDicomTags?.PatientName?.match(/\d/g)?.join("");
    const [name] = studyData[0]?.PatientMainDicomTags?.PatientName?.split(age);
    let sex;

    if (studyData[0]?.PatientMainDicomTags?.PatientSex?.toLowerCase() === "m") {
      sex = "Male";
    } else {
      sex = "Female";
    }
    const studyDate =
      studyData[0]?.MainDicomTags?.StudyDate &&
      moment(
        studyData[0]?.MainDicomTags?.StudyDate,
        ["YYYYMMDD", "YYYY.MM.DD"],
        true
      ).isValid() &&
      moment(studyData[0]?.MainDicomTags?.StudyDate, [
        "YYYYMMDD",
        "YYYY.MM.DD",
      ]).format("MMM-DD-YYYY");
    const studyTime =
      studyData[0]?.MainDicomTags?.StudyTime &&
      moment(studyData[0]?.MainDicomTags?.StudyTime, [
        "HH",
        "HHmm",
        "HHmmss",
        "HHmmss.SSS",
      ]).isValid() &&
      moment(studyData[0]?.MainDicomTags?.StudyTime, [
        "HH",
        "HHmm",
        "HHmmss",
        "HHmmss.SSS",
      ]).format("hh:mm A");

    if (
      patient?.reportdetails !== null &&
      patient?.reportdetails !== undefined
    ) {
      patientData = patient;
    } else {
      patientData = {
        patient_name: name,
        patient_age: age,
        patient_gender: sex,
        patient_accession: studyData[0]?.MainDicomTags?.AccessionNumber,
        patient_id: studyData[0]?.PatientMainDicomTags?.PatientID,
        patient_modality: studyData[0]?.RequestedTags?.ModalitiesInStudy,
        study: studyData[0]?.MainDicomTags?.StudyDescription,
        study_date: studyDate,
        study_time: studyTime,
        ref_physician: studyData[0]?.MainDicomTags?.ReferringPhysicianName,
        ref_doctor: studyData[0]?.MainDicomTags?.ReferringPhysicianName,
        accession_number: studyData[0]?.MainDicomTags?.AccessionNumber,
        uid: studyData[0]?.MainDicomTags?.StudyInstanceUID,
        studyID: studyData[0]?.ID,
        document_status: priorityData?.document_status,
        priority: priorityData?.study_priority || "Routine",
        institution_name: studyData[0]?.MainDicomTags.InstitutionName,
        study_description: studyData[0]?.MainDicomTags.StudyDescription,
        patient_dob: moment(
          studyData[0]?.PatientMainDicomTags.PatientBirthDate
        ).format("MM/DD/YYYY"),
        clinical_history: priorityData?.clinical_history || "None",
        image_perview: imageDataUrl,
      };
    }
  }
}

async function editor() {
  await fetchDefaultReportTemplates();
  await fetchReportSetting();

  username = user?.profile?.name;

  const loginUserData = usersList?.filter(
    (data) => data.id === user.profile.sub
  );
  const loginUseremplateName = loginUserData
    ?.map((data) => data?.attributes?.templates)
    .flat();

  const templategroupFiltered =
    Array.isArray(availableReportTemplates) &&
    Array.isArray(loginUseremplateName)
      ? availableReportTemplates.filter((data) =>
          loginUseremplateName.some((dat) => dat === data.templategroup)
        )
      : [];

  const loginUserTemplateOption = [
    ...(templategroupFiltered.length > 0 ? templategroupFiltered : []),
    ...(availableReportTemplates.length > 0
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

  // filterData = priorityStudiesFilter.length > 0 ? priorityStudiesFilter : filterStudies;
  const templateOptions =
    loginUseremplateName.includes("Select All") || allTemaplateAccess
      ? availableReportTemplates
      : loginUserTemplateOption;

  // Transforming the data (equivalent to `useState` initialization)
  const displayTemplateOptions = templateOptions.map(
    ({ id, name, templates, isCapture }) => {
      return {
        id,
        label: name,
        value: templates,
        isCapture: isCapture,
      };
    }
  );

  // Populate the select dropdown
  const selectElement = document.getElementById("templateSelect");
  
  function truncateText(text, limit = 20) {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  }

  displayTemplateOptions.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.value;
    opt.textContent = truncateText(option.label, 20);
    selectElement.appendChild(opt);
  });

  // Initialize Tom Select for input-style search
  new TomSelect(selectElement,{
    create: true,
    sortField: {
      field: "text",
      direction: "asc"
    }
  });

  // Select the default template or first option
  const defaultOption =
    templateOptions.find((option) => option.name === "Default Template") ||
    templateOptions[0];

  selectElement.value = defaultOption.templates; // Set the selected value

  // Function to get selected template
  const getSelectedTemplate = () =>
    displayTemplateOptions.find(
      (option) => option.value === selectElement.value
    ) ||
    displayTemplateOptions.find(
      (option) => option.name === "Default Template"
    ) ||
    displayTemplateOptions[0];

  selectedTemplateOptions = getSelectedTemplate();

  renderReport();

  // Listen for changes
  selectElement.addEventListener("change", () => {
    // selectedTemplateOptions = getSelectedTemplate();
    selectedTemplateOptions = displayTemplateOptions.find(
      (option) => option.value === selectElement.value
    );
    renderReport();
  });

  const patientFind =
    patientReportsDetails &&
    patientReportsDetails?.find((item) => item.study_UIDs === studyInstanceUID);
  const assignUserFind = patientFind?.assign?.map((item) => JSON.parse(item));

  const assignUserDetail =
    assignUserFind &&
    assignUserFind?.find(
      (item) => item.assign_name === user?.profile?.preferred_username
    );

  const findAssignUserName = [patientFind?.firstSubmitUser];

  assignUserDataFind = usersList?.find((item) => {
    return findAssignUserName?.includes(item.username);
  });

  const data = reportSettingDetails?.find(
    (item) => item.group_name === studyData[0]?.MainDicomTags?.InstitutionName
  );
  const report = data ? data.group_name : "Default";

  reportSetting =
    reportSettingDetails.length > 0 &&
    reportSettingDetails?.find((item) => item.group_name === report);

  const patientDatas =
    patientReportsDetails &&
    patientReportsDetails?.find((item) => item.study_UIDs === studyInstanceUID);

  const reportSubmit_time =
    patientDatas?.report_submit_time &&
    new Date(patientDatas?.report_submit_time);

  if (reportSubmit_time) {
    formattedTime = `
    ${reportSubmit_time?.toLocaleDateString("en-US", { month: "long" })}
    ${reportSubmit_time?.getDate()},
    ${reportSubmit_time?.getFullYear()}
    ${reportSubmit_time?.getHours()}:${(
      "0" + reportSubmit_time?.getMinutes()
    )?.slice(-2)}:${("0" + reportSubmit_time?.getSeconds())?.slice(-2)} GMT${
      reportSubmit_time?.getTimezoneOffset() > 0 ? "-" : "+"
    }${("0" + Math.abs(reportSubmit_time?.getTimezoneOffset() / 60))?.slice(
      -2
    )}:${("0" + Math.abs(reportSubmit_time?.getTimezoneOffset() % 60)).slice(
      -2
    )}`;
  }

  let lastDocumentVersion = null;
  let lastHighlightedContent = null;
  let debounceTimeout = null;

  function debounce(func, delay) {
    return function (...args) {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => func(...args), delay);
    };
  }

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

  // DecoupledEditor.create(document.querySelector("#editor"))
  //   .then((editor) => {
  //     const toolbarContainer = document.querySelector("#toolbar-container");
  //     toolbarContainer.appendChild(editor.ui.view.toolbar.element);

  //     editor.model.document.on(
  //       "change:data",
  //       debounce(() => handleEditorChange(editor), 800)
  //     );
  //   })
  //   .catch((error) => console.error(error));

  function handleEditorChange(editor) {
    const newVersion = editor.model.document.version;
    if (lastDocumentVersion === newVersion) return;

    lastDocumentVersion = newVersion;
    const editorContent = editor.getData();
    const highlightedContent = highlightText(editorContent);

    if (
      editorContent !== highlightedContent &&
      highlightedContent !== lastHighlightedContent
    ) {
      lastHighlightedContent = highlightedContent;

      // Save selection
      const selection = editor.model.document.selection;
      const ranges = Array.from(selection.getRanges()).map((range) =>
        editor.model.createRange(
          editor.model.createPositionAt(range.start.parent, range.start.offset),
          editor.model.createPositionAt(range.end.parent, range.end.offset)
        )
      );

      // Update the model
      editor.model.change((writer) => {
        const root = editor.model.document.getRoot();
        const viewFragment = editor.data.processor.toView(highlightedContent);
        const modelFragment = editor.data.toModel(viewFragment);

        // Clear and insert new content
        writer.remove(
          writer.createRange(
            writer.createPositionAt(root, 0),
            writer.createPositionAt(root, root.childCount)
          )
        );
        writer.insert(modelFragment, root, 0);

        // Restore selection
        writer.setSelection(ranges);
      });
    }
  }

  function renderReport() {
    if (
      selectedTemplateOptions &&
      selectedTemplateOptions.value &&
      patientData
    ) {
      const institutionNameFromStorage =
        studyData[0]?.MainDicomTags.InstitutionName;

      const templateString = patientReportDetail?.reportdetails
        ? patientReportDetail?.reportdetails
        : selectedTemplateOptions?.value;
      const compiledTemplate = Handlebars.compile(templateString);
      const templateData = compiledTemplate(patientData);

      const updatedTemplateData = templateData.replace(
        /(<td[^>]*>\s*<strong>\s*Institution Name:\s*<\/strong>\s*<\/td>\s*<td[^>]*>)(\s*<\/td>)/i,
        (match, prefix, emptyTd) => {
          return `${prefix}${institutionNameFromStorage}</td>`;
        }
      );

      // document.getElementById("editor").innerHTML = updatedTemplateData;
      editorData = updatedTemplateData;
      template = updatedTemplateData;
      initializeEditor();
    }
  }

  let saveReports = "";
  let lineHeightEditor;

  function initializeEditor() {
    const editorElement = document.querySelector("#editor");
    const toolbarContainer = document.querySelector("#toolbar-container");

    if (!editorElement) {
      console.error("Editor element not found");
      return;
    }

    // Destroy the previous instance if it exists
    if (editorInstance) {
      editorInstance
        .destroy()
        .then(() => {
          editorInstance = null;
          createEditor(editorElement, toolbarContainer); // Recreate after destroying
        })
        .catch((error) => console.error("Error destroying CKEditor:", error));
    } else {
      createEditor(editorElement, toolbarContainer);
    }
  }

  function createEditor(editorElement, toolbarContainer) {
    DecoupledEditor.create(editorElement, {
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
      language: "en",
      initialData: '<p style="font-size:12px;"></p>', // Set default font size for new content,
    })
      .then((editor) => {
        editorInstance = editor; // Store instance globally

        // ✅ FIX: Remove any previous toolbar before adding a new one
        if (toolbarContainer) {
          toolbarContainer.innerHTML = ""; // Clear previous toolbar
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        }

        // Apply custom line-height
        editor.editing.view.change((writer) => {
          const editableRoot = editor.editing.view.document.getRoot();
          writer.setStyle("line-height", lineHeightEditor, editableRoot);
          writer.setStyle("font-size", "12px", editableRoot);
        });

        editor.setData(highlightText(template));

        if (patientReportDetail?.document_status === "Addendum") {
          editor.setData(
            template + `<p> Addendum begin &lt; &gt; Addendum end </p>`
          );
        } else {
          editor.setData(template);
        }

        const editorTable = document?.querySelector('.editor_table');
        // Set editor as read-only if approved
        if (patientReportDetail?.document_status === "Approved") {
          editor.editing.view.document.isReadOnly =
            patientReportDetail?.document_status === "Approved";
          editorTable.classList.remove("editor_table"); // Remove the height class
        }

        // Listen for changes
        editor.model.document.on("change:data", () => {
          let newData = editor.getData();
          handleEditorChange(editor);
          const modifyData = newData
            .replace(
              /class="text-tiny"(.*?)style="([^"]*)"/g,
              `style="font-size:.7em;$2"$1`
            )
            .replace(/class="text-tiny"(.*?)>/g, `style="font-size:.7em;"$1>`)
            .replace(
              /class="text-small"(.*?)style="([^"]*)"/g,
              `style="font-size:.85em;$2"$1`
            )
            .replace(/class="text-small"(.*?)>/g, `style="font-size:.85em;"$1>`)
            .replace(
              /class="text-big"(.*?)style="([^"]*)"/g,
              `style="font-size:1.4em;$2"$1`
            )
            .replace(/class="text-big"(.*?)>/g, `style="font-size:1.4em;"$1>`)
            .replace(
              /class="text-huge"(.*?)style="([^"]*)"/g,
              `style="font-size:1.8em;$2"$1`
            )
            .replace(/class="text-huge"(.*?)>/g, `style="font-size:1.8em;"$1>`)
            .replace(
              /<table>/g,
              '<table border="1px;" style="border-collapse: collapse;">'
            )
            .replace(
              /<img style="height:200px;"/g,
              '<img style="height:400px;"'
            )
            .replace(/&nbsp;/g, "");

          editorData = modifyData;
        });

        editorData1 = editor;

        if (imageDataUrl && editorData1?.editing.view) {
          editorData1.editing.view.change((writer) => {
            const currentContent = editorData1.getData();
            const newContent =
              currentContent +
              `<img class="captured-image" src="${imageDataUrl}" alt="Captured Image" style="height:200px;"/>`;
            editorData1.setData(newContent);
          });
        } else if (saveReports && editorData1?.editing?.view) {
          editorData1.editing.view.change((writer) => {
            // const newContent = template + saveReports;
            const newContent = concurrentTemplate + saveReports;
            localStorage.setItem("test_transcript", newContent);
            editorData1.setData(newContent);
          });
        } else {
          if (editorData1?.setData) {
            editorData1?.setData(template);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const findDocumentName = (name) => {
  const pattern = /\d+-([^/]+)$/;
  // const pattern = /\/(\d+-([\w-]+\.pdf))$/;

  const match = name.match(pattern);

  if (match) {
    return match[1].replaceAll("-", " ");
  } else {
    console.log("Pattern not found in the URL.");
  }
};

const transformUrl = (url) => {
  if (url.includes("prod-telerapp-attachments.s3.us-east-2.amazonaws.com")) {
    return url.replace(
      "https://prod-telerapp-attachments.s3.us-east-2.amazonaws.com",
      "https://documents.telerapp.com"
    );
  }
  return url;
};

function openModal() {
  document.getElementById("attachmentModal").style.display = "flex";
  document.getElementById("patientName").innerText =
    "Patient: " + patientData?.patient_name;
  const findHistory = documentUploadDetails?.find(
    (item) => item.study_UIDs === studyInstanceUID
  )?.document_url;
  const attachment = findHistory?.map((attachemnt) => JSON.parse(attachemnt));

  const documentList = document.getElementById("documentList");
  documentList.innerHTML = ""; // Clear previous entries

  attachment.forEach((file, index) => {
    const row = document.createElement("tr");

    // Document Name
    const nameCell = document.createElement("td");
    nameCell.textContent = findDocumentName(file.attachment) || "Unknown";
    row.appendChild(nameCell);

    // Preview Link
    const previewCell = document.createElement("td");
    const previewButton = document.createElement("button"); // Use button instead of anchor tag
    previewButton.textContent = "Preview";
    previewButton.onclick = () =>
      openPreview({ previewUrl: transformUrl(file.attachment) }); // Call openPreview function with URL
    previewCell.appendChild(previewButton);
    row.appendChild(previewCell);

    // Remove Button
    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => {
      removeAttchmant(attachment, file.attachment);
    };
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);

    documentList.appendChild(row);
  });
}

async function removeAttchmant(attachment, url) {
  const updateDocumnet = attachment?.filter((item) => item.attachment !== url);
  const data = documentUploadDetails?.find(
    (item) => item.study_UIDs === studyInstanceUID
  );

  const pattern = /\d+-([^/]+)$/;
  // const pattern = /\/(\d+-([\w-]+\.pdf))$/;

  const removeDocumentName = url.match(pattern);

  const resData = {
    ...data,
    updateData:
      updateDocumnet && updateDocumnet?.length > 0 ? updateDocumnet : null,
    removeDocument: removeDocumentName[0].replaceAll("/", ""),
  };
  await deleteDocumentUrl(data.id, resData);
}

async function uploadDocument() {
  const data = documentUploadDetails?.find(
    (item) => item.study_UIDs === studyInstanceUID
  );

  let fileInput = document.getElementById("fileInput");
  if (fileInput.files.length === 0) {
    alert("Please select a file to upload.");
    return;
  }

  let attachmentData = fileInput.files[0];

  if (!data) {
    await createDocument(studyInstanceUID, attachmentData);
  } else {
    await updateDocument(data.id, attachmentData);
  }
}

function openClinicalModel() {
  document.getElementById("clinicalHistoryModal").style.display = "flex";
  document.getElementById("patientNameDisplay").innerText =
    "Patient: " + patientData?.patient_name;

  const findHistory = patientReportsDetails.find(
    (item) => item.study_UIDs === studyInstanceUID
  );
  clinicalHistory = findHistory?.clinical_history;

  const patientNameDisplay = document.getElementById("patientNameDisplay");
  const clinicalHistoryField = document.getElementById("clinicalHistory");
  const saveButton = document.querySelector("#handleClinicalHistoryChange");

  clinicalHistoryField.value = clinicalHistory;
  saveButton.innerText = clinicalHistory ? "Update" : "Save";
}

function handleClinicalHistoryChange() {
  const clinicalHistoryField = document.getElementById("clinicalHistory");
  const data = patientReportsDetails?.find(
    (item) => item.study_UIDs === studyInstanceUID
  );
  const actionlog = "HistoryLogs";

  if (!data) {
    const newData = {
      clinical_history: clinicalHistoryField.value,
      study_UIDs: studyInstanceUID,
      radiologyGroup: user?.profile?.radiologyGroup,
      patient_id: patientData?.patientId,
      patient_accession: patientData?.patient_accession,
    };
    createPatientReports(
      newData,
      username,
      actionlog,
      patientData?.institution_name
    );
  } else {
    const resData = {
      ...data,
      clinical_history: clinicalHistoryField.value,
      radiologyGroup: user?.profile?.radiologyGroup,
    };
    updatePatientReports(
      data.id,
      resData,
      username,
      actionlog,
      patientData?.institution_name
    );
  }
  clinicalHistory = clinicalHistoryField.value;
  document.getElementById("clinicalHistoryModal").style.display = "none";
}

const submitReport = () => {
  const handleConfirmation = () => {
    const oldData =
      patientReportsDetails &&
      patientReportsDetails?.find(
        (item) => item.study_UIDs === studyInstanceUID
      );
    const currentTime = new Date();

    const actionlog = "SubmitLogs";

    const resData = {
      ...patientData,
      reportdetails: editorData,
      study_UIDs: studyInstanceUID,
      study_IDS: studyData[0]?.ID,
      study_priority: patientReportDetail?.study_priority || "Routine",
      isDrafted: false,
      document_status: "Final",
      report_submit_time: currentTime,
      // assign: assignUserDetail !== undefined ? [assignUserDetail] : null,
      firstSubmitUser:
        oldData?.firstSubmitUser === null &&
        user?.profile?.roleType?.includes("Radiologist")
          ? user?.profile?.preferred_username
          : oldData?.firstSubmitUser,
      radiologyGroup: user?.profile?.radiologyGroup,
      created_by: user?.profile?.preferred_username,
    };

    if (!oldData) {
      createPatientReports(
        resData,
        username,
        actionlog,
        patientData?.institution_name
      ).then((res) => {
        if (res.status === 200) {
          // toastr.success("Your report has been successfully submitted");
        }
      });
    } else {
      updatePatientReports(
        oldData.id,
        resData,
        username,
        actionlog,
        patientData?.institution_name
      ).then((res) => {
        if (res.status === 200) {
          // toastr.success("Your report has been successfully updated");
        }
      });
    }
  };
  // SweetAlert Confirmation
  Swal.fire({
    text: "Are you certain you want to submit the report?",
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

const draftReport = () => {
  const oldData =
    patientReportsDetails &&
    patientReportsDetails?.find((item) => item.study_UIDs === studyInstanceUID);
  const actionlog = "DraftLogs";

  const resData = {
    ...patientData,
    reportdetails: editorData,
    study_UIDs: studyInstanceUID,
    study_IDS: studyData[0]?.ID,
    study_priority: patientReportDetail?.study_priority || null,
    isDrafted: true,
    document_status: "Read",
    // assign: assignUserDetail !== undefined ? [assignUserDetail] : null,
    radiologyGroup: user?.profile?.radiologyGroup,
    created_by: user?.profile?.preferred_username,
  };

  if (!oldData) {
    createPatientReports(
      resData,
      username,
      actionlog,
      patientData?.institution_name
    ).then((res) => {
      if (res.status === 200) {
        // toastr.success("Your report was saved as draft successfully");
      }
    });
  } else {
    updatePatientReports(
      oldData.id,
      resData,
      username,
      actionlog,
      patientData?.institution_name
    ).then((res) => {
      if (res.status === 200) {
        // toastr.success("Your report has been successfully updated");
      }
    });
  }
};

const handlerCriticalToggle = () => {
  const data = patientReportsDetails?.find(
    (item) => item.study_UIDs === studyInstanceUID
  );
  const criticalBtn = document.getElementById('criticalBtn');
  const isCritical = data ? !data.critical : true;
  if (isCritical) {
    criticalBtn.style.backgroundColor = '#63b3ed';
  } else {
    criticalBtn.style.backgroundColor = '#404048';
  } 
  console.log("isCritical :- ", isCritical);
  
  const actionlog = "CriticalLogs";

  if (!data) {
    const newData = {
      study_UIDs: studyInstanceUID,
      study_IDS: patientData?.studyID,
      critical: isCritical,
      patient_id: patientData?.patient_id,
      institution_name: patientData?.institution_name,
      patient_accession: patientData?.patient_accession,
    };
    createPatientReports(
      newData,
      username,
      actionlog,
      patientData?.institution_name
    );
  } else {
    const updatedData = {
      ...data,
      critical: isCritical,
    };
    updatePatientReports(
      data.id,
      updatedData,
      username,
      actionlog,
      patientData?.institution_name
    );
  }
};

const handleCaptureImage = async () => {
  const dicomCanvas = document.querySelector(".DicomCanvas");

  if (!dicomCanvas) {
    alert("DICOM Canvas not found!");
    return;
  }

  const quality = 0.7;
  const captureImageDataUrl = dicomCanvas.toDataURL("image/jpeg", quality);
  imageDataUrl = captureImageDataUrl;
  editor();
};

const downloadPDF = async () => {
  try {
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

    // Doctore details footer
    const firstName = assignUserDataFind
      ? `${assignUserDataFind?.firstName} ${assignUserDataFind?.lastName}`
      : "";
    const qualification =
      assignUserDataFind?.attributes.qualification !== undefined
        ? assignUserDataFind?.attributes.qualification
        : "";
    const registrationNo =
      assignUserDataFind &&
      assignUserDataFind?.attributes &&
      assignUserDataFind?.attributes.registrationNo
        ? assignUserDataFind.attributes.registrationNo
        : "";
    const formattedTimes = formattedTime === undefined ? "" : formattedTime;
    const disclaimerDetails =
      reportSetting && reportSetting.disclaimer_details
        ? reportSetting.disclaimer_details
        : "";
    const displayName = firstName ? `<strong>${firstName}</strong><br/>` : "";
    const qualificationName = qualification
      ? `<strong>${qualification}</strong><br/>`
      : "";
    const registrationNoName = registrationNo
      ? `<strong>Reg.No. :- ${registrationNo}</strong><br/>`
      : "";
    const formattedTimesName = formattedTimes
      ? `<strong>${formattedTimes}</strong><br/>`
      : "";
    const disclaimerDetailsName = disclaimerDetails
      ? `<strong>Disclaimer :-</strong> ${disclaimerDetails}`
      : "";

    const output = `
    <div style="line-height: 1.2;">
        ${displayName}
        ${qualificationName}
        ${registrationNoName}
        ${formattedTimesName}
        ${disclaimerDetailsName}
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
    generateReportPdf(modifiedEditor, patientData?.patient_name);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};

// getByid("listing").onclick = function () {
//   window.SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;

//   if (!window.SpeechRecognition) {
//     alert(
//       "Your browser does not support Speech Recognition. Try using Google Chrome."
//     );
//   } else {
//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.continuous = true;
//     recognition.interimResults = true;

//     let isListening = false;
//     const micBtn = document.getElementById("mic-btn");
//     const output = document.getElementById("output");

//     recognition.onresult = function (event) {
//       let transcript = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         transcript += event.results[i][0].transcript;
//       }
//       output.innerText = transcript;
//     };

//     micBtn.addEventListener("click", () => {
//       if (isListening) {
//         recognition.stop();
//         micBtn.classList.remove("active");
//         micBtn.innerText = "🎤 Start";
//       } else {
//         recognition.start();
//         micBtn.classList.add("active");
//         micBtn.innerText = "🛑 Stop";
//       }
//       isListening = !isListening;
//     });

//     recognition.onend = function () {
//       if (isListening) {
//         recognition.start(); // Auto-restart if still active
//       }
//     };
//   }
// };

(async () => {
  const data = {
    token: user.access_token,
  };
  await userToken(data);
  await fetchDocumentUpload();
  await fetchPatientData();
  editor();
})();
