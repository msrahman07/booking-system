import { Button, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react'
import { guestsList, guestsLoading, loadGuests } from '../../app/stores/guestStore';
import { useAppDispatch, useAppSelector } from '../../app/stores/hooks';
import PhoneIcon from '@mui/icons-material/Phone';
import Item from '../../app/shared/Item';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { openModal } from '../../app/stores/modalStore';
import CreateUpdateGuestForm from './CreateUpdateGuestForm';

const Guests = () => {
  const guests = useAppSelector(guestsList);
  const loading = useAppSelector(guestsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadGuests());
  }, []);

  return (
    <div className='sec-column'>
      <header>
        <h3>Guests</h3>
        <hr />
      </header>
      {loading ?
        <CircularProgress />
        :
        <div className='sec'>
          {guests.map(guest => (
            <Item
              key={guest.id}>
              <span>{guest.firstName} {guest.lastName}</span>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon fontSize="small" color="action" /><small style={{ marginLeft: '3px' }}>{guest.phone}</small>
              </span>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <MailOutlineIcon fontSize='small' color='action' /><small style={{ marginLeft: '3px' }}>{guest.email}</small>
              </span>
            </Item>
          ))}
        </div>
      }
      <Button 
        variant="text"
        onClick={() => dispatch(openModal(<div><CreateUpdateGuestForm /></div>))}
      >
        +
      </Button>
    </div>
  )
}

export default Guests