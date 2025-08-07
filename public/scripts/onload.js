//裝DICOM Tags設定檔的物件
var DicomTags = {};
//裝伺服器設定檔的物件
var ConfigLog = {};
//代表config檔已經載入完畢 --*
var configOnload = false;

// Deferred loading globals
let deferredLoadTasks = new Map();
let seriesQueue = [];
let activeSeriesUID = null;
let sequentialLoadingActive = false;
let isManualLoading = false;
let currentSeriesUID = null;

window.onload = function () {
  //執行其他Script提供的高優先度onload函數
  onloadFunction.ExecuteFirst();
  //執行RWD
  //EnterRWD();
  //初始化參數
  loadLdcmview();
  //初始化HTML元素事件
  html_onload();
  //執行RWD
  EnterRWD();
  //執行其他Script提供的低優先度onload函數
  onloadFunction.ExecuteLast();
  onloadFunction.onloaded = true;
}

class OnloadFunction {
  constructor() {
    this.FisrtList = [];
    this.LastList = [];
    this.onloaded = false;
  }
  push(fun) {
    if (fun.constructor.name == 'Function') this.LastList.push(fun);
    else throw "not function";
    if (this.onloaded) fun();//若已經onload過了，就直接執行
  }
  push2First(fun) {
    if (fun.constructor.name == 'Function') this.FisrtList.push(fun);
    else throw "not function";
    if (this.onloaded) fun();
  }
  push2Last(fun) {
    if (fun.constructor.name == 'Function') this.LastList.push(fun);
    else throw "not function";
    if (this.onloaded) fun();
  }
  ExecuteFirst() {
    for (var fun of this.FisrtList) fun();
  }
  ExecuteLast() {
    for (var fun of this.LastList) fun();
  }
}
var onloadFunction = new OnloadFunction();

function loadLdcmview() {

  //隱藏一開始不需要的元素
  HideElemByID(["WindowLevelDiv", "labelZoom", "labelPlay", "textPlay", "textZoom", "MarkStyleDiv"/*, "GraphicStyleDiv"*/]);

  //初始化每一個Viewport的參數
  for (var i = 0; i < Viewport_Total; i++) {
    ViewPortList.push(new BlueLightViewPort(i));
  }
  initNewCanvas();

  HideElemByID(["textWC", "textWW"]);

  //載入config檔的設定
  readDicomTags("../data/dicomTags.json", setLabelPadding);
  readConfigJson("../data/config.json", readAllJson, readJson);

  //設定icon邊框
  drawBorder(getByid("MouseOperation"));
  //顯示label
  displayAnnotation();
}

