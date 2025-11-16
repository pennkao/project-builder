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
type BatchPostOptions<T = any> = {
    callback?: (data: T) => void; // ← 必须加上
    options: PostOptions;
    api: string;
};

interface DoPostParams<T = any> {
    params?: Record<string, any> | null;
    querys?: Record<string, any> | null;
    callback?: (data: T) => void;
}

const defaultBaseUrl = config.apiBaseUrl;

/**
 * 通用 POST Hook
 * - 固定使用 POST
 * - 支持分页 query (?page=1&size=10)
 */
export function usePost<T = any>(api: string) {
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    const Params = (options: PostOptions, callback?: (data: T) => void) => {
        return {
            options: { params: options.params, query: options.querys },
            callback,
        };
    };
    /**
     * 发起 POST 请求
     * @param params POST body
     * @param querys URL 查询参数（如 { page: 1, size: 10 }）
     * @param callback 成功时返回 data
     */
    const doPost = async ({ params, querys, callback }: DoPostParams<T>) => {
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
            console.log({
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

    return { doPost, Params, loading, error };
}

export function useBatchPost() {
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    /**
     * 单接口 POST
     */
    const doPost = async <T = any>(api: string, options: PostOptions, callback?: (data: T) => void): Promise<T | null> => {
        setError(null);
        try {
            let url = `${defaultBaseUrl}${api}`;
            if (options.querys && Object.keys(options.querys).length) {
                url += '?' + new URLSearchParams(options.querys).toString();
            }

            const token = typeof window !== 'undefined' ? localStorage.getItem('--vxtn:token') : null;

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                credentials: 'include',
                body: options.params ? JSON.stringify(options.params) : '{}',
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
            return json.data || null;
        } catch (err: any) {
            console.error('❌ API error:', err.message);
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const Params = <T = any>(api: string, PostOptions: PostOptions, callback?: (data: T) => void) => {
        return {
            api,
            options: {
                params: PostOptions.params || {},
                querys: PostOptions.querys || {},
            },
            callback,
        };
    };
    /**
     * 批量接口请求
     * 第一个接口必须成功才继续执行
     */
    const doBatchPost = async <T = any>(options: BatchPostOptions[]): Promise<(T | null)[] | null> => {
        if (!options || !options.length) return null;
        setLoading(true);

        // 先执行第一个接口
        const firstResult = await doPost<T>(options[0].api, options[0].options, options[0].callback);
        if (!firstResult) return null; // 第一个失败，终止
        // if (options[0].callback) return options[0].callback(firstResult);
        // 执行剩余接口
        const results: (T | null)[] = [];
        for (const opt of options.slice(1)) {
            const result = await doPost<T>(opt.api, opt.options, opt.callback);
            // if (result && opt.callback) return opt.callback(result);
            results.push(result);
        }
        setLoading(false);
        // 返回所有结果，第一个接口结果可单独返回或合并
        return [firstResult, ...results];
    };

    return { doBatchPost, Params, loading, error };
}
