import { Container } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const GroupUsers: FC = () => {
  return (
    <Container sx={{ pt: 2 }}>
      <Outlet />
    </Container>
  );
}

export default GroupUsers;
