import { Avatar, Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import md5 from 'crypto-js/md5';
import { useMemo } from 'react';
import { NextPageWithLayout } from "../../../@types/nextjs";
import useAsyncState from '../../../hooks/use-async-state';
import userService from '../../../services/api/user-service';
import Layout from "../layout";

const ProfilePage: NextPageWithLayout = () => {
  const [me, loading] = useAsyncState(async () => userService.me(), []);
  const avatarURL = useMemo(() => me ? `https://www.gravatar.com/avatar/${md5(me.email)}` : '', [me]);

  if (loading) return null;
  
  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
        <Paper sx={{ p: 1 }}>
          <Box display="flex" gap={1}>
            <Box>
              <Avatar src={avatarURL} />
            </Box>
            <Box>
              <Typography>Name: {me.name}</Typography>
              <Typography>Username: {me.username}</Typography>
              <Typography>Email: {me.email}</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid xs={6}>
        <Paper sx={{ p: 1 }}>
        </Paper>
      </Grid>
    </Grid>
  );
}

ProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default ProfilePage;