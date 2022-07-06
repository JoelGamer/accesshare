import { Box, Button, Checkbox, FormControlLabel, Link, Stack, TextField, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import userService from '../../api/user-service';
import SnackbarContext from '../../contexts/snackbarContext';
import userSession from '../../services/user-session';

const SignIn: FC = () => {
  const navigate = useNavigate();
  const { setMessage, setSeverity } = useContext(SnackbarContext);
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async (submittedValues) => {
      try {
        const { token } = await userService.login(submittedValues);
        userSession.initializeSession(token);
        navigate('/login/groups');
      } catch (err) {
        setSeverity('error');
        setMessage('Incorrect email and/or password!');
        console.error(err);
      }
    },
  });

  return (
    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h5">Sign in</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
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
        <TextField
          type="password"
          variant="outlined"
          name="password"
          label="Password"
          onChange={handleChange}
          value={values.password}
          sx={{ mt: 2, mb: 1 }}
          fullWidth
        />
        <FormControlLabel label="Remember me" control={<Checkbox />} />
        <Button variant="contained" type="submit" sx={{ mt: 2, mb: 2 }} fullWidth>Sign in</Button>
        <Stack direction="row" justifyContent="space-between">
          <Link component="button" variant="body2" onClick={() => navigate('/login/sign-up')}>Forgot Password?</Link>
          <Link component="button" variant="body2" onClick={() => navigate('/login/sign-up')}>Don't have an account? Sign up</Link>
        </Stack>
      </Box>
    </Box>
  );
}

export default SignIn;
