import { get } from '../lib/axios';

export interface WalletInfo {
    balance: {
        amount: number;
    };
    currency: string;
}

export async function getWalletInfo(): Promise<WalletInfo> {
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = await get<WalletInfo>('/wallet', { headers });
    return response.data;
}