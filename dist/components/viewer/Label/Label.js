"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Label = _ref => {
  let {
    children,
    className,
    text,
    ...rest
  } = _ref;
  const baseClasses = '';
  return /*#__PURE__*/_react.default.createElement("label", _extends({
    className: (0, _classnames.default)(baseClasses, className)
  }, rest), text, children);
};
Label.propTypes = {
  children: _propTypes.default.node
};
var _default = exports.default = Label;