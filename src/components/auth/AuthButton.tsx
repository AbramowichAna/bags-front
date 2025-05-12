import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface AuthButtonProps extends Omit<ButtonProps, 'variant' | 'color' | 'fullWidth'> {
  label: string;
  onClick: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  onClick,
  disabled,
  ...rest
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={onClick}
      disabled={disabled}
      sx={{
        py: 1.5,
        textTransform: 'none', // To prevent all caps text
        fontWeight: 'bold',
        bgcolor: 'black',
        color: 'white',
        '&:hover': {
          bgcolor: 'grey.900',
        },
        '&.Mui-disabled': {
            bgcolor: 'grey.700',
            color: 'grey.500'
        }
      }}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default AuthButton; 