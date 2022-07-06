import { AlertColor, ThemeProvider } from '@mui/material';
import { FC, useState } from 'react';
import DialogContext, { DialogContextProps } from './contexts/dialogContext';
import SnackbarContext from './contexts/snackbarContext';
import Routes from './routes';
import theme from './styles/theme';

const App: FC = () => {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [options, setOptions] = useState<DialogContextProps['options']>(null);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarContext.Provider value={{ message, setMessage, severity, setSeverity }}>
        <DialogContext.Provider value={{ options, setOptions }}>
          <Routes />
        </DialogContext.Provider>
      </SnackbarContext.Provider>
    </ThemeProvider>
  );
}

export default App;
