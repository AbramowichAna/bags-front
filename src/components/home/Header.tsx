import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Digital Wallet
        </Typography>
        <Box>
          <Button component={RouterLink} to="/login" color="primary" variant="outlined" sx={{ marginRight: 2 }}>
            Login
          </Button>
          <Button component={RouterLink} to="/register" color="primary" variant="contained">
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 