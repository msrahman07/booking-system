import React from 'react'
import * as yup from 'yup';
import { ErrorMessage, useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppDispatch } from '../../app/stores/hooks';
import { addStaffs } from '../../app/stores/staffStore';
import { IStaff } from '../../app/models/staff';
import { closeModal } from '../../app/stores/modalStore';


const validationSchema = yup.object({
    firstName: yup
        .string()
        .required('First Name is required'),
    lastName: yup
        .string()
        .required('Last Name is required'),
    jobTitle: yup
        .string()
        .required('Job Title is required'),
});
const CreateUpdateStaffForm = () => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            jobTitle: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(addStaffs(values as IStaff)).then(() => {
                dispatch(closeModal())
            })
        },
    });
    return (
        <>
            <h3>Add New Staff</h3>
            <form onSubmit={formik.handleSubmit}>
                <Stack className='modal-stack' spacing={2}>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        value={formik.values['firstName']}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                    <TextField
                        fullWidth
                        id="jobTitle"
                        name="jobTitle"
                        label="Job Title"
                        value={formik.values.jobTitle}
                        onChange={formik.handleChange}
                        error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                        helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                    />
                    <Button disabled={!formik.isValid} style={{ float: 'right' }} type="submit">
                        SUBMIT
                    </Button>
                </Stack>
            </form>
        </>

    )
}

export default CreateUpdateStaffForm