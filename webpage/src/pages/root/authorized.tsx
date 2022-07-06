import { Box, Divider, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { FC, useEffect } from 'react';
import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';
import userService from '../../api/user-service';
import AppHeader from '../../components/ui/AppHeader';
import useVisibility from '../../hooks/use-visibility';
import userSession from '../../services/user-session';

const AuthorizedRoot: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, start, stop] = useVisibility(true);

  useEffect(() => {
    if (matchPath(location.pathname, '/')) {
      navigate('/dashboard');
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const getAsync = async () => {
      start();

      userSession.initializeSession();
      if (!userSession.token) {
        navigate('/login');
        stop();
        return;
      }
    
      try {
        await userService.me();
      } catch (err: any) {
        navigate('/login');
        return;
      }

      try {
        await userSession.initializeGroup();
        if (!userSession.group) {
          navigate('/login/groups');
        }
      } catch (err) {
        navigate('/login/groups');
        console.error(err);
      }

      stop();
    };

    getAsync();
  }, []);

  if (loading) return null;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppHeader />
      <Box sx={{ width: '100%' }}>
        <Toolbar variant="dense" />
        <List>
          <ListItem>
            <ListItemText sx={{ color: 'white' }}>Header</ListItemText>
          </ListItem>
          <Divider />
        </List>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AuthorizedRoot;
