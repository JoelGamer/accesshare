import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import { useContext, useEffect } from 'react';
import SnackbarContext from '../../../contexts/snackbarContext';
import useVisibility from '../../../hooks/use-visibility';

const Snackbar = () => {
  const { message, setMessage, severity, setSeverity } = useContext(SnackbarContext);
  const [isOpen, open, close] = useVisibility(false);

  useEffect(() => {
    if (message) open();
  }, [message, open]);

  const onClose = () => {
    close();
    setMessage('');
    setSeverity('success');
  };

  return (
    <MuiSnackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={5000} onClose={onClose} open={isOpen}>
      <Alert severity={severity} onClose={onClose} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
}

export default Snackbar;
