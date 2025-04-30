import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Label from '../Label';
import './ReportTemplate.css';
// import SnackbarTypes from '../Snackbar/SnackbarTypes';
import CustomTemplates from './CustomTemplates';

const SaveReportTemplate = ({ hide, createDefaultTemplates, editorData, loginUserData, setAvailableReportTemplates, fetchDefaultReportTemplates, user, apiData }) => {

  const [checkedAttributesItems, setCheckedAttributesItems] = useState({
    patient_name: true,
    patient_id: true,
    patient_gender: true,
    patient_age: true,
    patient_modality: true,
    accession_number: true,
    study_date: true,
    ref_physician: true,
    study: true,
    institution_name: true,
  });
  const [editorData1, setEditorData1] = useState(editorData || '');
  const [selectCustomTemplate, setSelectCustomTemplate] = useState(true);

  const [modality, setModality] = useState('');
  const [bodyparts, setBodyparts] = useState('');
  const [templategroup, setTemplategroup] = useState('');
  const [dataTemplate, setDataTemplate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [templateName, setTemplateName] = useState('');
  const [isOpenCustomTemplate, setIsOpenCustomTemplate] = useState(false);
  // const { show } = useSnackbar();

  const trueValues = Object.entries(checkedAttributesItems)
    .filter(([key, val]) => val === true)
    .map(([key]) => key);
  const columnCount = 2;

  const rowCount = Math.ceil(trueValues.length / columnCount);

  function capitalizeFirstLetter(string) {
    return string.replace(/\b\w/g, match => match.toUpperCase());
  }

  const exactLabelMap = {
    'patient_dob': 'DOB',
    'patient_id': 'Patient ID',
    'uid': 'UID',
    'ref_physician': 'Ref. Physician',
    'study_tat': 'Study TAT',
    'accession_number': 'Accession No.',
    'patient_gender': 'SEX',
    'patient_modality': 'Modality',
    'patient_age': 'Age'
  };


  function formatLabel(key) {
    return exactLabelMap[key] || capitalizeFirstLetter(key.replace(/_/g, ' '));
  }

  let tableRows = '';
  for (let i = 0; i < rowCount; i++) {
    const startIdx = i * columnCount;
    const endIdx = startIdx + columnCount;
    const rowData = trueValues.slice(startIdx, endIdx);

    const rowCells = rowData
      .map(
        key =>
          `<td style="width: 17.7931%;"><strong>${formatLabel(key)}:</strong></td><td style="width: 33.5161%;"> {{${key}}}</td>`
      )
      .join('');
    tableRows += `<tr>${rowCells}</tr>`;
  }

  const templates = `
  <table style="border-collapse: collapse; width: 100%;" border="1">
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <h3 style="text-align: center;text-transform: capitalize;"><strong style="text-transform: capitalize;"><u>${templateName}</u></strong></h3>
      <p><b>CLINICAL HISTORY: </b> {{clinical_history}}</p>
      `;

  const userNameForGroup = loginUserData[0].username

  const updatedEditorData = editorData1.replace(/<table border="1px;" style="border-collapse: collapse;"[\s\S]*?<\/table>/g, '');
  // const updatedEditorData = editorData1.replace(/.*?<p><strong>CLINICAL HISTORY: <\/strong>None<\/p>/s, '');

  const handleSubmit = async () => {
    const templatesDetail = {
      name: templateName,
      templates: templates + updatedEditorData,
      created_by: user?.profile?.sub,
      updated_by: user?.profile?.sub,
      templateAttributes: [checkedAttributesItems],
      customTemplate: updatedEditorData,
      isCustomizedTemplate: selectCustomTemplate,
      modality: modality,
      bodyparts: bodyparts,
      templategroup: userNameForGroup,
    };

    const response = await createDefaultTemplates(templatesDetail, apiData);

    if (response.status === 201) {
      fetchDefaultReportTemplates()
        .then(data => setAvailableReportTemplates(data))
        .catch(error => console.error('Error fetching default report templates:', error));
      setIsOpenCustomTemplate(false);
      hide();
    } else {
      const errorMessage = await response.json();
      setError(errorMessage.errors[0].msg);
    }
  }

  const handleCancel = () => {
    hide();
  }

  return (
    <section className="w-full px-4">
      <div className="my-2 w-full">
        {/* First Row - Template Name and Modality */}
        <div className="flex justify-between max-lg:flex-col gap-4">
          <div className="flex justify-between w-full max-sm:flex-col sm:gap-4">
            <div className="sm:w-10/12 w-full">
              <Label className="my-2 block max-sm:text-[16px] dark:text-white text-black">Template Name</Label>
              <Input
                className=" shadow transition duration-300 appearance-none border dark:border-primary-main border-secondary-dark focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 px-3 text-sm dark:text-white text-black dark:placeholder-inputfield-dark placeholder-inputfield-light leading-tight dark:bg-secondary-dark bg-secondary-light"
                type="text"
                name="name"
                value={templateName}
                onChange={e => setTemplateName(e.target.value)}
                placeholder="Please enter template name"
              />
            </div>

            <div className="sm:w-6/12 w-full ">
              <Label className="my-2 block max-sm:text-[16px] dark:text-white text-black">Modality</Label>
              <Input
                className=" shadow transition duration-300 appearance-none border dark:border-primary-main border-secondary-dark focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 px-3 text-sm dark:text-white text-black dark:placeholder-inputfield-dark placeholder-inputfield-light leading-tight dark:bg-secondary-dark bg-secondary-light"
                type="text"
                value={modality}
                onChange={e => setModality(e.target.value)}
              />
            </div>
          </div>
          {/* </div> */}

          {/* Second Row - Body Part and Template Group */}
          {/* <div className="flex justify-between space-x-4 mt-4"> */}
          <div className='flex justify-between w-full max-sm:flex-col sm:gap-4'>
            <div className="sm:w-6/12 w-full">
              <Label className="my-2 block max-sm:text-[16px] dark:text-white text-black">Body Parts</Label>
              <Input
                className="shadow transition duration-300 appearance-none border dark:border-primary-main border-secondary-dark focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 px-3 text-sm dark:text-white text-black dark:placeholder-inputfield-dark placeholder-inputfield-light leading-tight dark:bg-secondary-dark bg-secondary-light"
                type="text"
                value={bodyparts}
                onChange={e => setBodyparts(e.target.value)}
              />
            </div>

            <div className="sm:w-6/12 w-full">
              <Label className="my-2 block max-sm:text-[16px] dark:text-white text-black">Template Group</Label>
              <Input
                className="shadow transition duration-300 appearance-none border dark:border-primary-main border-secondary-dark focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 px-3 text-sm dark:text-white text-black dark:placeholder-inputfield-dark placeholder-inputfield-light leading-tight dark:bg-secondary-dark bg-secondary-light"
                type="text"
                value={userNameForGroup}
              />
            </div>
          </div>
        </div>
      </div>



      <CustomTemplates
        templates={templates}
        setEditorData={setEditorData1}
        editorData={updatedEditorData}
        dataTemplate={dataTemplate?.customTemplate}
      />


      <div className="flex">
        <Button
          className="mt-8 max-sm:text-[16px]"
          onClick={handleSubmit}
        >
          {'Save'}
        </Button>

        <Button
          className="mt-8 ml-2 max-sm:text-[16px]"
          onClick={handleCancel}
        >
          {'Cancel'}
        </Button>
      </div>

    </section>
  )
}

export default SaveReportTemplate;
