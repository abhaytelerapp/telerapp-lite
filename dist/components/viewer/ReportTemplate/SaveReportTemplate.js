"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _formik = require("formik");
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("../Button"));
var _Input = _interopRequireDefault(require("../Input"));
var _Label = _interopRequireDefault(require("../Label"));
require("./ReportTemplate.css");
var _CustomTemplates = _interopRequireDefault(require("./CustomTemplates"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import SnackbarTypes from '../Snackbar/SnackbarTypes';

const SaveReportTemplate = _ref => {
  let {
    hide,
    createDefaultTemplates,
    editorData,
    loginUserData,
    setAvailableReportTemplates,
    fetchDefaultReportTemplates,
    user,
    apiData
  } = _ref;
  const [checkedAttributesItems, setCheckedAttributesItems] = (0, _react.useState)({
    patient_name: true,
    patient_id: true,
    patient_gender: true,
    patient_age: true,
    patient_modality: true,
    accession_number: true,
    study_date: true,
    ref_physician: true,
    study: true,
    institution_name: true
  });
  const [editorData1, setEditorData1] = (0, _react.useState)(editorData || '');
  const [selectCustomTemplate, setSelectCustomTemplate] = (0, _react.useState)(true);
  const [modality, setModality] = (0, _react.useState)('');
  const [bodyparts, setBodyparts] = (0, _react.useState)('');
  const [templategroup, setTemplategroup] = (0, _react.useState)('');
  const [dataTemplate, setDataTemplate] = (0, _react.useState)(null);
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(null);
  const [templateName, setTemplateName] = (0, _react.useState)('');
  const [isOpenCustomTemplate, setIsOpenCustomTemplate] = (0, _react.useState)(false);
  // const { show } = useSnackbar();

  const trueValues = Object.entries(checkedAttributesItems).filter(_ref2 => {
    let [key, val] = _ref2;
    return val === true;
  }).map(_ref3 => {
    let [key] = _ref3;
    return key;
  });
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
    const rowCells = rowData.map(key => `<td style="width: 17.7931%;"><strong>${formatLabel(key)}:</strong></td><td style="width: 33.5161%;"> {{${key}}}</td>`).join('');
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
  const userNameForGroup = loginUserData[0].username;
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
      templategroup: userNameForGroup
    };
    const response = await createDefaultTemplates(templatesDetail, apiData);
    if (response.status === 201) {
      fetchDefaultReportTemplates().then(data => setAvailableReportTemplates(data)).catch(error => console.error('Error fetching default report templates:', error));
      setIsOpenCustomTemplate(false);
      hide();
    } else {
      const errorMessage = await response.json();
      setError(errorMessage.errors[0].msg);
    }
  };
  const handleCancel = () => {
    hide();
  };
  return /*#__PURE__*/_react.default.createElement("section", {
    className: "w-full px-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "my-2 w-full"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-between max-lg:flex-col gap-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-between w-full max-sm:flex-col sm:gap-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "sm:w-10/12 w-full"
  }, /*#__PURE__*/_react.default.createElement(_Label.default, {
    className: "my-2 block max-sm:text-[16px] dark:text-white text-black"
  }, "Template Name"), /*#__PURE__*/_react.default.createElement(_Input.default, {
    className: " shadow transition duration-300 appearance-none border dark:border-primary-main border-secondary-dark focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 px-3 text-sm dark:text-white text-black dark:placeholder-inputfield-dark placeholder-inputfield-light leading-tight dark:bg-secondary-dark bg-secondary-light",
    type: "text",
    name: "name",
    value: templateName,
    onChange: e => setTemplateName(e.target.value),
    placeholder: "Please enter template name"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "sm:w-6/12 w-full "
  }, /*#__PURE__*/_react.default.createElement(_Label.default, {
    className: "my-2 block max-sm:text-[16px] dark:text-white text-black"
  }, "Modality"), /*#__PURE__*/_react.default.createElement(_Input.default, {
    className: " shadow transition duration-300 appearance-none border dark:border-primary-main border-secondary-dark focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 px-3 text-sm dark:text-white text-black dark:placeholder-inputfield-dark placeholder-inputfield-light leading-tight dark:bg-secondary-dark bg-secondary-light",
    type: "text",
    value: modality,
    onChange: e => setModality(e.target.value)
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-between w-full max-sm:flex-col sm:gap-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "sm:w-6/12 w-full"
  }, /*#__PURE__*/_react.default.createElement(_Label.default, {
    className: "my-2 block max-sm:text-[16px] dark:text-white text-black"
  }, "Body Parts"), /*#__PURE__*/_react.default.createElement(_Input.default, {
    className: "shadow transition duration-300 appearance-none border dark:border-primary-main border-secondary-dark focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 px-3 text-sm dark:text-white text-black dark:placeholder-inputfield-dark placeholder-inputfield-light leading-tight dark:bg-secondary-dark bg-secondary-light",
    type: "text",
    value: bodyparts,
    onChange: e => setBodyparts(e.target.value)
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "sm:w-6/12 w-full"
  }, /*#__PURE__*/_react.default.createElement(_Label.default, {
    className: "my-2 block max-sm:text-[16px] dark:text-white text-black"
  }, "Template Group"), /*#__PURE__*/_react.default.createElement(_Input.default, {
    className: "shadow transition duration-300 appearance-none border dark:border-primary-main border-secondary-dark focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 px-3 text-sm dark:text-white text-black dark:placeholder-inputfield-dark placeholder-inputfield-light leading-tight dark:bg-secondary-dark bg-secondary-light",
    type: "text",
    value: userNameForGroup
  }))))), /*#__PURE__*/_react.default.createElement(_CustomTemplates.default, {
    templates: templates,
    setEditorData: setEditorData1,
    editorData: updatedEditorData,
    dataTemplate: dataTemplate?.customTemplate
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "mt-8 max-sm:text-[16px]",
    onClick: handleSubmit
  }, 'Save'), /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "mt-8 ml-2 max-sm:text-[16px]",
    onClick: handleCancel
  }, 'Cancel')));
};
var _default = exports.default = SaveReportTemplate;