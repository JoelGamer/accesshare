import { Avatar, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import groupService from '../../../api/group-service';
import { avatarInitials } from '../../../utilities/avatar-initials';

const NewGroup: FC = () => {
  const navigate = useNavigate();

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { name: '', type: 0 },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      type: Yup.number().required(),
    }),
    onSubmit: async (submittedValues) => {
      try {
        await groupService.create(submittedValues);
        navigate('/login/groups');
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <>
      <Box marginTop={2} width="100%">
        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Avatar>{avatarInitials(values.name)}</Avatar>
          <Typography component="h2" variant="h6" marginLeft={1}>{values.name}</Typography>
        </Paper>
      </Box>
      <Box component="form" onSubmit={handleSubmit} noValidate width="100%" sx={{ mt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <TextField
          type="text"
          variant="outlined"
          name="name"
          label="Name"
          onChange={handleChange}
          value={values.name}
          sx={{ mb: 2 }}
          fullWidth
        />
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">
            Create
          </Button>
          <Button variant="contained" color="error" onClick={() => navigate('/login/groups')}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default NewGroup;
