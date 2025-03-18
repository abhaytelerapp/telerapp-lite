"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _b_Annotation = _interopRequireDefault(require("../image/icon/lite/b_Annotation.png"));
var _openfile = _interopRequireDefault(require("../image/icon/lite/openfile.png"));
var _left = _interopRequireDefault(require("../image/icon/lite/left.png"));
var _b_Pan = _interopRequireDefault(require("../image/icon/lite/b_Pan.png"));
var _b_Scroll = _interopRequireDefault(require("../image/icon/lite/b_Scroll.png"));
var _b_LayoutWithinViewport = _interopRequireDefault(require("../image/icon/lite/b_LayoutWithinViewport.png"));
var _b_Transformations = _interopRequireDefault(require("../image/icon/lite/b_Transformations.png"));
var _b_FlipHorizontally = _interopRequireDefault(require("../image/icon/lite/b_FlipHorizontally.png"));
var _b_FlipVertically = _interopRequireDefault(require("../image/icon/lite/b_FlipVertically.png"));
var _b_Rotate90DegreesClockwise = _interopRequireDefault(require("../image/icon/lite/b_Rotate 90 degrees clockwise.png"));
var _b_Rotate_ = _interopRequireDefault(require("../image/icon/lite/b_Rotate_0.png"));
var _b_Rotate_2 = _interopRequireDefault(require("../image/icon/lite/b_Rotate_90.png"));
var _b_Rotate_i = _interopRequireDefault(require("../image/icon/lite/b_Rotate_i90.png"));
var _b_Zoom = _interopRequireDefault(require("../image/icon/lite/b_Zoom.png"));
var _b_InvertGrayscale = _interopRequireDefault(require("../image/icon/lite/b_InvertGrayscale.png"));
var _b_DisplayReset = _interopRequireDefault(require("../image/icon/lite/b_DisplayReset.png"));
var _b_CinePlay = _interopRequireDefault(require("../image/icon/lite/b_CinePlay.png"));
var _fist = _interopRequireDefault(require("../image/icon/lite/fist0.png"));
var _b_ShowReport = _interopRequireDefault(require("../image/icon/lite/b_ShowReport.png"));
var _b_Window_Presets_left = _interopRequireDefault(require("../image/icon/lite/b_Window_Presets_left.png"));
var _b_Window_Presets_right = _interopRequireDefault(require("../image/icon/lite/b_Window_Presets_right.png"));
var _b_unlinkTranslationSynchronization = _interopRequireDefault(require("../image/icon/lite/b_unlink translation synchronization.png"));
var _M = _interopRequireDefault(require("../image/icon/lite/M.png"));
var _b_trashcan = _interopRequireDefault(require("../image/icon/lite/b_trashcan.png"));
var _X = _interopRequireDefault(require("../image/icon/lite/X.png"));
var _b_Eraser = _interopRequireDefault(require("../image/icon/lite/b_Eraser.png"));
var _b_DistanceMeasurement = _interopRequireDefault(require("../image/icon/lite/b_DistanceMeasurement.png"));
var _b_AngleMeasurement = _interopRequireDefault(require("../image/icon/lite/b_AngleMeasurement.png"));
var _b_AngleMeasurement2 = _interopRequireDefault(require("../image/icon/lite/b_AngleMeasurement2.png"));
var _b_RectMeasurement = _interopRequireDefault(require("../image/icon/lite/b_RectMeasurement.png"));
var _b_CircleMeasurement = _interopRequireDefault(require("../image/icon/lite/b_CircleMeasurement.png"));
var _irregular = _interopRequireDefault(require("../image/icon/lite/irregular.png"));
var _b_arrow = _interopRequireDefault(require("../image/icon/lite/b_arrow.png"));
var _T = _interopRequireDefault(require("../image/icon/lite/T.png"));
var _b_CineTools = _interopRequireDefault(require("../image/icon/lite/b_CineTools.png"));
var _download_img = _interopRequireDefault(require("../image/icon/lite/download_img.png"));
var _download_dcm = _interopRequireDefault(require("../image/icon/lite/download_dcm.png"));
var _edit_patient = _interopRequireDefault(require("../image/icon/lite/edit_patient.png"));
var _quantumLogo = _interopRequireDefault(require("../image/icon/lite/quantum-logo.png"));
var _telerapp_logo = _interopRequireDefault(require("../image/icon/lite/telerapp_logo.png"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Viewer = () => {
  const [isFullscreen, setIsFullscreen] = (0, _react.useState)(false);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Request fullscreen on the document (or any element)
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen mode:", err);
      });
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      document.exitFullscreen().catch(err => {
        console.error("Error attempting to exit fullscreen mode:", err);
      });
      setIsFullscreen(false);
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      backgroundColor: "#000000"
    },
    onWheel: () => {}
  }, /*#__PURE__*/_react.default.createElement("header", {
    className: "page-header",
    id: "page-header",
    style: {
      padding: "5px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "5px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
    id: "left_span"
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img pdf ecg",
    id: "returnHomePage",
    src: _left.default,
    style: {
      filter: "invert(80%)",
      width: "20px",
      height: "20px",
      cursor: "pointer"
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "center",
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    id: "icon-list",
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    id: "openFile_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img pdf ecg",
    type: "file",
    alt: "Open File",
    id: "openFile",
    src: _openfile.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "MouseOperation_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img VR MPR SEG",
    alt: "Move & Zoom",
    id: "MouseOperation",
    src: _b_Pan.default,
    width: "30",
    height: "30",
    style: {
      filter: "invert(80%)",
      border: "none"
    }
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "b_Scroll_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img MPR",
    alt: "Scroll",
    id: "b_Scroll",
    src: _b_Scroll.default,
    width: "30",
    height: "30",
    style: {
      filter: "invert(80%)"
    }
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "SplitParent",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img",
    alt: "Split Screen",
    id: "SplitWindow",
    src: _b_LayoutWithinViewport.default,
    width: "30",
    height: "30",
    style: {
      filter: "invert(80%)"
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "openSplitWindowDiv",
    className: "drawer",
    style: {
      position: "absolute",
      left: 0,
      whiteSpace: "nowrap",
      zIndex: 100,
      width: 500,
      display: "none"
    }
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "TransformationsImgParent",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img",
    id: "openTransformationsImg",
    alt: "Transformations",
    src: _b_Transformations.default,
    width: "30",
    height: "30"
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "openTransformationsDiv",
    className: "drawer",
    style: {
      position: "absolute",
      left: 0,
      whiteSpace: "nowrap",
      zIndex: 100,
      width: 500,
      display: "none",
      backgroundColor: "black"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    id: "horizontal_flip_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "Horizontal Flip",
    className: "innerimg",
    loading: "lazy",
    id: "horizontal_flip",
    src: _b_FlipHorizontally.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "vertical_flip_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "Vertical Flip",
    className: "innerimg",
    loading: "lazy",
    id: "vertical_flip",
    src: _b_FlipVertically.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "MouseRotate_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "innerimg",
    loading: "lazy",
    alt: "rotate",
    id: "MouseRotate",
    src: _b_Rotate90DegreesClockwise.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", {
    id: "rotate0_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "innerimg",
    loading: "lazy",
    alt: "rotate 0",
    id: "Rotate_0",
    src: _b_Rotate_.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "rotatei90_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "innerimg",
    loading: "lazy",
    alt: "rotate 90",
    id: "Rotate_i90",
    src: _b_Rotate_2.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "rotate90_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "innerimg filpx",
    loading: "lazy",
    alt: "rotate 90",
    id: "Rotate_90",
    src: _b_Rotate_i.default,
    width: "30",
    height: "30"
  })))), /*#__PURE__*/_react.default.createElement("span", {
    className: "WindowRevisionParent",
    style: {
      width: "2%",
      display: "flex"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    id: "WindowRevision_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "cropimg VR MPR SEG",
    alt: "Window Level",
    id: "WindowRevision",
    src: _b_Window_Presets_left.default,
    width: "30",
    height: "30",
    style: {
      filter: "invert(80%)"
    }
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "WindowRevisionOption_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "cropimg VR MPR SEG",
    alt: "Window Level",
    id: "WindowRevisionOption",
    src: _b_Window_Presets_right.default,
    width: "12",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("div", {
    id: "openWindowRevisionDiv",
    className: "drawer",
    style: {
      position: "absolute",
      left: 0,
      whiteSpace: "nowrap",
      zIndex: 100,
      width: 500,
      display: "none"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "WindowSelect",
    id: "WindowDefault"
  }, "Default"), /*#__PURE__*/_react.default.createElement("div", {
    className: "WindowSelect",
    id: "WindowCustom"
  }, "Custom"), /*#__PURE__*/_react.default.createElement("div", {
    className: "WindowSelect",
    id: "WindowAbdomen",
    wc: "60",
    ww: "400"
  }, "Abdomen(60,400)"), /*#__PURE__*/_react.default.createElement("div", {
    className: "WindowSelect",
    id: "WindowAngio",
    wc: "300",
    ww: "600"
  }, "Angio(300,600)"), /*#__PURE__*/_react.default.createElement("div", {
    className: "WindowSelect",
    id: "WindowBone",
    wc: "300",
    ww: "1500"
  }, "Bone(300,1500)"), /*#__PURE__*/_react.default.createElement("div", {
    className: "WindowSelect",
    id: "WindowBrain",
    wc: "40",
    ww: "80"
  }, "Brain(40,80)"), /*#__PURE__*/_react.default.createElement("div", {
    className: "WindowSelect",
    id: "WindowChest",
    wc: "40",
    ww: "400"
  }, "Chest(40,400)"), /*#__PURE__*/_react.default.createElement("div", {
    className: "WindowSelect",
    id: "WindowLungs",
    wc: "-400",
    ww: "1500"
  }, "Lungs(-400,1500)"))), /*#__PURE__*/_react.default.createElement("span", {
    id: "zoom_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img",
    alt: "Zoom",
    id: "zoom",
    src: _b_Zoom.default,
    width: "30",
    height: "30",
    style: {
      filter: "invert(80%)"
    }
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "color_invert_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img",
    alt: "Color Invert",
    id: "color_invert",
    src: _b_InvertGrayscale.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "unlink_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img",
    altzhtw: "\u540C\u6B65\u64CD\u4F5C",
    alt: "Synchronous Operation",
    id: "unlink",
    src: _b_unlinkTranslationSynchronization.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "reset_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img",
    alt: "Restore Img",
    id: "resetImg",
    src: _b_DisplayReset.default,
    width: "30",
    height: "30",
    style: {
      filter: "invert(80%)"
    }
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "MeasureImgParent",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img",
    id: "openMeasureImg",
    altzhtw: "\u6E2C\u91CF",
    alt: "Measure",
    src: _M.default,
    width: "30",
    height: "30"
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "openMeasureDIv",
    className: "drawer",
    style: {
      position: "absolute",
      left: 0,
      whiteSpace: "nowrap",
      zIndex: 100,
      width: 500,
      display: "none",
      backgroundColor: "black"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    id: "removeAllRuler_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "remove all",
    altzhtw: "\u6E05\u9664\u6240\u6709\u6E2C\u91CF",
    className: "innerimg",
    loading: "lazy",
    id: "removeAllRuler",
    src: _b_trashcan.default,
    width: "30",
    height: "30",
    style: {
      filter: "invert(80%)"
    }
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "removeRuler_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "remove",
    altzhtw: "\u6E05\u9664\u6E2C\u91CF",
    className: "innerimg",
    loading: "lazy",
    id: "removeRuler",
    src: _X.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "eraseRuler_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "eraser",
    altzhtw: "\u6A61\u76AE\u64E6",
    className: "innerimg",
    loading: "lazy",
    id: "eraseRuler",
    src: _b_Eraser.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "MeasureRuler_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "measure",
    altzhtw: "\u6E2C\u91CF",
    className: "innerimg",
    loading: "lazy",
    id: "MeasureRuler",
    src: _b_DistanceMeasurement.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "AngleRuler_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "angle",
    altzhtw: "\u89D2\u5EA6",
    className: "innerimg",
    loading: "lazy",
    id: "AngleRuler",
    src: _b_AngleMeasurement.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", {
    id: "AngleRuler_span2",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "angle",
    altzhtw: "\u89D2\u5EA6",
    className: "innerimg",
    loading: "lazy",
    id: "AngleRuler2",
    src: _b_AngleMeasurement2.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "RectRuler_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "Rect shape",
    altzhtw: "\u77E9\u5F62",
    className: "innerimg",
    loading: "lazy",
    id: "RectRuler",
    src: _b_RectMeasurement.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "CircleRuler_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "Circle shape",
    altzhtw: "\u5713\u5F62",
    className: "innerimg",
    loading: "lazy",
    id: "CircleRuler",
    src: _b_CircleMeasurement.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "IrregularRuler_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "irregular shape",
    altzhtw: "\u4E0D\u898F\u5247\u5F62\u72C0",
    className: "innerimg",
    loading: "lazy",
    id: "IrregularRuler",
    src: _irregular.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", {
    id: "arrowRuler_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "arrow",
    altzhtw: "\u7BAD\u982D",
    className: "innerimg",
    loading: "lazy",
    id: "ArrowRuler",
    src: _b_arrow.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "TextAnnotation_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "text annotation",
    altzhtw: "\u6587\u5B57\u8A3B\u89E3",
    className: "innerimg",
    loading: "lazy",
    id: "TextAnnotation",
    src: _T.default,
    width: "30",
    height: "30"
  })))), /*#__PURE__*/_react.default.createElement("span", {
    id: "playvideo_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img",
    loading: "lazy",
    alt: "Cine",
    id: "playvideo",
    src: _b_CinePlay.default,
    width: "30",
    height: "30",
    style: {
      filter: "invert(80%)"
    }
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "MarkButton_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img VR MPR",
    loading: "lazy",
    alt: "Display Mark",
    id: "MarkButton",
    src: _fist.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "annotation_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img",
    loading: "lazy",
    alt: "Annotation",
    id: "annotation",
    src: _b_Annotation.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "MarkupImg_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img VR MPR RTSS",
    loading: "lazy",
    alt: "Markup & Annotation",
    id: "MarkupImg",
    src: _b_ShowReport.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "OtherImgParent",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img",
    loading: "lazy",
    altzhtw: "\u5176\u4ED6",
    alt: "other",
    id: "OtherImg",
    src: _b_CineTools.default,
    width: "30",
    height: "30"
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "othereDIv",
    className: "drawer",
    style: {
      position: "absolute",
      left: 0,
      whiteSpace: "nowrap",
      zIndex: 100,
      width: 500,
      display: "none",
      backgroundColor: "black"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    id: "clearViewport_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    altzhtw: "\u6E05\u9664\u8996\u7A97",
    alt: "clear viewport",
    className: "innerimg",
    loading: "lazy",
    id: "clearviewportImg",
    src: _b_trashcan.default,
    width: "30",
    height: "30",
    style: {
      filter: "invert(80%)"
    }
  })), " ", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", {
    id: "downloadImg_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    altzhtw: "\u4E0B\u8F09\u5716\u7247",
    alt: "download image",
    className: "innerimg",
    loading: "lazy",
    id: "downloadImg",
    src: _download_img.default,
    width: "30",
    height: "30"
  })), " ", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", {
    id: "downloadDcm_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    altzhtw: "\u4E0B\u8F09DICOM",
    alt: "download DICOM",
    className: "innerimg",
    loading: "lazy",
    id: "downloadDcm",
    src: _download_dcm.default,
    width: "30",
    height: "30"
  })))))), /*#__PURE__*/_react.default.createElement("span", {
    id: "rwdImgTag_span",
    style: {
      verticalAlign: "super"
    }
  }, " ", /*#__PURE__*/_react.default.createElement("img", {
    className: "img VR MPR XML PEN",
    alt: "RWD",
    loading: "lazy",
    id: "rwdImgTag",
    src: _b_CineTools.default,
    style: {
      display: "none"
    },
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      filter: "invert(80%)",
      display: "flex",
      alignItems: "center",
      marginRight: "10px",
      fontSize: "22px",
      cursor: "pointer"
    },
    id: "fullScreen",
    onClick: toggleFullscreen
  }, isFullscreen ? /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-compress"
  }) : /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-expand"
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      filter: "invert(80%)",
      display: "flex",
      alignItems: "center",
      marginRight: "10px",
      fontSize: "22px",
      cursor: "pointer"
    },
    id: "darkLightMode"
    // onClick={toggleFullscreen}
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-moon"
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      width: "40px"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "",
    alt: "Report Editor",
    loading: "lazy",
    id: "reportEditor",
    src: _edit_patient.default,
    style: {
      filter: "invert(80%)"
    },
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("img", {
    className: "",
    alt: "",
    loading: "lazy",
    id: "quantume",
    src: _quantumLogo.default,
    style: {
      width: "112px"
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    id: "MarkStyleDiv",
    style: {
      backgroundColor: "#00306044"
    },
    className: "drawer"
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: "#ffffff"
    },
    id: "markColorLabel"
  }, "Color\uFF1A"), /*#__PURE__*/_react.default.createElement("select", {
    id: "MarkcolorSelect",
    defaultValue: "Auto"
  }, /*#__PURE__*/_react.default.createElement("option", {
    id: "AutoColorSelect",
    value: "Auto"
  }, "Auto"), /*#__PURE__*/_react.default.createElement("option", {
    id: "WhiteSelect",
    value: "White"
  }, "White"), /*#__PURE__*/_react.default.createElement("option", {
    id: "RedSelect",
    value: "Red"
  }, "Red"), /*#__PURE__*/_react.default.createElement("option", {
    id: "BlueSelect",
    value: "Blue"
  }, "Blue"), /*#__PURE__*/_react.default.createElement("option", {
    id: "GreenSelect",
    value: "Green"
  }, "Green"), /*#__PURE__*/_react.default.createElement("option", {
    id: "YellowSelect",
    value: "Yellow"
  }, "Yellow"), /*#__PURE__*/_react.default.createElement("option", {
    id: "BrownSelect",
    value: "Brown"
  }, "Brown"), /*#__PURE__*/_react.default.createElement("option", {
    id: "OrangeSelect",
    value: "Orange"
  }, "Orange"), /*#__PURE__*/_react.default.createElement("option", {
    id: "PurpleSelect",
    value: "Purple"
  }, "Purple")), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: "#ffffff"
    },
    id: "markAlphaLabel"
  }, "Alpha", /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "markAlphaText",
    defaultValue: "35"
  })), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: "#ffffff"
    },
    id: "markSizeLabel"
  }, "Size", /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "markSizeText",
    defaultValue: "0.45"
  })), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: "#ffffff"
    },
    id: "markFillLabel"
  }, "Fill", /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    defaultChecked: true,
    name: "markFillLabel",
    id: "markFillCheck"
  })), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: "#ffffff"
    },
    id: "TableLabel"
  }, "Table\uFF1A"), /*#__PURE__*/_react.default.createElement("select", {
    id: "TableSelect",
    defaultValue: "None"
  }, /*#__PURE__*/_react.default.createElement("option", {
    id: "TableSelectNone",
    value: "None"
  }, "None"), /*#__PURE__*/_react.default.createElement("option", {
    id: "DICOMTagsSelect",
    value: "DICOMTags"
  }, "DICOMTags"), /*#__PURE__*/_react.default.createElement("option", {
    id: "AIMSelect",
    value: "AIM"
  }, "AIM"))), /*#__PURE__*/_react.default.createElement("span", {
    id: "WindowLevelDiv_span"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "WindowLevelDiv",
    style: {
      backgroundColor: "#33666644"
    },
    className: "drawer"
  }, /*#__PURE__*/_react.default.createElement("font", {
    color: "white",
    id: "myWC"
  }, "WC\uFF1A"), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "textWC",
    defaultValue: "520"
  }), /*#__PURE__*/_react.default.createElement("font", {
    color: "white",
    id: "myWW"
  }, "WW\uFF1A"), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "textWW",
    defaultValue: "50"
  }))), /*#__PURE__*/_react.default.createElement("font", {
    color: "white",
    className: "drawer",
    id: "labelZoom"
  }, "Zoom\uFF1A"), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    className: "drawer",
    id: "textZoom",
    value: "200"
  }), /*#__PURE__*/_react.default.createElement("font", {
    color: "white",
    className: "drawer",
    id: "labelPlay"
  }, "fps\uFF1A"), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    className: "drawer",
    id: "textPlay",
    value: "15"
  }), /*#__PURE__*/_react.default.createElement("span", {
    id: "span_TextAnnotation",
    style: {
      display: "none"
    }
  }, /*#__PURE__*/_react.default.createElement("font", {
    color: "white",
    id: "label_TextAnnotation"
  }, "Text\uFF1A"), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "text_TextAnnotation",
    value: "text"
  })), /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    id: "myfile",
    multiple: "multiple"
    //   ref={fileInputRef}
    ,
    style: {
      display: "none"
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    id: "loader",
    style: {
      zIndex: "999999999",
      width: "100%",
      height: "100vh",
      backgroundColor: "#000"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "custom-size",
    src: _telerapp_logo.default,
    style: {
      width: "192px"
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "12rem"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "loading"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "infinite-loading-bar-quantum-lite"
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group",
    id: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "control-label col-sm-1",
    htmlFor: "wadoURL"
  }, "\xA0"), /*#__PURE__*/_react.default.createElement("div", {
    id: "container",
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "LeftPicture",
    style: {
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      zIndex: 9
      // width: 100,
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "pages"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "page",
    id: "DicomPage"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "page",
    id: "PdfPage",
    style: {
      display: "none"
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "page",
    id: "EcgPage",
    style: {
      display: "none"
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "report-editor-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "toolbar",
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement("select", {
    id: "templateSelect"
  }), /*#__PURE__*/_react.default.createElement("button", {
    id: "openModal",
    className: "btn"
  }, "Attachment"), /*#__PURE__*/_react.default.createElement("button", {
    id: "openClinicalModel",
    className: "button"
  }, "Clinical History")), /*#__PURE__*/_react.default.createElement("div", {
    className: "editor_table",
    style: {
      height: "90%"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "toolbar-container"
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "editor"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "controls",
    style: {
      display: "flex",
      gap: "12px"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    id: "submitBtn"
  }, "Submit"), /*#__PURE__*/_react.default.createElement("button", {
    id: "draftBtn"
  }, "Draft"), /*#__PURE__*/_react.default.createElement("button", {
    id: "criticalBtn"
  }, "Critical"), /*#__PURE__*/_react.default.createElement("button", {
    id: "discardBtn"
  }, "Discard"), /*#__PURE__*/_react.default.createElement("button", {
    id: "captureBtn"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-camera",
    style: {
      fontSize: 15
    }
  })), /*#__PURE__*/_react.default.createElement("button", {
    id: "downloadPDF"
  }, " ", /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-file-arrow-down",
    style: {
      fontSize: 15
    }
  }))))), /*#__PURE__*/_react.default.createElement("div", {
    id: "attachmentModal",
    className: "modal"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Attachment"), /*#__PURE__*/_react.default.createElement("button", {
    id: "closeModal"
  }, "X")), /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/_react.default.createElement("p", {
    id: "patientName"
  }, "Patient: "), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    id: "fileInput",
    accept: ".pdf, .png, .jpg, .doc, .docx, .mp4",
    style: {
      width: "100%"
    }
  }), /*#__PURE__*/_react.default.createElement("button", {
    id: "uploadDocument"
  }, "Upload")), /*#__PURE__*/_react.default.createElement("table", {
    id: "documentTable"
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Document Name"), /*#__PURE__*/_react.default.createElement("th", null, "Preview"), /*#__PURE__*/_react.default.createElement("th", null, "Remove"))), /*#__PURE__*/_react.default.createElement("tbody", {
    id: "documentList"
  }))))), /*#__PURE__*/_react.default.createElement("div", {
    id: "clinicalHistoryModal",
    className: "modal"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Clinical History")), /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/_react.default.createElement("p", {
    id: "patientNameDisplay"
  }), /*#__PURE__*/_react.default.createElement("textarea", {
    id: "clinicalHistory",
    className: "textarea",
    rows: "4",
    placeholder: "Enter Clinical History"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-buttons"
  }, /*#__PURE__*/_react.default.createElement("button", {
    id: "handleClinicalHistoryChange",
    style: {
      fontSize: "0.75rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      paddingRight: "0.75rem",
      paddingLeft: "0.75rem"
    }
  }, "Save"), /*#__PURE__*/_react.default.createElement("button", {
    id: "closeClinicalModal"
  }, "Cancel")))))), /*#__PURE__*/_react.default.createElement("div", {
    id: "popupOverlay"
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "previewPopup"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Attachment Preview"), /*#__PURE__*/_react.default.createElement("button", {
    id: "closePreview"
  }, "X")), /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "100%",
      height: "72vh"
    }
  }, /*#__PURE__*/_react.default.createElement("iframe", {
    id: "previewIframe",
    title: "Attachment Preview"
  }))))), /*#__PURE__*/_react.default.createElement("div", {
    id: "magnifierDiv",
    style: {
      zIndex: 40,
      position: "absolute",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/_react.default.createElement("canvas", {
    id: "magnifierCanvas"
  })));
};
var _default = exports.default = Viewer;