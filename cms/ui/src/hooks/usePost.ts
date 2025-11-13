// usePostApi.ts
import { config } from '@/config/config';
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
type BatchPostOptions = PostOptions & {
    api: string;
};
const defaultBaseUrl = config.apiBaseUrl;

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

export function useBatchPost() {
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    /**
     * 单接口 POST
     */
    const doPost = async <T = any>(api: string, { params, querys }: PostOptions): Promise<T | null> => {
        setError(null);
        setLoading(true);

        try {
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

            return json.data || null;
        } catch (err: any) {
            console.error('❌ API error:', err.message);
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const Params = (api: string, PostOptions: PostOptions) => {
        return {
            api,
            ...PostOptions,
        };
    };
    /**
     * 批量接口请求
     * 第一个接口必须成功才继续执行
     */
    const doBatchPost = async <T = any>(options: BatchPostOptions[]): Promise<(T | null)[] | null> => {
        if (!options || !options.length) return null;

        // 先执行第一个接口
        const firstResult = await doPost<T>(options[0].api, options[0]);
        if (!firstResult) return null; // 第一个失败，终止

        // 执行剩余接口
        const results: (T | null)[] = [];
        for (const opt of options.slice(1)) {
            const result = await doPost<T>(opt.api, opt);
            results.push(result);
        }

        // 返回所有结果，第一个接口结果可单独返回或合并
        return [firstResult, ...results];
    };

    return { doBatchPost, Params, loading, error };
}
