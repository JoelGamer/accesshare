import { Container } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Accounts: FC = () => {
  return (
    <Container sx={{ pt: 2 }}>
      <Outlet />
    </Container>
  );
}

export default Accounts;
