import { Button, Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FC, useContext } from 'react';
import DialogContext from '../../contexts/dialogContext';

const Dialog: FC = () => {
  const { options, setOptions } = useContext(DialogContext);
  const destroyDialog = () => setOptions(null);

  const onClose = () => {
    options?.onClose && options?.onClose();
    destroyDialog();
  };

  const onConfirm = () => {
    options?.onConfirm();
    destroyDialog();
  };

  const onCancel = () => {
    options?.onCancel && options?.onCancel();
    destroyDialog();
  };

  return (
    <MuiDialog onClose={onClose} open={!!options}>
      <DialogTitle>{options?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {options?.contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}

export default Dialog;
