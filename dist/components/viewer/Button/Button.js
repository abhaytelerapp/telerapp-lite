"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var ButtonEnums = _interopRequireWildcard(require("./ButtonEnums"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const sizeClasses = {
  [ButtonEnums.size.small]: 'h-[26px] text-[13px]',
  [ButtonEnums.size.medium]: 'h-[32px] text-[14px]'
};
const layoutClasses = 'box-content inline-flex flex-row items-center justify-center gap-[5px] justify center px-[10px] outline-none rounded';
const baseFontTextClasses = 'leading-[1.2] font-sans text-center whitespace-nowrap';
const fontTextClasses = {
  [ButtonEnums.type.primary]: (0, _classnames.default)(baseFontTextClasses, 'font-semibold'),
  [ButtonEnums.type.secondary]: (0, _classnames.default)(baseFontTextClasses, 'font-400')
};
const baseEnabledEffectClasses = 'transition duration-300 ease-in-out focus:outline-none';
const enabledEffectClasses = {
  [ButtonEnums.type.primary]: (0, _classnames.default)(baseEnabledEffectClasses, 'hover:opacity-80 active:bg-opacity-50'),
  [ButtonEnums.type.secondary]: (0, _classnames.default)(baseEnabledEffectClasses, 'hover:bg-opacity-50 active:opacity-20')
};
const baseEnabledClasses = 'text-white';
const enabledClasses = {
  [ButtonEnums.type.primary]: (0, _classnames.default)('bg-primary-main', baseEnabledClasses, enabledEffectClasses[ButtonEnums.type.primary]),
  [ButtonEnums.type.secondary]: (0, _classnames.default)('bg-primary-main', baseEnabledClasses, enabledEffectClasses[ButtonEnums.type.secondary])
};
const disabledClasses = 'bg-inputfield-placeholder text-black-600 cursor-default';
const defaults = {
  color: 'default',
  disabled: false,
  rounded: 'small',
  size: ButtonEnums.size.medium,
  type: ButtonEnums.type.primary
};
const Button = _ref => {
  let {
    children = '',
    size = defaults.size,
    disabled = defaults.disabled,
    type = defaults.type,
    startIcon: startIconProp,
    endIcon: endIconProp,
    name,
    className,
    onClick = () => {},
    dataCY,
    startIconTooltip = null,
    endIconTooltip = null
  } = _ref;
  dataCY = dataCY || `${name}-btn`;
  const startIcon = startIconProp && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.cloneElement(startIconProp, {
    className: (0, _classnames.default)('w-4 h-4 fill-current', startIconProp?.props?.className)
  }));
  const endIcon = endIconProp && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.cloneElement(endIconProp, {
    className: (0, _classnames.default)('w-4 h-4 fill-current', endIconProp?.props?.className)
  }));
  const buttonElement = (0, _react.useRef)(null);
  const handleOnClick = e => {
    // buttonElement.current.blur();
    if (!disabled) {
      onClick(e);
    }
  };
  const finalClassName = (0, _classnames.default)(layoutClasses, fontTextClasses[type], disabled ? disabledClasses : enabledClasses[type], sizeClasses[size], children ? 'min-w-[32px]' : '',
  // minimum width for buttons with text; icon only button does NOT get a minimum width
  className);
  return /*#__PURE__*/_react.default.createElement("button", {
    className: finalClassName,
    disabled: disabled,
    ref: buttonElement,
    onClick: handleOnClick,
    "data-cy": dataCY
  }, startIconTooltip ? /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: startIconTooltip
  }, startIcon) : startIcon, children, endIconTooltip ? /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: endIconTooltip
  }, endIcon) : endIcon);
};
Button.defaultProps = {
  disabled: false,
  children: '',
  onClick: () => {},
  type: defaults.type,
  size: defaults.size
};
Button.propTypes = {
  /** What is inside the button, can be text or react component */
  children: _propTypes.default.node,
  /** Callback to be called when the button is clicked  */
  onClick: _propTypes.default.func.isRequired,
  /** Button size  */
  size: _propTypes.default.oneOf([ButtonEnums.size.medium, ButtonEnums.size.small]),
  /** Whether the button should be disabled  */
  disabled: _propTypes.default.bool,
  /** Button type  */
  type: _propTypes.default.oneOf([ButtonEnums.type.primary, ButtonEnums.type.secondary]),
  name: _propTypes.default.string,
  /** Button start icon name - if any icon is specified  */
  startIcon: _propTypes.default.node,
  /** Button end icon name - if any icon is specified  */
  endIcon: _propTypes.default.node,
  /** Additional TailwindCSS classnames */
  className: _propTypes.default.string,
  /** Tooltip for the start icon */
  startIconTooltip: _propTypes.default.node,
  /** Tooltip for the end icon */
  endIconTooltip: _propTypes.default.node,
  /** Data attribute for testing */
  dataCY: _propTypes.default.string
};
var _default = exports.default = Button;