import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, Button } from "@mui/material";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import { FC } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import groupUserService from "../../api/group-user-service";
import useAsyncState from "../../hooks/use-async-state";


const ListGroupUsers: FC = () => {
  const navigate = useNavigate();
  const [groupUsers] = useAsyncState(async () => groupUserService.index(), []);

  const onClickChangePermissions = (id: number) => {
    navigate(generatePath('/group-users/:id/permissions', { id: id.toString() }));
  }

  const onClickNewGroupUser = () => {
    navigate('/group-users/new');
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

export default ListGroupUsers;
