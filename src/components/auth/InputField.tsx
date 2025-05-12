import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  margin?: 'none' | 'dense' | 'normal';
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error = false,
  helperText,
  fullWidth = true,
  variant = 'outlined',
  margin = 'normal',
}) => {
  return (
    <FormControl variant={variant} fullWidth={fullWidth} margin={margin} error={error} sx={{ mb: 2 }}>
      <InputLabel htmlFor={id} sx={{ fontWeight: 500, color: 'text.primary', '&.Mui-focused': { color: 'text.primary' } }}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default InputField; 