"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _react = _interopRequireDefault(require("react"));
var _PreviewTemplate = _interopRequireDefault(require("./PreviewTemplate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PreviousReport = _ref => {
  let {
    show,
    hide,
    previouPatientReports
  } = _ref;
  const tableHeaders = {
    studyData: 'study Date',
    modality: 'Modality',
    instances: 'Instances',
    preview: 'Preview'
  };
  const keys = Object.keys(tableHeaders);
  const values = Object.values(tableHeaders);
  const modelShow = (templates, matchedPatientDetail) => {
    show({
      content: _PreviewTemplate.default,
      title: `Preview Report`,
      contentProps: {
        templates,
        matchedPatientDetail
      }
    });
  };
  return /*#__PURE__*/_react.default.createElement("section", {
    className: "w-full px-4"
  }, previouPatientReports?.length === 0 ? /*#__PURE__*/_react.default.createElement("span", {
    className: "mt-4 flex justify-center"
  }, "No previous reposts is available") : /*#__PURE__*/_react.default.createElement("table", {
    className: "container m-auto mt-4 table-auto text-white"
  }, /*#__PURE__*/_react.default.createElement("thead", {
    className: "bg-primary-dark border-secondary-light border"
  }, /*#__PURE__*/_react.default.createElement("tr", null, values.map((tableHead, index) => /*#__PURE__*/_react.default.createElement("th", {
    className: "p-2",
    key: index
  }, tableHead)))), /*#__PURE__*/_react.default.createElement("tbody", {
    className: "mt-1"
  }, previouPatientReports?.map((instance, index) => /*#__PURE__*/_react.default.createElement("tr", {
    key: index,
    className: "bg-primary-dark border-secondary-light hover:border-secondary-light hover:bg-[#4c5357] cursor-pointer border transition duration-300"
  }, keys.map((key, i) => /*#__PURE__*/_react.default.createElement("td", {
    className: "p-2 text-center",
    key: i
  }, key === 'studyData' ? /*#__PURE__*/_react.default.createElement("span", null, instance.studyData ? (0, _moment.default)(instance.studyData).format('MMM-DD-YYYY') : '') : key === 'preview' ? /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("button", {
    id: "preview-button",
    onClick: () => modelShow(instance?.template, instance),
    className: "text-green-600 underline"
  }, "Preview")) : instance[key])))))));
};
var _default = exports.default = PreviousReport;