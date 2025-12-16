import { config } from '@/config/config';
import { HttpClient } from './apiClient';

export const useApi = () => {
    const api = new HttpClient(config.API_URL);
    return { api };
};

// for loader/server-side usage
export const createApi = () => {
    return new HttpClient(config.API_URL);
};
