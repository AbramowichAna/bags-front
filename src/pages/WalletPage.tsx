import React, { useEffect, useState } from 'react';
import { getWalletInfo, WalletInfo } from '../services/walletService';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

const WalletPage: React.FC = () => {
    const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getWalletInfo()
            .then((data) => {
                setWalletInfo(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Error loading wallet information.');
                setLoading(false);
            });
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box p={4}>
           <Typography variant="h4">My Wallet</Typography>
            <Typography variant="h6">Balance: {walletInfo?.balance?.amount} {walletInfo?.currency}</Typography>
        </Box>
    );
};

export default WalletPage;
