import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { Outlet} from 'react-router-dom';

const Groups: FC = () => {
  return (
    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h5">Groups</Typography>
      <Outlet />
    </Box>
  );
}

export default Groups;
