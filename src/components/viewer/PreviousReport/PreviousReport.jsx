import moment from 'moment';
import React from 'react';
import PreviewTemplate from './PreviewTemplate';

const PreviousReport = ({ show, hide, previouPatientReports }) => {
  const tableHeaders = {
    studyData: 'study Date',
    modality: 'Modality',
    instances: 'Instances',
    preview: 'Preview',
  };
  const keys = Object.keys(tableHeaders);
  const values = Object.values(tableHeaders);

  const modelShow = (templates, matchedPatientDetail) => {
    show({
      content: PreviewTemplate,
      title: `Preview Report`,
      contentProps: { templates, matchedPatientDetail },
    });
  };

  return (
    <section className="w-full px-4">
      {previouPatientReports?.length === 0 ? (
        <span className="mt-4 flex justify-center">No previous reposts is available</span>
      ) : (
        <table className="container m-auto mt-4 table-auto text-white">
          <thead className="bg-primary-dark border-secondary-light border">
            <tr>
              {values.map((tableHead, index) => (
                <th
                  className="p-2"
                  key={index}
                >
                  {tableHead}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="mt-1">
            {previouPatientReports?.map((instance, index) => (
              <tr
                key={index}
                className="bg-primary-dark border-secondary-light hover:border-secondary-light hover:bg-[#4c5357] cursor-pointer border transition duration-300"
              >
                {keys.map((key, i) => (
                  <td
                    className="p-2 text-center"
                    key={i}
                  >
                    {key === 'studyData' ? (
                      <span>
                        {instance.studyData ? moment(instance.studyData).format('MMM-DD-YYYY') : ''}
                      </span>
                    ) : key === 'preview' ? (
                      <span>
                        <button
                        id='preview-button'
                          onClick={() => modelShow(instance?.template, instance)}
                          className="text-green-600 underline"
                        >
                          Preview
                        </button>
                      </span>
                    ) : (
                      instance[key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default PreviousReport;
