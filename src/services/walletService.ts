import {get, post} from '../lib/axios';

export interface WalletInfo {
    balance: {
        amount: number;
    };
    currency: string;
}

export interface TransferRequest {
    toEmail: string;
    amount: number;
}

export interface TransferHistoryPage {
    content: TransferRecord[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export interface TransferRecord {
    fromEmail: string;
    toEmail: string;
    amount: number;
    timestamp: string;
    transferNumber: string;
    direction: 'IN' | 'OUT';
}

export async function getWalletInfo(): Promise<WalletInfo> {
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = await get<WalletInfo>('/wallet', { headers });
    return response.data;
}

export async function transfer(data: TransferRequest): Promise<void> {
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    await post('/transfer', data, { headers });
}

export async function getTransferHistory(page = 0, size = 5): Promise<TransferHistoryPage> {
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = await get<TransferHistoryPage>('/transfer', {
        headers,
        params: { page, size },
    });

    return response.data;
}
