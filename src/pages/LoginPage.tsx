import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const LoginPage: React.FC = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login Page
      </Typography>
    </Container>
  );
};

export default LoginPage; 