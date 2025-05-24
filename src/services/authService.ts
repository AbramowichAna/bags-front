import { post } from '../lib/axios';

export interface CreateWalletRequest {
    email: string;
    password: string;
}

export interface AuthRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export async function register(email: string, password: string) {
    const body: CreateWalletRequest = { email, password };
    await post<void, CreateWalletRequest>('/auth/register', body);
}

export async function login(email: string, password: string): Promise<AuthResponse> {
    const body: AuthRequest = { email, password };
    const response = await post<AuthResponse, AuthRequest>('/auth/login', body);
    localStorage.setItem('token', response.data.token);
    return response.data;
}
