import { Avatar, Box, Button, IconButton, Paper, Stack, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import groupService from '../../../api/group-service';
import useAsyncState from '../../../hooks/use-async-state';
import { avatarInitials } from '../../../utilities/avatar-initials';
import userSession from '../../../services/user-session';

const GroupCard: FC<GroupCardProps> = ({ group, onClickGroup }) => {
  return (
    <Paper onClick={() => onClickGroup(group)} sx={{ p: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Avatar>{avatarInitials(group.name)}</Avatar>
      <Typography component="h2" variant="h6" marginLeft={1}>{group.name}</Typography>
      <IconButton sx={{ marginLeft: 'auto' }}>
        <ChevronRightIcon />
      </IconButton>
    </Paper>
  );
};

interface GroupCardProps {
  group: Group;
  onClickGroup: (group: Group) => void;
}

const GroupsList: FC = () => {
  const navigate = useNavigate();
  const [groups] = useAsyncState(async () => groupService.index(), []);

  const onClickGroup = async (group: Group) => {
    await userSession.initializeGroup(group);
    navigate('/dashboard');
  };

  const onClickNewGroup = () => {
    navigate('/login/groups/new');
  };

  return (
    <>
      <Stack spacing={1} marginTop={2} width="100%">
        {groups?.map((group) => <GroupCard key={group.id} group={group} onClickGroup={onClickGroup} />)}
      </Stack>
      <Box width="100%" sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start' }}>
        <Button variant="contained" onClick={onClickNewGroup}>
          New Group
        </Button>
      </Box>
    </>
  );
}

export default GroupsList;
