import { Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import Item from '../../app/shared/Item';
import { useAppDispatch, useAppSelector } from '../../app/stores/hooks';
import { loadStaffs, staffsList, staffsLoading } from '../../app/stores/staffStore';
import CircleIcon from '@mui/icons-material/Circle';
import { openModal } from '../../app/stores/modalStore';
import CreateUpdateStaffForm from './CreateUpdateStaffForm';

const Staffs = () => {
  const staffs = useAppSelector(staffsList);
  const loading = useAppSelector(staffsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadStaffs());
  }, []);

  return (
    <div className='sec-column'>
      <header>
        <h3>Staffs</h3>
        <hr />
      </header>
      {loading ?
        <CircularProgress sx={{ textAlign: 'center' }} />
        :
        <div className='sec'>
          {staffs.map(staff => (
            <Item
              key={staff.id}>
              <span>{staff.firstName} {staff.lastName}</span>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <CircleIcon sx={{ color: '#767474', fontSize: '6px' }} /><small style={{ marginLeft: '3px' }}>{staff.jobTitle}</small>
              </span>
            </Item>
          ))}
        </div>
      }
      <Button 
        variant="text"
        onClick={() => dispatch(openModal(<div><CreateUpdateStaffForm /></div>))}
      >
        +
      </Button>
    </div>
  )
}

export default Staffs