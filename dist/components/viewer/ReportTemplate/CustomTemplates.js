"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./ReportTemplate.css");
var _Button = _interopRequireDefault(require("../Button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const CustomTemplates = _ref => {
  let {
    templates,
    setEditorData,
    dataTemplate,
    editorData
  } = _ref;
  (0, _react.useEffect)(() => {
    const editorElement = document.querySelector('#editor1');
    if (!editorElement || !templates) return;
    console.log(DecoupledEditor, 'DecoupledEditor');
    window.DecoupledEditor.create(editorElement, {
      toolbar: {
        items: ['heading', '|', 'alignment', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', '|', 'bulletedList', 'numberedList', 'insertTable', '|', 'undo', 'redo']
      },
      heading: {
        options: [{
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph'
        }, {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1'
        }, {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2'
        }, {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3'
        }, {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4'
        }]
      },
      language: 'en'
    }).then(editor => {
      const toolbarContainer = document.querySelector('#toolbar-container1');
      if (toolbarContainer) {
        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
      }
      if (dataTemplate) {
        editor.setData(dataTemplate);
      } else {
        editor.setData(editorData);
      }
      editor.model.document.on('change:data', (event, data) => {
        setEditorData(editor.getData());
      });
    }).catch(error => {
      console.error("create custom templates error :- ", error);
    });
  }, [templates]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "toolbar-container1"
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "editor1",
    className: "bg-white text-black"
  })));
};
var _default = exports.default = CustomTemplates;