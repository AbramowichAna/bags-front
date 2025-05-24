import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import InputField from '../components/auth/InputField';
import AuthButton from '../components/auth/AuthButton';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');
        try {
            await login(email, password);
            navigate('/home');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error logging in');
        }
    };

  const handleNavigateBack = () => {
    navigate(-1); // previous page
  };
  
  const handleCreateAccount = () => {
    navigate('/register');
  }

  return (
    <Container maxWidth={false}>
      <Box sx={{ pt: 3, pl: 1, mb: 12 }}>
        <BackButton onClick={handleNavigateBack} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 'fit-content',
          mx: 'auto',
          mt: 8,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Welcome back
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Sign in to access your wallet
        </Typography>

        <Box component="form" sx={{ width: '100%', mt: 1 }}>
          <InputField
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            margin="normal"
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="•••••••••"
            margin="normal"
          />
          <Box sx={{ mt: 3, mb: 2 }}>
            <AuthButton label="Sign in" onClick={handleLogin} />
          </Box>
            {error && (
                <Typography color="error" sx={{ mt: 1, mb: 2 }}>
                    {error}
                </Typography>
            )}
          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Link component="button" variant="body2" onClick={handleCreateAccount} sx={{ fontWeight: 'bold', textDecoration: 'none', top: '-2px' }}>
              Create account
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage; 