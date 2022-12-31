import { Box, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import LoginLayout from '../layout';

const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <LoginLayout>
      <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Groups</Typography>
        {children}
      </Box>
    </LoginLayout>
  );
}

export default Layout;
