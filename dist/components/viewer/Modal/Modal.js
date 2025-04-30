"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactModal = _interopRequireDefault(require("react-modal"));
var _reactDraggable = _interopRequireDefault(require("react-draggable"));
var _Typography = _interopRequireDefault(require("../Typography"));
require("./Modal.css");
var _contextProviders = require("../contextProviders");
var _io = require("react-icons/io");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import Icon from '../Icon';

if (typeof document !== 'undefined') {
  _reactModal.default.setAppElement(document.getElementById('root'));
}
const Modal = _ref => {
  let {
    closeButton,
    shouldCloseOnEsc = true,
    isOpen,
    title,
    onClose,
    children,
    shouldCloseOnOverlayClick = true,
    movable = false,
    containerDimensions = null,
    contentDimensions = null
  } = _ref;
  const {
    hide
  } = (0, _contextProviders.useModal)();
  const handleClose = () => {
    hide();
  };
  const renderHeader = () => {
    return title && /*#__PURE__*/_react.default.createElement("header", {
      className: "dark:bg-secondary-dark bg-primary-light flex items-center rounded-tl rounded-tr px-[20px] py-[13px]"
    }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "h6",
      color: "primaryLight",
      className: "flex grow !leading-[1.2] dark:text-white text-black",
      "data-cy": "modal-header"
    }, title), closeButton &&
    /*#__PURE__*/
    // <Icon
    //   onClick={onClose}
    //   name="close"
    //   className="dark:text-white text-black cursor-pointer"
    // />
    _react.default.createElement(_io.IoMdClose, {
      className: "dark:text-white text-black cursor-pointer",
      onClick: onClose
    }));
  };
  const modalContent = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderHeader(), /*#__PURE__*/_react.default.createElement("section", {
    className: contentDimensions ? `ohif-scrollbar dark:bg-primary-dark bg-secondary-light overflow-y-auto ${contentDimensions}` : 'ohif-scrollbar modal-contents dark:bg-primary-dark bg-secondary-light overflow-y-auto telerapp-scrollbar rounded-bl rounded-br px-[20px] pt-2 pb-[20px]'
  }, children));
  return /*#__PURE__*/_react.default.createElement(_reactModal.default, {
    className:
    // containerDimensions
    //   ? `relative dark:text-white text-black outline-none ${containerDimensions} lg:w-10/12 xl:w-1/2`
    //   : 'relative max-h-full w-11/12 dark:text-white text-black outline-none lg:w-10/12 xl:w-9/12'
    'relative max-h-full w-11/12 dark:text-white text-black outline-none lg:w-10/12 xl:w-9/12',
    overlayClassName: movable ? 'fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center py-16 pointer-events-none' : 'fixed top-0 left-0 right-0 bottom-0 z-50 bg-overlay flex items-center justify-center py-16',
    shouldCloseOnEsc: shouldCloseOnEsc,
    onRequestClose: handleClose,
    isOpen: isOpen,
    title: title,
    shouldCloseOnOverlayClick: shouldCloseOnOverlayClick
  }, movable ? /*#__PURE__*/_react.default.createElement(_reactDraggable.default, {
    handle: ".drag-handle",
    defaultClassName: "dark:bg-primary-dark bg-primary-light pointer-events-auto"
  }, /*#__PURE__*/_react.default.createElement("div", null, modalContent)) : modalContent);
};
Modal.propTypes = {
  closeButton: _propTypes.default.bool,
  shouldCloseOnEsc: _propTypes.default.bool,
  isOpen: _propTypes.default.bool,
  title: _propTypes.default.string,
  onClose: _propTypes.default.func,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  shouldCloseOnOverlayClick: _propTypes.default.bool,
  movable: _propTypes.default.bool,
  containerDimensions: _propTypes.default.string,
  contentDimensions: _propTypes.default.string
};
var _default = exports.default = Modal;