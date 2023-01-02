import { Box, Button, Grid, Paper, Stack } from '@mui/material';
import { useContext, useMemo } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Layout from '../../../../layout';
import { NextPageWithLayout } from '../../../../../../@types/nextjs';
import accountService from '../../../../../../services/api/account-service';
import Select from '../../../../../../components/ui/Select';
import SnackbarContext from '../../../../../../contexts/snackbarContext';
import useAsyncState from '../../../../../../hooks/use-async-state';
import accountAccessService from '../../../../../../services/api/account-access-service';
import { parseIntQueryParams } from '../../../../../../utilities/numbers';

const NewAccountAccessPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const id = useMemo(() => parseIntQueryParams(queryId), [queryId]);

  const returnPath = useMemo(() => `/dashboard/users/${id}/permissions`, [id]);
  const { setMessage, setSeverity } = useContext(SnackbarContext);
  const [accounts] = useAsyncState(async () => accountService.index(), []);

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { account: '' },
    onSubmit: async (submittedValues) => {
      try {
        await accountAccessService.create(id, { account_id: +submittedValues.account });
        router.push(returnPath);
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
          <Button variant="contained" color="error" onClick={() => router.push(returnPath)}>
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

NewAccountAccessPage.getLayout = (page) => <Layout>{page}</Layout>;

export default NewAccountAccessPage;
