import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Header from '../components/home/Header';
import HeroSection from '../components/home/HeroSection';
import Footer from '../components/home/Footer';
import { Link as RouterLink } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <HeroSection />
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button component={RouterLink} to="/register" variant="contained" color="primary" size="large">
            Get Started
          </Button>
          <Button component={RouterLink} to="/login" variant="outlined" color="primary" size="large">
            Sign In
          </Button>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage; 