import { Button, CircularProgress, FormControl, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Item from '../../app/shared/Item';
import { appointmentsList, appointmentsLoading, loadAppointmentsByDate} from '../../app/stores/appointmentStore';
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

const Appointments = () => {
  const appointments = useAppSelector(appointmentsList);
  const loading = useAppSelector(appointmentsLoading);
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(dayjs(new Date().toDateString()).format('MM-DD-YYYY'))

  useEffect(() => {
    // dispatch(setLoadingTrue())
    dispatch(loadAppointmentsByDate(date));
  }, [date]);

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
          <FormControl fullWidth style={{marginTop: '10px'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Appointment Date" inputFormat="MM/DD/YYYY"
                value={date} onChange={(newDate) => setDate(dayjs(newDate).format('MM-DD-YYYY'))}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          {appointments.length == 0 &&
            <Item>No Appointments on this date</Item>
          }
          {appointments.map(appointment => (
            <Item
              key={appointment.id}>
              <span>{appointment.guestFullName}</span>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon fontSize="small" color="action" /><small style={{ marginLeft: '3px', marginTop: '4px' }}>
                <CustomTimeAmPmViewer time={appointment.startTime}/> - <CustomTimeAmPmViewer time={appointment.endTime}/></small>
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
        onClick={() => dispatch(openModal(<div><CreateUpdateAppointmentForm /></div>))}
      >
        +
      </Button>
    </div>
  )
}

export default Appointments