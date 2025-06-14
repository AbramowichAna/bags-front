import React, { useEffect, useState } from 'react';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import {getWalletInfo, requestDebIn, transfer, WalletInfo} from '../services/walletService';
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

    const [debinDialogOpen, setDebinDialogOpen] = useState(false);
    const [debinRecipient, setDebinRecipient] = useState('');
    const [debinAmount, setDebinAmount] = useState('');
    const [debinFormError, setDebinFormError] = useState('');
    const [debinServiceType, setDebinServiceType] = useState('');
    const [debinServiceName, setDebinServiceName] = useState('');


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

    const handleDebinRequest = async () => {
        const numericAmount = parseFloat(debinAmount);
        if (!debinRecipient || isNaN(numericAmount) || numericAmount <= 0) {
            setDebinFormError('All fields are required and amount must be positive.');
            return;
        }

        try {
            await requestDebIn({
                externalServiceName: debinServiceName,
                serviceType: debinServiceType,
                externalEmail: debinRecipient,
                amount: numericAmount,
            });

            setSuccessMessage('Debin request sent!');
            setDebinDialogOpen(false);
            setDebinRecipient('');
            setDebinAmount('');
            setDebinFormError('');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (e: any) {
            if (e.response && e.response.data) {
                setDebinFormError((e.response.data as ApiErrorResponse).detail ?? e.response.data);
            } else {
                setDebinFormError('An unexpected error occurred.');
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
            <Button
                variant="contained" color="primary"
                sx={{ ml: 2 }}
                onClick={() => setDebinDialogOpen(true)}
            >
                Debin
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
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            fullWidth
                            sx={{ mt: 2 }}
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
            <Dialog open={debinDialogOpen} onClose={() => setDebinDialogOpen(false)}>
                <DialogTitle>Request Debin</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Recipient Email"
                        value={debinRecipient}
                        onChange={(e) => setDebinRecipient(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        value={debinAmount}
                        onChange={(e) => setDebinAmount(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="service-type-label">Service Type</InputLabel>
                        <Select
                            labelId="service-type-label"
                            value={debinServiceType}
                            label="Service Type"
                            onChange={(e) => setDebinServiceType(e.target.value)}
                        >
                            <MenuItem value="BANK">Bank</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Service Name"
                        value={debinServiceName}
                        onChange={(e) => setDebinServiceName(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    {debinFormError && <Alert severity="error" sx={{ mt: 2 }}>{debinFormError}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDebinDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleDebinRequest}>
                        Request
                    </Button>
                </DialogActions>
            </Dialog>

            <TransferHistory/>
        </Box>
    );
};

export default WalletPage;
