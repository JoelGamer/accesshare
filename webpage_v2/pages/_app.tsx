import '../styles/globals.css'
import { useState } from 'react';
import { AlertColor, ThemeProvider } from '@mui/material';
import Dialog from '../components/ui/Dialog'
import { AppPropsWithLayout } from '../@types/nextjs';
import Snackbar from '../components/ui/Snackbar'
import DialogContext, { DialogContextProps } from '../contexts/dialogContext';
import SnackbarContext from '../contexts/snackbarContext';
import theme from '../styles/theme';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [options, setOptions] = useState<DialogContextProps['options']>(null);

  return getLayout(
    <ThemeProvider theme={theme}>
      <SnackbarContext.Provider value={{ message, setMessage, severity, setSeverity }}>
        <DialogContext.Provider value={{ options, setOptions }}>
          <Dialog />
          <Snackbar />
          <Component {...pageProps} />
        </DialogContext.Provider>
      </SnackbarContext.Provider>
    </ThemeProvider>
  );
}

export default App;
