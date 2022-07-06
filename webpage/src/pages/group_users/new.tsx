import { Box, Button, Grid, Paper, Stack, TextField } from '@mui/material';
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import groupUserService from '../../api/group-user-service';
import SnackbarContext from '../../contexts/snackbarContext';

const NewGroupUser: FC = () => {
  const navigate = useNavigate();
  const { setMessage, setSeverity } = useContext(SnackbarContext);

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { email: '' },
    onSubmit: async (submittedValues) => {
      try {
        await groupUserService.create(submittedValues);
        navigate('/group-users');
      } catch (err) {
        setSeverity('error');
        setMessage('Error while adding user to group!');
        console.error(err);
      }
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Paper sx={{ p: 1, mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="submit">
            Send
          </Button>
          <Button variant="contained" color="error" onClick={() => navigate('/group-users')}>
            Cancel
          </Button>
        </Stack>
      </Paper>
      <Grid container component={Paper} sx={{ p: 1 }}>
        <Grid item xs={12}>
          <TextField
            type="email"
            variant="outlined"
            name="email"
            label="Email"
            onChange={handleChange}
            value={values.email}
            sx={{ mt: 2, mb: 1 }}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewGroupUser;
