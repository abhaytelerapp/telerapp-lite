"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _reactI18next = require("react-i18next");
var _lodash = _interopRequireDefault(require("lodash.debounce"));
var _reactDom = _interopRequireDefault(require("react-dom"));
require("./tooltip.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const arrowPositionStyle = {
  bottom: {
    top: -15,
    left: '50%',
    transform: 'translateX(-50%)'
  },
  'bottom-left': {
    top: -15,
    left: 5
  },
  'bottom-right': {
    top: -15,
    right: 5
  },
  right: {
    top: 'calc(50% - 8px)',
    left: -15,
    transform: 'rotate(270deg)'
  },
  left: {
    top: 'calc(50% - 8px)',
    right: -15,
    transform: 'rotate(-270deg)'
  },
  top: {
    bottom: -15,
    left: '50%',
    transform: 'translateX(-50%) rotate(180deg)'
  }
};
const Tooltip = _ref => {
  let {
    content,
    secondaryContent = null,
    isSticky = false,
    position = 'bottom',
    className,
    tight = false,
    children,
    isDisabled = false,
    tooltipBoxClassName,
    // time to show/hide the tooltip on mouse over and  mouse out events (default: 300ms)
    showHideDelay = 300,
    onHide
  } = _ref;
  const [isActive, setIsActive] = (0, _react.useState)(false);
  const isOpen = (0, _react.useMemo)(() => (isSticky || isActive) && !isDisabled, [isSticky, isActive, isDisabled]);
  const {
    t
  } = (0, _reactI18next.useTranslation)('Buttons');
  const tooltipContainer = document.getElementById('react-portal');
  const [coords, setCoords] = (0, _react.useState)({
    x: 999999,
    y: 999999
  });
  const parentRef = (0, _react.useRef)(null);
  const tooltipRef = (0, _react.useRef)(null);
  const handleMouseOverDebounced = (0, _react.useMemo)(() => (0, _lodash.default)(() => setIsActive(true), showHideDelay), [showHideDelay]);
  const handleMouseOutDebounced = (0, _react.useMemo)(() => (0, _lodash.default)(() => setIsActive(false), showHideDelay), [showHideDelay]);
  const handleMouseOver = () => {
    handleMouseOutDebounced.cancel();
    handleMouseOverDebounced();
  };
  const handleMouseOut = () => {
    handleMouseOverDebounced.cancel();
    handleMouseOutDebounced();
  };
  (0, _react.useEffect)(() => {
    return () => {
      handleMouseOverDebounced.cancel();
      handleMouseOutDebounced.cancel();
    };
  }, [handleMouseOverDebounced, handleMouseOutDebounced]);
  (0, _react.useEffect)(() => {
    if (!isOpen && onHide) {
      onHide();
    }
  }, [isOpen, onHide]);
  (0, _react.useEffect)(() => {
    if (parentRef.current && tooltipRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const parentWidth = parentRect.width;
      const parentHeight = parentRect.height;
      const tooltipWidth = tooltipRect.width;
      let newX = 0;
      let newY = 0;
      switch (position) {
        case 'bottom':
          newX = parentRect.left + parentWidth / 2;
          newY = parentRect.top + parentHeight;
          break;
        case 'top':
          newX = parentRect.left + parentWidth / 2;
          newY = parentRect.top - parentHeight * 2;
          break;
        case 'right':
          newX = parentRect.left + parentWidth;
          newY = parentRect.top + parentHeight / 2;
          break;
        case 'left':
          newX = parentRect.left - tooltipWidth - 10;
          newY = parentRect.top + parentHeight / 2;
          break;
        case 'bottom-left':
          newX = parentRect.left;
          newY = parentRect.top + parentHeight;
          break;
        case 'bottom-right':
          newX = parentRect.left - tooltipWidth + parentWidth;
          newY = parentRect.top + parentHeight;
          break;
        default:
          break;
      }
      setCoords({
        x: newX,
        y: newY
      });
    }
  }, [isOpen, position, parentRef.current, tooltipRef.current]);
  const tooltipContent = /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(`tooltip tooltip-${position} block`, 'z-50'),
    style: {
      position: 'fixed',
      top: coords.y,
      left: isOpen ? coords.x : 999999
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: tooltipRef,
    className: (0, _classnames.default)('tooltip-box bg-primary-dark border-secondary-light w-max-content relative inset-x-auto top-full rounded border text-base text-white', {
      'py-[6px] px-[8px]': !tight
    }, tooltipBoxClassName)
  }, /*#__PURE__*/_react.default.createElement("div", null, typeof content === 'string' ? t(content) : content), /*#__PURE__*/_react.default.createElement("div", {
    className: "text-aqua-pale"
  }, typeof secondaryContent === 'string' ? t(secondaryContent) : secondaryContent), /*#__PURE__*/_react.default.createElement("svg", {
    className: "text-primary-dark stroke-secondary-light absolute h-4",
    style: arrowPositionStyle[position],
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react.default.createElement("path", {
    fill: "currentColor",
    d: "M24 22l-12-20l-12 20"
  }))));
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: parentRef,
    className: (0, _classnames.default)('relative', className),
    onMouseOver: handleMouseOver,
    onFocus: handleMouseOver,
    onMouseOut: handleMouseOut,
    onBlur: handleMouseOut,
    role: "tooltip"
  }, children, tooltipContainer && /*#__PURE__*/_reactDom.default.createPortal(tooltipContent, tooltipContainer));
};
Tooltip.propTypes = {
  isDisabled: _propTypes.default.bool,
  content: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  secondaryContent: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  position: _propTypes.default.oneOf(['bottom', 'bottom-left', 'bottom-right', 'left', 'right', 'top']),
  isSticky: _propTypes.default.bool,
  tight: _propTypes.default.bool,
  children: _propTypes.default.node.isRequired,
  className: _propTypes.default.string,
  tooltipBoxClassName: _propTypes.default.string,
  showHideDelay: _propTypes.default.number,
  onHide: _propTypes.default.func
};
var _default = exports.default = Tooltip;