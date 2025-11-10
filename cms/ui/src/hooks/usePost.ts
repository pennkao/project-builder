// usePostApi.ts
import { useState } from 'react';

export interface GoResponse<T> {
    code: number;
    message?: string;
    data?: T;
}

interface PostOptions {
    params?: Record<string, any> | null;
    querys?: Record<string, any> | null;
}
const defaultBaseUrl = 'http://localhost:8080/admin/api/';

/**
 * 通用 POST Hook
 * - 固定使用 POST
 * - 支持分页 query (?page=1&size=10)
 */
export function usePost<T = any>(api: string) {
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    /**
     * 发起 POST 请求
     * @param params POST body
     * @param querys URL 查询参数（如 { page: 1, size: 10 }）
     * @param callback 成功时返回 data
     */
    const doPost = async ({ params, querys }: PostOptions, callback?: (data: T) => void) => {
        setError(null);
        setLoading(true);

        try {
            // 拼接完整 URL
            let url = `${defaultBaseUrl}${api}`;
            if (querys && Object.keys(querys).length) {
                url += '?' + new URLSearchParams(querys).toString();
            }

            const token = typeof window !== 'undefined' ? localStorage.getItem('--vxtn:token') : null;

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                credentials: 'include',
                body: params ? JSON.stringify(params) : '{}',
            });

            if (!res.ok) {
                const text = await res.text().catch(() => '');
                throw new Error(`HTTP ${res.status}: ${text}`);
            }

            const json = (await res.json()) as GoResponse<T>;

            if (json.code !== 0) {
                throw new Error(json.message || 'api error!');
            }

            if (callback && json.data) callback(json.data);
            return json.data;
        } catch (err: any) {
            console.error('❌ API error:', err.message);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { doPost, loading, error };
}
