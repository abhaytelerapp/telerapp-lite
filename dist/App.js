"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Viewer = _interopRequireDefault(require("./components/viewer/Viewer"));
var _contextProviders = require("./components/viewer/contextProviders");
var _Modal = _interopRequireDefault(require("./components/viewer/Modal"));
var _Compose = _interopRequireDefault(require("./components/Mode/Compose"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function App(props) {
  const providers = [[_contextProviders.SnackbarProvider], [_contextProviders.ModalProvider, {
    modal: _Modal.default
  }]];
  const CombinedProviders = _ref => {
    let {
      children
    } = _ref;
    return (0, _Compose.default)({
      components: providers,
      children
    });
  };
  return /*#__PURE__*/_react.default.createElement(CombinedProviders, null, /*#__PURE__*/_react.default.createElement(_Viewer.default, {
    props: props
  }));
}
var _default = exports.default = App;