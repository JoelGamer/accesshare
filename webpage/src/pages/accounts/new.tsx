import { Box, Button, Grid, InputAdornment, Paper, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import accountService from "../../api/account-service";
import SnackbarContext from "../../contexts/snackbarContext";

const NewAccount: FC = () => {
  const navigate = useNavigate();
  const { setMessage, setSeverity } = useContext(SnackbarContext);

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { email: '', name: '', price: 0, password: '' },
    onSubmit: async (submittedValues) => {
      try {
        await accountService.create(submittedValues);
        navigate('/accounts');
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
          <Button variant="contained" color="error" onClick={() => navigate('/accounts')}>
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

export default NewAccount;
