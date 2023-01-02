import { AlertColor } from "@mui/material";
import { createContext } from "react";

const SnackbarContext = createContext<SnackbarContextProps>({
  message: '',
  setMessage: (value) => value,
  severity: undefined,
  setSeverity: (value) => value,
});

export default SnackbarContext;

interface SnackbarContextProps {
  message: string;
  setMessage: (message: string) => void;
  severity: AlertColor | undefined
  setSeverity: (severity: AlertColor) => void;
}