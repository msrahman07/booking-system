import React from 'react'
import * as yup from 'yup';
import { ErrorMessage, useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppDispatch } from '../../app/stores/hooks';
import { IService } from '../../app/models/service';
import { addService } from '../../app/stores/serviceStore';
import { closeModal } from '../../app/stores/modalStore';
import { IGuest } from '../../app/models/guest';
import { addGuest } from '../../app/stores/guestStore';

// firstName: string;
//     lastName: string;
//     phone: string;
//     email: string;

const CreateUpdateGuestForm = () => {

    const dispatch = useAppDispatch();

    const validationSchema = yup.object({
        firstName: yup
            .string()
            .required('Name is required'),
        lastName: yup
            .string()
            .required('Category is required'),
        phone: yup
            .string()
            .matches(/^\d{3}-\d{3}-\d{4}$/ , 'Must be in 111-111-1111 format')
            .required('Price is required'),
        email: yup
            .string()
            .required('Email is required')
            .email()
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(addGuest(values as IGuest)).then(() => {
                dispatch(closeModal())
            })
        },
    });
    return (
        <>
            <h3>Add New Service</h3>
            <form onSubmit={formik.handleSubmit}>
                <Stack className='modal-stack' spacing={2}>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                    <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        label="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="email"
                        type='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <Button disabled={!formik.isValid} style={{ float: 'right' }} type="submit">
                        SUBMIT
                    </Button>
                </Stack>
            </form>
        </>

    )
}

export default CreateUpdateGuestForm