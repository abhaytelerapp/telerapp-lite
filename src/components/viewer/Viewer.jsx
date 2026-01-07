import React, { useEffect, useRef, useState } from "react";
import b_Annotation from "../image/icon/lite/b_Annotation.png";
import openfile from "../image/icon/lite/openfile.png";
import left from "../image/icon/lite/left.png";
import b_Pan from "../image/icon/lite/b_Pan.png";
import b_Scroll from "../image/icon/lite/b_Scroll.png";
import b_LayoutWithinViewport from "../image/icon/lite/b_LayoutWithinViewport.png";
import b_Transformations from "../image/icon/lite/b_Transformations.png";
import b_FlipHorizontally from "../image/icon/lite/b_FlipHorizontally.png";
import b_FlipVertically from "../image/icon/lite/b_FlipVertically.png";
import b_Rotate from "../image/icon/lite/b_Rotate 90 degrees clockwise.png";
import b_Rotate_0 from "../image/icon/lite/b_Rotate_0.png";
import b_Rotate_90 from "../image/icon/lite/b_Rotate_90.png";
import b_Rotate_i90 from "../image/icon/lite/b_Rotate_i90.png";
import b_Zoom from "../image/icon/lite/b_Zoom.png";
import b_InvertGrayscale from "../image/icon/lite/b_InvertGrayscale.png";
import b_DisplayReset from "../image/icon/lite/b_DisplayReset.png";
import b_CinePlay from "../image/icon/lite/b_CinePlay.png";
import fist0 from "../image/icon/lite/fist0.png";
import b_ShowReport from "../image/icon/lite/b_ShowReport.png";
import b_Window_Presets_left from "../image/icon/lite/b_Window_Presets_left.png";
import b_Window_Presets_right from "../image/icon/lite/b_Window_Presets_right.png";
import b_unlink_translation_synchronization from "../image/icon/lite/b_unlink translation synchronization.png";
import MPng from "../image/icon/lite/M.png";
import b_trashcan from "../image/icon/lite/b_trashcan.png";
import XPng from "../image/icon/lite/X.png";
import b_Eraser from "../image/icon/lite/b_Eraser.png";
import b_DistanceMeasurement from "../image/icon/lite/b_DistanceMeasurement.png";
import b_AngleMeasurement from "../image/icon/lite/b_AngleMeasurement.png";
import b_AngleMeasurement2 from "../image/icon/lite/b_AngleMeasurement2.png";
import b_RectMeasurement from "../image/icon/lite/b_RectMeasurement.png";
import b_CircleMeasurement from "../image/icon/lite/b_CircleMeasurement.png";
import irregular from "../image/icon/lite/irregular.png";
import b_arrow from "../image/icon/lite/b_arrow.png";
import TPng from "../image/icon/lite/T.png";
import b_CineTools from "../image/icon/lite/b_CineTools.png";
import download_img from "../image/icon/lite/download_img.png";
import download_dcm from "../image/icon/lite/download_dcm.png";
import edit_patient from "../image/icon/lite/edit_patient.png";
import quantum_logo from "../image/icon/lite/quantum-logo.png";
import loaderLogo from "../image/icon/lite/telerapp_logo.png";
import ai_technology from "../image/icon/lite/ai-technology.png";
import attachemnt from "../image/icon/lite/attachment.png";
import clinical from "../image/icon/lite/clinical.png";
import Tooltip from "./Tooltip";
import ReportEditor from "./ReportEditor/index";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import AiReportEditor from "./AiReportEditor/AiReportEditor";
import { userToken } from "./ReportEditor/RequestHandler";

