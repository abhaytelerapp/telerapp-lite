import { Field, Form, Formik } from 'formik';
import Button from '../Button';
import React from 'react';

const AddClinicalHistoryModel = ({ hide, studyInstanceUid, handleClinicalHistoryChange, findHistory, patientId, accession, patientName, institutionName }) => {
    const initialValue = (data) => {
        return {
            clinical_history: data?.clinical_history || ''
        }
    }
    const onsubmit = (values) => {
        handleClinicalHistoryChange(studyInstanceUid, values.clinical_history, patientId, accession, institutionName);
        hide();
    }

    return (
        <section className="w-full">
            <Formik
                initialValues={initialValue(findHistory)}
                onSubmit={onsubmit}
            >
                {({ isSubmitting, handleChange, values }) => (
                    <Form>
                        <div className=' flex gap-5 items-center'>
                            <div className=' w-full'>
                                {patientName && (
                                    <p>Patient: {patientName.replace(/,/g, '')}</p>
                                )}
                                <textarea name="clinical_history" className=" mr-5 p-4 mt-1 text-lgmt-2 shadow transition duration-300 appearance-none border border-inputfield-main focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 px-3 text-white placeholder-inputfield-placeholder leading-tight bg-black" rows="4" placeholder={'Enter Clinical History'} value={values.clinical_history} onChange={handleChange}></textarea>
                            </div>
                            <Button >{findHistory?.clinical_history ? 'Update' : 'Save'}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    )
}

export default AddClinicalHistoryModel;