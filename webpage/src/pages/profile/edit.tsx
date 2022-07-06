import { Box, Button, Container, Grid, Paper, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../api/user-service';
import SnackbarContext from '../../contexts/snackbarContext';
import useAsyncState from '../../hooks/use-async-state';

const EditProfile: FC = () => {
  const navigate = useNavigate();
  const [currentUser] = useAsyncState(async () => await userService.me(), []);
  const { setMessage, setSeverity } = useContext(SnackbarContext);

  const { handleChange, handleSubmit, setValues, values } = useFormik({
    initialValues: { name: '', username: '', email: '', password: '' },
    onSubmit: async (submittedValues) => {
      try {
        if (!currentUser) return;
        await userService.update(currentUser.id, submittedValues);
        navigate('/');
      } catch (err) {
        setSeverity('error');
        setMessage('Incorrect email and/or password!');
        console.error(err);
      }
    },
  });

  useEffect(() => {
    if (currentUser) {
      setValues({
        email: currentUser.email,
        name: currentUser.name,
        password: '',
        username: currentUser.username
      });
    }
  }, [currentUser, setValues]);

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit">
                Update User
              </Button>
              <Button variant="contained" color="error" onClick={() => navigate('/')}>
                Cancel
              </Button>
            </Stack>
          </Paper>
          <Grid container spacing={2} component={Paper} sx={{ pr: 2, pb: 2 }}>
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
                type="text"
                variant="outlined"
                name="username"
                label="Username"
                onChange={handleChange}
                value={values.username}
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
        </Stack>
      </Box>
    </Container>
  );
}

export default EditProfile;
