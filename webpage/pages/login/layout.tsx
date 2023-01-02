import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FC, ReactNode } from 'react';

const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid xs={false} sm={4} md={7}>
        <Box sx={{ bgcolor: 'primary.main', height: '100%' }} />
      </Grid>
      <Grid component={Paper} xs={12} sm={8} md={5} elevation={6} square>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
