"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _formik = require("formik");
var _Button = _interopRequireDefault(require("../Button"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const AddClinicalHistoryModel = _ref => {
  let {
    hide,
    studyInstanceUid,
    handleClinicalHistoryChange,
    findHistory,
    patientId,
    accession,
    patientName,
    institutionName
  } = _ref;
  const initialValue = data => {
    return {
      clinical_history: data?.clinical_history || ''
    };
  };
  const onsubmit = values => {
    handleClinicalHistoryChange(studyInstanceUid, values.clinical_history, patientId, accession, institutionName);
    hide();
  };
  return /*#__PURE__*/_react.default.createElement("section", {
    className: "w-full"
  }, /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    initialValues: initialValue(findHistory),
    onSubmit: onsubmit
  }, _ref2 => {
    let {
      isSubmitting,
      handleChange,
      values
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement(_formik.Form, null, /*#__PURE__*/_react.default.createElement("div", {
      className: " flex gap-5 items-center"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: " w-full"
    }, patientName && /*#__PURE__*/_react.default.createElement("p", null, "Patient: ", patientName.replace(/,/g, '')), /*#__PURE__*/_react.default.createElement("textarea", {
      name: "clinical_history",
      className: " mr-5 p-4 mt-1 text-lgmt-2 shadow transition duration-300 appearance-none border border-inputfield-main focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 px-3 text-white placeholder-inputfield-placeholder leading-tight bg-black",
      rows: "4",
      placeholder: 'Enter Clinical History',
      value: values.clinical_history,
      onChange: handleChange
    })), /*#__PURE__*/_react.default.createElement(_Button.default, null, findHistory?.clinical_history ? 'Update' : 'Save')));
  }));
};
var _default = exports.default = AddClinicalHistoryModel;