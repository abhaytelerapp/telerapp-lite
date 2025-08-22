//表示目前icon圖示的RWD收合功能為開啟狀態
var openRWD = true;
//邊框寬度
var bordersize = 5;

//表示左側的影像可以點擊
var openLeftImgClick = true;

let leftLayout, Pages;
onloadFunction.push2First(function () {
  leftLayout = new LeftLayout();
  Pages = new BlueLightPage();
});

onloadFunction.push2Last(
  //載入延遲載入的影像
  function () {
    var imgs = document.querySelectorAll(".img,.innerimg"); //className is img or innerimg
    for (img of imgs) {
      if (img.loading && img.loading == "lazy") img.loading = "eager";
    }
  }
);

function HideElemByID(Elem) {
  // if (Elem.constructor.name == "Array") {
  //     for (let elem of Elem) {
  //         let el = getByid(elem);
  //         if (el) el.style.display = "";
  //     }
  // }
  // else if (Elem.constructor.name == "String") {
  //     // getByid(Elem).style.display = "none";
  //     let el = getByid(Elem);
  //     if (el) el.style.display = "none";
  // }
  if (Elem.constructor.name == "Array") {
    for (elem of Elem) getByid(elem).style.display = "none";
  } else if (Elem.constructor.name == "String") {
    getByid(Elem).style.display = "none";
  }
}

function ShowElemByID(Elem) {
  // console.log(Elem, 'Elem')
  if (Elem.constructor.name == "Array") {
    for (elem of Elem) getByid(elem).style.display = "";
  } else if (Elem.constructor.name == "String") {
    getByid(Elem).style.display = "";
  }
}

function addIconSpan(span) {
  getByid("icon-list").appendChild(span);
  getByid("container").style.height = `calc(100vh - ${
    getByid("container").offsetTop
  }px)`;
}

function invertDisplayById(id) {
  if (!id && !getByid(id)) return;
  if (getByid(id).style.display == "none") getByid(id).style.display = "";
  else getByid(id).style.display = "none";
}

function refleshGUI() {
  var viewport = GetViewport();
  if (!viewport) return;

  //Viewport Border Color
  viewport.div.classList.add("SelectedViewport");
  for (var z = 0; z < Viewport_Total; z++) {
    if (z != viewportNumber)
      GetViewport(z).div.classList.remove("SelectedViewport");
  }
  if (GetViewport().Sop)
    leftLayout.setAccent(GetViewport().Sop.parent.SeriesInstanceUID);

  if (viewport.invert) getByid("color_invert").classList.add("activeImg");
  else getByid("color_invert").classList.remove("activeImg");
  if (viewport.HorizontalFlip)
    getByid("horizontal_flip").classList.add("activeImg");
  else getByid("horizontal_flip").classList.remove("activeImg");
  if (viewport.VerticalFlip)
    getByid("vertical_flip").classList.add("activeImg");
  else getByid("vertical_flip").classList.remove("activeImg");
  if (viewport.rotate != 0) getByid("MouseRotate").classList.add("activeImg");
  else getByid("MouseRotate").classList.remove("activeImg");
}

class BlueLightPage {
  constructor() {
    this.type = "DicomPage";
    this.pages = getByid("pages");
  }

  displayPage(PageID) {
    if (this.type == PageID || !PageID) return;
    for (var page of getClass("page")) {
      if (page.id == PageID) page.style.display = "";
      else page.style.display = "none";
    }
    this.type = PageID;
  }
}

class LeftLayout {
  constructor() {}

  findPatienID(studyInstanceUID) {
    for (var Patient_div of getClass("OutLeftImg")) {
      if (Patient_div.studyInstanceUID === studyInstanceUID) return Patient_div;
    }
    return null;
  }

  findSeries(series) {
    // Search within all PatientSeriesContent containers
    var patientContainers = getClass("OutLeftImg");
    for (var patientContainer of patientContainers) {
      var seriesContent = patientContainer.querySelector(
        ".PatientSeriesContent"
      );
      if (seriesContent) {
        var series_divs =
          seriesContent.getElementsByClassName("LeftImgAndMark");
        for (var series_div of series_divs) {
          if (series_div.series == series) return series_div;
        }
      }
    }
    return null;
  }

