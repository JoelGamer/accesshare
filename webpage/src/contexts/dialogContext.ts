import { createContext } from "react";

const DialogContext = createContext<DialogContextProps>({
  options: null,
  setOptions: (options) => options,
});

export default DialogContext;

interface OptionsProps {
  title: string;
  contentText: string;
  onConfirm: () => void;
  onClose?: () => void;
  onCancel?: () => void;
}

export interface DialogContextProps {
  options: OptionsProps | null;
  setOptions: (options: OptionsProps | null) => void;
}
