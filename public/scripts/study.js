// const createDocument = async (studyInstanceUid, attachmentData) => {
//   const formData = new FormData();
//   formData.append("study_UIDs", studyInstanceUid);
//   formData.append("attachment", attachmentData);

//   try {
//     const response = await fetch(`http://localhost:4000/document-upload`, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to create document: ${response.statusText}`);
//     }

//     const data = await response.json();
//     await fetchDocumentUpload();
//     openModal();
//     return data;
//   } catch (error) {
//     console.error("Error creating document:", error);
//     throw error;
//   }
// };

// const updateDocument = async (id, attachmentData) => {
//   const formData = new FormData();
//   formData.append("attachment", attachmentData);

//   try {
//     const response = await fetch(
//       `http://localhost:4000/document-upload/${id}`,
//       {
//         method: "PUT",
//         body: formData,
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to create document: ${response.statusText}`);
//     }

//     const data = await response.json();
//     await fetchDocumentUpload();
//     openModal();
//     return data;
//   } catch (error) {
//     console.error("Error creating document:", error);
//     throw error;
//   }
// };

// const deleteDocumentUrl = async (id, updateData) => {
//   try {
//     const response = await fetch(
//       `http://localhost:4000/document-upload-url/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updateData),
//       }
//     );
//     if (!response.ok) {
//       throw new Error(`Failed to create document: ${response.statusText}`);
//     }

//     const data = await response.json();
//     await fetchDocumentUpload();
//     openModal();
//     return data;
//   } catch (error) {
//     console.error("Error creating document:", error);
//     throw error;
//   }
// };

// function openPreview(url) {
//   const previewIframe = document.getElementById("previewIframe");
//   const previewPopup = document.getElementById("previewPopup");
//   const popupOverlay = document.getElementById("popupOverlay");

//   fetch(url.previewUrl)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to load document");
//       }
//       return response.blob();
//     })
//     .then((blob) => {
//       const blobUrl = URL.createObjectURL(blob);
//       previewIframe.src = blobUrl;

//       // Show popup
//       previewPopup.style.display = "block";
//       popupOverlay.style.display = "block";
//     })
//     .catch((error) => {
//       alert("Error loading document: " + error.message);
//       console.error(error);
//     });
// }

// function closePreview() {
//   const previewPopup = document.getElementById("previewPopup");
//   const popupOverlay = document.getElementById("popupOverlay");
//   const previewIframe = document.getElementById("previewIframe");

//   // Hide popup
//   previewPopup.style.display = "none";
//   popupOverlay.style.display = "none";

//   // Release memory
//   URL.revokeObjectURL(previewIframe.src);
//   previewIframe.src = "";
// }

// function closeModal() {
//   document.getElementById("attachmentModal").style.display = "none";
// }

// function closeClinicalModal() {
//   document.getElementById("clinicalHistoryModal").style.display = "none";
// }
