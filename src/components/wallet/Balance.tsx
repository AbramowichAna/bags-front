import React from 'react';
import { Typography, Box } from '@mui/material';
import { WalletInfo } from '../../services/walletService';

interface BalanceProps {
    walletInfo: WalletInfo | null;
}

const Balance: React.FC<BalanceProps> = ({ walletInfo }) => (
    <Box mb={2}>
        <Typography variant="h6">
            Balance: $ {walletInfo?.balance?.amount} {walletInfo?.currency}
        </Typography>
    </Box>
);

export default Balance;