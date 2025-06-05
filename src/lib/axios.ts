import axios, {InternalAxiosRequestConfig, AxiosResponse, AxiosHeaders, AxiosRequestConfig} from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && !['/auth/login', '/auth/register'].includes(config.url || '')) {
            if (!config.headers) {
                config.headers = new AxiosHeaders();
            }
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export async function get<T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
    return axiosInstance.get<T>(url, config);
}

export async function post<T, U>(
    url: string,
    data: U,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
    return axiosInstance.post<T>(url, data, config);
}

export async function put<T, U>(
    url: string,
    data: U,
    config?: InternalAxiosRequestConfig
): Promise<AxiosResponse<T>> {
    return axiosInstance.put<T>(url, data, config);
}

export async function del<T>(
    url: string,
    config?: InternalAxiosRequestConfig
): Promise<AxiosResponse<T>> {
    return axiosInstance.delete<T>(url, config);
}

export default axiosInstance;
