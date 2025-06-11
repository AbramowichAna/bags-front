import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Pagination,
    CircularProgress,
    Alert,
} from '@mui/material';
import { getTransferHistory, TransferRecord } from '../../services/walletService';

const TransferHistory: React.FC = () => {
    const [transfers, setTransfers] = useState<TransferRecord[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // 1-based for Pagination
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const sizePerPage = 5;

    const fetchTransfers = async (pageNumber: number) => {
        setLoading(true);
        try {
            const data = await getTransferHistory(pageNumber - 1, sizePerPage);

            setTransfers(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number + 1);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Error loading transfers.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransfers(currentPage);
    }, [currentPage]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };

    const getDirectionLabel = (type: TransferRecord['type']) => {
        switch (type) {
            case 'IN':
                return 'In';
            case 'OUT':
                return 'Out';
            case 'EXTERNAL_LOAD':
                return 'External load';
            default:
                return type;
        }
    };

    return (
        <Box mt={4}>
            <Typography variant="h5" gutterBottom>
                Movements
            </Typography>

            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && (
                <>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Service Type</TableCell>
                                <TableCell>Service Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Direction</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transfers.map((t) => (
                                <TableRow key={t.id}>
                                    <TableCell>{t.fromParticipant.email}</TableCell>
                                    <TableCell>{t.toParticipant.email}</TableCell>
                                    <TableCell>{t.fromParticipant.serviceType}</TableCell>
                                    <TableCell>{t.fromParticipant.serviceName}</TableCell>
                                    <TableCell>$ {t.amount.toFixed(2)}</TableCell>
                                    <TableCell>{getDirectionLabel(t.type)}</TableCell>
                                    <TableCell>{new Date(t.timestamp).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Box mt={2} display="flex" justifyContent="center">
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            siblingCount={0}
                            boundaryCount={1}
                            disabled={totalPages <= 1}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default TransferHistory;
