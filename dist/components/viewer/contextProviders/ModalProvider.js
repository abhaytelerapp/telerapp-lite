"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withModal = exports.useModal = exports.default = exports.ModalConsumer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _reactI18next = require("react-i18next");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ModalContext = /*#__PURE__*/(0, _react.createContext)(null);
const {
  Provider
} = ModalContext;
console.log(ModalContext, ';ModalContext');
console.log(Provider, ';Provider');
const useModal = () => (0, _react.useContext)(ModalContext);

/**
 * UI Modal
 *
 * @typedef {Object} ModalProps
 * @property {ReactElement|HTMLElement} [content=null] Modal content.
 * @property {Object} [contentProps=null] Modal content props.
 * @property {boolean} [shouldCloseOnEsc=true] Modal is dismissible via the esc key.
 * @property {boolean} [isOpen=true] Make the Modal visible or hidden.
 * @property {boolean} [closeButton=true] Should the modal body render the close button.
 * @property {string} [title=null] Should the modal render the title independently of the body content.
 * @property {string} [customClassName=null] The custom class to style the modal.
 */
exports.useModal = useModal;
const ModalProvider = _ref => {
  let {
    children,
    modal: Modal,
    service = null
  } = _ref;
  const DEFAULT_OPTIONS = {
    content: null,
    contentProps: null,
    shouldCloseOnEsc: true,
    shouldCloseOnOverlayClick: true,
    isOpen: true,
    closeButton: true,
    title: null,
    customClassName: '',
    movable: false,
    containerDimensions: null,
    contentDimensions: null
  };
  const {
    t
  } = (0, _reactI18next.useTranslation)('Modals');
  const [options, setOptions] = (0, _react.useState)(DEFAULT_OPTIONS);

  /**
   * Show the modal and override its configuration props.
   *
   * @param {ModalProps} props { content, contentProps, shouldCloseOnEsc, isOpen, closeButton, title, customClassName }
   * @returns void
   */
  const show = (0, _react.useCallback)(props => setOptions({
    ...options,
    ...props
  }), [options]);

  /**
   * Hide the modal and set its properties to default.
   *
   * @returns void
   */
  const hide = (0, _react.useCallback)(() => {
    setOptions(DEFAULT_OPTIONS);
  }, [DEFAULT_OPTIONS]);

  /**
   * Sets the implementation of a modal service that can be used by extensions.
   *
   * @returns void
   */
  (0, _react.useEffect)(() => {
    if (service) {
      service.setServiceImplementation({
        hide,
        show
      });
    }
  }, [hide, service, show]);
  const {
    content: ModalContent,
    contentProps,
    isOpen,
    title,
    customClassName,
    shouldCloseOnEsc,
    closeButton,
    shouldCloseOnOverlayClick,
    movable,
    containerDimensions,
    contentDimensions
  } = options;
  return /*#__PURE__*/_react.default.createElement(Provider, {
    value: {
      show,
      hide
    }
  }, ModalContent && /*#__PURE__*/_react.default.createElement(Modal, {
    className: (0, _classnames.default)(customClassName, ModalContent.className),
    shouldCloseOnEsc: shouldCloseOnEsc,
    isOpen: isOpen,
    title: t(title),
    closeButton: closeButton,
    onClose: hide,
    shouldCloseOnOverlayClick: shouldCloseOnOverlayClick,
    movable: movable,
    containerDimensions: containerDimensions,
    contentDimensions: contentDimensions
  }, /*#__PURE__*/_react.default.createElement(ModalContent, _extends({}, contentProps, {
    show: show,
    hide: hide
  }))), children);
};

/**
 * Higher Order Component to use the modal methods through a Class Component.
 *
 * @returns
 */
const withModal = Component => {
  return function WrappedComponent(props) {
    const {
      show,
      hide
    } = useModal();
    return /*#__PURE__*/_react.default.createElement(Component, _extends({}, props, {
      modal: {
        show,
        hide
      }
    }));
  };
};
exports.withModal = withModal;
ModalProvider.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  modal: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node, _propTypes.default.func]).isRequired,
  service: _propTypes.default.shape({
    setServiceImplementation: _propTypes.default.func
  })
};
var _default = exports.default = ModalProvider;
const ModalConsumer = exports.ModalConsumer = ModalContext.Consumer;