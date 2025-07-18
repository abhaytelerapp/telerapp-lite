
let VIEWPORT = {};
VIEWPORT.fixRow = null;
VIEWPORT.fixCol = null;

VIEWPORT.initTransform = function (viewport, image) {
    if (!viewport.Sop) return;
    if (viewport.Sop.type == "img") return;
    if (!image) return;
    if (viewport.tags.PixelSpacing) {
        viewport.transform.PixelSpacingX = 1.0 / parseFloat(viewport.tags.PixelSpacing.split("\\")[0]);
        viewport.transform.PixelSpacingY = 1.0 / parseFloat(viewport.tags.PixelSpacing.split("\\")[1]);
    } else {
        //viewport.transform.PixelSpacingX = viewport.transform.PixelSpacingY = 1.0;
    }

    if (viewport.tags.ImageOrientationPatient) {
        viewport.transform.imageOrientationX = viewport.tags.ImageOrientationPatient.split("\\")[0];
        viewport.transform.imageOrientationY = viewport.tags.ImageOrientationPatient.split("\\")[1];
        viewport.transform.imageOrientationZ = viewport.tags.ImageOrientationPatient.split("\\")[2];
        viewport.transform.imageOrientationX2 = viewport.tags.ImageOrientationPatient.split("\\")[3];
        viewport.transform.imageOrientationY2 = viewport.tags.ImageOrientationPatient.split("\\")[4];
        viewport.transform.imageOrientationZ2 = viewport.tags.ImageOrientationPatient.split("\\")[5];
    } else {
        viewport.transform.imageOrientationX = viewport.transform.imageOrientationY = viewport.transform.imageOrientationZ = 0;
        viewport.transform.imageOrientationX2 = viewport.transform.imageOrientationY2 = viewport.transform.imageOrientationZ2 = 0;
    }

    if (viewport.tags.ImagePositionPatient) {
        viewport.transform.imagePositionX = parseFloat(viewport.tags.ImagePositionPatient.split("\\")[0]);
        viewport.transform.imagePositionY = parseFloat(viewport.tags.ImagePositionPatient.split("\\")[1]);
        viewport.transform.imagePositionZ = parseFloat(viewport.tags.ImagePositionPatient.split("\\")[2]);
    } else {
        viewport.transform.imagePositionX = viewport.transform.imagePositionY = viewport.transform.imagePositionZ = 0;
    }

    setTransformLabel(viewport.index);
}

VIEWPORT.putLabel2Element = function (element, image, viewportNum) {
    if (!element.Sop || element.Sop.type == "img") return;
    setCommonLabel(viewportNum);
    element.refleshLabel();
}

VIEWPORT.loadViewport = function (viewport, image, viewportNum) {
    for (var i = 0; i < VIEWPORT.loadViewportList.length; i++) {
        VIEWPORT[VIEWPORT.loadViewportList[i]](viewport, image, viewportNum);
    }
}
//VIEWPORT.loadViewportList = ['initTransform', 'putLabel2Element', 'delPDFView', 'settype'];
VIEWPORT.loadViewportList = ['initTransform', 'putLabel2Element'];

