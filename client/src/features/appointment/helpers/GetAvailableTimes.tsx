import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { FormHelperText, TextField, TextFieldProps } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { IStaff } from '../../../app/models/staff';
import { staffsList } from '../../../app/stores/staffStore';
import { useAppSelector } from '../../../app/stores/hooks';
import { useEffect, useState } from 'react';
import DoNotDisturbOnTotalSilenceOutlinedIcon from '@mui/icons-material/DoNotDisturbOnTotalSilenceOutlined';
import CustomTimeAmPmViewer from './CustomTimeAmPmViewer';
import { IAppointmentResponse } from '../../../app/models/appointment';

interface IProps {
    currentAppointment: IAppointmentResponse | null;
    staffId: number;
    currentDate: Date;
    setAppointmentStartTime: (time: Dayjs) => void;
    setAppointmentEndTime: (time: Dayjs) => void;
    setAvailableTimeError: (error: string) => void;
}

interface ITime {
    startT: Date;
    endT: Date;
}

const GetAvailableTimes = ({ currentAppointment, staffId, currentDate,
    setAppointmentStartTime, setAppointmentEndTime, setAvailableTimeError }: IProps) => {

    const [open, setOpen] = useState(false);
    const [openAvailability, setOpenAvailability] = useState(false);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const [errors, setErrors] = useState('');
    const staffs = useAppSelector(staffsList);
    const [unavalableTimeList, setUnavalableTimeList] = useState<ITime[]>([]);
    const [appointmentsOnDate, setAppointmentsOnDate] = useState<IAppointmentResponse[]>([]);


    useEffect(() => {
        if (currentAppointment !== null) {
            setAvailableTimeError('');
        }
        const selectedStaff = staffs.find(s => s.id === staffId);
        if (selectedStaff !== undefined) {
        }
        // console.log(selectedStaff?.appointments![1].date.toString())
        const currentDateString = dayjs(currentDate).format('MM-DD-YYYY')
        const currentDateAppointments = selectedStaff?.appointments?.filter(a => a.date.toString() === currentDateString && currentAppointment?.id !== a.id)
        if (currentDateAppointments !== undefined) {
            setAppointmentsOnDate(currentDateAppointments);
        }
        const unavalableTimes: ITime[] = [];
        currentDateAppointments?.forEach(a => {
            // if(currentAppointment !== null) {

            // }
            unavalableTimes.push({ startT: a.startTime, endT: a.endTime })
        })
        setUnavalableTimeList(unavalableTimes);

    }, [staffId, currentDate])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        // setAvailableTimeError(errors)
        setOpen(false);

    };

    const handleOK = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        // (appointmentStartTime >= a.StartTime && appointmentStartTime <= a.EndTime) ||
        // (appointmentEndTime >= a.StartTime && appointmentEndTime <= a.EndTime)
        setErrors('')
        if (startTime && endTime) {
            if (startTime > endTime || (startTime.hour() === endTime.hour() && startTime.minute() === endTime.minute())) {
                setErrors('Invalid time, end time must be later')
                return;
            }
            if (currentDate <= dayjs().toDate() && (startTime < dayjs() || endTime < dayjs())) {
                setErrors('Invalid time, please select future time')
                return;
            }
            const todaysDate = new Date().toDateString();
            
            const staffClashingTime = appointmentsOnDate.filter(a => (
                (startTime.toDate() >= new Date(todaysDate + " " + a.startTime.toString()) && startTime.toDate() <= new Date(todaysDate + " " + a.endTime.toString()))
                || ((endTime.toDate() >= new Date(todaysDate + " " + a.startTime.toString()) && endTime.toDate() <= new Date(todaysDate + " " + a.endTime.toString())))
            ));
            if (staffClashingTime.length > 0) {
                setErrors("Staff is not available, please check unavailable times");
                return
            } else {
                setAppointmentStartTime(startTime);
                setAppointmentEndTime(endTime);
                setAvailableTimeError('')
                setErrors('')
                setOpen(false);
            }
        }
        else {
            setErrors('Please select both times')
        }
    };

    return (
        <div>
            <Button onClick={handleClickOpen} className='time-btn' fullWidth variant="outlined" endIcon={<AccessTimeOutlinedIcon style={{ color: '#d2542a', fontSize: '25px' }} />}>
                {(errors === '' && startTime && endTime) &&
                    <span>{startTime?.format('hh:mm A') + " - " +
                        endTime?.format('hh:mm A')}</span>
                }
                {currentAppointment !== null &&
                    <span>
                        <CustomTimeAmPmViewer time={currentAppointment.startTime} />-<CustomTimeAmPmViewer time={currentAppointment.endTime} />
                    </span>
                }
                {!(errors === '' && startTime && endTime) && (currentAppointment === null) &&
                    <span>Time</span>
                }


            </Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select times</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, maxWidth: 150 }}>
                                <TimePicker
                                    renderInput={(params: TextFieldProps) => <TextField {...params} />}
                                    label="Start Time"
                                    value={startTime}
                                    onChange={(newValue) => {
                                        setStartTime(newValue);
                                        setErrors('');
                                    }}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, maxWidth: 150 }}>
                                <TimePicker
                                    renderInput={(params: TextFieldProps) => <TextField {...params} />}
                                    label="End Time"
                                    value={endTime}
                                    onChange={(newValue) => {
                                        setEndTime(newValue);
                                        setErrors('');
                                    }}
                                />
                            </FormControl>
                        </Box>
                    </LocalizationProvider>
                    <FormHelperText error={true}>{errors}</FormHelperText>
                    <Button style={{ fontSize: '15px' }}
                        onClick={() => setOpenAvailability(true)}
                    >
                        Check unavailable times
                    </Button>
                    <Dialog disableEscapeKeyDown open={openAvailability} onClose={handleClose}>
                        <DialogTitle>Unavailable times</DialogTitle>
                        <DialogContent>
                            {unavalableTimeList.length > 0 ?
                                <div>
                                    {unavalableTimeList.map((time, index) => (
                                        <span key={index}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                            <DoNotDisturbOnTotalSilenceOutlinedIcon fontSize='small' style={{ color: '#b80000' }} />
                                            {/* {time.startT.toString().slice(0,-3)} - {time.endT.toString().slice(0,-3)} */}
                                            {/* {dayjs(new Date(new Date().toDateString()+ " "+(time.startT.toString()))).format('hh:mm A')} - {dayjs(time.endT).format('hh:mm A')} */}
                                            <CustomTimeAmPmViewer time={time.startT} />-<CustomTimeAmPmViewer time={time.endT} />
                                        </span>
                                    ))}
                                </div>
                                :
                                <div>

                                    No appointments today
                                </div>
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenAvailability(false)}>Ok</Button>
                        </DialogActions>
                    </Dialog>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleOK}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GetAvailableTimes