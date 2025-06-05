import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Alert,
} from '@mui/material';
import { transfer, getWalletInfo } from '../../services/walletService';
import Box from "@mui/material/Box";

interface TransferDialogProps {
    open: boolean;
    onClose: () => void;
    onTransferSuccess: () => void;
    balance: number;
}

const Transfer: React.FC<TransferDialogProps> = ({ open, onClose, onTransferSuccess, balance }) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [formError, setFormError] = useState('');

    const handleTransfer = async () => {
        const numericAmount = parseFloat(amount);
        if (!recipient || isNaN(numericAmount) || numericAmount <= 0) {
            setFormError('All fields are required and amount must be positive.');
            return;
        }
        if (numericAmount > balance) {
            setFormError('Insufficient balance.');
            return;
        }

        try {
            await transfer({ toEmail: recipient, amount: numericAmount });
            setRecipient('');
            setAmount('');
            setFormError('');
            onTransferSuccess();
            onClose();
        } catch {
            setFormError('Transfer failed. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>New Transfer</DialogTitle>
            <DialogContent>
                <TextField
                    label="Recipient"
                    fullWidth
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />

                <Box mt={2}>
                    <TextField
                        label="Amountttt"
                        fullWidth
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        inputProps={{ min: 0, step: 0.01 }}
                    />
                </Box>

                {formError && <Box mt={2}><Alert severity="error">{formError}</Alert></Box>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleTransfer} data-testid="submit-transfer">Transfer</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Transfer;