"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _SnackbarItem = _interopRequireDefault(require("./SnackbarItem"));
require("./Snackbar.css");
var _contextProviders = require("../contextProviders");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SnackbarContainer = () => {
  const {
    snackbarItems,
    hide
  } = (0, _contextProviders.useSnackbar)();
  const renderItem = item => /*#__PURE__*/_react.default.createElement(_SnackbarItem.default, {
    key: item.itemId,
    options: item,
    onClose: hide
  });
  const renderItems = () => {
    const items = {
      topLeft: [],
      topCenter: [],
      topRight: [],
      bottomLeft: [],
      bottomCenter: [],
      bottomRight: []
    };

    // snackbarItems.forEach(item => items[item.position].push(item));
    // snackbarItems.forEach(item => console.log(item, 'item'));
    return snackbarItems && /*#__PURE__*/_react.default.createElement("div", null, Object.keys(items).map(pos => {
      if (!items[pos].length) {
        return null;
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        key: pos,
        className: `fixed z-50 box-border h-auto p-6 sb-${pos}`
      }, items[pos].map((item, index) => /*#__PURE__*/_react.default.createElement("div", {
        key: item.id + index
      }, renderItem(item))));
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderItems());
};
var _default = exports.default = SnackbarContainer;