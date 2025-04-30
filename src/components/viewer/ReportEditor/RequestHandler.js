export const userToken = async (accessToken, apiData) => {
  const response = await fetch(`${apiData}/user-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accessToken),
  });
  const data = await response.json();
  return data;
};

export const fetchUsers = async (accessTokens, keycloak_url) => {
  return await fetch(`${keycloak_url}/users?max=-1`, {
    headers: {
      Authorization: `Bearer ${accessTokens}`,
    },
  }).then((response) => response.json());
};

export const fetchViewerStudy = async (StudyInstanceUID, apiData) => {
  return await fetch(
    `${apiData}/viewer_study?StudyInstanceUID=${StudyInstanceUID}`
  ).then((response) => response.json());
};

export const fetchStudyData = async (studyInstanceUID, apiData) => {
  if (studyInstanceUID) {
    const response = await fetch(
      `${apiData}/viewer_study?StudyInstanceUID=${studyInstanceUID}`
    );
    return response.json();
  }
};

export const fetchPatientReportByStudy = (studyInstanceUid, apiData) => {
  return fetch(
    `${apiData}/report-by-study?studyInstanceUid=${studyInstanceUid}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch patient report");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching report:", error);
      return null; // Return null to handle cases where no report is found
    });
};

export const fetchDefaultReportTemplates = (apiData) => {
  return fetch(`${apiData}/report-templates`).then((response) =>
    response.json()
  );
};

export const fetchPatientReports = (apiData) => {
  return fetch(`${apiData}/reports`).then((response) => response.json());
};

export const fetchReportSetting = (apiData) => {
  return fetch(`${apiData}/reports-setting`).then((response) =>
    response.json()
  );
};

export const fetchDocumentUpload = (apiData) => {
    return fetch(`${apiData}/document-upload`).then(response =>
        response.json()
    );
};

export const createDefaultTemplates = async (templatesDetail, apiData) => {
  const response = await fetch(`${apiData}/templates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(templatesDetail),
  })
  return response
}

export const createPatientReports = async (apiData, patientDetail, setPatientReportsDetails, username, actionlog, institutionName, patientReportsDetails) => {
  const updatedPatientDetail = {
    ...patientDetail,
    username: username,
    actionlog: actionlog,
    institutionName: institutionName
  };
  const response = await fetch(`${apiData}/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPatientDetail),
  });
  const data = await response.json()
  const dataID = data.id;
  
  await fetchPatientReportsById(dataID, apiData)
    .then((data) => setPatientReportsDetails([...patientReportsDetails, data]))
    .catch((error) =>
      console.error('Error fetching patient details:', error)
    );
  return response
};

export const updatePatientReports = async (apiData, id, patientDetail, setPatientReportsDetails, username, actionlog, institutionName, patientReportsDetails) => {
const updatedReports = patientReportsDetails && patientReportsDetails.filter(report => report.id !== id);

  const updatedPatientDetail = {
    ...patientDetail,
    username: username,
    actionlog: actionlog,
    institutionName: institutionName
  };
  const response = await fetch(`${apiData}/reports/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPatientDetail),
  });

  await fetchPatientReportsById(id, apiData)
    .then((data) => setPatientReportsDetails([...updatedReports, data]))
    .catch((error) =>
      console.error('Error fetching patient details:', error)
    );

  return response
};

export const fetchPatientReportsById = async (id, apiData) => {
  return fetch(`${apiData}/reportsById/${id}`)
    .then((response) => response.json())
};

export const generateReportPdf = (apiData, reportdetails, setIsLoading, patientName, notDownload) => {

  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}_${String(currentDate.getDate()).padStart(2, '0')}_${currentDate.getFullYear()}`;
  const fileName = `${patientName}_${formattedDate}.pdf`;

  return fetch(`${apiData}/download-pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ html: reportdetails })
  })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // a.download = `${patientName}.pdf`;
      a.download = fileName;
      !notDownload ? document.body.appendChild(a) : null;
      !notDownload ? a.click() : null;
      notDownload ? window.open(url, '_blank') : null;
      window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error:', error))
    .finally(() => {
      setIsLoading(false);
    });
};