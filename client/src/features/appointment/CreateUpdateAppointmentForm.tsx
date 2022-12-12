import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../app/stores/hooks';
import { guestsList } from '../../app/stores/guestStore';
import { completeStaffAppointment, loadStaffs, staffsList } from '../../app/stores/staffStore';
import { servicesList } from '../../app/stores/serviceStore';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import GetAvailableTimes from './helpers/GetAvailableTimes';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { IAppointmentRequest, IAppointmentResponse } from '../../app/models/appointment';
import { addAppointment, appointmentsList, deleteAppointment, loadAppointmentsByDate, removeAppointment, updateAppointment } from '../../app/stores/appointmentStore';
import { closeModal } from '../../app/stores/modalStore';

const CreateUpdateAppointmentForm = ({ appointment }: { appointment: IAppointmentResponse | null }) => {

    const dispatch = useAppDispatch();
    const guests = useAppSelector(guestsList);
    const staffs = useAppSelector(staffsList);
    const services = useAppSelector(servicesList);
    const [appointmentStartTime, setAppointmentStartTime] = useState<Dayjs | null>(null);
    const [appointmentEndTime, setAppointmentEndTime] = useState<Dayjs | null>(null);
    const [availableTimeError, setAvailableTimeError] = useState<string>('Please select Time');
    const appointments = useAppSelector(appointmentsList);
    const [completed, setCompleted] = useState(appointment?.completed);

    // const [currentAppointment, setCurrentAppointment] = useState<IAppointmentResponse | null>(null);

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: '150px',
                width: 250,
            },
        },
    };


    const validationSchema = Yup.object({
        guestId: Yup
            .number()
            .required('Guest is required'),
        staffId: Yup
            .number()
            .required('Staff is required'),
        serviceId: Yup
            .number()
            .required('Service is required'),
        date: Yup.date().required('Date is required'),
    });
    useEffect(() => {
        dispatch(loadStaffs()) // new appointment to Staff

    }, [appointments])
    const formik = useFormik({
        initialValues: {
            guestId: (appointment !== null) ? appointment.guestId : '',
            staffId: (appointment !== null) ? appointment.staffId : '',
            serviceId: (appointment !== null) ? appointment.serviceId : '',
            date: (appointment !== null) ? new Date(appointment.date.toString()) : new Date(),
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const newAppointment: IAppointmentRequest = {
                id: (appointment !== null) ? appointment.id : undefined,
                guestId: parseInt(values.guestId.toString()),
                serviceId: parseInt(values.serviceId.toString()),
                staffId: parseInt(values.staffId.toString()),
                date: values.date,
                startTime: {
                    hours: (appointmentStartTime === null && appointment !== null) ? parseInt(appointment.startTime.toString().slice(0, 2)) : appointmentStartTime?.hour()!,
                    minutes: (appointmentStartTime === null && appointment !== null) ? parseInt(appointment.startTime.toString().slice(3, 5)) : appointmentStartTime?.minute()!,
                    seconds: 0
                },
                endTime: {
                    hours: (appointmentStartTime === null && appointment !== null) ? parseInt(appointment.endTime.toString().slice(0, 2)) : appointmentEndTime?.hour()!,
                    minutes: (appointmentStartTime === null && appointment !== null) ? parseInt(appointment.endTime.toString().slice(3, 5)) : appointmentEndTime?.minute()!,
                    seconds: 0
                }
            }
            if (appointment === null) {
                dispatch(addAppointment(newAppointment)).then((app) => {
                    dispatch(closeModal())

                });
            } else {
                dispatch(updateAppointment(newAppointment));
                dispatch(closeModal());
                dispatch(loadAppointmentsByDate(dayjs(new Date(values.date).toDateString()).format('MM-DD-YYYY')))
            }
            // dispatch(loadStaffs()) // new appointment to Staff
            // dispatch(updateStaffAppointment(newAddedAppointment)) // new appointment to Staff
            // dispatch(addNewStaffAppointment(newAddedAppointment)) // new appointment to Staff

        },
    });


    return (
        <>
        <div>
            {appointment === null ?
                <h3>Add New Appointment</h3> :
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3>Update Appointment</h3>
                    <Button onClick={() => {
                        dispatch(deleteAppointment(appointment.id!));
                        dispatch(closeModal()); dispatch(removeAppointment(appointment.id!))
                        dispatch(completeStaffAppointment({ appointmentId: appointment.id!, staffId: appointment.staffId }));
                        setCompleted(true);
                    }

                    }
                        color='primary' variant='outlined' style={{ float: 'right', background: '#6a6ad6' }} type="submit">
                        {completed ? <span>Completed</span> : <span>Complete</span> }
                    </Button>
                </div>
            }
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
                                renderInput={(params) => <TextField {...params} />}
                                disablePast
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl fullWidth>
                        {(formik.values.staffId === '' || formik.values.staffId === undefined) ?
                            <>
                                <InputLabel id="time">Time</InputLabel>
                                <Select
                                    error={formik.touched.staffId && Boolean(formik.errors.staffId)}
                                    id='time'
                                    name='time'
                                    label='Time'
                                    fullWidth MenuProps={MenuProps}
                                    value={""}
                                    IconComponent={() => <AccessTimeOutlinedIcon fontSize='medium' style={{ color: '#d2542a', marginRight: '12px' }} />}
                                >
                                    <MenuItem>Please select staff first</MenuItem>

                                </Select>
                            </>

                            :
                            <>
                                <GetAvailableTimes
                                    currentAppointment={appointment !== null ? appointment : null}
                                    staffId={parseInt(formik.values.staffId.toString())}
                                    currentDate={formik.values.date}
                                    setAppointmentStartTime={setAppointmentStartTime}
                                    setAppointmentEndTime={setAppointmentEndTime}
                                    setAvailableTimeError={setAvailableTimeError}
                                />
                                <FormHelperText error={true}>{availableTimeError}</FormHelperText>
                            </>
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
                    {appointment === null ?
                        <Button disabled={availableTimeError !== ''} style={{ float: 'right' }} type="submit">
                            SUBMIT
                        </Button>
                        :
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button onClick={() => {
                                dispatch(deleteAppointment(appointment.id!));
                                dispatch(closeModal()); dispatch(removeAppointment(appointment.id!))
                            }}
                                style={{ float: 'left', right: '34%', background: '#c80505' }}>
                                Cancel Appointment
                            </Button>

                            <Button disabled={availableTimeError !== ''} style={{ float: 'right' }} type="submit">
                                Reschedule
                            </Button>
                        </div>
                    }

                </Stack>
            </form>

        </div>
        </>

    )
}

export default CreateUpdateAppointmentForm