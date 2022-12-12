import React, { useEffect, useState } from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../app/stores/hooks';
import { guestsList } from '../../app/stores/guestStore';
import { staffsList } from '../../app/stores/staffStore';
import { servicesList } from '../../app/stores/serviceStore';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import GetAvailableTimes from './helpers/GetAvailableTimes';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

const CreateUpdateAppointmentForm = () => {

    const dispatch = useAppDispatch();
    const guests = useAppSelector(guestsList);
    const staffs = useAppSelector(staffsList);
    const services = useAppSelector(servicesList);

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: '150px',
                width: 250,
            },
        },
    };

    const validationSchema = yup.object({
        guestId: yup
            .number()
            .required('Guest is required'),
        staffId: yup
            .number()
            .not([0])
            .required('Staff is required'),
        serviceId: yup
            .number()
            .required('Service is required'),
        date: yup.date().required('Date is required'),
    });

    const formik = useFormik({
        initialValues: {
            guestId: '',
            serviceId: '',
            staffId: '',
            date: new Date(),
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // dispatch(addGuest(values as IGuest)).then(() => {
            //     dispatch(closeModal())
            // })
            console.log(values.date.toISOString())
        },
    });


    return (
        <>
            <h3>Add New Appointment</h3>
            <form onSubmit={formik.handleSubmit}>

                <Stack className='modal-stack' spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel id="guestId">Guest</InputLabel>
                        <Select
                            className='mui-select'
                            fullWidth id="guestId" name="guestId" label="Guest" MenuProps={MenuProps}
                            value={formik.values.guestId} onChange={formik.handleChange}
                            error={formik.touched.guestId && Boolean(formik.errors.guestId)}
                        >
                            {guests.map(guest => (
                                <MenuItem key={guest.id} value={guest.id}>{guest.firstName} {guest.lastName}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error={true}>{formik.touched.guestId && formik.errors.guestId}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="staffId">Staff</InputLabel>
                        <Select
                            fullWidth id="staffId" name="staffId" label="Staff" MenuProps={MenuProps}
                            value={formik.values.staffId} onChange={formik.handleChange}
                            error={formik.touched.staffId && Boolean(formik.errors.staffId)}
                        >
                            {staffs.map(staff => (
                                <MenuItem key={staff.id} value={staff.id}>{staff.firstName} {staff.lastName}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error={true}>{formik.touched.staffId && formik.errors.staffId}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                className='calendar'
                                label="Date" inputFormat="MM/DD/YYYY"
                                value={formik.values.date} onChange={(value) => formik.setFieldValue('date', value, true)}
                                renderInput={(params) => <TextField {...params}/>}
                                disablePast
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl fullWidth>
                        {(formik.values.staffId === '' || formik.values.staffId === undefined) ?
                            <>
                                <InputLabel id="time">Time</InputLabel>
                                <Select
                                    label='Time'
                                    fullWidth MenuProps={MenuProps}
                                    value={""}
                                    IconComponent={() => <AccessTimeOutlinedIcon fontSize='medium' style={{color: '#d2542a', marginRight: '12px'}}/>}
                                >
                                    <MenuItem>Please select staff first</MenuItem>

                                </Select>
                            </>

                            :
                            <GetAvailableTimes 
                                staffId={parseInt(formik.values.staffId)}
                                currentDate={formik.values.date} />
                            // <GetAvailableTimes staffId={parseInt(formik.values.staffId)} />
                        }
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="serviceId">Service</InputLabel>
                        <Select
                            fullWidth id="serviceId" name="serviceId" label="Service" MenuProps={MenuProps}
                            value={formik.values.serviceId} onChange={formik.handleChange}
                            error={formik.touched.serviceId && Boolean(formik.errors.serviceId)}
                        >
                            {services.map(service => (
                                <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error={true}>{formik.touched.serviceId && formik.errors.serviceId}</FormHelperText>
                    </FormControl>

                    <Button style={{ float: 'right' }} type="submit">
                        SUBMIT
                    </Button>
                </Stack>
            </form>

        </>

    )
}

export default CreateUpdateAppointmentForm