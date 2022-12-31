import { Box, Divider, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';
import AppHeader from '../../components/ui/AppHeader';
import useVisibility from '../../hooks/use-visibility';
import userSession from '../../services/user-session';
import { MissingRequirement } from '../../utilities/errors';

const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [loading, start, stop] = useVisibility(true);

  useEffect(() => {
    const getAsync = async () => {
      start();

      try {
        await userSession.initialize();
      } catch (e) {
        console.error(e);

        if (e instanceof MissingRequirement) {
          router.push('/login/groups');
        } else {
          router.push('/login');
        }
      }

      stop();
    };

    getAsync();
  }, [router]);

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
        <Box p={2}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
