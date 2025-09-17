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
var _aiTechnology = _interopRequireDefault(require("../image/icon/lite/ai-technology.png"));
var _attachment = _interopRequireDefault(require("../image/icon/lite/attachment.png"));
var _clinical = _interopRequireDefault(require("../image/icon/lite/clinical.png"));
var _Tooltip = _interopRequireDefault(require("./Tooltip"));
var _index = _interopRequireDefault(require("./ReportEditor/index"));
var _reactResizable = require("react-resizable");
require("react-resizable/css/styles.css");
var _AiReportEditor = _interopRequireDefault(require("./AiReportEditor/AiReportEditor"));
var _RequestHandler = require("./ReportEditor/RequestHandler");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Viewer = props => {
  const [isFullscreen, setIsFullscreen] = (0, _react.useState)(false);
  const [isLeftClose, setIsLeftClose] = (0, _react.useState)(false);
  const [editorWidth, setEditorWidth] = (0, _react.useState)(450);
  const [data, setData] = (0, _react.useState)();
  const [token, setToken] = (0, _react.useState)("");
  (0, _react.useEffect)(() => {
    if (props) {
      setData(props?.props);
    }
  }, [props]);
  const [isModelOpen, setIsModelOpen] = (0, _react.useState)(false);
  const [toggleDisplayReportEditor, setToggleDisplayReportEditor] = (0, _react.useState)(false);
  const [toggleDisplayAiReportEditor, setToggleDisplayAiReportEditor] = (0, _react.useState)(false);
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
  const leftPannel = () => {
    setIsLeftClose(!isLeftClose);
    const outLeftImgs = document.querySelectorAll(".OutLeftImg");
    const leftPicture = document.querySelector("#LeftPicture");
    outLeftImgs.forEach(img => {
      img.style.display = img.style.display === "none" ? "flex" : "none";
    });
    if (leftPicture) {
      leftPicture.style.marginLeft = leftPicture.style.marginLeft === "-120px" ? "0px" : "-120px";
    }
  };
  const toggleDisplayReportEditorView = () => {
    setToggleDisplayReportEditor(show => !show);
    setIsModelOpen(false);
    setToggleDisplayAiReportEditor(false);
    const pages = document.getElementById("pages");
    pages.style.width = toggleDisplayReportEditor ? "75%" : "100%";
  };
  const toggleDisplayAiReportEditorView = () => {
    setToggleDisplayReportEditor(false);
    setToggleDisplayAiReportEditor(show => !show);
    setIsModelOpen(false);
    const pages = document.getElementById("pages");
    pages.style.width = toggleDisplayReportEditor ? "75%" : "100%";
  };

  // const getToken = async () => {
  //   try {
  //     const aToken = {
  //       token: data?.user.access_token,
  //     };
  //     const response = await userToken(aToken, data?.data);
  //     setToken(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (!data?.data) return; // <-- inside the useEffect now

  //   getToken();
  // }, [data?.data]);

  const hasAIEditorPermission = data?.user?.profile?.permission?.includes("AI Editor") || data?.user?.profile?.roleType?.includes("super-admin");
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
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "5%"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
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
      gap: "8px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
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
      display: "none",
      width: 100,
      backgroundColor: "black"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      gap: "5px"
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
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      gap: "5px"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
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
  })))))), /*#__PURE__*/_react.default.createElement("span", {
    className: "WindowRevisionParent",
    style: {
      display: "flex",
      position: "relative"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    id: "WindowRevision_span",
    style: {
      display: "flex",
      alignItems: "center"
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
      top: "45px",
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
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("img", {
    className: "img",
    id: "openMeasureImg",
    altzhtw: "\u6E2C\u91CF",
    alt: "Measure",
    src: _M.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "WindowRevisionOption_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "cropimg VR MPR SEG",
    alt: "Window Level",
    id: "openMeasureImgOption",
    src: _b_Window_Presets_right.default,
    width: "12",
    height: "30"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    id: "openMeasureDIv",
    className: "drawer",
    style: {
      position: "absolute",
      left: 0,
      whiteSpace: "nowrap",
      zIndex: 100,
      display: "none",
      backgroundColor: "black",
      width: 170
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      gap: "5px"
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
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "start",
      display: "flex",
      gap: "5px"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
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
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "start",
      display: "flex",
      gap: "5px"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
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
  })))))), /*#__PURE__*/_react.default.createElement("span", {
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
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("img", {
    className: "img",
    loading: "lazy",
    altzhtw: "\u5176\u4ED6",
    alt: "other",
    id: "OtherImg",
    src: _b_CineTools.default,
    width: "30",
    height: "30"
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "WindowRevisionOption_span",
    style: {
      verticalAlign: "super"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "cropimg VR MPR SEG",
    alt: "Window Level",
    id: "OtherImgParentOption",
    src: _b_Window_Presets_right.default,
    width: "12",
    height: "30"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    id: "othereDIv",
    className: "drawer",
    style: {
      position: "absolute",
      left: 0,
      whiteSpace: "nowrap",
      zIndex: 100,
      display: "none",
      backgroundColor: "black"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    id: "clearViewport_span",
    style: {
      verticalAlign: "super",
      display: "inline-block"
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
      verticalAlign: "super",
      display: "inline-block"
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
      verticalAlign: "super",
      display: "inline-block"
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
    className: "rightHeader"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      marginRight: "10px",
      fontSize: "22px",
      cursor: "pointer"
    },
    id: "fullScreen",
    onClick: toggleFullscreen
  }, isFullscreen ? /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "Exit Full Screen",
    position: "bottom"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-compress",
    style: {
      filter: "invert(80%)"
    }
  })) : /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "Full Screen",
    position: "bottom"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-expand",
    style: {
      filter: "invert(80%)"
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      marginRight: "10px",
      fontSize: "22px",
      cursor: "pointer"
    },
    id: "darkLightMode"
    // onClick={toggleFullscreen}
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "Light Mode",
    position: "bottom"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-moon",
    style: {
      filter: "invert(80%)"
    }
  }))), hasAIEditorPermission && /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "AI Report Editor",
    position: "bottom"
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "",
    alt: "AI Report Editor",
    loading: "lazy",
    id: "reportEditor",
    src: _aiTechnology.default,
    style: {
      filter: "invert(80%)",
      cursor: "pointer",
      verticalAlign: "middle",
      marginRight: "8px"
    },
    width: "24",
    height: "24",
    onClick: toggleDisplayAiReportEditorView
  })), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    text: "Report Editor",
    position: "bottom"
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "",
    alt: "Report Editor",
    loading: "lazy",
    id: "reportEditor",
    src: _edit_patient.default,
    style: {
      filter: "invert(80%)",
      cursor: "pointer",
      verticalAlign: "middle",
      marginTop: "3px"
    },
    width: "24",
    height: "24",
    onClick: toggleDisplayReportEditorView
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
      backgroundColor: "#282828",
      alignItems: "center",
      justifyContent: "space-around"
    },
    className: "drawer"
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }
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
    defaultValue: "Auto"
  }, "Auto"), /*#__PURE__*/_react.default.createElement("option", {
    id: "WhiteSelect",
    defaultValue: "White"
  }, "White"), /*#__PURE__*/_react.default.createElement("option", {
    id: "RedSelect",
    defaultValue: "Red"
  }, "Red"), /*#__PURE__*/_react.default.createElement("option", {
    id: "BlueSelect",
    defaultValue: "Blue"
  }, "Blue"), /*#__PURE__*/_react.default.createElement("option", {
    id: "GreenSelect",
    defaultValue: "Green"
  }, "Green"), /*#__PURE__*/_react.default.createElement("option", {
    id: "YellowSelect",
    defaultValue: "Yellow"
  }, "Yellow"), /*#__PURE__*/_react.default.createElement("option", {
    id: "BrownSelect",
    defaultValue: "Brown"
  }, "Brown"), /*#__PURE__*/_react.default.createElement("option", {
    id: "OrangeSelect",
    defaultValue: "Orange"
  }, "Orange"), /*#__PURE__*/_react.default.createElement("option", {
    id: "PurpleSelect",
    defaultValue: "Purple"
  }, "Purple"))), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    },
    id: "markAlphaLabel"
  }, "Alpha", /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "markAlphaText",
    defaultValue: "35"
  })), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    },
    id: "markSizeLabel"
  }, "Size", /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "markSizeText",
    defaultValue: "0.45"
  })), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    },
    id: "markFillLabel"
  }, "Fill", /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    defaultChecked: true,
    name: "markFillLabel",
    id: "markFillCheck"
  })), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: {
      color: "#ffffff"
    },
    id: "TableLabel"
  }, "Table\uFF1A"), /*#__PURE__*/_react.default.createElement("select", {
    id: "TableSelect",
    defaultValue: "None"
  }, /*#__PURE__*/_react.default.createElement("option", {
    id: "TableSelectNone",
    defaultValue: "None"
  }, "None"), /*#__PURE__*/_react.default.createElement("option", {
    id: "DICOMTagsSelect",
    defaultValue: "DICOMTags"
  }, "DICOMTags"), /*#__PURE__*/_react.default.createElement("option", {
    id: "AIMSelect",
    defaultValue: "AIM"
  }, "AIM")))), /*#__PURE__*/_react.default.createElement("span", {
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
    defaultValue: "200"
  }), /*#__PURE__*/_react.default.createElement("font", {
    color: "white",
    className: "drawer",
    id: "labelPlay"
  }, "fps\uFF1A"), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    className: "drawer",
    id: "textPlay",
    defaultValue: "15"
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
    defaultValue: "text"
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
    id: "loaderMain",
    style: {
      zIndex: "9999",
      width: "100%",
      height: "100%",
      backgroundColor: "#000",
      border: "2px #d4d4d4 groove",
      borderRadius: "4px"
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
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "container",
    className: "container01"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "LeftPicture",
    style: {
      // overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      zIndex: 9,
      maxWidth: "140px",
      width: "140px",
      marginRight: "8px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "leftPannelCloseOpen"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Studies"), isLeftClose ? /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-arrow-right left-icon",
    onClick: leftPannel
  }) : /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-arrow-left left-icon",
    onClick: leftPannel
  }))), /*#__PURE__*/_react.default.createElement("div", {
    id: "pages"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "page",
    id: "DicomPage",
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "loader",
    style: {
      zIndex: "999",
      width: "100%",
      height: "100%",
      backgroundColor: "#000",
      border: "2px #d4d4d4 groove",
      borderRadius: "4px"
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
  }))))), /*#__PURE__*/_react.default.createElement("div", {
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
  })), toggleDisplayReportEditor && /*#__PURE__*/_react.default.createElement(_reactResizable.Resizable, {
    width: editorWidth,
    height: 0,
    minConstraints: [window.innerWidth * 0.25] // Minimum width
    ,
    maxConstraints: [window.innerWidth * 0.75] // Maximum width
    ,
    onResize: (e, _ref) => {
      let {
        size
      } = _ref;
      return setEditorWidth(size.width);
    },
    axis: "x",
    resizeHandles: ["w"] // Resize from the left side only
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: editorWidth
    },
    className: "z-10 h-full w-1/3 flex-initial bg-gray-100 ml-[5px]"
    // dangerouslySetInnerHTML={{ __html: reportEditorTemplate }}
  }, /*#__PURE__*/_react.default.createElement(_index.default, {
    apiData: data?.data,
    keycloak_url: data?.keycloak_url,
    user: data?.user,
    isModelOpen: isModelOpen,
    setToggleDisplayReportEditor: setToggleDisplayReportEditor,
    toggleDisplayReportEditor: toggleDisplayReportEditor,
    toggleDisplayAiReportEditor: toggleDisplayAiReportEditor
  }))), toggleDisplayAiReportEditor && hasAIEditorPermission && /*#__PURE__*/_react.default.createElement(_reactResizable.Resizable, {
    width: editorWidth,
    height: 0,
    minConstraints: [window.innerWidth * 0.25] // Minimum width
    ,
    maxConstraints: [window.innerWidth * 0.75] // Maximum width
    ,
    onResize: (e, _ref2) => {
      let {
        size
      } = _ref2;
      return setEditorWidth(size.width);
    },
    axis: "x",
    resizeHandles: ["w"] // Resize from the left side only
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: editorWidth,
      zIndex: "1"
    },
    className: "z-10 h-full w-1/3 flex-initial bg-gray-100"
    // dangerouslySetInnerHTML={{ __html: reportEditorTemplate }}
  }, /*#__PURE__*/_react.default.createElement(_AiReportEditor.default, {
    apiData: data?.data,
    user: data?.user,
    keycloak_url: data?.keycloak_url,
    toggleDisplayReportEditor: toggleDisplayReportEditor,
    toggleDisplayAiReportEditor: toggleDisplayAiReportEditor
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