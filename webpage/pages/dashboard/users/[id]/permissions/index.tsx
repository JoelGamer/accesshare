import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Stack, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/router";
import { useMemo } from "react";
import { NextPageWithLayout } from "../../../../../@types/nextjs";
import useAsyncState from "../../../../../hooks/use-async-state";
import { parseIntQueryParams } from "../../../../../utilities/numbers";
import accountAccessService from "../../../../../services/api/account-access-service";
import Layout from "../../../layout";

const AccountAccessesPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const id = useMemo(() => parseIntQueryParams(queryId), [queryId]);

  const [groupUserPermissions, _, reload] = useAsyncState(async () => id && accountAccessService.index(+id), [id]);

  const onClickNewPermission = () => {
    router.push(`/dashboard/users/${id}/permissions/new`);
  };

  const onClickDeletePermission = async (permissionId: number) => {
    await accountAccessService.destroy(id, permissionId);
    reload();
  };

  return (
    <Stack spacing={2}>
      <Paper sx={{ p: 1 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={onClickNewPermission}>
            New Permission
          </Button>
          <Button variant="contained" color="secondary" onClick={() => router.push('/dashboard/users')}>
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

AccountAccessesPage.getLayout = (page) => <Layout>{page}</Layout>;

export default AccountAccessesPage;
