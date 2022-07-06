import { Box, Button, Grid, Paper, Stack, TextField } from '@mui/material';
import { FC, useContext, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import SnackbarContext from '../../../contexts/snackbarContext';
import accountService from '../../../api/account-service';
import useAsyncState from '../../../hooks/use-async-state';
import Select from '../../../components/ui/Select';
import groupUserPermissionService from '../../../api/group-user-permission-service';
import { parseInt } from '../../../utilities/numbers';

const NewGroupUserPermission: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const returnPath = useMemo(() => generatePath('/group-users/:id/permissions', { id }), [id]);
  const { setMessage, setSeverity } = useContext(SnackbarContext);
  const [accounts] = useAsyncState(async () => accountService.index(), []);

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { account: '' },
    onSubmit: async (submittedValues) => {
      try {
        await groupUserPermissionService.create(parseInt(id), { account_id: +submittedValues.account });
        navigate(returnPath);
      } catch (err) {
        setSeverity('error');
        setMessage('Error while giving a new permission to this user!');
        console.error(err);
      }
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Paper sx={{ p: 1, mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="submit">
            Grant Permission
          </Button>
          <Button variant="contained" color="error" onClick={() => navigate(returnPath)}>
            Cancel
          </Button>
        </Stack>
      </Paper>
      <Grid container component={Paper} spacing={1} sx={{ p: 1 }}>
        <Grid item xs={12}>
          <Select
            name="account"
            label="Accounts"
            labelId="select-label-account"
            items={accounts || []}
            itemLabel="name"
            itemValue="id"
            value={values.account}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewGroupUserPermission;
