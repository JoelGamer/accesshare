import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useFormik } from 'formik';
import { NextPageWithLayout } from '../../@types/nextjs';
import SnackbarContext from '../../contexts/snackbarContext';
import Link from '../../components/ui/Link';
import userSession from '../../services/user-session';
import userService from '../../services/api/user-service';
import Layout from './layout';

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const { setMessage, setSeverity } = useContext(SnackbarContext);

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async (submittedValues) => {
      try {
        const { token } = await userService.login(submittedValues);
        userSession.initializeSession(token);

        router.push('/login/groups');
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
          <Link href="/">Forgot Password?</Link>
          <Link href="/login/sign-up">Don&apos;t have an account? Sign up</Link>
        </Stack>
      </Box>
    </Box>
  );
}

Login.getLayout = (page) => <Layout>{page}</Layout>;

export default Login;
