"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userToken = exports.updatePatientReports = exports.updateOrthancStudy = exports.updateDocument = exports.generateReportPdf = exports.genAiRadiologyReporter = exports.fetchViewerStudy = exports.fetchUsers = exports.fetchStudyData = exports.fetchReportTemplatesWithInstitution = exports.fetchReportSetting = exports.fetchPatientReportsById = exports.fetchPatientReports = exports.fetchPatientReportByStudy = exports.fetchInstitutionPromptAccess = exports.fetchEditorPatientReportData = exports.fetchDocumentUploadForStudy = exports.fetchDocumentUpload = exports.fetchDefaultReportTemplates = exports.deleteDocumentUrl = exports.createPatientReports = exports.createDocument = exports.createDefaultTemplates = void 0;
const userToken = async (accessToken, apiData) => {
  const response = await fetch(`${apiData}/user-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(accessToken)
  });
  const data = await response.json();
  return data;
};
exports.userToken = userToken;
const fetchUsers = async (accessTokens, keycloak_url) => {
  return await fetch(`${keycloak_url}/users?max=-1`, {
    headers: {
      Authorization: `Bearer ${accessTokens}`
    }
  }).then(response => response.json());
};
exports.fetchUsers = fetchUsers;
const fetchViewerStudy = async (StudyInstanceUID, apiData) => {
  return await fetch(`${apiData}/viewer_study?StudyInstanceUID=${StudyInstanceUID}`).then(response => response.json());
};
exports.fetchViewerStudy = fetchViewerStudy;
const fetchStudyData = async (studyInstanceUID, apiData) => {
  if (studyInstanceUID) {
    const response = await fetch(`${apiData}/viewer_study?StudyInstanceUID=${studyInstanceUID}`);
    return response.json();
  }
};
exports.fetchStudyData = fetchStudyData;
const fetchPatientReportByStudy = (studyInstanceUid, apiData) => {
  return fetch(`${apiData}/report-by-study?studyInstanceUid=${studyInstanceUid}`).then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch patient report");
    }
    return response.json();
  }).catch(error => {
    console.error("Error fetching report:", error);
    return null; // Return null to handle cases where no report is found
  });
};
exports.fetchPatientReportByStudy = fetchPatientReportByStudy;
const fetchDefaultReportTemplates = apiData => {
  return fetch(`${apiData}/report-templates`).then(response => response.json());
};
exports.fetchDefaultReportTemplates = fetchDefaultReportTemplates;
const fetchPatientReports = apiData => {
  return fetch(`${apiData}/reports`).then(response => response.json());
};
exports.fetchPatientReports = fetchPatientReports;
const fetchReportSetting = (apiData, groupName) => {
  return fetch(`${apiData}/reports-setting-by-study?groupName=${groupName}`).then(response => response.json());
};
exports.fetchReportSetting = fetchReportSetting;
const fetchDocumentUpload = apiData => {
  return fetch(`${apiData}/document-upload`).then(response => response.json());
};
exports.fetchDocumentUpload = fetchDocumentUpload;
const createDefaultTemplates = async (templatesDetail, apiData) => {
  const response = await fetch(`${apiData}/templates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(templatesDetail)
  });
  return response;
};
exports.createDefaultTemplates = createDefaultTemplates;
const createPatientReports = async (apiData, patientDetail, setReportData, username, actionlog, institutionName) => {
  const updatedPatientDetail = {
    ...patientDetail,
    username: username,
    actionlog: actionlog,
    institutionName: institutionName
  };
  const response = await fetch(`${apiData}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedPatientDetail)
  });
  const data = await response.json();
  setReportData(data);

  // await fetchPatientReportsById(dataID, apiData)
  //   .then((data) => setPatientReportsDetails([...patientReportsDetails, data]))
  //   .catch((error) =>
  //     console.error('Error fetching patient details:', error)
  //   );
  return response;
};
exports.createPatientReports = createPatientReports;
const updatePatientReports = async (apiData, id, patientDetail, setReportData, username, actionlog, institutionName, patientReportsDetails) => {
  // const updatedReports = patientReportsDetails && patientReportsDetails.filter(report => report.id !== id);

  const updatedPatientDetail = {
    ...patientDetail,
    username: username,
    actionlog: actionlog,
    institutionName: institutionName
  };
  const response = await fetch(`${apiData}/reports/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedPatientDetail)
  });

  // const data = await response.json();
  // setReportData(data);

  // await fetchPatientReportsById(id, apiData)
  //   .then((data) => setPatientReportsDetails([...updatedReports, data]))
  //   .catch((error) =>
  //     console.error('Error fetching patient details:', error)
  //   );

  return response;
};
exports.updatePatientReports = updatePatientReports;
const fetchPatientReportsById = async (id, apiData) => {
  return fetch(`${apiData}/reportsById/${id}`).then(response => response.json());
};
exports.fetchPatientReportsById = fetchPatientReportsById;
const generateReportPdf = (apiData, reportdetails, setIsLoading, patientName, notDownload, reportSetting) => {
  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getMonth() + 1).padStart(2, "0")}_${String(currentDate.getDate()).padStart(2, "0")}_${currentDate.getFullYear()}`;
  const fileName = `${patientName}_${formattedDate}.pdf`;
  return fetch(`${apiData}/download-pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      html: reportdetails,
      reportSetting
    })
  }).then(response => response.blob()).then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    // a.download = `${patientName}.pdf`;
    a.download = fileName;
    !notDownload ? document.body.appendChild(a) : null;
    !notDownload ? a.click() : null;
    notDownload ? window.open(url, "_blank") : null;
    window.URL.revokeObjectURL(url);
  }).catch(error => console.error("Error:", error)).finally(() => {
    setIsLoading(false);
  });
};
exports.generateReportPdf = generateReportPdf;
const fetchDocumentUploadForStudy = async (apiData, studyInstanceUid) => {
  try {
    const data = await fetchDocumentUpload(apiData, studyInstanceUid);
    return data;
  } catch (error) {
    console.error("Error fetching document upload details:", error);
    throw error; // Optional: re-throw if you want the caller to handle it
  }
};
exports.fetchDocumentUploadForStudy = fetchDocumentUploadForStudy;
const createDocument = async (apiData, studyInstanceUid, attachmentData, setDocumentUploadDetails, documentUploadDetails) => {
  const formData = new FormData();
  formData.append("study_UIDs", studyInstanceUid);
  formData.append("attachment", attachmentData);
  try {
    const response = await fetch(`${apiData}/document-upload`, {
      method: "POST",
      body: formData
    });
    if (!response.ok) {
      throw new Error(`Failed to create document: ${response.statusText}`);
    }
    const data = await response.json();
    await fetchDocumentUpload(apiData, studyInstanceUid).then(data => setDocumentUploadDetails([...documentUploadDetails, data])).catch(error => console.error("Error fetching document upload details:", error));
    return data;
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};
exports.createDocument = createDocument;
const updateDocument = async (apiData, id, attachmentData, setDocumentUploadDetails, documentUploadDetails) => {
  const documentData = documentUploadDetails && documentUploadDetails.filter(data => data.id !== id);
  const formData = new FormData();
  formData.append("attachment", attachmentData);
  try {
    const response = await fetch(`${apiData}/document-upload/${id}`, {
      method: "PUT",
      body: formData
    });
    if (!response.ok) {
      throw new Error(`Failed to create document: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data, "data");
    await fetchDocumentUpload(apiData, data.study_UIDs).then(data => setDocumentUploadDetails([...documentData, data])).catch(error => console.error("Error fetching document upload details:", error));
    return data;
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};
exports.updateDocument = updateDocument;
const deleteDocumentUrl = async (apiData, id, updateData, setDocumentUploadDetails, documentUploadDetails) => {
  const documentData = documentUploadDetails && documentUploadDetails.filter(data => data.id !== id);
  try {
    const response = await fetch(`${apiData}/document-upload-url/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });
    if (!response.ok) {
      throw new Error(`Failed to create document: ${response.statusText}`);
    }
    const data = await response.json();
    await fetchDocumentUpload(apiData, data.study_UIDs).then(data => setDocumentUploadDetails([...documentData, data])).catch(error => console.error("Error fetching document upload details:", error));
    return data;
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};
exports.deleteDocumentUrl = deleteDocumentUrl;
const fetchEditorPatientReportData = (apiData, studyInstanceUid) => {
  return fetch(`${apiData}/editor_patientData?StudyInstanceUID=${studyInstanceUid}`).then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch patient report");
    }
    return response.json();
  }).catch(error => {
    console.error("Error fetching report:", error);
    return null; // Return null to handle cases where no report is found
  });
};
exports.fetchEditorPatientReportData = fetchEditorPatientReportData;
const fetchInstitutionPromptAccess = async (institution, apiData) => {
  const response = await fetch(`${apiData}/institution-access/${institution}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await response.json();
};
exports.fetchInstitutionPromptAccess = fetchInstitutionPromptAccess;
const genAiRadiologyReporter = async (apiData, data) => {
  const response = await fetch(`${apiData}/generate-ai-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return await response.json();
};
exports.genAiRadiologyReporter = genAiRadiologyReporter;
const updateOrthancStudy = async (apiData, aianalysis, studyInstanceUid) => {
  const response = await fetch(`${apiData}/orthancStudy/${studyInstanceUid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      aianalysis
    })
  });
  if (!response.ok) {
    throw new Error(`Failed to update data source: ${response.statusText}`);
  }
  return await response.json();
};
exports.updateOrthancStudy = updateOrthancStudy;
const fetchReportTemplatesWithInstitution = (apiData, institution_name) => {
  return fetch(`${apiData}/report_templates_with_institution?institution_name=${institution_name}`).then(response => response.json());
};
exports.fetchReportTemplatesWithInstitution = fetchReportTemplatesWithInstitution;