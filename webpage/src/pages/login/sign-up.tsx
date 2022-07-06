import { Box, Button, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { useFormik } from 'formik';
import userService from '../../api/user-service';

const SignUp: FC = () => {
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { name: '', username: '', email: '', password: '' },
    onSubmit: async (submittedValues) => userService.create(submittedValues),
  });

  return (
    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h5">Sign up</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          type="text"
          variant="outlined"
          name="name"
          label="Name"
          onChange={handleChange}
          value={values.name}
          sx={{ mt: 2, mb: 1 }}
          fullWidth
        />
        <TextField
          type="text"
          variant="outlined"
          name="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          sx={{ mt: 2, mb: 1 }}
          fullWidth
        />
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
        <Button variant="contained" type="submit" sx={{ mt: 2 }} fullWidth>Sign up</Button>
      </Box>
    </Box>
  );
}

export default SignUp;
