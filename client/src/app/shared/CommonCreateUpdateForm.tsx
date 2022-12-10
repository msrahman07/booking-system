import { Button, Stack, TextField } from '@mui/material';
import { FormikConfig, useFormik } from 'formik';
import React from 'react'
import { OptionalObjectSchema } from 'yup/lib/object';
import { AnyObject } from 'yup/lib/types';
import { IStaff } from '../models/staff';

interface IInputType {
    type: string;
    id: string;
    name: string;
    label: string;

}
interface IProps {
    validationSchema: OptionalObjectSchema<AnyObject>;
    initialValues: any;
    inputs: IInputType[];
}

const CommonCreateUpdateForm = ({ validationSchema, initialValues, inputs }: IProps) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack className='modal-stack' spacing={2}>
            </Stack>
        </form>
    )
}

export default CommonCreateUpdateForm