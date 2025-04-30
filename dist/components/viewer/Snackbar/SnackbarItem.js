"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _SnackbarTypes = _interopRequireDefault(require("./SnackbarTypes"));
var _io = require("react-icons/io5");
var _ai = require("react-icons/ai");
var _ti = require("react-icons/ti");
var _fa = require("react-icons/fa");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import Icon from '../Icon';

const iconClasses = {
  [_SnackbarTypes.default.INFO]: 'notifications-info',
  [_SnackbarTypes.default.WARNING]: 'notifications-warning',
  [_SnackbarTypes.default.SUCCESS]: 'notifications-success',
  [_SnackbarTypes.default.ERROR]: 'notifications-error'
};
const typeIcons = {
  [_SnackbarTypes.default.INFO]: /*#__PURE__*/_react.default.createElement(_ai.AiOutlineInfoCircle, {
    className: "text-blue-700 h-5 w-5"
  }),
  [_SnackbarTypes.default.SUCCESS]: /*#__PURE__*/_react.default.createElement(_fa.FaRegCheckCircle, {
    className: "text-green-700 h-5 w-5"
  }),
  [_SnackbarTypes.default.WARNING]: /*#__PURE__*/_react.default.createElement(_ti.TiWarningOutline, {
    className: "text-yellow-700 h-5 w-5"
  }),
  [_SnackbarTypes.default.ERROR]: /*#__PURE__*/_react.default.createElement(_ai.AiOutlineCloseCircle, {
    className: "text-red-700 h-5 w-5"
  })
};
const SnackbarItem = _ref => {
  let {
    options,
    onClose
  } = _ref;
  const handleClose = () => onClose(options.id);
  (0, _react.useEffect)(() => {
    if (options.autoClose) {
      setTimeout(() => handleClose(), options.duration);
    }
  }, []);
  const typeClasses = {
    [_SnackbarTypes.default.INFO]: 'bg-[#bed1db]',
    [_SnackbarTypes.default.WARNING]: 'bg-[#ebe5c4]',
    [_SnackbarTypes.default.SUCCESS]: 'bg-[#c6d9bf]',
    [_SnackbarTypes.default.ERROR]: 'bg-[#dabdbe]'
  };
  const hidden = 'duration-300 transition-all ease-in-out h-0 opacity-0 pt-0 mb-0 pb-0';
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(`${options.visible ? '' : hidden} sb-item`, typeClasses[options.type])
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex"
  }, typeIcons[options.type], /*#__PURE__*/_react.default.createElement("div", {
    className: "mx-2 flex-col"
  }, options.title && /*#__PURE__*/_react.default.createElement("div", {
    className: "break-normal text-lg font-bold text-black"
  }, options.title), options.message && /*#__PURE__*/_react.default.createElement("div", {
    className: "break-normal text-base text-black"
  }, options.message)), /*#__PURE__*/_react.default.createElement("div", {
    onClick: handleClose,
    className: "relative left-[3px] top-[-3px] ml-auto flex h-5 w-5 items-center justify-center self-start rounded-full text-[#0944b3]"
  }, /*#__PURE__*/_react.default.createElement(_io.IoClose, {
    lassName: "text-black"
  }))));
};
var _default = exports.default = SnackbarItem;