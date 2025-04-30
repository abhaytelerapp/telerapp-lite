"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const baseArrowStyle = {
  position: "absolute",
  width: "0",
  height: "0"
};
const getArrowStyle = position => {
  switch (position) {
    case "top":
      return {
        ...baseArrowStyle,
        bottom: "-8px",
        left: "50%",
        transform: "translateX(-50%)",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderTop: "8px solid #333"
      };
    case "bottom":
      return {
        ...baseArrowStyle,
        top: "-8px",
        left: "50%",
        transform: "translateX(-50%)",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderBottom: "8px solid #333"
      };
    case "left":
      return {
        ...baseArrowStyle,
        right: "-8px",
        top: "50%",
        transform: "translateY(-50%)",
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        borderLeft: "8px solid #333"
      };
    case "right":
      return {
        ...baseArrowStyle,
        left: "-8px",
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
    position = "top"
  } = _ref;
  const containerRef = (0, _react.useRef)(null);
  const tooltipRef = (0, _react.useRef)(null);
  const [visible, setVisible] = (0, _react.useState)(false);
  const [tooltipPos, setTooltipPos] = (0, _react.useState)({
    top: 0,
    left: 0
  });
  (0, _react.useEffect)(() => {
    if (visible && tooltipRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      const padding = 8;
      let top = 0,
        left = 0;
      switch (position) {
        case "top":
          top = containerRect.top - tooltipEl.offsetHeight - padding;
          left = containerRect.left + containerRect.width / 2 - tooltipEl.offsetWidth / 2;
          break;
        case "bottom":
          top = containerRect.bottom + padding;
          left = containerRect.left + containerRect.width / 2 - tooltipEl.offsetWidth / 2;
          break;
        case "left":
          top = containerRect.top + containerRect.height / 2 - tooltipEl.offsetHeight / 2;
          left = containerRect.left - tooltipEl.offsetWidth - padding;
          break;
        case "right":
          top = containerRect.top + containerRect.height / 2 - tooltipEl.offsetHeight / 2;
          left = containerRect.right + padding;
          break;
        default:
          break;
      }
      setTooltipPos({
        top,
        left
      });
    }
  }, [visible, position]);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: containerRef,
    style: {
      display: "inline-block",
      position: "relative"
    },
    onMouseEnter: () => setVisible(true),
    onMouseLeave: () => setVisible(false)
  }, children, visible && /*#__PURE__*/_react.default.createElement("div", {
    ref: tooltipRef,
    style: {
      position: "fixed",
      top: `${tooltipPos.top}px`,
      left: `${tooltipPos.left}px`,
      border: "1px solid #fff",
      backgroundColor: "#333",
      color: "#fff",
      padding: "6px 8px",
      borderRadius: "4px",
      fontSize: "13px",
      whiteSpace: "nowrap",
      zIndex: 1000,
      transition: "opacity 0.2s ease-in-out"
    }
  }, text, /*#__PURE__*/_react.default.createElement("div", {
    style: getArrowStyle(position)
  })));
};
var _default = exports.default = Tooltip;