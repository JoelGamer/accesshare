import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, Button } from "@mui/material";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../../@types/nextjs";
import groupUserService from "../../../services/api/group-user-service";
import useAsyncState from "../../../hooks/use-async-state";
import Layout from "../layout";


const Users: NextPageWithLayout = () => {
  const router = useRouter();
  const [groupUsers] = useAsyncState(async () => groupUserService.index(), []);

  const onClickChangePermissions = (id: number) => {
    router.push(`/dashboard/users/${id}/permissions`);
  }

  const onClickNewGroupUser = () => {
    router.push('/dashboard/users/new');
  };

  return (
    <>
      <Paper sx={{ p: 1, mb: 2 }}>
        <Button variant="contained" onClick={onClickNewGroupUser}>
          Invite User
        </Button>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupUsers?.map(({ id, user, owner }) => (
              <TableRow key={id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{owner ? 'Yes' : 'No'}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Change Permissions">
                    <IconButton onClick={() => onClickChangePermissions(id)}>
                      <AddModeratorIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

Users.getLayout = (page) => <Layout>{page}</Layout>;

export default Users;
