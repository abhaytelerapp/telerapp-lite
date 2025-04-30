"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PreviewPdf = data => {
  const [imageData, setImageData] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(true);
  const [error, setError] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    const fetchImage = async () => {
      try {
        // Fetch the image as a blob
        // const response = await fetch(`https://telerappdevattachments.s3.ap-south-1.amazonaws.com/documents/1730970153986-padmakar-chopakar%20%20%281%29.pdf`);
        const response = await fetch(`${data.previewUrl}`);

        // Check if the response is ok (status code 200)
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        // Convert the response to a blob
        const imageBlob = await response.blob();

        // Create a temporary URL for the image blob
        const imageUrl = URL.createObjectURL(imageBlob);

        // Set the image URL in state
        setImageData(imageUrl);
      } catch (err) {
        // If an error occurs, update the error state
        setError("Failed to load image");
        console.error(err);
      } finally {
        // Set loading to false once the image is loaded or failed
        setLoading(false);
      }
    };
    fetchImage();
  }, []);

  // If the image is still loading
  if (loading) {
    return /*#__PURE__*/_react.default.createElement("div", null, "Loading image...");
  }

  // If there was an error fetching the image
  if (error) {
    return /*#__PURE__*/_react.default.createElement("div", null, error);
  }

  // Render the image once it is successfully fetched
  return /*#__PURE__*/_react.default.createElement("div", {
    className: " w-full h-[70vh]"
  }, /*#__PURE__*/_react.default.createElement("iframe", {
    key: Math.random(),
    src: imageData,
    className: "h-full w-full",
    title: "Attachment Preview"
  }));
};
var _default = exports.default = PreviewPdf;