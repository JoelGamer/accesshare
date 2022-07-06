import { Box } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Dialog from '../../components/ui/Dialog';
import Snackbar from '../../components/ui/Snackbar';

const Root: FC = () => {
  return (
    <Box>
      <Dialog />
      <Snackbar />
      <Outlet />
    </Box>
  );
}

export default Root;
