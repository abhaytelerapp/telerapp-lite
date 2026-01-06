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
function App() {
  // function App(props) {
  const props = {
    data: "http://localhost:4000",
    user: {
      id: "77ba038b-4bc2-4d1c-87a5-a989f04c097e",
      profile: {
        sub: "77ba038b-4bc2-4d1c-87a5-a989f04c097e",
        radiologyGroup: ["Default"],
        mobileNumber: "+911234567893",
        templates: ["IND-MR-01"],
        permission: ["Approve Report", "AI Editor", "Chat Access", "All reports", "Quantum Edge", "VR 1", "VR 2"],
        preferred_username: "mayur_r01",
        given_name: "mayur",
        roleType: "Radiologist",
        name: "mayur r",
        title: "Dr",
        qualification: "abhay ",
        uploadSignature: "https://telerappdevattachments.s3.ap-south-1.amazonaws.com/uploads/1759210030396-1738785688620-Dr_Harsh.jpg",
        registrationNo: "1011",
        family_name: "r",
        email: "mayurr01@gmail.com"
      }
    }
  };
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
  return /*#__PURE__*/_react.default.createElement(CombinedProviders, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_Viewer.default, {
    props: props
  })));
}
var _default = exports.default = App;