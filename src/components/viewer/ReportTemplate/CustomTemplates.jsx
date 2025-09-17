import React, { useEffect, useState } from 'react';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import './ReportTemplate.css';
import Button from '../Button';


const CustomTemplates = ({ templates, setEditorData, dataTemplate, editorData }) => {
  useEffect( () => {
    const editorElement = document.querySelector('#editor1');
    if (!editorElement || !templates) return;
    console.log(window.DecoupledEditor,'DecoupledEditor')
    window.DecoupledEditor.create(editorElement, {
      toolbar: {
        items: [
          'heading',
          '|',
          'alignment',
          'bold',
          'italic',
          'underline',
          'fontFamily',
          'fontSize',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bulletedList',
          'numberedList',
          'insertTable',
          '|',
          'undo',
          'redo',
        ],
      },
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
        ]
      },
      language: 'en',
    })
      .then(editor => {
        const toolbarContainer = document.querySelector('#toolbar-container1');
        if (toolbarContainer) {
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        }

        if (dataTemplate) {
          editor.setData(dataTemplate);
        } else {
          editor.setData(editorData)
        }
        editor.model.document.on('change:data', (event, data) => {
          setEditorData(editor.getData());
        });
      })
      .catch(error => {
        console.error("create custom templates error :- ", error);
      });
  }, [templates]);

  return (
    <>
      <div className="mt-4">
        <div id="toolbar-container1"></div>
        <div
          id="editor1"
          className="bg-white text-black"
        ></div>
      </div>
    </>
  );
};

export default CustomTemplates;
