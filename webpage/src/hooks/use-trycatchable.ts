import { AlertColor } from "@mui/material";
import { useContext } from "react";
import SnackbarContext from "../contexts/snackbarContext";

const useTryCatchable = (callback: () => void, messages: [string, string], { error = 'error', success = 'success' }: TryCatchableOptions) => {
  const { setMessage, setSeverity } = useContext(SnackbarContext);

  const execute = () => {
    try {
      callback();
      setSeverity(success);
      setMessage(messages[0]);
    } catch (err) {
      setSeverity(error);
      setMessage(messages[1]);
      console.error(err);
    }
  }

  return execute;
};

export default useTryCatchable;

interface TryCatchableOptions {
  success: AlertColor;
  error: AlertColor;
};
