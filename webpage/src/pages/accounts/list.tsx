import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import LockResetIcon from '@mui/icons-material/LockReset';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import accountService from '../../api/account-service';
import DialogContext from '../../contexts/dialogContext';
import useAsyncState from '../../hooks/use-async-state';
import accountPasswordService from '../../api/account-password-service';
import SnackbarContext from '../../contexts/snackbarContext';
import { currencyFormat } from '../../utilities/i18n-format';

const ListAccounts: FC = () => {
  const navigate = useNavigate();
  const { setOptions } = useContext(DialogContext);
  const { setMessage, setSeverity } = useContext(SnackbarContext);
  const [accounts, loading, reload] = useAsyncState(async () => accountService.index(), []);

  const onClickNewAccount = () => {
    navigate('/accounts/new');
  };

  const onClickShowPassword = async (id: number) => {
    const accountPassword = await accountPasswordService.index(id);
    if (!accountPassword) return;

    setOptions({
      title: 'Password Account',
      contentText: `The password of this account: ${accountPassword?.password}`,
      onConfirm: () => {},
    });
  };

  const onClickRegeneratePassword = async (id: number, name: string) => {
    try {
      await accountPasswordService.create(id);
      setMessage(`The password for the account ${name} has been regenerated!`);
    } catch (err) {
      setMessage('Error while requesting a password regeneration!');
      setSeverity('error');
      console.error(err);
    }

    reload();
  };

  const onClickDeleteAccount = (id: number) => {
    setOptions({
      title: 'Delete Account',
      contentText: 'Are you sure you want to delete this account? This action is irreversible.',
      onConfirm: async () => {
        await accountService.destroy(id);
        reload();
      },
    });
  };

  return (
    <>
      <Paper sx={{ p: 1, mb: 2 }}>
        <Button variant="contained" onClick={onClickNewAccount}>
          New Account
        </Button>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts?.map(({ id, name, email, price, has_password }) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell align="right">{currencyFormat(price)}</TableCell>
                <TableCell align="right">
                  {has_password && (
                    <Tooltip title="Show Password">
                      <IconButton onClick={() => onClickShowPassword(id)}>
                        <KeyIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Regenerate Password">
                    <IconButton onClick={() => onClickRegeneratePassword(id, name)}>
                      <LockResetIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Account">
                    <IconButton onClick={() => onClickDeleteAccount(id)}>
                      <DeleteIcon />
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
}

export default ListAccounts;
