"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Viewer = _interopRequireDefault(require("./components/viewer/Viewer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function App(props) {
  return /*#__PURE__*/_react.default.createElement(_Viewer.default, {
    props: props
  });
}
var _default = exports.default = App;