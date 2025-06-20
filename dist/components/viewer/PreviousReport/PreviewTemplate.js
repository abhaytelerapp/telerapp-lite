"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./ReportTemplate.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const PreviewTemplate = _ref => {
  let {
    templates,
    matchedPatientDetail
  } = _ref;
  (0, _react.useEffect)(() => {
    const editorElement = document.querySelector('#editor01');
    if (!editorElement || !templates) return;
    window.DecoupledEditor.create(editorElement, {
      language: 'en'
    }).then(editor => {
      editor.setData(templates);
      if (matchedPatientDetail && matchedPatientDetail?.document_status === "Approved") {
        const imageUrl = matchedPatientDetail?.signature; // Replace with your actual image URL
        editor.model.change(writer => {
          const imageElement = writer.createElement('imageBlock', {
            src: imageUrl,
            alt: 'Doctor Signature',
            style: 'height:80px;',
            alignment: 'left' // key part
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
    }).catch(error => {
      console.error(error);
    });
  }, [templates]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "pointer-events-none"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "toolbar-container"
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "editor01",
    className: "bg-white text-black"
  })));
};
var _default = exports.default = PreviewTemplate;