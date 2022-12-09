import { Button, CircularProgress, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import agent from '../../app/api/agent';
import { guestsList, guestsLoading, loadGuests } from '../../app/stores/guestStore';
import { useAppDispatch, useAppSelector } from '../../app/stores/hooks';
import PhoneIcon from '@mui/icons-material/Phone';
import Item from '../../app/shared/Item';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

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
      <Button variant="text">+</Button>
    </div>
  )
}

export default Guests