import { Box, Divider, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { FC, ReactNode } from 'react';
import AppHeader from '../../components/ui/AppHeader';

const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
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
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
