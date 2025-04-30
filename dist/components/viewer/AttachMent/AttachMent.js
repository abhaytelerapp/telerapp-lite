"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _formik = require("formik");
var _Button = _interopRequireDefault(require("../Button"));
var _hi = require("react-icons/hi2");
var _PreviewPdf = _interopRequireDefault(require("../PreviewPdf"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import SnackbarTypes from '../Snackbar/SnackbarTypes';

const AddAttachmentModel = _ref => {
  let {
    hide,
    studyInstanceUid,
    handleAttachmentChange,
    handleAttachmentRemove,
    documentUploadDetails,
    patientName,
    modelOpen,
    toggleDisplayReportEditor
  } = _ref;
  const initialValue = data => {
    return {
      attachment: data?.attachment || ''
    };
  };
  // const { show } = useSnackbar();
  const tableHeaders = {
    documentName: 'Document Name',
    preview: 'Preview',
    remove: 'Remove'
  };
  const keys = toggleDisplayReportEditor ? Object.keys(tableHeaders).filter(key => key !== 'remove') : Object.keys(tableHeaders);
  const values = toggleDisplayReportEditor ? Object.values(tableHeaders).filter(key => key !== 'Remove') : Object.values(tableHeaders);
  const [document, setDocument] = (0, _react.useState)(null);
  let findHistory = [];
  findHistory = documentUploadDetails?.find(item => item.study_UIDs === studyInstanceUid)?.document_url || [];
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
      return url.replace('https://prod-telerapp-attachments.s3.us-east-2.amazonaws.com', 'https://documents.telerapp.com');
    }
    return url;
  };
  const modelShow = url => {
    modelOpen({
      content: _PreviewPdf.default,
      title: `Attachment preview`,
      contentProps: {
        previewUrl: transformUrl(url)
      }
    });
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
      className: " flex items-center gap-5"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: " w-full"
    }, patientName && /*#__PURE__*/_react.default.createElement("p", null, "Patient: ", patientName.replace(/,/g, '')), !toggleDisplayReportEditor && /*#__PURE__*/_react.default.createElement("div", {
      className: " flex items-center gap-3 mt-1"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "file",
      onChange: handlerDocumentUpload,
      className: " border-inputfield-main focus:border-inputfield-focus disabled:border-inputfield-disabled placeholder-inputfield-placeholder w-full appearance-none rounded border bg-black py-2 px-3 text-sm leading-tight text-white shadow transition duration-300 focus:outline-none",
      name: "attachment",
      accept: ".pdf, .png, .jpg, .doc, .docx, .mp4"
    }), /*#__PURE__*/_react.default.createElement(_Button.default, {
      className: " px-3"
    }, "Save")))));
  }), attachment?.length === 0 ? /*#__PURE__*/_react.default.createElement("span", {
    className: "mt-4 flex justify-center"
  }, "No Document Exiting") : /*#__PURE__*/_react.default.createElement("table", {
    className: "container m-auto mt-4 table-auto text-white"
  }, /*#__PURE__*/_react.default.createElement("thead", {
    className: "bg-primary-dark border-secondary-light border"
  }, /*#__PURE__*/_react.default.createElement("tr", null, values.map((tableHead, index) => /*#__PURE__*/_react.default.createElement("th", {
    className: "p-2",
    key: index
  }, tableHead)))), /*#__PURE__*/_react.default.createElement("tbody", {
    className: "mt-1"
  }, attachment?.map((instance, index) => /*#__PURE__*/_react.default.createElement("tr", {
    key: index,
    className: "bg-primary-dark border-secondary-light hover:border-secondary-light hover:bg-secondary-main cursor-pointer border transition duration-300"
  }, keys.map((key, i) => /*#__PURE__*/_react.default.createElement("td", {
    className: "p-2 text-center",
    key: i
  }, key === 'documentName' ? /*#__PURE__*/_react.default.createElement("span", null, findDocumentName(instance?.attachment)) : key === 'preview' ? /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("button", {
    id: "previewBtn",
    onClick: () => modelShow(instance?.attachment),
    className: "text-green-600 underline"
  }, "Preview")) : key === 'remove' ? /*#__PURE__*/_react.default.createElement("div", {
    onClick: () => handlerRemoveDocument(instance?.attachment),
    className: " flex items-center justify-center"
  }, /*#__PURE__*/_react.default.createElement(_hi.HiMiniDocumentMinus, {
    className: "text-2xl transition-all hover:text-blue-300"
  })) : instance[key])))))));
};
var _default = exports.default = AddAttachmentModel;