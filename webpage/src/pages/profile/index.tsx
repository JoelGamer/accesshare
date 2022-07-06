import { Box, Button, Container, Grid, Paper, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../api/user-service';
import SnackbarContext from '../../contexts/snackbarContext';
import useAsyncState from '../../hooks/use-async-state';

const Profile: FC = () => {
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>

          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>

          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
