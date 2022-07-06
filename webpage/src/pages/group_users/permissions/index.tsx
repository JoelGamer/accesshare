import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const GroupUsersPermissions = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default GroupUsersPermissions;
