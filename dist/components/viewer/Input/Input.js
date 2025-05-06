"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Label = _interopRequireDefault(require("../Label"));
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const baseInputClasses = 'shadow transition duration-300 appearance-none border dark:border-primary-main border-secondary-dark focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 px-3 text-sm dark:text-white text-black dark:placeholder-inputfield-dark placeholder-inputfield-light leading-tight';
const baseInputClasses1 = 'shadow transition duration-300 appearance-none border dark:border-primary-main border-secondary-dark focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 pl-7 text-sm  dark:text-white text-black dark:placeholder-inputfield-dark placeholder-inputfield-light leading-tight';
const transparentClasses = {
  true: 'bg-transparent',
  false: 'dark:bg-secondary-dark bg-primary-light'
};
const smallInputClasses = {
  true: 'input-small',
  false: ''
};
const Input = _ref => {
  let {
    id,
    label,
    containerClassName = '',
    labelClassName = '',
    className = '',
    transparent = false,
    smallInput = false,
    type,
    value,
    onChange,
    onFocus,
    autoFocus,
    onKeyPress,
    onKeyDown,
    readOnly,
    disabled,
    labelChildren,
    placeholder,
    ...otherProps
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('flex flex-1 flex-col', containerClassName)
  }, /*#__PURE__*/_react.default.createElement("input", _extends({
    "data-cy": `input-${id}`,
    className: (0, _classnames.default)(label && 'mt-2', className,
    // baseInputClasses,
    id === 'general' ? baseInputClasses1 : baseInputClasses, transparentClasses[transparent], smallInputClasses[smallInput], {
      'cursor-not-allowed': disabled
    }),
    disabled: disabled,
    readOnly: readOnly,
    autoFocus: autoFocus,
    type: type,
    value: value,
    onChange: onChange,
    onFocus: onFocus,
    onKeyPress: onKeyPress,
    onKeyDown: onKeyDown
  }, otherProps, {
    placeholder: placeholder ? placeholder : label
  })));
};
Input.propTypes = {
  id: _propTypes.default.string,
  label: _propTypes.default.string,
  containerClassName: _propTypes.default.string,
  labelClassName: _propTypes.default.string,
  className: _propTypes.default.string,
  transparent: _propTypes.default.bool,
  smallInput: _propTypes.default.bool,
  type: _propTypes.default.string,
  value: _propTypes.default.any,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  autoFocus: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  onKeyPress: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  labelChildren: _propTypes.default.node
};
var _default = exports.default = Input;