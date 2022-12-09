import { Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import Item from '../../app/shared/Item';
import { useAppDispatch, useAppSelector } from '../../app/stores/hooks';
import { loadServices, servicesList, servicesLoading } from '../../app/stores/serviceStore';
import CircleIcon from '@mui/icons-material/Circle';

const Services = () => {
  const services = useAppSelector(servicesList);
  const loading = useAppSelector(servicesLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadServices());
  }, []);

  return (
    <div className='sec-column'>
      <header>
        <h3>Services</h3>
        <hr />
      </header>
      {loading ?
        <CircularProgress sx={{ textAlign: 'center' }} />
        :
        <div className='sec'>
          {services.map(service => (
            <Item
              key={service.id}>
              <span>{service.name}</span>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <CircleIcon sx={{ color: '#767474', fontSize: '6px' }} /><small style={{ marginLeft: '3px', marginRight: '8px' }}>{service.category}</small>
                <CircleIcon sx={{ color: '#767474', fontSize: '6px' }} /><small style={{ marginLeft: '3px' }}>${service.price}</small>
              </span>
            </Item>
          ))}
        </div>
      }
      <Button variant="text">+</Button>
    </div>
  )
}

export default Services