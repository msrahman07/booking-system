import React from 'react'
import * as yup from 'yup';
import { ErrorMessage, useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppDispatch } from '../../app/stores/hooks';
import { IService } from '../../app/models/service';
import { addService } from '../../app/stores/serviceStore';
import { closeModal } from '../../app/stores/modalStore';


const CreateUpdateServiceForm = () => {
    
    const dispatch = useAppDispatch();
    
    const validationSchema = yup.object({
        name: yup
            .string()
            .required('Name is required'),
        category: yup
            .string()
            .required('Category is required'),
        price: yup
            .number()
            .required('Price is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            category: '',
            price: 0
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(addService(values as IService)).then(() => {
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
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        fullWidth
                        id="category"
                        name="category"
                        label="Category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        error={formik.touched.category && Boolean(formik.errors.category)}
                        helperText={formik.touched.category && formik.errors.category}
                    />
                    <TextField
                        fullWidth
                        id="price"
                        name="price"
                        label="Price"
                        type='number'
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                    />
                    <Button disabled={!formik.isValid} style={{ float: 'right' }} type="submit">
                        SUBMIT
                    </Button>
                </Stack>
            </form>
        </>

    )
}

export default CreateUpdateServiceForm