function wadorsLoader(url, onlyload, seriesInstanceNumber) {
    showLoaderMain(false);
    var data = [];

    return new Promise((resolve, reject) => {
        function getData() {
            var headers = {
                'user-agent': 'Mozilla/5.0 MDN Example',
                'content-type': 'multipart/related; type=application/dicom;'
            }
            var wadoToken = ConfigLog.WADO.token;
            for (var to = 0; to < Object.keys(wadoToken).length; to++) {
                if (wadoToken[Object.keys(wadoToken)[to]] != "") {
                    headers[Object.keys(wadoToken)[to]] = wadoToken[Object.keys(wadoToken)[to]];
                }
            }
            fetch(url, { headers })
                .then(async function (res) {
                    let resBlob = await res.arrayBuffer();
                    let intArray = new Uint8Array(resBlob);
                    var string = '';
                    for (let i = 0; i < intArray.length; i++) {
                        string += String.fromCodePoint(intArray[i]);
                    }

                    var url = await stowMultipartRelated(string);
                    if (onlyload == true) loadDICOMFromUrl(url, false, seriesInstanceNumber);
                    else loadDICOMFromUrl(url, undefined, seriesInstanceNumber);
                    resolve(); // <-- resolve when done
                })
                .catch(function (err) { reject(err); })
        }
        async function stowMultipartRelated(iData) {
            let multipartMessage = iData;
            let startBoundary = multipartMessage.split("\r\n")[0];
            let matches = multipartMessage.matchAll(new RegExp(startBoundary, "gi"));
            let fileEndIndex = [];
            let fileStartIndex = [];
            for (let match of matches) {
                fileEndIndex.push(match.index - 2);
            }
            fileEndIndex = fileEndIndex.slice(1);
            let data = multipartMessage.split("\r\n");
            let filename = [];
            let files = [];
            //let contentDispositionList = [];
            //let contentTypeList = [];
            for (let i in data) {
                let text = data[i];
                if (text.includes("Content-Disposition")) {
                    //contentDispositionList.push(text);
                    let textSplitFileName = text.split("filename=")
                    filename.push(textSplitFileName[textSplitFileName.length - 1].replace(/"/gm, ""));
                } else if (text.includes("Content-Type")) {
                    //contentTypeList.push(text);
                }
            }
            //contentDispositionList = _.uniq(contentDispositionList);
            //contentTypeList = _.uniq(contentTypeList);
            let teststring = ["Content-Type", "Content-Length", "MIME-Version"]
            let matchesIndex = []
            for (let type of teststring) {
                let contentTypeMatches = multipartMessage.matchAll(new RegExp(`${type}.*[\r\n|\r|\n]$`, "gim"));
                for (let match of contentTypeMatches) {
                    matchesIndex.push({
                        index: match.index,
                        length: match['0'].length
                    })
                }
            }

            function maxBy(array, n) {
                let result;
                if (!array) return result;
                var tempN = Number.MIN_VALUE;
                for (const obj of array) {
                    if (obj && obj[n]) {
                        var value = obj[n];
                        if (!isNaN(value) && value > tempN) {
                            tempN = value;
                            result = obj;
                        }
                    }
                }
                return result;
            }

            let maxIndex = maxBy(matchesIndex, "index");
            fileStartIndex.push(maxIndex.index + maxIndex.length + 3);
            for (let i in fileEndIndex) {
                let fileData = multipartMessage.substring(fileStartIndex[i], fileEndIndex[i]);
                files.push(fileData);
            }

            function str2ab(str) {
                var buf = new ArrayBuffer(str.length); // 2 bytes for each char
                var bufView = new Uint8Array(buf);
                for (var i = 0, strLen = str.length; i < strLen; i++) {
                    bufView[i] = str.charCodeAt(i);
                }
                return buf;
            }
            let buf = str2ab(files[0]);

            var url = URL.createObjectURL(new Blob([buf], { type: "application/dicom" }));
            return url;

        }
        getData();
    });
}

function PdfLoader(pdf, Sop) {
    Pages.displayPage("PdfPage");
    img2darkByClass("pdf", false);
    leftLayout.setAccent(Sop.parent.SeriesInstanceUID);

    //如果瀏覽器支援顯示pdf
    if ('PDF Viewer' in navigator.plugins) {
        if (getByid("PDFView")) {
            if (getByid("PDFView").src != pdf)
                getByid("PDFView").src = pdf;
        }
        else {
            var iFrame = document.createElement("iframe");
            iFrame.className = "PDFView";
            iFrame.id = "PDFView";
            iFrame.src = pdf;
            getByid("PdfPage").appendChild(iFrame);
        }
    } else {
        if (getByid("PDFDownloadImg")) {
            if (getByid("PDFDownloadImg").pdf != pdf)
                getByid("PDFDownloadImg").pdf = pdf;
        } else {
            var img = new Image();
            img.id = "PDFDownloadImg";
            img.width = 100, img.height = 100;
            img.src = "../image/icon/lite/download_pdf.png";
            img.pdf = pdf;
            img.onclick = function () {
                var link = document.createElement('a');
                link.href = this.pdf;
                link.download = 'file.pdf';
                link.dispatchEvent(new MouseEvent('click'));
            }
            getByid("PdfPage").appendChild(img);
        }
    }
}

function DcmLoader(image, viewport) {
    if (Pages.type != "DicomPage") {
        Pages.displayPage("DicomPage");
        img2darkByClass("dcm", true);
    }

    var MarkCanvas = viewport.MarkCanvas, MainCanvas = viewport.canvas;

    if (image.NumberOfFrames > 1) viewport.QRLevel = "frames";
    else if (image.haveSameInstanceNumber) viewport.QRLevel = "sop";
    else viewport.QRLevel = "series";

    viewport.content.image = image;
    if (image.imageDataLoaded == false && image.loadImageData) image.loadImageData();
    viewport.content.pixelData = image.pixelData;
    //需要setimage到element
    createDicomTagsList2Viewport(viewport);

    refleshCanvas(viewport);

    //StudyUID:x0020000d,Series UID:x0020000e,SOP UID:x00080018,
    //Instance Number:x00200013,影像檔編碼資料:imageId,PatientId:x00100020
    VIEWPORT.loadViewport(viewport, image, viewport.index);

    //渲染影像到viewport和原始影像
    // showTheImage(element, image, 'normal', ifNowSeries, viewportNum);
    // showTheImage(originelement, image, 'origin', null, viewportNum);

    //紀錄Window Level
    if (!viewport.windowCenter) viewport.windowCenter = image.windowCenter;
    if (!viewport.windowWidth) viewport.windowWidth = image.windowWidth;

    //顯示資訊到label
    setSeriesCount(viewport.index);
    setWindowLevel(viewport.index);

    //渲染上去後畫布應該從原始大小縮小為適當大小
    if (!viewport.scale)
        viewport.scale = Math.min(viewport.div.clientWidth / viewport.width, viewport.div.clientHeight / viewport.height);

    MarkCanvas.width = MainCanvas.width, MarkCanvas.height = MainCanvas.height;

    MarkCanvas.getContext("2d").save();
    //initNewCanvas();

    setTransform(viewport.index);
    MarkCanvas.style.transform = MainCanvas.style.transform;

    if (openWindow == false && openZoom == false) openMouseTool = true;

    //隱藏Table
    getByid("TableSelectNone").selected = true;
    displayMark(viewport.index);//BlueLight2//
    displayRuler(viewport.index);
    displayAIM();
    //displayAnnotation();
    //displayAllRuler();
    viewport.refleshScrollBar();
    refleshGUI();
}

function loadPicture(url) {
    var img = new Image();
    img.onload = function () {
        var imageObj = {};
        imageObj.StudyInstanceUID = CreateUid("study");
        imageObj.SeriesInstanceUID = CreateUid("series");
        imageObj.SOPInstanceUID = CreateUid("sop");
        imageObj.DicomTagsList
        imageObj.data = {};
        imageObj.data.string = function () { return ""; };
        imageObj.color = true;
        imageObj.windowCenter = 127.5;
        imageObj.windowWidth = 255;
        imageObj.data.elements = [];

        imageObj.width = img.width;
        imageObj.height = img.height;
        imageObj.instance = 0;
        imageObj.patientId = "patientID:" + securePassword(0, 99999, 1);
        imageObj.url = img.src;

        var Sop = ImageManager.pushStudy(imageObj);
        Sop.type = 'img';

        var canvas = document.createElement("CANVAS");
        canvas.width = img.width, canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        imageObj.pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        imageObj.getPixelData = function () { return this.pixelData; };
        //改成無論是否曾出現在左側面板，都嘗試加到左側面板
        var qrLv = new QRLv({});
        qrLv.study = imageObj.StudyInstanceUID, qrLv.series = imageObj.SeriesInstanceUID, qrLv.sop = imageObj.SOPInstanceUID;
        leftLayout.setImg2Left(qrLv, imageObj.patientId, imageObj);
        leftLayout.appendCanvasBySeries(imageObj.SeriesInstanceUID, imageObj, imageObj.pixelData);
        leftLayout.refleshMarkWithSeries(imageObj.SeriesInstanceUID);
        resetViewport();
        GetViewport().loadImgBySop(Sop);
        console.log(GetViewport())
    }
    img.src = url;
}

function loadDicomDataSet(fileData, loadimage = true, url, fromLocal = false, seriesInstanceNumber) {
    var byteArray = new Uint8Array(fileData);
    try {
        var dataSet = dicomParser.parseDicom(byteArray);
    } catch (ex) {
        if (loadimage && ImageManager.NumOfPreLoadSops >= 1) ImageManager.NumOfPreLoadSops -= 1;
        return;
    }


    //PDF
    if (dataSet.string(Tag.MediaStorageSOPClassUID) == SOPClassUID.EncapsulatedPDFStorage)
        loadImageFromDataSet(dataSet, 'pdf', loadimage, url, fromLocal, seriesInstanceNumber);

    //Mark
    else if (dataSet.string(Tag.MediaStorageSOPClassUID) == SOPClassUID.RTStructureSetStorage)//RTSS
        readDicomMark(dataSet);
    else if (dataSet.string(Tag.SOPClassUID) == SOPClassUID.SegmentationStorage)
        loadDicomSeg(getDefaultImageObj(dataSet, 'seg'))
    else if (dataSet.string(Tag.MediaStorageSOPClassUID) == SOPClassUID.GrayscaleSoftcopyPresentationStateStorage)
        readDicomMark(dataSet)

    //ECG
    else if (dataSet.string(Tag.MediaStorageSOPClassUID) == SOPClassUID._12_leadECGWaveformStorage) {
        if (openECG) loadImageFromDataSet(dataSet, 'ecg', loadimage, url, fromLocal, seriesInstanceNumber);
        throw "not support ECG";
    }

    //DiCOM Image
    else if (dataSet.string(Tag.MediaStorageSOPClassUID) == SOPClassUID.MRImageStorage)//MR
        loadImageFromDataSet(dataSet, dataSet.intString(Tag.NumberOfFrames) > 1 ? 'frame' : 'sop', loadimage, url, fromLocal, seriesInstanceNumber);
    else if (dataSet.string(Tag.MediaStorageSOPClassUID) == SOPClassUID.CTImageStorage)//CT
        loadImageFromDataSet(dataSet, dataSet.intString(Tag.NumberOfFrames) > 1 ? 'frame' : 'sop', loadimage, url, fromLocal, seriesInstanceNumber);
    else if (dataSet.string(Tag.MediaStorageSOPClassUID) == SOPClassUID.ComputedRadiographyImageStorage)//X-Ray
        loadImageFromDataSet(dataSet, dataSet.intString(Tag.NumberOfFrames) > 1 ? 'frame' : 'sop', loadimage, url, fromLocal, seriesInstanceNumber);

    //DiCOM Image(Multi-Frame)
    else if (dataSet.string(Tag.MediaStorageSOPClassUID) == SOPClassUID.Multi_frameSingleBitSecondaryCaptureImageStorage)
        loadImageFromDataSet(dataSet, dataSet.intString(Tag.NumberOfFrames) > 1 ? 'frame' : 'sop', loadimage, url, fromLocal, seriesInstanceNumber);
    else if (dataSet.string(Tag.MediaStorageSOPClassUID) == SOPClassUID.Multi_frameGrayscaleByteSecondaryCaptureImageStorage)
        loadImageFromDataSet(dataSet, dataSet.intString(Tag.NumberOfFrames) > 1 ? 'frame' : 'sop', loadimage, url, fromLocal, seriesInstanceNumber);
    else if (dataSet.string(Tag.MediaStorageSOPClassUID) == SOPClassUID.Multi_frameGrayscaleWordSecondaryCaptureImageStorage)
        loadImageFromDataSet(dataSet, dataSet.intString(Tag.NumberOfFrames) > 1 ? 'frame' : 'sop', loadimage, url, fromLocal, seriesInstanceNumber);
    else if (dataSet.string(Tag.MediaStorageSOPClassUID) == SOPClassUID.Multi_frameTrueColorSecondaryCaptureImageStorage)
        loadImageFromDataSet(dataSet, dataSet.intString(Tag.NumberOfFrames) > 1 ? 'frame' : 'sop', loadimage, url, fromLocal, seriesInstanceNumber);

    //try parse
    else loadImageFromDataSet(dataSet, dataSet.intString(Tag.NumberOfFrames) > 1 ? 'frame' : 'sop', loadimage, url, fromLocal, seriesInstanceNumber);
    //else if (dataSet.intString(Tag.NumberOfFrames) > 1) loadImageFromDataSet(dataSet, 'frame', loadimage, url);
    //else loadImageFromDataSet(dataSet, 'sop', loadimage, url);


    //else if (image.data.string(Tag.SOPClassUID) == SOPClassUID.SegmentationStorage) loadDicomSeg(image, DICOM_obj.imageId);
    //else if (image.data.string(Tag.MediaStorageSOPClassUID) == SOPClassUID.EncapsulatedPDFStorage) parseDicomWithoutImage(image.data, DICOM_obj.imageId); 
}

function showLoader(show) {
    document.getElementById("loader").style.display = show ? "inline-flex" : "none";
}

function showLoaderMain(show) {
    document.getElementById("loaderMain").style.display = show ? "inline-flex" : "none";
}

async function loadDICOMFromUrl(url, loadimage = true, seriesInstanceNumber) {
    // Initialize counter if not defined
    if (typeof loadDICOMFromUrl.callCount === "undefined") {
        loadDICOMFromUrl.callCount = 0;
    }
    // Increment the counter
    loadDICOMFromUrl.callCount++;

    var oReq = new XMLHttpRequest();
    try { oReq.open("get", url, true); }
    catch (e) { console.log(e); }

    oReq.responseType = "arraybuffer";
    if (loadimage) {
        oReq.onreadystatechange = function (oEvent) {
            if (oReq.readyState == 4 && oReq.status == 200)
                loadDicomDataSet(oReq.response, true, url, false, seriesInstanceNumber);
        }
    } else {
        oReq.onreadystatechange = function (oEvent) {
            if (oReq.readyState == 4 && oReq.status == 200)
                loadDicomDataSet(oReq.response, false, url, false, seriesInstanceNumber);
        }
    }
    oReq.send();
    if (seriesInstanceNumber?.SeriesResponse <= loadDICOMFromUrl.callCount) {
        await new Promise(resolve => setTimeout(resolve, 500));
        showLoader(false);
    }
}

function initNewCanvas() {
    //添加事件
    try {
        for (var i = 0; i < Viewport_Total; i++) {
            GetViewport(i).div.removeEventListener("contextmenu", contextmenuF, false);
            GetViewport(i).div.removeEventListener("mousemove", BlueLightMousemove, false);
            GetViewport(i).div.removeEventListener("mousedown", BlueLightMousedown, false);
            GetViewport(i).div.removeEventListener("mouseup", BlueLightMouseup, false);
            GetViewport(i).div.removeEventListener("mouseout", Mouseout, false);
            GetViewport(i).div.removeEventListener("wheel", Wheel, false);
            GetViewport(i).div.removeEventListener("mousedown", SwitchViewport, false);
            GetViewport(i).div.removeEventListener("touchstart", BlueLightTouchstart, false);
            GetViewport(i).div.removeEventListener("touchend", BlueLightTouchend, false);
            GetViewport(i).div.addEventListener("touchstart", SwitchViewport, false);
            GetViewport(i).div.addEventListener("mousedown", SwitchViewport, false);
            GetViewport(i).div.addEventListener("wheel", Wheel, false);
        }
        GetViewport().div.removeEventListener("touchstart", SwitchViewport, false);
        GetViewport().div.removeEventListener("mousedown", SwitchViewport, false);
        GetViewport().div.addEventListener("contextmenu", contextmenuF, false);
        GetViewport().div.addEventListener("mousemove", BlueLightMousemove, false);
        GetViewport().div.addEventListener("mousedown", BlueLightMousedown, false);
        GetViewport().div.addEventListener("mouseup", BlueLightMouseup, false);
        GetViewport().div.addEventListener("mouseout", Mouseout, false);
        GetViewport().div.addEventListener("touchstart", BlueLightTouchstart, false);
        GetViewport().div.addEventListener("touchmove", BlueLightTouchmove, false);
        GetViewport().div.addEventListener("touchend", BlueLightTouchend, false);
    } catch (ex) { console.log(ex); }
    //GetViewport().div.addEventListener("wheel", wheelF, false); --*
}

function createDicomTagsList2Viewport(viewport) {
    function getTag(tag) {
        var group = tag.substring(1, 5);
        var element = tag.substring(5, 9);
        var tagIndex = (`(${group},${element})`).toUpperCase();
        var attr = TAG_DICT[tagIndex];
        return attr;
    }

    //取得DICOM Tags放入清單
    viewport.DicomTagsList = [];
    if (viewport.Sop.type == "img") viewport.DicomTagsList.SOPInstanceUID = viewport.content.image.SOPInstanceUID;

    for (el in viewport.content.image.data.elements) {
        try {
            var tag = (`(${el.substring(1, 5)},${el.substring(5, 9)})`).toUpperCase();
            var el1 = getTag(el);
            el1.tag = "" + el;
            var content = dicomParser.explicitElementToString(viewport.content.image.data, el1);
            if (content) {
                viewport.DicomTagsList.push([tag, el1.name, content]);
                viewport.DicomTagsList[el1.name] = content;
            } else {
                var name = ("" + el1.name).toLowerCase();
                if (!viewport.content.image[name]) {
                    if (el1.vr == 'US') {
                        viewport.DicomTagsList.push([tag, el1.name, viewport.content.image.data.uint16(el)]);
                        viewport.DicomTagsList[el1.name] = image.data.uint16(el);
                    } else if (el1.vr === 'SS') {
                        viewport.DicomTagsList.push([tag, el1.name, viewport.content.image.data.int16(el)]);
                        viewport.DicomTagsList[el1.name] = image.data.int16(el);
                    } else if (el1.vr === 'UL') {
                        viewport.DicomTagsList.push([tag, el1.name, viewport.content.image.data.uint32(el)]);
                        viewport.DicomTagsList[el1.name] = image.data.uint32(el);
                    } else if (el1.vr === 'SL') {
                        viewport.DicomTagsList.push([tag, el1.name, viewport.content.image.data.int32(el)]);
                        viewport.DicomTagsList[el1.name] = image.data.int32(el);
                    } else if (el1.vr === 'FD') {
                        viewport.DicomTagsList.push([tag, el1.name, viewport.content.image.data.double(el)]);
                        viewport.DicomTagsList[el1.name] = image.data.double(el);
                    } else if (el1.vr === 'FL') {
                        viewport.DicomTagsList.push([tag, el1.name, viewport.content.image.data.float(el)]);
                        viewport.DicomTagsList[el1.name] = image.data.float(el);
                    } else {
                        viewport.DicomTagsList.push([tag, el1.name, ""]);
                        viewport.DicomTagsList[el1.name] = "";
                    }
                } else {
                    viewport.DicomTagsList.push([tag, el1.name, viewport.content.image[name]]);
                    viewport[el1.name] = viewport.content.image[name];
                }
            }
        } catch (ex) { }
    }
}