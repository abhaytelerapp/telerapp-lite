"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _PortalTooltipCard = _interopRequireDefault(require("./PortalTooltipCard"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const portalNodes = {};

/**
 * A portal based tooltip component.
 *
 * This component has been repurposed and modified
 * for OHIF usage: https://github.com/romainberger/react-portal-tooltip
 */
class PortalTooltip extends _react.default.Component {
  static propTypes = (() => ({
    parent: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]).isRequired,
    active: _propTypes.default.bool,
    group: _propTypes.default.string,
    tooltipTimeout: _propTypes.default.number
  }))();
  static defaultProps = {
    active: false,
    group: 'main',
    tooltipTimeout: 0
  };
  createPortal() {
    portalNodes[this.props.group] = {
      node: document.createElement('div'),
      timeout: false
    };
    portalNodes[this.props.group].node.className = 'ToolTipPortal';
    document.body.appendChild(portalNodes[this.props.group].node);
  }
  renderPortal(props) {
    if (!portalNodes[this.props.group]) {
      this.createPortal();
    }
    const {
      parent,
      ...other
    } = props;
    const parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent;
    _reactDom.default.render(/*#__PURE__*/_react.default.createElement(_PortalTooltipCard.default, _extends({
      parentEl: parentEl
    }, other)), portalNodes[this.props.group].node);
  }
  componentDidMount() {
    if (!this.props.active) {
      return;
    }
    this.renderPortal(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (!portalNodes[this.props.group] && !nextProps.active || !this.props.active && !nextProps.active) {
      return;
    }
    const props = {
      ...nextProps
    };
    const newProps = {
      ...nextProps
    };
    if (portalNodes[this.props.group] && portalNodes[this.props.group].timeout) {
      clearTimeout(portalNodes[this.props.group].timeout);
    }
    if (this.props.active && !props.active) {
      newProps.active = true;
      portalNodes[this.props.group].timeout = setTimeout(() => {
        props.active = false;
        this.renderPortal(props);
      }, this.props.tooltipTimeout);
    }
    this.renderPortal(newProps);
  }
  componentWillUnmount() {
    if (portalNodes[this.props.group]) {
      // Todo: move this to root.unmount
      _reactDom.default.unmountComponentAtNode(portalNodes[this.props.group].node);
      clearTimeout(portalNodes[this.props.group].timeout);
      try {
        document.body.removeChild(portalNodes[this.props.group].node);
      } catch (e) {}
      portalNodes[this.props.group] = null;
    }
  }
  render() {
    return null;
  }
}
exports.default = PortalTooltip;