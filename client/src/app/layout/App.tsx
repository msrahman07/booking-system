import { Grid } from '@mui/material';
import React from 'react';
import Appointments from '../../features/appointment/Appointments';
import Guests from '../../features/guest/Guests';
import Services from '../../features/service/Services';
import Staffs from '../../features/staff/Staffs';

function App() {
  return (
    <>
    <Grid container spacing={1}>
      <Grid item sm={2.5}>
        <Guests />
      </Grid>
      <Grid item sm={2.5}>
        <Staffs />
      </Grid>
      <Grid item sm={2.5}>
        <Services />
      </Grid>
      <Grid item sm={4.5}>
        <Appointments />
      </Grid>
    </Grid>
    </>
    // <div className="App">
    //   <Guests />
    //   <Staffs />
    //   <Services />
    // </div>
  );
}

export default App;
