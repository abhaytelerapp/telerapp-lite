"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getTooltipPositionStyle = position => {
  switch (position) {
    case "top":
      return {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: "8px"
      };
    case "bottom":
      return {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: "8px"
      };
    case "left":
      return {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        marginRight: "8px"
      };
    case "right":
      return {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        marginLeft: "8px"
      };
    default:
      return {};
  }
};
const getArrowStyle = position => {
  const baseArrowStyle = {
    position: "absolute",
    width: "0",
    height: "0"
  };
  switch (position) {
    case "top":
      return {
        ...baseArrowStyle,
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderTop: "8px solid #333"
      };
    case "bottom":
      return {
        ...baseArrowStyle,
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderBottom: "8px solid #333"
      };
    case "left":
      return {
        ...baseArrowStyle,
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        borderLeft: "8px solid #333"
      };
    case "right":
      return {
        ...baseArrowStyle,
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        borderRight: "8px solid #333"
      };
    default:
      return {};
  }
};
const Tooltip = _ref => {
  let {
    children,
    text,
    position
  } = _ref;
  const containerStyle = {
    position: "relative",
    display: "inline-block"
  };
  const tooltipStyle = {
    position: "absolute",
    border: "1px solid #fff",
    backgroundColor: "#333",
    color: "#fff",
    padding: "6px 8px",
    borderRadius: "4px",
    fontSize: "13px",
    whiteSpace: "nowrap",
    zIndex: 1000,
    opacity: 0,
    pointerEvents: "none",
    transition: "opacity 0.2s ease-in-out",
    ...getTooltipPositionStyle(position)
  };
  const showTooltipStyle = {
    opacity: 1,
    pointerEvents: "auto"
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: containerStyle,
    onMouseEnter: e => {
      const tooltip = e.currentTarget.querySelector(".tooltip-box");
      Object.assign(tooltip.style, showTooltipStyle);
    },
    onMouseLeave: e => {
      const tooltip = e.currentTarget.querySelector(".tooltip-box");
      tooltip.style.opacity = 0;
      tooltip.style.pointerEvents = "none";
    }
  }, children, /*#__PURE__*/_react.default.createElement("div", {
    className: "tooltip-box",
    style: tooltipStyle
  }, text, /*#__PURE__*/_react.default.createElement("div", {
    style: getArrowStyle(position)
  })));
};
var _default = exports.default = Tooltip;