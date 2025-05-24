import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import InputField from '../components/auth/InputField';
import AuthButton from '../components/auth/AuthButton';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!email) newErrors.email = 'Email is required';
        else if (!validateEmail(email)) newErrors.email = 'Invalid email format';

        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';

        if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        try {
            await register(email, password);
            navigate('/login');
        } catch (error: any) {
            if (error.response?.data?.message) {
                setErrors({general: error.response.data.message});
            } else {
                setErrors({general: 'Registration failed'});
            }
        }
    };

    const handleNavigateBack = () => {
        navigate(-1);
    };

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

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
                    Create account
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Sign up to start using your wallet
                </Typography>

                <Box component="form" sx={{ width: '100%', mt: 1 }}>
                    <InputField
                        id="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        margin="normal"
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                    <InputField
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="•••••••••"
                        margin="normal"
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                    <InputField
                        id="confirm-password"
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="•••••••••"
                        margin="normal"
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword}
                    />
                    <Box sx={{ mt: 3, mb: 2 }}>
                        <AuthButton label="Sign up" onClick={handleRegister} />
                        {errors.general && (
                            <Typography color="error" sx={{ mt: 2 }} role="alert">
                                {errors.general}
                            </Typography>
                        )}
                    </Box>
                    <Typography variant="body2" align="center">
                        Already have an account?{' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleNavigateToLogin}
                            sx={{ fontWeight: 'bold', textDecoration: 'none', top: '-2px' }}
                        >
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;