function getParameterByName(name) {
  name = name.replace(/\[\[]/g, "\\[").replace(/\[\]]/g, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  if (results == null) {
    results = "";
  } else {
    results = decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  var pair1 = ("" + results).split(",");
  var pairList = [];
  for (var j = 0; j < pair1.length; j++) {
    pairList.push(pair1[j]);
  }
  return pairList;
}

function setLabelPadding() {
  labelPadding = isNaN(parseInt(DicomTags.labelPadding)) ? 5 : parseInt(DicomTags.labelPadding);
  leftLabelPadding = isNaN(parseInt(DicomTags.leftLabelPadding)) ? labelPadding : parseInt(DicomTags.leftLabelPadding);
  rightLabelPadding = isNaN(parseInt(DicomTags.rightLabelPadding)) ? labelPadding : parseInt(DicomTags.rightLabelPadding);
  topLabelPadding = isNaN(parseInt(DicomTags.topLabelPadding)) ? labelPadding : parseInt(DicomTags.topLabelPadding);
  bottomLabelPadding = isNaN(parseInt(DicomTags.bottomLabelPadding)) ? labelPadding : parseInt(DicomTags.bottomLabelPadding);
  document.documentElement.style.setProperty('--labelPadding', `${labelPadding}px`);
  document.documentElement.style.setProperty('--leftLabelPadding', `${leftLabelPadding}px`);
  document.documentElement.style.setProperty('--rightLabelPadding', `${rightLabelPadding}px`);
  document.documentElement.style.setProperty('--topLabelPadding', `${topLabelPadding}px`);
  document.documentElement.style.setProperty('--bottomLabelPadding', `${bottomLabelPadding}px`);
}

function readDicomTags(url, setLabelPadding) {
  //讀取DICOM Tags設定檔
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'text';
  var dicomtags = {};
  //LT代表left  top
  //RT代表right top
  //LB代表left  bottom
  //RB代表right bottom
  request.onload = function () {
    if (request.readyState != 4)  { return; }
    var responseJson = JSON.parse(request.responseText);
    var DicomResponse = responseJson["default"];
    dicomtags.labelPadding = parseInt(DicomResponse["labelPadding"]) ? parseInt(DicomResponse["labelPadding"]) : 5;
    dicomtags.leftLabelPadding = parseInt(DicomResponse["leftLabelPadding"]) ? parseInt(DicomResponse["leftLabelPadding"]) : dicomtags.labelPadding;
    dicomtags.rightLabelPadding = parseInt(DicomResponse["rightLabelPadding"]) ? parseInt(DicomResponse["rightLabelPadding"]) : dicomtags.labelPadding;
    dicomtags.topLabelPadding = parseInt(DicomResponse["topLabelPadding"]) ? parseInt(DicomResponse["topLabelPadding"]) : dicomtags.labelPadding;
    dicomtags.bottomLabelPadding = parseInt(DicomResponse["bottomLabelPadding"]) ? parseInt(DicomResponse["bottomLabelPadding"]) : dicomtags.labelPadding;

    dicomtags.LT = {};
    dicomtags.LT.value = [];
    for (var i = 0; i < DicomResponse["LT"].length; i++) {
      dicomtags.LT.value.push(DicomResponse["LT"][i].value);
    }
    dicomtags.RT = {};
    dicomtags.RT.value = [];
    for (var i = 0; i < DicomResponse["RT"].length; i++) {
      dicomtags.RT.value.push(DicomResponse["RT"][i].value);
    }
    dicomtags.LB = {};
    dicomtags.LB.value = [];
    for (var i = 0; i < DicomResponse["LB"].length; i++) {
      dicomtags.LB.value.push(DicomResponse["LB"][i].value);
    }
    dicomtags.RB = {};
    dicomtags.RB.value = [];
    for (var i = 0; i < DicomResponse["RB"].length; i++) {
      dicomtags.RB.value.push(DicomResponse["RB"][i].value);
    }

    dicomtags.MT = {};
    dicomtags.MT.value = [];
    for (var i = 0; i < DicomResponse["MT"].length; i++) {
      dicomtags.MT.value.push(DicomResponse["MT"][i].value);
    }
    dicomtags.MB = {};
    dicomtags.MB.value = [];
    for (var i = 0; i < DicomResponse["MB"].length; i++) {
      dicomtags.MB.value.push(DicomResponse["MB"][i].value);
    }
    dicomtags.LM = {};
    dicomtags.LM.value = [];
    for (var i = 0; i < DicomResponse["LM"].length; i++) {
      dicomtags.LM.value.push(DicomResponse["LM"][i].value);
    }
    dicomtags.RM = {};
    dicomtags.RM.value = [];
    for (var i = 0; i < DicomResponse["RM"].length; i++) {
      dicomtags.RM.value.push(DicomResponse["RM"][i].value);
    }
    //指派至全域變數
    Object.assign(DicomTags, dicomtags);
    if (setLabelPadding) setLabelPadding();
  }
  request.send();
}

function operateQueryString(queryString) {
  var TAG_LIST = [];
  var NewQueryString = "";
  for (var key in TAG_DICT) { TAG_LIST.push(TAG_DICT[key]["name"]) };
  for (var i = 0; i < queryString.split("&").length; i++) {
    if (TAG_LIST.includes(queryString.split("&")[i].split("=")[0])) {
      if (i != 0) NewQueryString += "&";
      NewQueryString += queryString.split("&")[i];
    }
  }
  return NewQueryString;
}

function load_WebImg() {
  function getQueryVariable_WebImg(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }
  var webimgurl = getQueryVariable_WebImg("webimgurl");
  if (webimgurl) {
    loadPicture(webimgurl);
  }
}

function readAllJson(readJson) {
  //整合QIDO-RS的URL並發送至伺服器
  var queryString = ("" + location.search).replace("?", "");
  queryString = operateQueryString(queryString);
  if (queryString.length > 0) {
    var url = ConfigLog.QIDO.https + "://" + ConfigLog.QIDO.hostname + ":" + ConfigLog.QIDO.PORT + "/" + ConfigLog.QIDO.service + "/series" + "?" + queryString + "";
    url = fitUrl(url);
    readJson(url);
  }
  load_WebImg();
}

function fitUrl(url) {
  url = url.replace('?&', '?');
  url = url.replace("http://http://", "http://");
  url = url.replace("https://http://", "https://");
  url = url.replace("http://https://", "http://");
  url = url.replace("https://https://", "https://");
  return url;
}

function readConfigJson(url, readAllJson, readJson) {
  //載入config檔的設定，包含伺服器、請求協定、類型...等等
  var config = {};
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'text';
  request.send();
  request.onload = function () {
    var DicomResponse = JSON.parse(request.responseText);
    config.QIDO = {};

    tempResponse = DicomResponse["DICOMWebServersConfig"][0];
    tempConfig = config.QIDO
    tempConfig.hostname = tempResponse["QIDO-hostname"];
    tempConfig.https = tempResponse["QIDO-enableHTTPS"] == true ? "https" : "http";
    tempConfig.PORT = tempResponse["QIDO-PORT"];
    tempConfig.service = tempResponse["QIDO"];
    tempConfig.contentType = tempResponse["contentType"];
    tempConfig.timeout = tempResponse["timeout"];
    tempConfig.charset = tempResponse["charset"];
    tempConfig.includefield = tempResponse["includefield"];
    tempConfig.token = tempResponse["token"];
    tempConfig.enableRetrieveURI = tempResponse["enableRetrieveURI"];
    //tempConfig.enableXml2Dcm=tempResponse["enableXml2Dcm"];
    //tempConfig.Xml2DcmUrl=tempResponse["Xml2DcmUrl"];

    config.WADO = {};
    tempConfig = config.WADO;
    tempResponse = DicomResponse["DICOMWebServersConfig"][0];
    tempConfig.hostname = tempResponse["WADO-hostname"];
    tempConfig.https = tempResponse["WADO-enableHTTPS"] == true ? "https" : "http";
    tempConfig.PORT = tempResponse["WADO-PORT"];
    tempConfig.WADOType = tempResponse["WADO-RS/URI"];
    if (tempConfig.WADOType == "URI") tempConfig.service = tempResponse["WADO-URI"];
    else if (tempConfig.WADOType == "RS") tempConfig.service = tempResponse["WADO-RS"];
    else tempConfig.service = tempResponse["WADO-URI"];
    tempConfig.contentType = tempResponse["contentType"];
    tempConfig.timeout = tempResponse["timeout"];
    tempConfig.includefield = tempResponse["includefield"];
    tempConfig.token = tempResponse["token"];
    tempConfig.enableRetrieveURI = tempResponse["enableRetrieveURI"];

    //tempConfig.enableXml2Dcm=tempResponse["enableXml2Dcm"];
    //tempConfig.Xml2DcmUrl=tempResponse["Xml2DcmUrl"];

    config.STOW = {};
    tempConfig = config.STOW;
    tempResponse = DicomResponse["DICOMWebServersConfig"][0];
    tempConfig.hostname = tempResponse["hostname"];
    tempConfig.https = tempResponse["enableHTTPS"] == true ? "https" : "http";
    tempConfig.PORT = tempResponse["PORT"];
    tempConfig.service = tempResponse["STOW"];
    tempConfig.contentType = tempResponse["contentType"];
    tempConfig.timeout = tempResponse["timeout"];
    tempConfig.includefield = tempResponse["includefield"];
    tempConfig.token = tempResponse["token"];
    tempConfig.enableRetrieveURI = tempResponse["enableRetrieveURI"];
    //tempConfig.enableXml2Dcm=tempResponse["enableXml2Dcm"];
    //tempConfig.Xml2DcmUrl=tempResponse["Xml2DcmUrl"];

    config.Xml2Dcm = {};
    tempConfig = config.Xml2Dcm;
    tempConfig.enableXml2Dcm = tempResponse["enableXml2Dcm"];
    tempConfig.Xml2DcmUrl = tempResponse["Xml2DcmUrl"];
    tempConfig.token = tempResponse["token"];

    Object.assign(ConfigLog, config);
    configOnload = true;

    readAllJson(readJson);
  }
}

function getValue(obj) {
  if (obj && obj.Value && obj.Value[0]) {
    return obj.Value[0];
  }
}

// function getJsonByInstanceRequest(SeriesResponse, InstanceRequest, instance) {
//   let DicomResponse = InstanceRequest.response;
//   var min = 1000000000;
//   var firstUrl;
//   //取得最小的Instance Number
//   for (var i = 0; i < DicomResponse.length; i++) {
//     try {
//       if (getValue(DicomResponse[i]["00200013"]) < min) min = getValue(DicomResponse[i]["00200013"]);
//     } catch (ex) { console.log(ex); };
//   }
//   //StudyUID:0020000d,Series UID:0020000e,SOP UID:00080018,
//   //Instance Number:00200013,影像檔編碼資料:imageId,PatientId:00100020

//   //載入標記以及首張影像
//   for (var i = 0; i < DicomResponse.length; i++) {
//     //取得WADO的路徑
//     if (ConfigLog.WADO.WADOType == "URI") {
//       var url = ConfigLog.WADO.https + "://" + ConfigLog.WADO.hostname + ":" + ConfigLog.WADO.PORT + "/" + ConfigLog.WADO.service + "?requestType=WADO&" +
//         "studyUID=" + DicomResponse[i]["0020000D"].Value[0] +
//         "&seriesUID=" + DicomResponse[i]["0020000E"].Value[0] +
//         "&objectUID=" + DicomResponse[i]["00080018"].Value[0] +
//         "&contentType=" + "application/dicom";
//     } else if (ConfigLog.WADO.WADOType == "RS") {
//       var url = ConfigLog.WADO.https + "://" + ConfigLog.WADO.hostname + ":" + ConfigLog.WADO.PORT + "/" + ConfigLog.WADO.service +
//         "/studies/" + DicomResponse[i]["0020000D"].Value[0] +
//         "/series/" + DicomResponse[i]["0020000E"].Value[0] +
//         "/instances/" + DicomResponse[i]["00080018"].Value[0];
//     }

//     url = fitUrl(url);

//     try {
//       if (getValue(DicomResponse[i]["00200013"]) == min || DicomResponse.length == 1) {
//         //預載入DICOM至Viewport
//         if (ConfigLog.WADO.WADOType == "URI") loadDICOMFromUrl(url);
//         else if (ConfigLog.WADO.WADOType == "RS") wadorsLoader(url);
//         firstUrl = url;
//       }
//     } catch (ex) { console.log(ex); }
//   }
//   //StudyUID:0020000d,Series UID:0020000e,SOP UID:00080018,
//   //Instance Number:00200013,影像檔編碼資料:imageId,PatientId:00100020

//   //載入其餘所有影像
//   function loadDicom(i) {
//     if (ConfigLog.WADO.WADOType == "URI") {
//       var url = ConfigLog.WADO.https + "://" + ConfigLog.WADO.hostname + ":" + ConfigLog.WADO.PORT + "/" + ConfigLog.WADO.service + "?requestType=WADO&" +
//         "studyUID=" + DicomResponse[i]["0020000D"].Value[0] +
//         "&seriesUID=" + DicomResponse[i]["0020000E"].Value[0] +
//         "&objectUID=" + DicomResponse[i]["00080018"].Value[0] +
//         "&contentType=" + "application/dicom";
//       /*
//       var url = `${ConfigLog.WADO.https}://${ConfigLog.WADO.hostname}:${ConfigLog.WADO.PORT}/${ConfigLog.WADO.service}?requestType=WADO&` +
//       `studyUID=${DicomResponse[i]["0020000D"].Value[0]}&seriesUID=${DicomResponse[i]["0020000E"].Value[0]}` +
//       `&objectUID=${DicomResponse[i]["00080018"].Value[0]}&contentType=application/dicom`;
//       */
//     } else if (ConfigLog.WADO.WADOType == "RS") {
//       var url = ConfigLog.WADO.https + "://" + ConfigLog.WADO.hostname + ":" + ConfigLog.WADO.PORT + "/" + ConfigLog.WADO.service +
//         "/studies/" + DicomResponse[i]["0020000D"].Value[0] +
//         "/series/" + DicomResponse[i]["0020000E"].Value[0] +
//         "/instances/" + DicomResponse[i]["00080018"].Value[0];
//     }
//     url = fitUrl(url);
//     if (url == firstUrl) return;
//     try {
//       //預載入DICOM至Viewport
//       if (ConfigLog.WADO.WADOType == "RS") wadorsLoader(url, true);
//       else loadDICOMFromUrl(url, false);

//     } catch (ex) { console.log(ex); }
//   }
//   function wait(time) { return new Promise((resolve) => setTimeout(resolve, time)); }
//   for (var i = 0; i < DicomResponse.length; i++) {
//     const i_ = i;
//     wait(parseInt(i_ / 50) * 2000).then(() => { loadDicom(i_); });
//   }
// }

// function getJsonBySeriesRequest(SeriesRequest) {
//   let SeriesResponse = SeriesRequest.response, InstanceUrl = "";
//   for (let instance = 0; instance < SeriesResponse.length; instance++) {
//     if (ConfigLog.QIDO.enableRetrieveURI == true) InstanceUrl = SeriesResponse[instance]["00081190"].Value[0] + "/instances";
//     else InstanceUrl = fitUrl(ConfigLog.QIDO.https + "://" + ConfigLog.QIDO.hostname + ":" + ConfigLog.QIDO.PORT + "/" + ConfigLog.QIDO.service) +
//       "/studies/" + SeriesResponse[instance]["0020000D"].Value[0] +
//       "/series/" + SeriesResponse[instance]["0020000E"].Value[0] + "/metadata";

//     if (ConfigLog.WADO.includefield == true) InstanceUrl += "?includefield=all";
//     if (ConfigLog.WADO.https == "https") InstanceUrl = InstanceUrl.replace("http:", "https:");
//     let InstanceRequest = new XMLHttpRequest();
//     InstanceRequest.open('GET', InstanceUrl);
//     InstanceRequest.responseType = 'json';
//     //發送以Instance為單位的請求
//     var wadoToken = ConfigLog.WADO.token;
//     for (var to = 0; to < Object.keys(wadoToken).length; to++) {
//       if (wadoToken[Object.keys(wadoToken)[to]] != "") {
//         InstanceRequest.setRequestHeader("" + Object.keys(wadoToken)[to], "" + wadoToken[Object.keys(wadoToken)[to]]);
//       }
//     }
//     const instance_ = instance;
//     InstanceRequest.send();
//     InstanceRequest.onload = function () {
//       getJsonByInstanceRequest(SeriesResponse, InstanceRequest, instance_);
//     }
//   }
// }

async function getJsonBySeriesRequest(SeriesRequest) {
  let SeriesResponse = SeriesRequest.response;
  let instanceUrls = [];

  for (let instance of SeriesResponse) {
    let baseUrl = ConfigLog.QIDO.https + "://" + ConfigLog.QIDO.hostname + ":" + ConfigLog.QIDO.PORT + "/" + ConfigLog.QIDO.service;
    let instanceUrl = ConfigLog.QIDO.enableRetrieveURI
      ? instance["00081190"].Value[0] + "/instances"
      : `${baseUrl}/studies/${instance["0020000D"].Value[0]}/series/${instance["0020000E"].Value[0]}/metadata`;

    if (ConfigLog.WADO.includefield) instanceUrl += "?includefield=all";
    if (ConfigLog.WADO.https === "https") instanceUrl = instanceUrl.replace("http:", "https:");

    instanceUrls.push(instanceUrl);
  }

  try {
    // Fetch all metadata requests in parallel
    const responses = await Promise.all(instanceUrls.map(url => fetchInstanceMetadata(url)));

    // For each series, load the first instance and set up deferred loading
    const firstInstancePromises = responses.map((InstanceRequest, index) => {
      return getJsonByInstanceRequest(SeriesResponse, InstanceRequest, index, InstanceRequest[0]['0020000E'].Value[0]);
    });

    // Wait for all first-instance loads to finish
    await Promise.all(firstInstancePromises);

    // Now start loading the remaining instances
    startSequentialSeriesLoading();

  } catch (error) {
    console.error("Error fetching instance metadata:", error);
  }
}

// Function to fetch metadata efficiently
async function fetchInstanceMetadata(url) {
  let headers = new Headers();
  let wadoToken = ConfigLog.WADO.token;
  for (let key in wadoToken) {
    if (wadoToken[key]) headers.append(key, wadoToken[key]);
  }

  let response = await fetch(url, { method: "GET", headers });
  return response.json();
}

// async function getJsonByInstanceRequest(SeriesResponse, InstanceRequest, instance, seriesInstanceUid) {

//   const foundItem = InstanceRequest.find(item => item["0020000E"]?.Value?.includes(seriesInstanceUid));
//   let seriesInstanceNumber;
//   if (foundItem) {
//     seriesInstanceNumber = {
//       seriesInstanceUID: seriesInstanceUid,
//       instanceNumberOfSeries: InstanceRequest.length,
//       SeriesResponse: SeriesResponse.length
//     };
//   }

//   let DicomResponse = InstanceRequest;
//   if (!DicomResponse || DicomResponse.length === 0) return;

//   let minInstance = Math.min(...DicomResponse.map(d => getValue(d["00200013"]) || Infinity));
//   let firstUrl = null;

//   // Load first image quickly, defer others
//   let loadTasks = [];

//   for (let dicomData of DicomResponse) {
//     let url = buildWADOUrl(dicomData);
//     url = fitUrl(url);

//     if (getValue(dicomData["00200013"]) === minInstance || DicomResponse.length === 1) {
//       firstUrl = url;
//       ConfigLog.WADO.WADOType === "URI" ? loadDICOMFromUrl(url) : wadorsLoader(url, undefined, seriesInstanceNumber);
//     } else {
//       loadTasks.push(loadDeferredDicom(url, seriesInstanceNumber));
//     }
//   }

//   // Batch deferred image loads with delays
//   await Promise.all(loadTasks);
// }

// function getJsonBySeriesRequest(SeriesRequest) {
//   let SeriesResponse = SeriesRequest.response, InstanceUrl = "";
//   for (let instance = 0; instance < SeriesResponse.length; instance++) {
//     if (ConfigLog.QIDO.enableRetrieveURI == true) InstanceUrl = SeriesResponse[instance]["00081190"].Value[0] + "/instances";
//     else InstanceUrl = fitUrl(ConfigLog.QIDO.https + "://" + ConfigLog.QIDO.hostname + ":" + ConfigLog.QIDO.PORT + "/" + ConfigLog.QIDO.service) +
//       "/studies/" + SeriesResponse[instance]["0020000D"].Value[0] +
//       "/series/" + SeriesResponse[instance]["0020000E"].Value[0] + "/metadata";

//     if (ConfigLog.WADO.includefield == true) InstanceUrl += "?includefield=all";
//     if (ConfigLog.WADO.https == "https") InstanceUrl = InstanceUrl.replace("http:", "https:");
//     let InstanceRequest = new XMLHttpRequest();
//     InstanceRequest.open('GET', InstanceUrl);
//     InstanceRequest.responseType = 'json';
//     //發送以Instance為單位的請求
//     var wadoToken = ConfigLog.WADO.token;
//     for (var to = 0; to < Object.keys(wadoToken).length; to++) {
//       if (wadoToken[Object.keys(wadoToken)[to]] != "") {
//         InstanceRequest.setRequestHeader("" + Object.keys(wadoToken)[to], "" + wadoToken[Object.keys(wadoToken)[to]]);
//       }
//     }
//     const instance_ = instance;
//     InstanceRequest.send();
//     InstanceRequest.onload = function () {
//       getJsonByInstanceRequest(SeriesResponse, InstanceRequest, instance_);
//     }
//   }
// }

async function getJsonByInstanceRequest(SeriesResponse, InstanceRequest, instance, seriesInstanceUid) {
  return new Promise(async (resolve) => {
    const foundItem = InstanceRequest.find(item => item["0020000E"]?.Value?.includes(seriesInstanceUid));
    let seriesInstanceNumber;
    if (foundItem) {
        seriesInstanceNumber = {
            seriesInstanceUID: seriesInstanceUid,
            instanceNumberOfSeries: InstanceRequest.length,
            SeriesResponse: SeriesResponse.length
        };
    }

    const DicomResponse = InstanceRequest;
    if (!DicomResponse || DicomResponse.length === 0) {
      resolve();
      return;
    }

    const minInstance = Math.min(...DicomResponse.map(d => getValue(d["00200013"]) || Infinity));

    // Load first instance of each series
    for (let dicomData of DicomResponse) {
        let url = buildWADOUrl(dicomData);
        url = fitUrl(url);

        if (getValue(dicomData["00200013"]) === minInstance || DicomResponse.length === 1) {
            if (ConfigLog.WADO.WADOType === "URI") {
                await loadDICOMFromUrl(url);
            } else {
                await wadorsLoader(url, undefined, seriesInstanceNumber);
            }
            break;
        }
    }

    // Store remaining instances for deferred loading
    const deferred = DicomResponse.filter(
        d => getValue(d["00200013"]) !== minInstance
    ).map(dicomData => {
        const url = fitUrl(buildWADOUrl(dicomData));
        return () => loadDeferredDicom(url, undefined, seriesInstanceNumber);
    });

    if (deferred.length > 0) {
        deferredLoadTasks.set(seriesInstanceUid, deferred);
        seriesQueue.push(seriesInstanceUid);
    }

    resolve(); // <-- resolve after first instance is loaded and deferred tasks are set
  });
}


async function startSequentialSeriesLoading() {
    sequentialLoadingActive = true;
    
    // Process one series at a time
    while (seriesQueue.length > 0 && !isManualLoading) {
        const seriesUID = seriesQueue.shift();
        await handleSeriesDoubleClick(seriesUID, false);
    }
    
    sequentialLoadingActive = false;
    currentSeriesUID = null;
}

async function handleSeriesDoubleClick(seriesInstanceUID, isConcurrent = false) {
  if (!deferredLoadTasks.has(seriesInstanceUID)) return;

  if (!isConcurrent) {
    if (!seriesQueue.some(item => item === seriesInstanceUID)) seriesQueue.push(seriesInstanceUID);
    activeSeriesUID = seriesInstanceUID;
    isManualLoading = true; // Set manual loading flag
  }

  let tasks = deferredLoadTasks.get(seriesInstanceUID);
  const batchSize = 20; // Number of instances to load in parallel

  while (tasks.length > 0) {
      if (!isConcurrent && activeSeriesUID !== seriesInstanceUID) return;

      // Take the next batch of up to 17 tasks
      let batch = tasks.splice(0, batchSize);
      // Wait for all 17 to finish before starting the next batch
      await Promise.all(batch.map(task => task()));

      // Add a small delay between batches to prevent overwhelming the system
      if (tasks.length > 0) {
          await new Promise(resolve => setTimeout(resolve, 800));
      }
  }

  if (tasks.length === 0) {
      deferredLoadTasks.delete(seriesInstanceUID);
  }

  if (!isConcurrent) {
      isManualLoading = false; // Reset manual loading flag
      // Resume sequential loading if there are more series
      if (seriesQueue.length > 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
          startSequentialSeriesLoading();
      }
  }
}
// async function getJsonByInstanceRequest(SeriesResponse, InstanceRequest, instance, seriesInstanceUid) {
//   const foundItem = InstanceRequest.find(item => item["0020000E"]?.Value?.includes(seriesInstanceUid));
//   let seriesInstanceNumber;
//   if (foundItem) {
//       seriesInstanceNumber = {
//           seriesInstanceUID: seriesInstanceUid,
//           instanceNumberOfSeries: InstanceRequest.length,
//           SeriesResponse: SeriesResponse.length
//       };
//   }

//   let DicomResponse = InstanceRequest;
//   if (!DicomResponse || DicomResponse.length === 0) return;

//   let minInstance = Math.min(...DicomResponse.map(d => getValue(d["00200013"]) || Infinity));
//   let firstUrl = null;

  // const isFirstSeries = instance === 0;

  // // Load only the first instance of the series
  // for (let dicomData of DicomResponse) {
  //     let url = buildWADOUrl(dicomData);
  //     url = fitUrl(url);

  //     if (getValue(dicomData["00200013"]) === minInstance || DicomResponse.length === 1) {
  //         firstUrl = url;
  //         ConfigLog.WADO.WADOType === "URI"
  //             ? loadDICOMFromUrl(url)
  //             : wadorsLoader(url, undefined, seriesInstanceNumber);
  //         break; // Only the first instance
  //     }
  // }

  // if ( isFirstSeries) {
  //     await new Promise(resolve => setTimeout(resolve, 100)); // Let the first instance show

  //     // Load only 1 more instance from the first series
  //     const nextInstances = DicomResponse
  //         .filter(d => getValue(d["00200013"]) !== minInstance && DicomResponse.length !== 1)
  //         .slice(0, 1); // ✅ Only one additional

  //     for (let dicomData of nextInstances) {
  //         const url = fitUrl(buildWADOUrl(dicomData));
  //         ConfigLog.WADO.WADOType === "URI"
  //             ? loadDICOMFromUrl(url)
  //             : wadorsLoader(url, undefined, seriesInstanceNumber);
  //     }

  //     // Prepare deferred load
  //     const deferred = DicomResponse.filter(
  //         d => getValue(d["00200013"]) !== minInstance && !nextInstances.includes(d)
  //     ).map(dicomData => {
  //         const url = fitUrl(buildWADOUrl(dicomData));
  //         return () => loadDeferredDicom(url, undefined, seriesInstanceNumber);
  //     });

  //     if (deferred.length > 0) {
  //         deferredLoadTasks.set(seriesInstanceUid, deferred);
  //         seriesQueue.push(seriesInstanceUid);

  //         // ❌ Removed to prevent full series load at start
  //         await handleSeriesDoubleClick(seriesInstanceUid, true);
  //     }
//   } else {
//       // Other series (deferred)
//       const deferred = DicomResponse.filter(
//           d => getValue(d["00200013"]) !== minInstance
//       ).map(dicomData => {
//           const url = fitUrl(buildWADOUrl(dicomData));
//           return () => loadDeferredDicom(url, undefined, seriesInstanceNumber);
//       });

//       if (deferred.length > 0) {
//           deferredLoadTasks.set(seriesInstanceUid, deferred);
//           seriesQueue.push(seriesInstanceUid);
//       }

//       // If this is the last series and first is loaded, start queue
//       if (!sequentialLoadingActive && instance === SeriesResponse.length - 1) {
//           await new Promise(resolve => setTimeout(resolve, 100));
//           startSequentialSeriesLoading();
//       }
//   }
// }

// async function startSequentialSeriesLoading(minConcurrent = 2) {
//   sequentialLoadingActive = true;
//   const seriesInProgress = new Set();

//   async function loadNextSeries() {
//     if (seriesQueue.length === 0) return;

//     const seriesUID = seriesQueue.shift();
//     const promise = handleSeriesDoubleClick(seriesUID, true).then(() => {
//       seriesInProgress.delete(promise);
//       // Start next series when this one finishes
//       return loadNextSeries();
//     });

//     seriesInProgress.add(promise);
//   }

//   // Start up to `minConcurrent` series initially
//   const initialCount = Math.min(minConcurrent, seriesQueue.length);
//   for (let i = 0; i < initialCount; i++) {
//     await loadNextSeries();
//   }

//   // Wait for all remaining series to finish
//   await Promise.all(seriesInProgress);
//   sequentialLoadingActive = false;
//   currentSeriesUID = null;
// }

// async function handleSeriesDoubleClick(seriesInstanceUID, isConcurrent = false) {
//   if (!deferredLoadTasks.has(seriesInstanceUID)) return;

//   if (!isConcurrent) {
//     activeSeriesUID = seriesInstanceUID; // For click events
//   }

//   let totalSum = 0;

//   deferredLoadTasks.forEach(entry => {
//       totalSum += entry.length;
//   });

//   let tasks = deferredLoadTasks.get(seriesInstanceUID);
//   const instaceLoad = totalSum > 4000 ? 1 : totalSum > 2500 ? 2 : 4;

//   while (tasks.length > 0) {
//     if (!isConcurrent && activeSeriesUID !== seriesInstanceUID) return; // For click-only interruption

//     let batch = tasks.splice(0, instaceLoad);
//     await Promise.all(batch.map(task => task()));
//   }

//   if (tasks.length === 0) {
//     deferredLoadTasks.delete(seriesInstanceUID);
//   }
// }

function buildWADOUrl(dicomData) {
  let baseUrl = `${ConfigLog.WADO.https}://${ConfigLog.WADO.hostname}:${ConfigLog.WADO.PORT}/${ConfigLog.WADO.service}`;
  return ConfigLog.WADO.WADOType === "URI"
    ? `${baseUrl}?requestType=WADO&studyUID=${dicomData["0020000D"].Value[0]}&seriesUID=${dicomData["0020000E"].Value[0]}&objectUID=${dicomData["00080018"].Value[0]}&contentType=application/dicom`
    : `${baseUrl}/studies/${dicomData["0020000D"].Value[0]}/series/${dicomData["0020000E"].Value[0]}/instances/${dicomData["00080018"].Value[0]}`;
}

// Load images with a delay to avoid API congestion
async function loadDeferredDicom(url, seriesInstanceNumber) {
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000)); // Random delay for load balancing
  try {
    ConfigLog.WADO.WADOType === "RS" ? wadorsLoader(url, true, seriesInstanceNumber) : loadDICOMFromUrl(url, false);
  } catch (error) {
    console.error("Failed to load DICOM:", error);
  }
}

function readJson(url) {
  showLoaderMain(true);
  //向伺服器請求資料
  if (ConfigLog.WADO.https == "https") url = url.replace("http:", "https:");
  let SeriesRequest = new XMLHttpRequest();
  SeriesRequest.open('GET', url);
  SeriesRequest.responseType = 'json';
  var wadoToken = ConfigLog.WADO.token;
  for (var to = 0; to < Object.keys(wadoToken).length; to++) {
    if (wadoToken[Object.keys(wadoToken)[to]] != "") {
      SeriesRequest.setRequestHeader("" + Object.keys(wadoToken)[to], "" + wadoToken[Object.keys(wadoToken)[to]]);
    }
  }

  //發送以Series為單位的請求
  SeriesRequest.send();
  SeriesRequest.onload = function () {
    showLoader(true)
    getJsonBySeriesRequest(SeriesRequest);
  }
}
