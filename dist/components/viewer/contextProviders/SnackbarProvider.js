"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withSnackbar = exports.useSnackbar = exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _SnackbarTypes = _interopRequireDefault(require("../Snackbar/SnackbarTypes"));
var _SnackbarContainer = _interopRequireDefault(require("../Snackbar/SnackbarContainer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SnackbarContext = /*#__PURE__*/(0, _react.createContext)(null);
const useSnackbar = () => (0, _react.useContext)(SnackbarContext);
exports.useSnackbar = useSnackbar;
const SnackbarProvider = _ref => {
  let {
    children,
    service = null
  } = _ref;
  const DEFAULT_OPTIONS = {
    title: '',
    message: '',
    duration: 5000,
    autoClose: true,
    position: 'bottomRight',
    type: _SnackbarTypes.default.INFO
  };
  const [count, setCount] = (0, _react.useState)(1);
  const [snackbarItems, setSnackbarItems] = (0, _react.useState)([]);
  const show = (0, _react.useCallback)(options => {
    if (!options || !options.title && !options.message) {
      console.warn('Snackbar cannot be rendered without required parameters: title | message');
      return null;
    }
    const newItem = {
      ...DEFAULT_OPTIONS,
      ...options,
      id: count,
      visible: true
    };
    setSnackbarItems(state => [...state, newItem]);
    setCount(count + 1);
  }, [count, DEFAULT_OPTIONS]);
  const hide = (0, _react.useCallback)(id => {
    const hideItem = items => {
      const newItems = items.map(item => {
        if (item.id === id) {
          item.visible = false;
        }
        return item;
      });
      return newItems;
    };
    setSnackbarItems(state => hideItem(state));
    setTimeout(() => {
      setSnackbarItems(state => [...state.filter(item => item.id !== id)]);
    }, 1000);
  }, [setSnackbarItems]);
  const hideAll = () => {
    // reset count
    setCount(1);

    // remove all items from array
    setSnackbarItems(() => []);
  };
  if (typeof window !== 'undefined') {
    /**
     * expose snackbar methods to window for debug purposes
     * TODO: Check if it's really necessary
     */
    window.snackbar = {
      show,
      hide,
      hideAll
    };
  }

  /**
   * Sets the implementation of a notification service that can be used by extensions.
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
  }, [service, hide, show]);
  return /*#__PURE__*/_react.default.createElement(SnackbarContext.Provider, {
    value: {
      show,
      hide,
      hideAll,
      snackbarItems
    }
  }, !!snackbarItems && /*#__PURE__*/_react.default.createElement(_SnackbarContainer.default, null), children);
};
SnackbarProvider.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node, _propTypes.default.func]).isRequired,
  service: _propTypes.default.shape({
    setServiceImplementation: _propTypes.default.func
  })
};

/**
 *
 * High Order Component to use the snackbar methods through a Class Component
 *
 */
const withSnackbar = Component => {
  return function WrappedComponent(props) {
    const snackbarContext = {
      ...useSnackbar()
    };
    return /*#__PURE__*/_react.default.createElement(Component, _extends({}, props, {
      snackbarContext: snackbarContext
    }));
  };
};
exports.withSnackbar = withSnackbar;
var _default = exports.default = SnackbarProvider;