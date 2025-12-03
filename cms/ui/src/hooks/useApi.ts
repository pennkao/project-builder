import { config } from '@/config/config';
import HttpClient from '@/lib/apiClient';

export const useApi = () => {
    const api = new HttpClient(config.API_URL);
    return { api };
};
