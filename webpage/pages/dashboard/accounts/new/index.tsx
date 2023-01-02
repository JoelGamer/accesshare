import { Box, Button, Grid, Paper, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";
import { NextPageWithLayout } from "../../../../@types/nextjs";
import accountService from "../../../../services/api/account-service";
import SnackbarContext from "../../../../contexts/snackbarContext";
import Layout from "../../layout";

const NewAccountPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setMessage, setSeverity } = useContext(SnackbarContext);

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { email: '', name: '', price: 0, password: '' },
    onSubmit: async (submittedValues) => {
      try {
        await accountService.create(submittedValues);
        router.push('/dashboard/accounts');
      } catch (e) {
        setSeverity('error');
        setMessage('Error while creating a new account!');
        console.error(e);
      }
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Paper sx={{ p: 1, mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="submit">
            Create Account
          </Button>
          <Button variant="contained" color="error" onClick={() => router.push('/dashboard/accounts')}>
            Cancel
          </Button>
        </Stack>
      </Paper>
      <Grid container component={Paper} spacing={1} sx={{ p: 1 }}>
        <Grid item xs={6}>
          <TextField
            type="text"
            variant="outlined"
            name="name"
            label="Name"
            onChange={handleChange}
            value={values.name}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="email"
            variant="outlined"
            name="email"
            label="Email"
            onChange={handleChange}
            value={values.email}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="number"
            variant="outlined"
            name="price"
            label="Price"
            onChange={handleChange}
            value={values.price}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="password"
            variant="outlined"
            name="password"
            label="Password"
            onChange={handleChange}
            value={values.password}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

NewAccountPage.getLayout = (page) => <Layout>{page}</Layout>

export default NewAccountPage;
