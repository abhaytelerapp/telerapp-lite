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

export const fetchReportSetting = (apiData, groupName) => {
  return fetch(`${apiData}/reports-setting-by-study?groupName=${groupName}`)
    .then((response) => response.json())
}

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

export const createPatientReports = async (apiData, patientDetail, setReportData, username, actionlog, institutionName) => {
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
  setReportData(data)
  
  // await fetchPatientReportsById(dataID, apiData)
  //   .then((data) => setPatientReportsDetails([...patientReportsDetails, data]))
  //   .catch((error) =>
  //     console.error('Error fetching patient details:', error)
  //   );
  return response
};

export const updatePatientReports = async (apiData, id, patientDetail, setReportData, username, actionlog, institutionName, patientReportsDetails) => {
// const updatedReports = patientReportsDetails && patientReportsDetails.filter(report => report.id !== id);

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

  const data = await response.json()
  setReportData(data)

  // await fetchPatientReportsById(id, apiData)
  //   .then((data) => setPatientReportsDetails([...updatedReports, data]))
  //   .catch((error) =>
  //     console.error('Error fetching patient details:', error)
  //   );

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

export const fetchDocumentUploadForStudy = async (apiData, studyInstanceUid) => {
    try {
        const data = await fetchDocumentUpload(apiData, studyInstanceUid);
        return data;
    } catch (error) {
        console.error('Error fetching document upload details:', error);
        throw error; // Optional: re-throw if you want the caller to handle it
    }
};

export const createDocument = async (
    apiData,
    studyInstanceUid,
    attachmentData,
    setDocumentUploadDetails,
    documentUploadDetails) => {
    const formData = new FormData();
    formData.append('study_UIDs', studyInstanceUid);
    formData.append('attachment', attachmentData);

    try {
        const response = await fetch(`${apiData}/document-upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to create document: ${response.statusText}`);
        }

        const data = await response.json();
        await fetchDocumentUpload(apiData, studyInstanceUid)
            .then(data => setDocumentUploadDetails([...documentUploadDetails, data]))
            .catch(error => console.error('Error fetching document upload details:', error));
        return data;
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
};

export const updateDocument = async (apiData, id, attachmentData, setDocumentUploadDetails, documentUploadDetails) => {

    const documentData = documentUploadDetails && documentUploadDetails.filter(data => data.id !== id)

    const formData = new FormData();
    formData.append('attachment', attachmentData);

    try {
        const response = await fetch(
            `${apiData}/document-upload/${id}`,
            {
                method: 'PUT',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to create document: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data, "data")

        await fetchDocumentUpload(apiData, data.study_UIDs)
            .then(data => setDocumentUploadDetails([...documentData, data]))
            .catch(error => console.error('Error fetching document upload details:', error));
        return data;
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
};

export const deleteDocumentUrl = async (apiData, id, updateData, setDocumentUploadDetails, documentUploadDetails) => {
    const documentData = documentUploadDetails && documentUploadDetails.filter(data => data.id !== id)
    try {
        const response = await fetch(
            `${apiData}/document-upload-url/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            }
        );
        if (!response.ok) {
            throw new Error(`Failed to create document: ${response.statusText}`);
        }

        const data = await response.json();
        await fetchDocumentUpload(apiData, data.study_UIDs)
            .then(data => setDocumentUploadDetails([...documentData, data]))
            .catch(error => console.error('Error fetching document upload details:', error));
        return data;
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
};