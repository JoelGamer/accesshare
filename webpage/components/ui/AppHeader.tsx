import { AppBar, Avatar, Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Toolbar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppsIcon from '@mui/icons-material/Apps';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/router';
import { FC, useMemo, useState } from 'react';
import md5 from 'crypto-js/md5';
import useAsyncState from '../../hooks/use-async-state';
import userService from '../../services/api/user-service';
import userSession from '../../services/user-session';


const ListItems = [
  { title: 'Dashboard', icon: <DashboardIcon />, route: '/dashboard' },
  { title: 'Accounts', icon: <AppsIcon />, route: '/dashboard/accounts' },
  { title: 'Invoices', icon: <BarChartIcon />, route: '/dashboard/invoices' },
  { title: 'Users', icon: <AdminPanelSettingsIcon />, route: '/dashboard/users' },
];

const matchPath = (path: string, match: string) => {
  return path === match;
}

const AppHeader: FC = () => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const [currentUser] = useAsyncState(async () => await userService.me(), []);
  const avatarURL = useMemo(() => currentUser ? `https://www.gravatar.com/avatar/${md5(currentUser.email)}` : '', [currentUser]);

  const onClickMenuItem = (callback: () => void) => {
    setAnchorEl(null);
    callback();
  }

  const onClickProfile = () => {
    router.push('/dashboard/profile');
  }

  const onClickGroups = () => {
    router.push('/login/groups');
  };

  const onClickLogout = () => {
    router.push('/login');
    userSession.destroySession();
  };

  const onClickListItem = (route: string) => {
    router.push(route);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar variant="dense">
          <Grid container>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" color="inherit" component="div">Accesshare</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar src={avatarURL} sx={{ width: 36, height: 36 }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}>
        <Toolbar variant="dense" />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemText sx={{ opacity: 0 }}>Easter Egg!</ListItemText>
            </ListItem>
            <Divider />
            {ListItems.map(({ title, icon, route }) => (
              <ListItem key={title} disablePadding>
                <ListItemButton onClick={() => onClickListItem(route)} selected={matchPath(router.pathname, route)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Menu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} open={!!anchorEl}>
        <MenuList>
          <MenuItem onClick={() => onClickMenuItem(onClickProfile)}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => onClickMenuItem(onClickGroups)}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText>Groups</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => onClickMenuItem(onClickLogout)}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );  
}

export default AppHeader;
