import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';

interface BackButtonProps {
  onClick: () => void;
  text?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, text = 'Back' }) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      startIcon={<ArrowBackIcon />}
      sx={{
        textTransform: 'none',
        color: 'text.primary',
        padding: '8px 16px',
        minWidth: 'auto',
        justifyContent: 'flex-start',
        alignItems: 'center',
        lineHeight: 'normal',
        '& .MuiButton-startIcon': {
          marginRight: '8px',
          display: 'flex',
          alignItems: 'center',
        },
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
      aria-label={text === 'Back' ? "go back" : text}
    >
        <Box sx={{ position: 'relative', top: '-1px' }}>{text}</Box>
    </Button>
  );
};

export default BackButton; 