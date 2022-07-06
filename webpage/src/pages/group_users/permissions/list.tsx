import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Stack, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import groupUserPermissionService from "../../../api/group-user-permission-service";
import useAsyncState from "../../../hooks/use-async-state";
import { parseInt } from "../../../utilities/numbers";

const ListGroupUserPermissions: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [groupUserPermissions, _, reload] = useAsyncState(async () => id && groupUserPermissionService.index(+id), [id]);

  const onClickNewPermission = () => {
    navigate(generatePath('/group-users/:id/permissions/new', { id }));
  };

  const onClickDeletePermission = async (permissionId: number) => {
    await groupUserPermissionService.destroy(parseInt(id), permissionId);
    reload();
  };

  return (
    <Stack spacing={2}>
      <Paper sx={{ p: 1 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={onClickNewPermission}>
            New Permission
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/group-users')}>
            Back
          </Button>
        </Stack>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(groupUserPermissions || []).map(({ id, account }) => (
              <TableRow key={id}>
                <TableCell>{account.name}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete Account">
                    <IconButton onClick={() => onClickDeletePermission(id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default ListGroupUserPermissions;
