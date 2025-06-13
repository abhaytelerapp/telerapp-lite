"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInformation = void 0;
const getUserInformation = async (fetchReportSetting, institutionName, patientFind, radiologistUserList, apiData) => {
  // const data = await fetchReportSetting(institutionName);
  // const report = data?.length > 0 ? data.group_name : 'Default';
  const reportSetting = await fetchReportSetting(apiData, institutionName);
  const findAssignUserName = [patientFind?.firstSubmitUser];
  const assignUserDataFind = radiologistUserList?.find(item => {
    return findAssignUserName?.includes(item.username);
  });
  const signature = await assignUserDataFind?.attributes?.uploadSignature[0];
  const reportSubmit_time = patientFind?.report_submit_time && new Date(patientFind?.report_submit_time);
  let formattedTime;
  if (reportSubmit_time) {
    formattedTime = `
    ${reportSubmit_time?.toLocaleDateString('en-US', {
      month: 'long'
    })}
    ${reportSubmit_time?.getDate()},
    ${reportSubmit_time?.getFullYear()}
    ${reportSubmit_time?.getHours()}:${('0' + reportSubmit_time?.getMinutes())?.slice(-2)}:${('0' + reportSubmit_time?.getSeconds())?.slice(-2)} GMT${reportSubmit_time?.getTimezoneOffset() > 0 ? '-' : '+'}${('0' + Math.abs(reportSubmit_time?.getTimezoneOffset() / 60))?.slice(-2)}:${('0' + Math.abs(reportSubmit_time?.getTimezoneOffset() % 60)).slice(-2)}`;
  }
  const firstName = assignUserDataFind ? `${assignUserDataFind?.firstName} ${assignUserDataFind?.lastName}` : '';
  const qualification = assignUserDataFind?.attributes.qualification !== undefined ? assignUserDataFind?.attributes.qualification : '';
  const registrationNo = assignUserDataFind && assignUserDataFind?.attributes && assignUserDataFind?.attributes.registrationNo ? assignUserDataFind.attributes.registrationNo : '';
  const formattedTimes = formattedTime === undefined ? '' : formattedTime;
  const disclaimerDetails = reportSetting && reportSetting.disclaimer_details ? reportSetting.disclaimer_details : '';
  const displayName = firstName ? `<strong>${firstName}</strong><br/>` : '';
  const qualificationName = qualification ? `<strong>${qualification}</strong><br/>` : '';
  const registrationNoName = registrationNo ? `<strong>Reg.No. :- ${registrationNo}</strong><br/>` : '';
  const formattedTimesName = formattedTimes ? `<strong>${formattedTimes}</strong><br/>` : '';
  const disclaimerDetailsName = disclaimerDetails ? `<strong>Disclaimer :-</strong> ${disclaimerDetails}` : '';
  return {
    doctorInformation: {
      displayName,
      qualificationName,
      registrationNoName,
      formattedTimesName,
      disclaimerDetailsName,
      signature
    },
    assignUserDataFind,
    reportSetting
  };
};
exports.getUserInformation = getUserInformation;