import React, { useEffect, useState } from 'react';
import {getWalletInfo, transfer, WalletInfo} from '../services/walletService';
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Button,
    DialogTitle,
    Dialog,
    DialogContent,
    TextField,
    DialogActions
} from '@mui/material';
import TransferHistory from "../components/wallet/TransferHistory";
import {ApiErrorResponse} from "../types/error";

const WalletPage: React.FC = () => {
    const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [dialogOpen, setDialogOpen] = useState(false);
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [formError, setFormError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


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

    const handleTransfer = async () => {
        const numericAmount = parseFloat(amount);
        if (!recipient || isNaN(numericAmount) || numericAmount <= 0) {
            setFormError('All fields are required and amount must be positive.');
            return;
        }
        if (numericAmount > (walletInfo?.balance?.amount ?? 0)) {
            setFormError('Insufficient balance.');
            return;
        }

        try {
            await transfer({
                toEmail: recipient,
                amount: numericAmount,
            });

            setSuccessMessage('Transfer successful!');
            setDialogOpen(false);
            setRecipient('');
            setAmount('');
            setFormError('');

            const updatedInfo = await getWalletInfo();
            setWalletInfo(updatedInfo);
        } catch (e: any) {
            if (e.response && e.response.data) {
                setFormError((e.response.data as ApiErrorResponse).detail);
            }
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;


    return (
        <Box p={4}>
           <Typography variant="h4">My wallet</Typography>
            <Typography variant="h6">Balance: $ {walletInfo?.balance?.amount} {walletInfo?.currency}</Typography>
            <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                Transfer
            </Button>
            {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {successMessage}
                </Alert>
            )}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>New Transfer</DialogTitle>
                <DialogContent>
                        <TextField
                            label="Recipient"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            fullWidth
                            inputProps={{ min: 0, step: 0.01 }}
                        />
                        {formError && <Alert severity="error">{formError}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleTransfer}>
                        Transfer
                    </Button>
                </DialogActions>
            </Dialog>
            <TransferHistory/>
        </Box>
    );
};

export default WalletPage;
