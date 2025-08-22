import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import Button from '../Button';
// import SnackbarTypes from '../Snackbar/SnackbarTypes';
import { HiMiniDocumentMinus } from 'react-icons/hi2';
import PreviewPdf from '../PreviewPdf';

const AddAttachmentModel = ({
  hide,
  studyInstanceUid,
  handleAttachmentChange,
  handleAttachmentRemove,
  documentData,
  patientName,
  modelOpen,
  toggleDisplayReportEditor,
  toggleDisplayAiReportEditor
}) => {
  const initialValue = data => {
    return {
      attachment: data?.attachment || '',
    };
  };
  // const { show } = useSnackbar();
  const tableHeaders = {
    documentName: 'Document Name',
    preview: 'Preview',
    remove: 'Remove',
  };

  const keys = (toggleDisplayReportEditor || toggleDisplayAiReportEditor) ? Object.keys(tableHeaders).filter((key) => key !== 'remove') : Object.keys(tableHeaders)
  const values = (toggleDisplayReportEditor || toggleDisplayAiReportEditor) ? Object.values(tableHeaders).filter((key) => key !== 'Remove') : Object.values(tableHeaders)
  const [document, setDocument] = useState(null);

  let findHistory = [];

  findHistory = documentData?.document_url || [];
  const attachment = findHistory?.map(attachemnt => JSON.parse(attachemnt));

  const handlerDocumentUpload = e => {
    setDocument(e.target.files[0]);
  };

  const onsubmit = values => {
    if (document) {
      handleAttachmentChange(studyInstanceUid, document);
    } else {
      // show({
      //   title: 'Error!',
      //   message: 'Failed To Upload Document',
      //   type: SnackbarTypes.ERROR, // Assuming you have a SUCCESS type defined in your SnackbarTypes
      //   position: 'topRight',
      // });
    }

    hide();
  };

  const handlerRemoveDocument = instance => {
    handleAttachmentRemove(attachment, instance, studyInstanceUid);

    hide();
  };

  const findDocumentName = name => {
    const pattern = /\d+-([^/]+)$/;
    // const pattern = /\/(\d+-([\w-]+\.pdf))$/;

    const match = name.match(pattern);

    if (match) {
      return match[1].replaceAll('-', ' ');
    } else {
      console.log('Pattern not found in the URL.');
    }
  };

  const transformUrl = url => {
    if (url.includes('prod-telerapp-attachments.s3.us-east-2.amazonaws.com')) {
      return url.replace(
        'https://prod-telerapp-attachments.s3.us-east-2.amazonaws.com',
        'https://documents.telerapp.com'
      );
    }
    return url;
  };

  const modelShow = (url) => {
    modelOpen({
      content: PreviewPdf,
      title: `Attachment preview`,
      contentProps: { previewUrl: transformUrl(url) },
    })
  }

  return (
    <section className="w-full">
      <Formik
        initialValues={initialValue(findHistory)}
        onSubmit={onsubmit}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form>
            <div className=" flex items-center gap-5">
              <div className=" w-full">
                {patientName && (
                  <p>Patient: {patientName.replace(/,/g, '')}</p>
                )}
                {!(toggleDisplayReportEditor || toggleDisplayAiReportEditor) && <div className=' flex items-center gap-3 mt-1'>
                  <input
                    type="file"
                    onChange={handlerDocumentUpload}
                    className=" border-inputfield-main focus:border-inputfield-focus disabled:border-inputfield-disabled placeholder-inputfield-placeholder w-full appearance-none rounded border bg-black py-2 px-3 text-sm leading-tight text-white shadow transition duration-300 focus:outline-none"
                    name="attachment"
                    accept=".pdf, .png, .jpg, .doc, .docx, .mp4"
                  />
                  <Button className=" px-3">Save</Button>
                </div>}
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {attachment?.length === 0 ? (
        <span className="mt-4 flex justify-center">No Document Exiting</span>
      ) : (
        <table className="container m-auto mt-4 table-auto text-white">
          <thead className="bg-primary-dark border-secondary-light border">
            <tr>
              {values.map((tableHead, index) => (
                <th
                  className="p-2"
                  key={index}
                >
                  {tableHead}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="mt-1">
            {attachment?.map((instance, index) => (
              <tr
                key={index}
                className="bg-primary-dark border-secondary-light hover:border-secondary-light hover:bg-secondary-main cursor-pointer border transition duration-300"
              >
                {keys.map((key, i) => (
                  <td
                    className="p-2 text-center"
                    key={i}
                  >
                    {key === 'documentName' ? (
                      <span>{findDocumentName(instance?.attachment)}</span>
                    ) : key === 'preview' ? (
                      <span>
                        <button
                          id='previewBtn'
                          onClick={() => modelShow(instance?.attachment)}
                          className="text-green-600 underline"
                        >
                          Preview
                        </button>
                      </span>
                    ) : key === 'remove' ? (
                      <div
                        onClick={() => handlerRemoveDocument(instance?.attachment)}
                        className=" flex items-center justify-center"
                      >
                        <HiMiniDocumentMinus className="text-2xl transition-all hover:text-blue-300" />
                      </div>
                    ) : (
                      instance[key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default AddAttachmentModel;
