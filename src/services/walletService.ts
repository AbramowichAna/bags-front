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

export interface ParticipantDto {
    serviceType: string,
    serviceName: string,
    email: string;
}

export interface TransferRecord {
    id: string;
    fromParticipant: ParticipantDto;
    toParticipant: ParticipantDto;
    timestamp: string;
    amount: number;
    type: 'IN' | 'OUT' | 'EXTERNAL_LOAD';
}

export interface TransferHistoryPage {
    content: TransferRecord[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export interface DebInRequest {
    externalServiceName: string;
    serviceType: string;
    externalEmail: string;
    amount: number;
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

export async function requestDebIn(data: DebInRequest): Promise<void> {
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    await post('/debin', data, { headers });
}