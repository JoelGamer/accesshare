import { FC } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

const UnauthorizedRoot: FC = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={false} sm={4} md={7}>
        <Box sx={{ bgcolor: '#643daa', height: '100%' }} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default UnauthorizedRoot;
