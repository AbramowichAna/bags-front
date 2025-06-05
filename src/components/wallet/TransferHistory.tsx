import React, { useState, useEffect } from 'react';
import { getTransferHistory, TransferRecord } from '../../services/walletService';
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

const TransferHistory: React.FC = () => {
    const [transfers, setTransfers] = useState<TransferRecord[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // 1-based for Pagination
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const sizePerPage = 2;

    const fetchTransfers = async (pageNumber: number) => {
        setLoading(true);
        try {
            const data = await getTransferHistory(pageNumber - 1, sizePerPage);

            console.log("Fetched Page:", data.number + 1);
            console.log("Total Pages:", data.totalPages);

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

    return (
        <Box mt={4}>
            <Typography variant="h5" gutterBottom>
                Transfer History
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
                                <TableCell>Amount</TableCell>
                                <TableCell>Direction</TableCell>
                                <TableCell>Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transfers.map((t) => (
                                <TableRow key={t.transferNumber}>
                                    <TableCell>{t.fromEmail}</TableCell>
                                    <TableCell>{t.toEmail}</TableCell>
                                    <TableCell>$ {t.amount}</TableCell>
                                    <TableCell>{t.direction}</TableCell>
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

// @ts-ignore
export default TransferHistory;
