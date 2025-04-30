"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ModalComponent = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ModalComponent = _ref => {
  let {
    content = null,
    contentProps = null,
    shouldCloseOnEsc = true,
    isOpen = true,
    closeButton = true,
    title = null,
    customClassName = ''
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
};
exports.ModalComponent = ModalComponent;
ModalComponent.propTypes = {
  content: _propTypes.default.node,
  contentProps: _propTypes.default.object,
  shouldCloseOnEsc: _propTypes.default.bool,
  isOpen: _propTypes.default.bool,
  closeButton: _propTypes.default.bool,
  title: _propTypes.default.string,
  customClassName: _propTypes.default.string
};
var _default = exports.default = ModalComponent;