  setAccent(series) {
    for (var series_div of getClass("LeftImgAndMark")) {
      series_div.style.border = "2px groove #333333";

      // Add click event listener if not already added
      if (!series_div.dataset.clickAttached) {
        // Attach double-click event to load remaining instances
        series_div.addEventListener("click", (event) => {
          let clickedSeries = series_div.series; // Assuming series is stored in div
          if (clickedSeries) {
            handleSeriesDoubleClick(clickedSeries, false); // false => only one active series
          }
        });
        series_div.dataset.clickAttached = "true"; // Prevent multiple event bindings
      }
    }
    if (!series) return;
    if (getClass("LeftImgAndMark").length <= 1) return;
    for (var series_div of getClass("LeftImgAndMark")) {
      if (series_div.series == series)
        series_div.style.border = "5px solid rgb(22,50,57)";
    }
  }

  getCheckboxBySeriesAndHideName(series, hideName) {
    var MarkDiv = getByid("menu" + series);
    if (!MarkDiv) return;
    var checkboxList = MarkDiv.getElementsByTagName("input");
    for (var checkbox of checkboxList) {
      if (checkbox.name == hideName) return checkbox;
    }
    return null;
  }

  setImg2Left(QRLevel, patientID, dataSet) {
    const urlParams = new URLSearchParams(window.location.search);
    const allStudyInstanceUIDs = urlParams.getAll("StudyInstanceUID");
    const firstStudyInstanceUID = allStudyInstanceUIDs[0]?.split(",")[0];
    const dataSetStudyInstanceUID = dataSet.string(Tag.StudyInstanceUID);

    const studyDescription = dataSet.string(Tag.StudyDescription);
    const studyDate = dataSet.string(Tag.StudyDate);
    const modality = dataSet.string(Tag.Modality);
    var pic = getByid("LeftPicture");
    var Patient_div = document.createElement("DIV");
    Patient_div.className = "OutLeftImg";
    //Patient_div.id = "OutLeftImg" + patientID;
    Patient_div.studyInstanceUID = dataSetStudyInstanceUID;
    Patient_div.PatientId = patientID;
    Patient_div.studyDescription = studyDescription;
    Patient_div.studyDate = studyDate;
    Patient_div.modality = modality;
    if (!this.findPatienID(dataSetStudyInstanceUID)) {
      // Create dropdown header for new patient
      var dropdownHeader = document.createElement("DIV");
      dropdownHeader.className = "PatientDropdownHeader";
      dropdownHeader.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 8px;">
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        <span class="patient-date">${
                          studyDate
                            ? formatStudyDate(studyDate)
                            : "No Study Date"
                        }</span>
                        <span style="width: 75px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${
                          studyDescription ? studyDescription : ""
                        }</span>
                    </div>
                    <div id="modality_prior" style="margin-right: 8px; display: flex; align-items: center; gap: 4px; flex-direction: column;">
                        <span class="patient-modality">${
                          modality ? modality : ""
                        }</span>
                        ${
                          dataSetStudyInstanceUID === firstStudyInstanceUID
                            ? `<span class="status-dot" style="width: 14px; height: 14px; border-radius: 50%; background-color: green; display: inline-block;"></span>`
                            : `<span class="status-dot" style="width: 14px; height: 14px; border-radius: 50%; background-color: yellow; display: inline-block;"></span>`
                        }
                    </div>
                </div>
                <i class="fa-solid fa-chevron-down dropdown-icon"></i>
            `;
      dropdownHeader.onclick = function () {
        var content = Patient_div.querySelector(".PatientSeriesContent");
        var icon = dropdownHeader.querySelector(".dropdown-icon");
        if (
          content.classList.contains("collapsed") ||
          content.style.display === "none" ||
          content.style.display === ""
        ) {
          content.style.display = "flex";
          content.classList.remove("collapsed");
          icon.className = "fa-solid fa-chevron-up dropdown-icon";
        } else {
          content.classList.add("collapsed");
          setTimeout(() => {
            if (content.classList.contains("collapsed")) {
              content.style.display = "none";
            }
          }, 300); // Match the CSS transition duration
          icon.className = "fa-solid fa-chevron-down dropdown-icon";
        }
      };

      // Create content container for series
      var seriesContent = document.createElement("DIV");
      seriesContent.className = "PatientSeriesContent";
      seriesContent.style.display = "flex";
      seriesContent.style.flexWrap = "wrap";
      seriesContent.style.gap = "4px";
      seriesContent.style.scrollbarWidth = "none"; // Hide scrollbar

      Patient_div.appendChild(dropdownHeader);
      Patient_div.appendChild(seriesContent);
      var leftPanel = pic.querySelector(".leftPannelCloseOpen");
      if (dataSetStudyInstanceUID === firstStudyInstanceUID) {
        if (leftPanel) {
          if (leftPanel.nextSibling) {
            pic.insertBefore(Patient_div, leftPanel.nextSibling);
          } else {
            pic.appendChild(Patient_div);
          }
        } else {
          pic.insertBefore(Patient_div, pic.firstChild);
        }
      } else {
        pic.appendChild(Patient_div);
      }

      var icon = dropdownHeader.querySelector(".dropdown-icon");
      if (dataSetStudyInstanceUID === firstStudyInstanceUID) {
        dropdownHeader.style.backgroundColor = "#282828";
        Patient_div.style.backgroundColor = "#444";
        seriesContent.style.display = "flex";
        icon.className = "fa-solid fa-chevron-up dropdown-icon";
      } else {
        dropdownHeader.style.backgroundColor = "#444";
        Patient_div.style.backgroundColor = "#282828";
        seriesContent.style.display = "none";
        icon.className = "fa-solid fa-chevron-down dropdown-icon";
      }
    } else {
      for (let elem of getClass("OutLeftImg"))
        if (elem.studyInstanceUID == dataSetStudyInstanceUID)
          Patient_div = elem;
    }

    function formatStudyDate(rawDate) {
      if (!rawDate || rawDate.length !== 8) return "";

      const year = rawDate.substring(0, 4);
      const month = rawDate.substring(4, 6);
      const day = rawDate.substring(6, 8);

      const date = new Date(`${year}-${month}-${day}`);

      const options = { day: "2-digit", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-GB", options).replace(/ /g, "-");
    }

    if (this.findSeries(QRLevel.series)) return;
    var series_div = document.createElement("DIV");
    series_div.className = "LeftImgAndMark";
    //series_div.style = "width:" + 65 + "px;height:" + 65 + "px;border:" + bordersize + "px #D3D9FF groove;";
    series_div.series = QRLevel.series;
    series_div.style.touchAction = "none";

    var ImgDiv = document.createElement("DIV");
    ImgDiv.className = "LeftImgDiv";
    ImgDiv.series = QRLevel.series;
    ImgDiv.draggable = "true";
    ImgDiv.QRLevel = QRLevel;
    ImgDiv.onclick = function () {
      PictureOnclick(this.QRLevel);
    };

    ImgDiv.ondrag = function () {
      event.preventDefault();
      dragged = this;
    };

    ImgDiv.ondragend = function () {
      let clickedSeries = QRLevel.series; // Assuming series is stored in div
      if (clickedSeries) {
        handleSeriesDoubleClick(clickedSeries, false);
      }
    };

    ImgDiv.canvas = function () {
      if (!this.getElementsByClassName("LeftCanvas")[0]) return null;
      else return this.getElementsByClassName("LeftCanvas")[0];
    };
    series_div.appendChild(ImgDiv);
    series_div.ImgDiv = ImgDiv;

    // Add series to the content container
    var seriesContent = Patient_div.querySelector(".PatientSeriesContent");
    if (seriesContent) {
      seriesContent.appendChild(series_div);
    } else {
      Patient_div.appendChild(series_div);
    }

    // Update dropdown headers with new counts
    this.updatePatientDropdownHeaders();
  }

  appendCanvasBySeries(series, image, pixelData) {
    var series_div = this.findSeries(series);
    if (!series_div) return;
    var ImgDiv = series_div.ImgDiv;

    if (ImgDiv.canvas()) {
      //return;
      //displayLeftCanvas(ImgDiv.canvas(), image, pixelData);
    } else {
      var leftCanvas = document.createElement("CANVAS");
      leftCanvas.className = "LeftCanvas";
      ImgDiv.appendChild(leftCanvas);
      displayLeftCanvas(leftCanvas, image, pixelData);
      var descriptionLabel = document.createElement("label");
      descriptionLabel.className = "SeriesDescriptionLabel"; // CSS class for styling
      series_div.series_descriptionLabel = descriptionLabel;
      ImgDiv.appendChild(descriptionLabel);
      var label = document.createElement("label");
      label.className = "LeftImgCountLabel";
      series_div.series_label = label;
      ImgDiv.appendChild(label);
    }
    this.refreshNumberOfFramesOrSops(image);
  }

  // refreshNumberOfFramesOrSops(image) {
  //     var series_div = this.findSeries(image.SeriesInstanceUID);
  //     if (!series_div) return;
  //     series_div.series_label.innerText = "" + htmlEntities(ImageManager.findSeries(image.SeriesInstanceUID).Sop.length);
  //     // if (image.NumberOfFrames > 1) series_div.series_label.innerText = htmlEntities("" + image.NumberOfFrames);
  //     // else if (image.haveSameInstanceNumber) series_div.series_label.innerText = "";
  //     // else series_div.series_label.innerText = "" + htmlEntities(ImageManager.findSeries(image.SeriesInstanceUID).Sop.length);
  // }
  // refreshNumberOfFramesOrSops(image) {
  //     var series_div = this.findSeries(image.SeriesInstanceUID);
  //     if (!series_div) return;

  //     // Clear previous content inside the label
  //     series_div.series_label.innerHTML = "";
  //     // Create an image element
  //     var img = document.createElement("img");
  //     img.src = "../image/icon/lite/info-series.png"; // Replace with the actual image URL or path
  //     img.alt = "Icon";
  //     img.style.width = "12px"; // Adjust the width as needed
  //     img.style.height = "12px"; // Adjust the height as needed
  //     img.style.marginRight = "5px"; // Add spacing between image and text

  //     // Append the image to the label
  //     series_div.series_label.appendChild(img);

  //     console.log(ImageManager.findSeries(image.SeriesInstanceUID).Sop[0].Image.seriesDescription,'ImageManager.findSeries(image.SeriesInstanceUID)')
  //     // Append the text value
  //     var textNode = document.createTextNode(
  //         htmlEntities(ImageManager.findSeries(image.SeriesInstanceUID).Sop.length)
  //         // htmlEntities(ImageManager.findSeries(image.SeriesInstanceUID).Sop.length)
  //     );
  //     series_div.series_label.appendChild(textNode);
  // }

  refreshNumberOfFramesOrSops(image) {
    var series_div = this.findSeries(image.SeriesInstanceUID);
    if (!series_div) return;

    // Clear previous content inside the series label
    series_div.series_label.innerHTML = "";

    // Fetch the series data
    var seriesData = ImageManager.findSeries(image.SeriesInstanceUID);

    var sopLength = seriesData.Sop.length;
    var seriesDescription = seriesData.Sop[0]?.Image?.seriesDescription; // Fallback if missing
    var seriesNumber = seriesData.Sop[0]?.Image?.seriesNumber; // Fallback if missing
    var numOfInstance =
      seriesData.Sop[0]?.Image?.totalInstancesInSeries?.instanceNumberOfSeries; // Fallback if missing

    // Create a span for SOP length and image together
    var sopSpan = document.createElement("span");

    // Create an image element
    var img = document.createElement("img");
    img.src = "../image/icon/lite/info-series.png"; // Replace with actual image URL
    img.alt = "Icon";
    img.style.width = "12px";
    img.style.height = "12px";
    img.style.marginRight = "5px"; // Add spacing between icon and text

    // Append the SOP length text
    var textNode = document.createTextNode(
      htmlEntities(`${sopLength} / ${numOfInstance && numOfInstance}`)
    );

    // Append the image and text inside the SOP span
    sopSpan.style.display = "flex";
    sopSpan.style.alignItems = "center";
    sopSpan.style.position = "absolute";
    sopSpan.style.top = "4px";
    sopSpan.style.left = "4px";
    sopSpan.style.backgroundColor = "#333";
    sopSpan.style.borderRadius = "4px";
    sopSpan.style.paddingRight = "4px";
    sopSpan.style.paddingLeft = "4px";
    sopSpan.appendChild(img);
    sopSpan.appendChild(textNode);
    series_div.series_label.appendChild(sopSpan);

    // Create a span for series number
    var seriesNumberSpan = document.createElement("span");
    seriesNumberSpan.textContent = `S: ${seriesNumber}`;
    seriesNumberSpan.style.position = "absolute";
    seriesNumberSpan.style.top = "4px";
    seriesNumberSpan.style.right = "4px";
    seriesNumberSpan.style.backgroundColor = "#333";
    seriesNumberSpan.style.borderRadius = "4px";
    seriesNumberSpan.style.paddingRight = "4px";
    seriesNumberSpan.style.paddingLeft = "4px";
    series_div.series_label.appendChild(seriesNumberSpan);

    // Check if a seriesDescription label already exists
    var existingDescriptionLabel = series_div.querySelector(
      ".SeriesDescriptionLabel"
    );

    if (!existingDescriptionLabel) {
      // If it doesn't exist, create a new label
      var descriptionLabel = document.createElement("label");
      descriptionLabel.className = "SeriesDescriptionLabel"; // CSS class for styling

      // Append the series description text
      var descriptionTextNode = document.createTextNode(
        htmlEntities(seriesDescription)
      );
      descriptionLabel.appendChild(descriptionTextNode);

      // Append the new label to the series div
      series_div.appendChild(descriptionLabel);
    } else {
      // If it exists, just update the text
      existingDescriptionLabel.textContent = htmlEntities(seriesDescription);
    }
  }

  refleshMarkWithSeries(series) {
    var series_div = this.findSeries(series);
    if (!series_div) return;
    if (getByid("menu" + series)) {
      getByid("menu" + series).innerHTML = "";
      //series_div.style.height = 65 + "px";
    }

    var showNameList = [];
    var colorList = [];
    var hideNameList = [];
    var Series = ImageManager.findSeries(series);
    for (var k = 0; k < Series.Sop.length; k++) {
      for (var n = 0; n < PatientMark.length; n++) {
        if (PatientMark[n].sop == Series.Sop[k].SOPInstanceUID) {
          if (showNameList.length == 0) {
            showNameList.push(PatientMark[n].showName);
            colorList.push(PatientMark[n].color);
            hideNameList.push(PatientMark[n].hideName);
          } else {
            var check = 0;
            for (var o = 0; o < showNameList.length; o++) {
              if (hideNameList[o] == PatientMark[n].hideName) {
                check = 1;
              }
            }
            if (check == 0) {
              hideNameList.push(PatientMark[n].hideName);
              showNameList.push(PatientMark[n].showName);
              colorList.push(PatientMark[n].color);
            }
          }
        }
      }
    }

    for (var o = 0; o < showNameList.length; o++) {
      //series_div.style.height = parseInt(series_div.style.height) + 35 + "px";
      var label = document.createElement("LABEL");
      label.innerText = "" + showNameList[o];
      label.name = "" + hideNameList[o];
      label.className = "LeftShadowLabel";
      label.style.color = colorList[o];
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      checkbox.checked = true;
      checkbox.name = "" + hideNameList[o];

      label.oncontextmenu = function (e) {
        e.preventDefault();
      };
      //設定滑鼠按鍵事件
      label.onmousedown = function (e) {
        if (e.button == 2) jump2Mark(this.name);
      };
      checkbox.onchange = function () {
        for (var i = 0; i < Viewport_Total; i++) displayMark(i);
      };
      label.appendChild(checkbox);

      if (getByid("menu" + series)) {
        getByid("menu" + series).appendChild(label);
        getByid("menu" + series).appendChild(document.createElement("br"));
      } else {
        var smallDiv = document.createElement("DIV");
        smallDiv.id = "menu" + series;
        smallDiv.appendChild(label);
        smallDiv.appendChild(document.createElement("br"));
        series_div.appendChild(smallDiv);
      }
    }

    if (getByid("LeftPicture"))
      if (hasScroll(getByid("LeftPicture")))
        document.documentElement.style.setProperty("--ishaveLeftScroll", `1`);
      else
        document.documentElement.style.setProperty("--ishaveLeftScroll", `0`);
  }

  reflesh() {}
  updatePatientDropdownHeaders() {
    var patientContainers = getClass("OutLeftImg");
    for (var patientContainer of patientContainers) {
      var header = patientContainer.querySelector(".PatientDropdownHeader");
      var seriesContent = patientContainer.querySelector(
        ".PatientSeriesContent"
      );
      if (header && seriesContent) {
        var seriesCount =
          seriesContent.getElementsByClassName("LeftImgAndMark").length;
        var patientId = patientContainer.PatientId;
        var span = header.querySelector("span");
        // if (span) {
        //     span.textContent = `Patient ${patientId} (${seriesCount})`;
        // }
      }
    }
  }

  // Method to expand all patient dropdowns
  expandAllPatientDropdowns() {
    var patientContainers = getClass("OutLeftImg");
    for (var patientContainer of patientContainers) {
      var header = patientContainer.querySelector(".PatientDropdownHeader");
      var seriesContent = patientContainer.querySelector(
        ".PatientSeriesContent"
      );
      var icon = header ? header.querySelector(".dropdown-icon") : null;

      if (seriesContent && icon) {
        seriesContent.style.display = "flex";
        icon.className = "fa-solid fa-chevron-up dropdown-icon";
      }
    }
  }

  // Method to collapse all patient dropdowns
  collapseAllPatientDropdowns() {
    var patientContainers = getClass("OutLeftImg");
    for (var patientContainer of patientContainers) {
      var header = patientContainer.querySelector(".PatientDropdownHeader");
      var seriesContent = patientContainer.querySelector(
        ".PatientSeriesContent"
      );
      var icon = header ? header.querySelector(".dropdown-icon") : null;

      if (seriesContent && icon) {
        seriesContent.style.display = "none";
        icon.className = "fa-solid fa-chevron-down dropdown-icon";
      }
    }
  }
}

//此段原有Bug，若沒有載入滿Series，便載入最後一個，現在已修復
function PictureOnclick(QRLevel) {
  if (!openLeftImgClick || !QRLevel) return;
  WindowOpen = false;
  cancelTools();
  resetViewport();
  //drawBorder(getByid("MouseOperation"));

  if (QRLevel.series)
    GetViewport().loadImgBySop(ImageManager.findSeries(QRLevel.series).Sop[0]);
  else if (QRLevel.sop)
    GetViewport().loadImgBySop(ImageManager.findSop(QRLevel.sop).parent.Sop[0]);
  //if (QRLevel.series) GetViewport().loadFirstImgBySeries(QRLevel.series);
  //else if (QRLevel.sop) GetViewport().loadFirstImgBySop(QRLevel.sop);
}

function displayLeftCanvas(DicomCanvas, image, pixelData) {
  DicomCanvas.width = image.width;
  DicomCanvas.height = image.height;
  //DicomCanvas.style.width = 66 + "px";
  //DicomCanvas.style.height = 66 + "px";
  if (pixelData) renderPixelData2Cnavas(image, pixelData, DicomCanvas);
  else {
    var ctx = DicomCanvas.getContext("2d");
    var imgData = ctx.createImageData(66, 66);
    new Uint32Array(imgData.data.buffer).fill(0xff000000);
    ctx.putImageData(imgData, 0, 0);
  }
}

//當視窗大小改變
window.onresize = function () {
  if (Pages.type == "DicomPage") {
    //刷新每個Viewport
    for (var i = 0; i < Viewport_Total; i++) {
      try {
        GetViewport(i).scale = null;
        GetViewport(i).loadImgBySop(GetViewport(i).Sop);
      } catch (ex) {
        console.log(ex);
      }
    }

    //關閉抽屜
    for (var obj of getClass("drawer")) obj.style.display = "none";

    EnterRWD();
    for (var i = 0; i < Viewport_Total; i++) {
      try {
        setTransform(i);
      } catch (ex) {
        console.log(ex);
      }
    }
  } else {
    getByid("container").style.height = `calc(100vh - ${
      getByid("container").offsetTop
    }px)`;
  }
};

//執行icon圖示的摺疊效果
function EnterRWD() {
  //刷新Viewport窗格
  SetTable();
  //刷新ScrollBar的Style
  //for (var slider of getClass("rightSlider")) slider.setStyle();
  if (GetViewport(0))
    for (var i = 0; i < Viewport_Total; i++) GetViewport(i).ScrollBar.reflesh();
}

function SetTable(row0, col0) {
  getByid("container").style.height = `calc(100vh - ${
    getByid("container").offsetTop
  }px)`;

  //取得Viewport的row與col數量
  let row = Viewport_row,
    col = Viewport_col;
  //如果有傳入row與col的參數，則優先使用傳入的
  if (row0 && col0) {
    row = row0;
    col = col0;
  }

  if (VIEWPORT.fixRow) row = VIEWPORT.fixRow;
  if (VIEWPORT.fixCol) col = VIEWPORT.fixCol;

  //如果限制只顯示其中一個viewport
  if (BlueLightViewPort.only1Viewport >= 0) {
    for (var i = 0; i < row * col; i++) {
      if (i == BlueLightViewPort.only1Viewport) {
        GetViewport(i).div.style.display = "";
        GetViewport(i).enable = true;
      } else {
        GetViewport(i).div.style.display = "none";
        GetViewport(i).enable = false;
      }
    }
    GetViewport(BlueLightViewPort.only1Viewport).div.style.width = `calc(${
      100 / 1
    }% - ${bordersize * 2}px)`;
    GetViewport(BlueLightViewPort.only1Viewport).div.style.height = `calc(${
      100 / 1
    }% - ${bordersize * 2}px)`;
    refleshGUI();
    return;
  }

  //重置各個Viewport的長寬大小(有顯示時)
  try {
    for (var r = 0; r < row; r++) {
      for (var c = 0; c < col; c++) {
        // GetViewport(r * col + c).div.style.width = `calc(${100 / col}% - ${bordersize * 2}px - 121px)`;
        GetViewport(r * col + c).div.style.width = `calc(${100 / col}%)`;
        GetViewport(r * col + c).div.style.height = `calc(${100 / row}% - ${
          bordersize * 2
        }px)`;
      }
    }
  } catch (ex) {}
  //重置各個Viewport的長寬大小(不顯示時)

  for (var i = 0; i < row * col; i++) {
    GetViewport(i).div.style.display = "";
    GetViewport(i).enable = true;
  }
  for (var i = row * col; i < Viewport_Total; i++) {
    GetViewport(i).div.style.display = "none";
    GetViewport(i).enable = false;
  }

  //if (viewportNumber >= row * col) viewportNumber = 0;

  refleshGUI();
  // window.onresize();
}

// Global function to test patient dropdown functionality
window.testPatientDropdownSystem = function () {
  if (!leftLayout) {
    console.log("LeftLayout not initialized");
    return;
  }

  console.log("Testing patient dropdown system...");

  // Test expanding all dropdowns
  leftLayout.expandAllPatientDropdowns();
  console.log("All patient dropdowns expanded");

  // Test collapsing all dropdowns after 2 seconds
  setTimeout(() => {
    leftLayout.collapseAllPatientDropdowns();
    console.log("All patient dropdowns collapsed");
  }, 2000);
};

// Global function to expand all patient dropdowns
window.expandAllPatientDropdowns = function () {
  if (leftLayout) {
    leftLayout.expandAllPatientDropdowns();
  }
};

// Global function to collapse all patient dropdowns
window.collapseAllPatientDropdowns = function () {
  if (leftLayout) {
    leftLayout.collapseAllPatientDropdowns();
  }
};

// Global function to update all patient dropdown headers
window.updatePatientDropdownHeaders = function () {
  if (leftLayout) {
    leftLayout.updatePatientDropdownHeaders();
  }
};
