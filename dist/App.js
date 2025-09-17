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
    keycloak_url: "https://auth.telerapp.net/admin/realms/Telerapp",
    user: {
      id: "ca6e775f-9912-4b20-a42f-e56a8b6ce3ee",
      profile: {
        sub: "ca6e775f-9912-4b20-a42f-e56a8b6ce3ee",
        radiologyGroup: "Euracare, Ghana",
        mobileNumber: "1236547890",
        templates: ["IND-MR-01"],
        permission: ["Bone fracture", "Brain Stroke"],
        preferred_username: "mayur_v",
        given_name: "mayur",
        roleType: "super-admin",
        name: "mayur v",
        title: "mayur_v",
        qualification: "M.B.A",
        uploadSignature: "https://telerappdevattachments.s3.ap-south-1.amazonaws.com/uploads/1731044318569-image.png",
        registrationNo: "2121",
        family_name: "v",
        email: "mayurv@gmail.com"
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