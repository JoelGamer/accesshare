import { useMemo } from 'react';
import {
  FormControl, FormHelperText, InputLabel, MenuItem, Select as MUISelect,
} from '@mui/material';

type MUISelectProps = React.ComponentProps<typeof MUISelect>;

interface SelectProps<T> extends MUISelectProps {
  items: T[];
  itemLabel: keyof T | ((value: T) => string);
  itemValue: keyof T | ((value: T) => string);
  errorText?: string;
  withLabel?: boolean;
}

const getItemValue = <T extends Record<string, any>>(value: T, key: keyof T | ((value: T) => string)) => {
  if (typeof key === 'function') {
    return key(value);
  }

  return value[key];
};

const Select = <T extends Record<string, any>>({
  items,
  itemLabel,
  itemValue,
  errorText,
  withLabel = true,
  ...props
}: SelectProps<T>) => {
  const hasError = useMemo(() => !props.disabled && !!errorText, [props.disabled, errorText]);

  return (
    <FormControl fullWidth sx={{ minWidth: 200 }} error={hasError}>
      {withLabel && <InputLabel id={props.labelId}>{props.label}</InputLabel>}
      <MUISelect {...props}>
        {items.map((v, i) => (
          <MenuItem key={i} value={getItemValue(v, itemValue)}>{getItemValue(v, itemLabel)}</MenuItem>
        ))}
      </MUISelect>
      {hasError && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