const Viewer = (props) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLeftClose, setIsLeftClose] = useState(false);
  const [editorWidth, setEditorWidth] = useState(450);
  const [data, setData] = useState();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (props) {
      setData(props?.props);
    }
  }, [props]);

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [toggleDisplayReportEditor, setToggleDisplayReportEditor] =
    useState(false);
  const [toggleDisplayAiReportEditor, setToggleDisplayAiReportEditor] =
    useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Request fullscreen on the document (or any element)
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen mode:", err);
      });
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      document.exitFullscreen().catch((err) => {
        console.error("Error attempting to exit fullscreen mode:", err);
      });
      setIsFullscreen(false);
    }
  };

  const leftPannel = () => {
    setIsLeftClose(!isLeftClose);
    const outLeftImgs = document.querySelectorAll(".OutLeftImg");
    const leftPicture = document.querySelector("#LeftPicture");
    outLeftImgs.forEach((img) => {
      img.style.display = img.style.display === "none" ? "flex" : "none";
    });
    if (leftPicture) {
      leftPicture.style.marginLeft =
        leftPicture.style.marginLeft === "-120px" ? "0px" : "-120px";
    }
  };

  const toggleDisplayReportEditorView = () => {
    setToggleDisplayReportEditor((show) => !show);
    setIsModelOpen(false);
    setToggleDisplayAiReportEditor(false);
    const pages = document.getElementById("pages");
    pages.style.width = toggleDisplayReportEditor ? "75%" : "100%";
  };

  const toggleDisplayAiReportEditorView = () => {
    setToggleDisplayReportEditor(false);
    setToggleDisplayAiReportEditor((show) => !show);
    setIsModelOpen(false);
    const pages = document.getElementById("pages");
    pages.style.width = toggleDisplayReportEditor ? "75%" : "100%";
  };

  const getToken = async () => {
    try {
      const aToken = {
        token: data?.user.access_token,
      };
      const response = await userToken(aToken, data?.data);
      setToken(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!data?.data) return; // <-- inside the useEffect now

    getToken();
  }, [data?.data]);
  
  const hasAIEditorPermission =
    data?.user?.profile?.permission?.includes("AI Editor") ||
    data?.user?.profile?.roleType?.includes("super-admin");

  return (
    <div style={{ backgroundColor: "#000000" }} onWheel={() => {}}>
      <header
        className="page-header"
        id="page-header"
        style={{ padding: "5px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          <div style={{ width: "5%" }}>
            <span id="left_span">
              <img
                className="img pdf ecg"
                id="returnHomePage"
                src={left}
                style={{
                  filter: "invert(80%)",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
              />
            </span>
          </div>
          <div style={{ textAlign: "center", width: "100%" }}>
            <span
              id="icon-list"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              {/* <span id="openFile_span" style={{ verticalAlign: "super" }}>
                <img
                  className="img pdf ecg"
                  type="file"
                  alt="Open File"
                  id="openFile"
                  src={openfile}
                  width="30"
                  height="30"
                />
              </span> */}
              <span id="MouseOperation_span" style={{ verticalAlign: "super" }}>
                <img
                  className="img VR MPR SEG"
                  alt="Move & Zoom"
                  id="MouseOperation"
                  src={b_Pan}
                  width="30"
                  height="30"
                  style={{
                    filter: "invert(80%)",
                    border: "none",
                  }}
                />
              </span>
              <span id="b_Scroll_span" style={{ verticalAlign: "super" }}>
                <img
                  className="img MPR"
                  alt="Scroll"
                  id="b_Scroll"
                  src={b_Scroll}
                  width="30"
                  height="30"
                  style={{
                    filter: "invert(80%)",
                  }}
                />
              </span>

              <span id="SplitParent" style={{ verticalAlign: "super" }}>
                <img
                  className="img"
                  alt="Split Screen"
                  id="SplitWindow"
                  src={b_LayoutWithinViewport}
                  width="30"
                  height="30"
                  style={{
                    filter: "invert(80%)",
                  }}
                />
                <div
                  id="openSplitWindowDiv"
                  className="drawer"
                  style={{
                    position: "absolute",
                    left: 0,
                    whiteSpace: "nowrap",
                    zIndex: 100,
                    width: 500,
                    display: "none",
                  }}
                ></div>
              </span>

              <span
                id="TransformationsImgParent"
                style={{ verticalAlign: "super" }}
              >
                <img
                  className="img"
                  id="openTransformationsImg"
                  alt="Transformations"
                  src={b_Transformations}
                  width="30"
                  height="30"
                />
                <div
                  id="openTransformationsDiv"
                  className="drawer"
                  style={{
                    position: "absolute",
                    left: 0,
                    whiteSpace: "nowrap",
                    zIndex: 100,
                    display: "none",
                    width: 100,
                    backgroundColor: "black",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <span
                        id="horizontal_flip_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          alt="Horizontal Flip"
                          className="innerimg"
                          loading="lazy"
                          id="horizontal_flip"
                          src={b_FlipHorizontally}
                          width="30"
                          height="30"
                        />
                      </span>
                      <span
                        id="vertical_flip_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          alt="Vertical Flip"
                          className="innerimg"
                          loading="lazy"
                          id="vertical_flip"
                          src={b_FlipVertically}
                          width="30"
                          height="30"
                        />
                      </span>
                      <span
                        id="MouseRotate_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          className="innerimg"
                          loading="lazy"
                          alt="rotate"
                          id="MouseRotate"
                          src={b_Rotate}
                          width="30"
                          height="30"
                        />
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <span
                        id="rotate0_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          className="innerimg"
                          loading="lazy"
                          alt="rotate 0"
                          id="Rotate_0"
                          src={b_Rotate_0}
                          width="30"
                          height="30"
                        />
                      </span>
                      <span
                        id="rotatei90_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          className="innerimg"
                          loading="lazy"
                          alt="rotate 90"
                          id="Rotate_i90"
                          src={b_Rotate_90}
                          width="30"
                          height="30"
                        />
                      </span>
                      <span
                        id="rotate90_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          className="innerimg filpx"
                          loading="lazy"
                          alt="rotate 90"
                          id="Rotate_90"
                          src={b_Rotate_i90}
                          width="30"
                          height="30"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </span>
              <span
                className="WindowRevisionParent"
                style={{ display: "flex", position: "relative" }}
              >
                <span
                  id="WindowRevision_span"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    className="cropimg VR MPR SEG"
                    alt="Window Level"
                    id="WindowRevision"
                    src={b_Window_Presets_left}
                    width="30"
                    height="30"
                    style={{
                      filter: "invert(80%)",
                    }}
                  />
                </span>
                <span
                  id="WindowRevisionOption_span"
                  style={{ verticalAlign: "super" }}
                >
                  <img
                    className="cropimg VR MPR SEG"
                    alt="Window Level"
                    id="WindowRevisionOption"
                    src={b_Window_Presets_right}
                    width="12"
                    height="30"
                  />
                </span>
                <div
                  id="openWindowRevisionDiv"
                  className="drawer"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "45px",
                    whiteSpace: "nowrap",
                    zIndex: 100,
                    width: 500,
                    display: "none",
                  }}
                >
                  <div className="WindowSelect" id="WindowDefault">
                    Default
                  </div>
                  <div className="WindowSelect" id="WindowCustom">
                    Custom
                  </div>
                  <div
                    className="WindowSelect"
                    id="WindowAbdomen"
                    wc="60"
                    ww="400"
                  >
                    Abdomen(60,400)
                  </div>
                  <div
                    className="WindowSelect"
                    id="WindowAngio"
                    wc="300"
                    ww="600"
                  >
                    Angio(300,600)
                  </div>
                  <div
                    className="WindowSelect"
                    id="WindowBone"
                    wc="300"
                    ww="1500"
                  >
                    Bone(300,1500)
                  </div>
                  <div
                    className="WindowSelect"
                    id="WindowBrain"
                    wc="40"
                    ww="80"
                  >
                    Brain(40,80)
                  </div>
                  <div
                    className="WindowSelect"
                    id="WindowChest"
                    wc="40"
                    ww="400"
                  >
                    Chest(40,400)
                  </div>
                  <div
                    className="WindowSelect"
                    id="WindowLungs"
                    wc="-400"
                    ww="1500"
                  >
                    Lungs(-400,1500)
                  </div>
                </div>
              </span>

              <span id="zoom_span" style={{ verticalAlign: "super" }}>
                <img
                  className="img"
                  alt="Zoom"
                  id="zoom"
                  src={b_Zoom}
                  width="30"
                  height="30"
                  style={{
                    filter: "invert(80%)",
                  }}
                />
              </span>
              <span id="color_invert_span" style={{ verticalAlign: "super" }}>
                <img
                  className="img"
                  alt="Color Invert"
                  id="color_invert"
                  src={b_InvertGrayscale}
                  width="30"
                  height="30"
                />
              </span>
              <span id="unlink_span" style={{ verticalAlign: "super" }}>
                <img
                  className="img"
                  altzhtw="同步操作"
                  alt="Synchronous Operation"
                  id="unlink"
                  src={b_unlink_translation_synchronization}
                  width="30"
                  height="30"
                />
              </span>
              <span id="reset_span" style={{ verticalAlign: "super" }}>
                <img
                  className="img"
                  alt="Restore Img"
                  id="resetImg"
                  src={b_DisplayReset}
                  width="30"
                  height="30"
                  style={{
                    filter: "invert(80%)",
                  }}
                />
              </span>
              <span id="MeasureImgParent" style={{ verticalAlign: "super" }}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    <img
                      className="img"
                      id="openMeasureImg"
                      altzhtw="測量"
                      alt="Measure"
                      src={MPng}
                      width="30"
                      height="30"
                    />
                  </span>
                  <span
                    id="WindowRevisionOption_span"
                    style={{ verticalAlign: "super" }}
                  >
                    <img
                      className="cropimg VR MPR SEG"
                      alt="Window Level"
                      id="openMeasureImgOption"
                      src={b_Window_Presets_right}
                      width="12"
                      height="30"
                    />
                  </span>
                </span>
                <div
                  id="openMeasureDIv"
                  className="drawer"
                  style={{
                    position: "absolute",
                    left: 0,
                    whiteSpace: "nowrap",
                    zIndex: 100,
                    display: "none",
                    backgroundColor: "black",
                    width: 170,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <span
                        id="removeAllRuler_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          alt="remove all"
                          altzhtw="清除所有測量"
                          className="innerimg"
                          loading="lazy"
                          id="removeAllRuler"
                          src={b_trashcan}
                          width="30"
                          height="30"
                          style={{
                            filter: "invert(80%)",
                          }}
                        />
                      </span>
                      <span
                        id="removeRuler_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          alt="remove"
                          altzhtw="清除測量"
                          className="innerimg"
                          loading="lazy"
                          id="removeRuler"
                          src={XPng}
                          width="30"
                          height="30"
                        />
                      </span>
                      <span
                        id="eraseRuler_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          alt="eraser"
                          altzhtw="橡皮擦"
                          className="innerimg"
                          loading="lazy"
                          id="eraseRuler"
                          src={b_Eraser}
                          width="30"
                          height="30"
                        />
                      </span>
                      <span
                        id="MeasureRuler_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          alt="measure"
                          altzhtw="測量"
                          className="innerimg"
                          loading="lazy"
                          id="MeasureRuler"
                          src={b_DistanceMeasurement}
                          width="30"
                          height="30"
                        />
                      </span>
                      <span
                        id="AngleRuler_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          alt="angle"
                          altzhtw="角度"
                          className="innerimg"
                          loading="lazy"
                          id="AngleRuler"
                          src={b_AngleMeasurement}
                          width="30"
                          height="30"
                        />
                      </span>
                    </div>
                    <div
                      style={{
                        textAlign: "start",
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      <span
                        id="AngleRuler_span2"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          alt="angle"
                          altzhtw="角度"
                          className="innerimg"
                          loading="lazy"
                          id="AngleRuler2"
                          src={b_AngleMeasurement2}
                          width="30"
                          height="30"
                        />
                      </span>
                      <span
                        id="RectRuler_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          alt="Rect shape"
                          altzhtw="矩形"
                          className="innerimg"
                          loading="lazy"
                          id="RectRuler"
                          src={b_RectMeasurement}
                          width="30"
                          height="30"
                        />
                      </span>
                      <span
                        id="CircleRuler_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          alt="Circle shape"
                          altzhtw="圓形"
                          className="innerimg"
                          loading="lazy"
                          id="CircleRuler"
                          src={b_CircleMeasurement}
                          width="30"
                          height="30"
                        />
                      </span>
                      <span
                        id="IrregularRuler_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          alt="irregular shape"
                          altzhtw="不規則形狀"
                          className="innerimg"
                          loading="lazy"
                          id="IrregularRuler"
                          src={irregular}
                          width="30"
                          height="30"
                        />
                      </span>
                    </div>
                    <div
                      style={{
                        textAlign: "start",
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      <span
                        id="arrowRuler_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          alt="arrow"
                          altzhtw="箭頭"
                          className="innerimg"
                          loading="lazy"
                          id="ArrowRuler"
                          src={b_arrow}
                          width="30"
                          height="30"
                        />
                      </span>
                      <span
                        id="TextAnnotation_span"
                        style={{ verticalAlign: "super" }}
                      >
                        <img
                          alt="text annotation"
                          altzhtw="文字註解"
                          className="innerimg"
                          loading="lazy"
                          id="TextAnnotation"
                          src={TPng}
                          width="30"
                          height="30"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </span>

              <span id="playvideo_span" style={{ verticalAlign: "super" }}>
                <img
                  className="img"
                  loading="lazy"
                  alt="Cine"
                  id="playvideo"
                  src={b_CinePlay}
                  width="30"
                  height="30"
                  style={{
                    filter: "invert(80%)",
                  }}
                />
              </span>
              <span id="MarkButton_span" style={{ verticalAlign: "super" }}>
                <img
                  className="img VR MPR"
                  loading="lazy"
                  alt="Display Mark"
                  id="MarkButton"
                  src={fist0}
                  width="30"
                  height="30"
                />
              </span>
              <span id="annotation_span" style={{ verticalAlign: "super" }}>
                <img
                  className="img"
                  loading="lazy"
                  alt="Annotation"
                  id="annotation"
                  src={b_Annotation}
                  width="30"
                  height="30"
                />
              </span>
              <span id="MarkupImg_span" style={{ verticalAlign: "super" }}>
                <img
                  className="img VR MPR RTSS"
                  loading="lazy"
                  alt="Markup & Annotation"
                  id="MarkupImg"
                  src={b_ShowReport}
                  width="30"
                  height="30"
                />
              </span>
              <span id="OtherImgParent" style={{ verticalAlign: "super" }}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    <img
                      className="img"
                      loading="lazy"
                      altzhtw="其他"
                      alt="other"
                      id="OtherImg"
                      src={b_CineTools}
                      width="30"
                      height="30"
                    />
                  </span>
                  <span
                    id="WindowRevisionOption_span"
                    style={{ verticalAlign: "super" }}
                  >
                    <img
                      className="cropimg VR MPR SEG"
                      alt="Window Level"
                      id="OtherImgParentOption"
                      src={b_Window_Presets_right}
                      width="12"
                      height="30"
                    />
                  </span>
                </span>
                <div
                  id="othereDIv"
                  className="drawer"
                  style={{
                    position: "absolute",
                    left: 0,
                    whiteSpace: "nowrap",
                    zIndex: 100,
                    display: "none",
                    backgroundColor: "black",
                  }}
                >
                  <span
                    id="clearViewport_span"
                    style={{ verticalAlign: "super", display: "inline-block" }}
                  >
                    <img
                      altzhtw="清除視窗"
                      alt="clear viewport"
                      className="innerimg"
                      loading="lazy"
                      id="clearviewportImg"
                      src={b_trashcan}
                      width="30"
                      height="30"
                      style={{
                        filter: "invert(80%)",
                      }}
                    />
                  </span>{" "}
                  <br />
                  <span
                    id="downloadImg_span"
                    style={{ verticalAlign: "super", display: "inline-block" }}
                  >
                    <img
                      altzhtw="下載圖片"
                      alt="download image"
                      className="innerimg"
                      loading="lazy"
                      id="downloadImg"
                      src={download_img}
                      width="30"
                      height="30"
                    />
                  </span>{" "}
                  <br />
                  <span
                    id="downloadDcm_span"
                    style={{ verticalAlign: "super", display: "inline-block" }}
                  >
                    <img
                      altzhtw="下載DICOM"
                      alt="download DICOM"
                      className="innerimg"
                      loading="lazy"
                      id="downloadDcm"
                      src={download_dcm}
                      width="30"
                      height="30"
                    />
                  </span>
                </div>
              </span>
            </span>
          </div>
          <span id="rwdImgTag_span" style={{ verticalAlign: "super" }}>
            {" "}
            <img
              className="img VR MPR XML PEN"
              alt="RWD"
              loading="lazy"
              id="rwdImgTag"
              src={b_CineTools}
              style={{ display: "none" }}
              width="30"
              height="30"
            />
          </span>
          <div className="rightHeader">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
                fontSize: "22px",
                cursor: "pointer",
              }}
              id="fullScreen"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <Tooltip text="Exit Full Screen" position="bottom">
                  <i
                    className="fa-solid fa-compress"
                    style={{ filter: "invert(80%)" }}
                  ></i>
                </Tooltip>
              ) : (
                <Tooltip text="Full Screen" position="bottom">
                  <i
                    className="fa-solid fa-expand"
                    style={{ filter: "invert(80%)" }}
                  ></i>
                </Tooltip>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
                fontSize: "22px",
                cursor: "pointer",
              }}
              id="darkLightMode"
              // onClick={toggleFullscreen}
            >
              <Tooltip text="Light Mode" position="bottom">
                <i
                  className="fa-solid fa-moon"
                  style={{ filter: "invert(80%)" }}
                ></i>
              </Tooltip>
            </div>
            {hasAIEditorPermission && (
              <Tooltip text="AI Report Editor" position="bottom">
                <img
                  className=""
                  alt="AI Report Editor"
                  loading="lazy"
                  id="reportEditor"
                  src={ai_technology}
                  style={{
                    filter: "invert(80%)",
                    cursor: "pointer",
                    verticalAlign: "middle",
                    marginRight: "8px",
                  }}
                  width="24"
                  height="24"
                  onClick={toggleDisplayAiReportEditorView}
                />
              </Tooltip>
            )}
            <Tooltip text="Report Editor" position="bottom">
              <img
                className=""
                alt="Report Editor"
                loading="lazy"
                id="reportEditor"
                src={edit_patient}
                style={{
                  filter: "invert(80%)",
                  cursor: "pointer",
                  verticalAlign: "middle",
                  marginTop: "3px",
                }}
                width="24"
                height="24"
                onClick={toggleDisplayReportEditorView}
              />
            </Tooltip>
            <img
              className=""
              alt=""
              loading="lazy"
              id="quantume"
              src={quantum_logo}
              style={{ width: "112px" }}
            />
          </div>
        </div>
        <div
          id="MarkStyleDiv"
          style={{
            backgroundColor: "#282828",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          className="drawer"
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <label style={{ color: "#ffffff" }} id="markColorLabel">
              Color：
            </label>
            <select id="MarkcolorSelect" defaultValue="Auto">
              <option id="AutoColorSelect" defaultValue="Auto">
                Auto
              </option>
              <option id="WhiteSelect" defaultValue="White">
                White
              </option>
              <option id="RedSelect" defaultValue="Red">
                Red
              </option>
              <option id="BlueSelect" defaultValue="Blue">
                Blue
              </option>
              <option id="GreenSelect" defaultValue="Green">
                Green
              </option>
              <option id="YellowSelect" defaultValue="Yellow">
                Yellow
              </option>
              <option id="BrownSelect" defaultValue="Brown">
                Brown
              </option>
              <option id="OrangeSelect" defaultValue="Orange">
                Orange
              </option>
              <option id="PurpleSelect" defaultValue="Purple">
                Purple
              </option>
            </select>
          </span>

          <label
            style={{
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            id="markAlphaLabel"
          >
            Alpha
            <input type="text" id="markAlphaText" defaultValue="35" />
          </label>

          <label
            style={{
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            id="markSizeLabel"
          >
            Size
            <input type="text" id="markSizeText" defaultValue="0.45" />
          </label>

          <label
            style={{
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            id="markFillLabel"
          >
            Fill
            <input
              type="checkbox"
              defaultChecked
              name="markFillLabel"
              id="markFillCheck"
            />
          </label>

          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <label style={{ color: "#ffffff" }} id="TableLabel">
              Table：
            </label>
            <select id="TableSelect" defaultValue="None">
              <option id="TableSelectNone" defaultValue="None">
                None
              </option>
              <option id="DICOMTagsSelect" defaultValue="DICOMTags">
                DICOMTags
              </option>
              <option id="AIMSelect" defaultValue="AIM">
                AIM
              </option>
            </select>
          </span>
        </div>
        <span id="WindowLevelDiv_span">
          <div
            id="WindowLevelDiv"
            style={{ backgroundColor: "#33666644" }}
            className="drawer"
          >
            <font color="white" id="myWC">
              WC：
            </font>
            <input type="text" id="textWC" defaultValue="520" />

            <font color="white" id="myWW">
              WW：
            </font>
            <input type="text" id="textWW" defaultValue="50" />
          </div>
        </span>
        <font color="white" className="drawer" id="labelZoom">
          Zoom：
        </font>
        <input
          type="text"
          className="drawer"
          id="textZoom"
          defaultValue="200"
        />
        <font color="white" className="drawer" id="labelPlay">
          fps：
        </font>
        <input type="text" className="drawer" id="textPlay" defaultValue="15" />
        <span id="span_TextAnnotation" style={{ display: "none" }}>
          <font color="white" id="label_TextAnnotation">
            Text：
          </font>
          <input type="text" id="text_TextAnnotation" defaultValue="text" />
        </span>

        <input
          type="file"
          id="myfile"
          multiple="multiple"
          //   ref={fileInputRef}
          style={{ display: "none" }}
        ></input>
      </header>
      <div
        id="loaderMain"
        style={{
          zIndex: "9999",
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          border: "2px #d4d4d4 groove",
          borderRadius: "4px",
        }}
      >
        <img
          className="custom-size"
          src={loaderLogo}
          style={{ width: "192px" }}
        />
        <div style={{ width: "12rem" }}>
          <div id="loading">
            <div className="infinite-loading-bar-quantum-lite"></div>
          </div>
        </div>
      </div>
      <div className="form-group" id="form-group">
        <div id="container" className="container01">
          <div
            id="LeftPicture"
            style={{
              // overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              zIndex: 9,
              maxWidth: "140px",
              width: "140px",
              marginRight: "8px",
            }}
          >
            <div className="leftPannelCloseOpen">
              <span>Studies</span>
              {isLeftClose ? (
                <i
                  className="fa-solid fa-arrow-right left-icon"
                  onClick={leftPannel}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-arrow-left left-icon"
                  onClick={leftPannel}
                ></i>
              )}
            </div>
          </div>
          <div id="pages">
            <div
              className="page"
              id="DicomPage"
              style={{ position: "relative" }}
            >
              <div
                id="loader"
                style={{
                  zIndex: "999",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#000",
                  border: "2px #d4d4d4 groove",
                  borderRadius: "4px",
                }}
              >
                <img
                  className="custom-size"
                  src={loaderLogo}
                  style={{ width: "192px" }}
                />
                <div style={{ width: "12rem" }}>
                  <div id="loading">
                    <div className="infinite-loading-bar-quantum-lite"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="page"
              id="PdfPage"
              style={{ display: "none" }}
            ></div>
            <div
              className="page"
              id="EcgPage"
              style={{ display: "none" }}
            ></div>
            <div
              className="page"
              id="SrPage"
              style={{ display: "none" }}
            ></div>
          </div>
          {toggleDisplayReportEditor && (
            <Resizable
              width={editorWidth}
              height={0}
              minConstraints={[window.innerWidth * 0.25]} // Minimum width
              maxConstraints={[window.innerWidth * 0.75]} // Maximum width
              onResize={(e, { size }) => setEditorWidth(size.width)}
              axis="x"
              resizeHandles={["w"]} // Resize from the left side only
            >
              <div
                style={{ width: editorWidth }}
                className="z-10 h-full w-1/3 flex-initial bg-gray-100 ml-[5px]"
                // dangerouslySetInnerHTML={{ __html: reportEditorTemplate }}
              >
                <ReportEditor
                  apiData={data?.data}
                  keycloak_url={data?.keycloak_url}
                  user={data?.user}
                  isModelOpen={isModelOpen}
                  setToggleDisplayReportEditor={setToggleDisplayReportEditor}
                  toggleDisplayReportEditor={toggleDisplayReportEditor}
                  toggleDisplayAiReportEditor={toggleDisplayAiReportEditor}
                />
              </div>
            </Resizable>
          )}
          {toggleDisplayAiReportEditor && hasAIEditorPermission && (
            <Resizable
              width={editorWidth}
              height={0}
              minConstraints={[window.innerWidth * 0.25]} // Minimum width
              maxConstraints={[window.innerWidth * 0.75]} // Maximum width
              onResize={(e, { size }) => setEditorWidth(size.width)}
              axis="x"
              resizeHandles={["w"]} // Resize from the left side only
            >
              <div
                style={{ width: editorWidth, zIndex: "1" }}
                className="z-10 h-full w-1/3 flex-initial bg-gray-100"
                // dangerouslySetInnerHTML={{ __html: reportEditorTemplate }}
              >
                <AiReportEditor
                  apiData={data?.data}
                  user={data?.user}
                  keycloak_url={data?.keycloak_url}
                  toggleDisplayReportEditor={toggleDisplayReportEditor}
                  toggleDisplayAiReportEditor={toggleDisplayAiReportEditor}
                />
              </div>
            </Resizable>
          )}
        </div>
      </div>
      <div
        id="magnifierDiv"
        style={{ zIndex: 40, position: "absolute", pointerEvents: "none" }}
      >
        <canvas id="magnifierCanvas"></canvas>
      </div>
    </div>
  );
};

export default Viewer;
