import React, { useEffect } from 'react';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import './ReportTemplate.css'

const PreviewTemplate = ({ templates, matchedPatientDetail }) => {
  useEffect(() => {
    const editorElement = document.querySelector('#editor01');
    if (!editorElement || !templates) return;
    window.DecoupledEditor.create(editorElement, {

      language: 'en',
    }
)
      .then(editor => {
        editor.setData(templates);
        if (matchedPatientDetail && matchedPatientDetail?.document_status === "Approved") {
          const imageUrl = matchedPatientDetail?.signature; // Replace with your actual image URL
          editor.model.change(writer => {
            const imageElement = writer.createElement('imageBlock', {
              src: imageUrl,
              alt: 'Doctor Signature',
              style: 'height:80px;',
              alignment: 'left'  // key part
            });

            // Insert image at the END of the document
            const root = editor.model.document.getRoot();
            const endPosition = writer.createPositionAt(root, 'end');
            editor.model.insertContent(imageElement, endPosition);

            // Build HTML string
            const extraDetailsHTML = `
              ${matchedPatientDetail?.displayName}
              ${matchedPatientDetail?.qualificationName}
              ${matchedPatientDetail?.registrationNoName}
              ${matchedPatientDetail?.formattedTimesName}
              ${matchedPatientDetail?.disclaimerDetailsName}
            `;
            // Insert formatted text below the image
            const viewFragment = editor.data.processor.toView(extraDetailsHTML);
            const modelFragment = editor.data.toModel(viewFragment);
            const newPosition = writer.createPositionAt(root, 'end');
            writer.insert(modelFragment, newPosition);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [templates]);
  return (
    <>
      <div className="pointer-events-none">
        <div id="toolbar-container"></div>
        <div id="editor01" className='bg-white text-black'></div>
      </div>
    </>
  );
};

export default PreviewTemplate;
