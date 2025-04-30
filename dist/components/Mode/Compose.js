"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Compose;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Nests React components as ordered in array. We use this to
 * simplify composition a Mode specify's in it's configuration
 * for React Contexts that should wrap a Mode Route.
 */
function Compose(props) {
  const {
    components = [],
    children
  } = props;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, components.reduceRight((acc, curr) => {
    const [Comp, props] = Array.isArray(curr) ? [curr[0], curr[1]] : [curr, {}];
    return /*#__PURE__*/_react.default.createElement(Comp, props, acc);
  }, children));
}

// https://juliuskoronci.medium.com/avoid-a-long-list-of-react-providers-c45a269d80c1
Compose.propTypes = {
  components: _propTypes.default.array,
  children: _propTypes.default.node.isRequired
};