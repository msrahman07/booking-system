import { Button, CircularProgress, FormControl, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Item from '../../app/shared/Item';
import { appointmentsListByDate, appointmentsLoading, loadAppointments, loadAppointmentsByDate, setCurrentDate } from '../../app/stores/appointmentStore';
import { useAppDispatch, useAppSelector } from '../../app/stores/hooks';
import { openModal } from '../../app/stores/modalStore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import CreateUpdateAppointmentForm from './CreateUpdateAppointmentForm';
import dayjs from 'dayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CustomTimeAmPmViewer from './helpers/CustomTimeAmPmViewer';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { IAppointmentResponse } from '../../app/models/appointment';

const Appointments = () => {
  const appointments = useAppSelector(appointmentsListByDate);
  const loading = useAppSelector(appointmentsLoading);
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(dayjs(new Date().toDateString()).format('MM-DD-YYYY'))

  useEffect(() => {
    dispatch(loadAppointments())
    dispatch(loadAppointmentsByDate(date));
    dispatch(setCurrentDate(date));
  }, [date]);

  const onPassAppointment = (id: number) => {
    let appointment: IAppointmentResponse | null = null;

    if(id !== null) {
      appointments.forEach(a => {
          if (a.id === id) {
              appointment = a;
          }
      })
    }
    if(appointment !== null) {
      dispatch(openModal(<CreateUpdateAppointmentForm appointment={appointment} />))
    }
  }

  return (
    <div className='sec-column'>
      <header>
        <h3>Appointments</h3>
        <hr />
      </header>
      {loading ?
        <CircularProgress style={{ marginLeft: '50%', marginTop: '50%' }} />
        :
        <div className='sec'>
          <FormControl fullWidth style={{ marginTop: '10px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Appointment Date" inputFormat="MM/DD/YYYY"
                value={date} onChange={(newDate) => setDate(dayjs(newDate).format('MM-DD-YYYY'))}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          {appointments.length === 0 &&
            <Item>No Appointments on this date</Item>
          }
          {appointments.map(appointment => (
            <Item
              key={appointment.id}>
              <span>
                {appointment.guestFullName}
                <Button
                  onClick={() => onPassAppointment(appointment.id!)}
                  style={{ float: 'right', cursor: 'pointer', width: 'fit-content', borderRadius: '50%' }}><ModeEditOutlineOutlinedIcon
                    style={{ color: '#d2542a' }} /></Button>
              </span>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon fontSize="small" color="action" /><small style={{ marginLeft: '3px', marginTop: '4px' }}>
                  <CustomTimeAmPmViewer time={appointment.startTime} /> - <CustomTimeAmPmViewer time={appointment.endTime} /></small>
              </span>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <SpaOutlinedIcon fontSize="small" color="action" /><small style={{ marginLeft: '3px', marginTop: '4px' }}>{appointment.serviceName}</small>
              </span>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <PersonOutlineIcon fontSize="small" color="action" /><small style={{ marginLeft: '3px', marginTop: '4px' }}>{appointment.staffFullName}</small>
              </span>
            </Item>
          ))}
        </div>
      }
      <Button
        variant="text"
        onClick={() => dispatch(openModal(<CreateUpdateAppointmentForm appointment={null} />))}
      >
        +
      </Button>
    </div>
  )
}

export default Appointments