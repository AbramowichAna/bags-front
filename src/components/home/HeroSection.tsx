import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const HeroSection: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        Manage your money with ease
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
        Send, receive, and manage your funds securely with our digital wallet solution.
      </Typography>
    </Container>
  );
};

export default HeroSection; 