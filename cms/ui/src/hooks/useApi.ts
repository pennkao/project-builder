import useSWR, { SWRConfiguration } from 'swr';

// 通用 fetcher
async function fetcher<T>(api: string, config: RequestInit): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('--vxtn:token') : null;

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(config.headers || {}),
    };

    const res = await fetch(`http://localhost:8080/admin/api/${api}`, {
        ...config,
        headers,
        credentials: 'include',
    });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`HTTP Error ${res.status}: ${text}`);
    }

    return res.json() as Promise<T>;
}

// Go Response 类型
export interface GoResponse<T> {
    code: number;
    message?: string;
    data?: T;
}

// ✅ Hook
export function usePostApi<T = any>(
    api: string,
    swrOptions?: SWRConfiguration,
    useCache: boolean = false // 是否启用 SWR 缓存
) {
    // SWR key，可选缓存
    const key = useCache ? api : null;

    const { error, isValidating } = useSWR<GoResponse<T>>(
        key,
        ([api, params]: [string, any]) =>
            fetcher<GoResponse<T>>(api, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params),
            }),
        swrOptions
    );

    /**
     * refresh 请求函数
     * @param params 请求参数
     * @param callback 可选回调，成功后返回 data
     */
    const refresh = async (params?: any, callback?: (data: T) => void): Promise<T> => {
        try {
            // 直接调用 fetcher，绕过 key = null 不触发 SWR 的问题
            const res = await fetcher<GoResponse<T>>(api, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: params ? JSON.stringify(params) : '',
            });

            if (res.code !== 0) throw new Error(res.message || 'api error!');

            if (callback) callback(res.data as T); // 自动回调
            return res.data as T;
        } catch (err: any) {
            console.error('api error', err.message);
            throw err;
        }
    };

    return {
        loading: isValidating,
        error,
        refresh,
    };
}
