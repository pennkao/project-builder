export interface ApiResponse<T = any> {
    code: number;
    message: string;
    data: T;
}

type RequestInterceptor = (options: RequestInit, url: string) => { options?: RequestInit; url?: string } | void;

type ResponseInterceptor = (response: Response) => Promise<Response> | Response;

interface TokenConfig {
    getToken: () => Promise<string | null> | string | null;
    refreshToken: () => Promise<string | null>;
    onTokenRefresh: (newToken: string | null) => void;
    isTokenExpired: (resp: any) => boolean;
}
interface BatchRequest<T = any> {
    api: string;
    data?: any;
    callback?: (ok: boolean, data?: T) => void;
}
interface BatchResult<T = any> {
    ok: boolean;
    data?: T;
}
const defaultTokenConfig: TokenConfig = {
    getToken: () => localStorage.getItem('--vxtn:xtoken'),
    refreshToken: async () => {
        const res = await fetch('/api/refresh');
        const json = await res.json();
        const newToken = json.data?.token;
        if (newToken) localStorage.setItem('--vxtn:xtoken', newToken);
        return newToken ?? null;
    },

    isTokenExpired: (resp?: any) => resp.code === 401,

    onTokenRefresh: (token: string | null) => {
        console.log('token refreshed:', token);
    },
};

export class HttpClient {
    private baseURL: string;
    private queryParams: Record<string, any> = {};
    private options: RequestInit = {};
    private requestInterceptors: RequestInterceptor[] = [];
    private responseInterceptors: ResponseInterceptor[] = [];
    private timeout = 15000;

    private tokenConfig: TokenConfig = { ...defaultTokenConfig };
    private isRefreshing = false;
    private pendingRequests: Array<() => void> = [];
    constructor(baseURL = '') {
        this.baseURL = baseURL;
    }

    // 设置 Token 自动管理
    setTokenAuto(config?: Partial<TokenConfig>) {
        // merge: 覆盖传入的部分字段
        this.tokenConfig = { ...defaultTokenConfig, ...(config || {}) };
        return this;
    }

    // ------------------------------
    // 链式配置
    // ------------------------------

    query(params: Record<string, any>) {
        this.queryParams = { ...this.queryParams, ...params };
        return this;
    }

    set(opts: RequestInit) {
        this.options = { ...this.options, ...opts };
        return this;
    }

    setTimeout(ms: number) {
        this.timeout = ms;
        return this;
    }

    // ------------------------------
    // 拦截器
    // ------------------------------

    useRequest(interceptor: RequestInterceptor) {
        this.requestInterceptors.push(interceptor);
        return this;
    }

    useResponse(interceptor: ResponseInterceptor) {
        this.responseInterceptors.push(interceptor);
        return this;
    }

    // ------------------------------
    // URL 构建
    // ------------------------------

    private buildUrl(url: string) {
        const q = new URLSearchParams(this.queryParams).toString();
        return q ? `${this.baseURL}${url}?${q}` : `${this.baseURL}${url}`;
    }

    private createTimeout() {
        return new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Request timeout')), this.timeout));
    }

    // ------------------------------
    // 自动处理 Token
    // ------------------------------

    private async attachToken(options: RequestInit) {
        if (!this.tokenConfig?.getToken) return options;

        const token = await this.tokenConfig.getToken();
        if (!token) return options;

        return {
            ...options,
            headers: {
                ...(options.headers || {}),
                Authorization: `Bearer ${token}`,
            },
        };
    }

    private async handleTokenExpired<T>(responseJson: any, retry: () => Promise<T>): Promise<T> {
        if (!this.tokenConfig?.isTokenExpired?.(responseJson)) {
            return responseJson;
        }

        // 已经在刷新 → 挂起当前请求
        if (this.isRefreshing) {
            return new Promise<T>((resolve) => {
                this.pendingRequests.push(async () => resolve(await retry()));
            });
        }

        this.isRefreshing = true;

        try {
            const newToken = await this.tokenConfig.refreshToken?.();

            this.tokenConfig.onTokenRefresh?.(newToken || null);

            // 全部挂起的请求重新执行
            this.pendingRequests.forEach((cb) => cb());
            this.pendingRequests = [];

            return await retry();
        } finally {
            this.isRefreshing = false;
        }
    }

    // ------------------------------
    // 核心请求
    // ------------------------------
    private async requestRaw<T>(method: string, url: string, body?: any): Promise<ApiResponse<T>> {
        let finalUrl = this.buildUrl(url);
        let finalOptions: RequestInit = { method, ...this.options };

        if (body instanceof FormData) {
            finalOptions.body = body;
        } else if (body !== undefined) {
            finalOptions.headers = {
                ...(finalOptions.headers || {}),
                'Content-Type': 'application/json',
            };
            finalOptions.body = JSON.stringify(body);
        }

        finalOptions = await this.attachToken(finalOptions);

        for (const fn of this.requestInterceptors) {
            const modified = fn(finalOptions, finalUrl);
            if (modified) {
                finalOptions = modified.options || finalOptions;
                finalUrl = modified.url || finalUrl;
            }
        }

        const response = await Promise.race([fetch(finalUrl, finalOptions), this.createTimeout()]);

        let processed = response as Response;
        for (const fn of this.responseInterceptors) {
            processed = (await fn(processed)) || processed;
        }

        const json = await processed.json();
        return json as ApiResponse<T>;
    }

    private async request<T>(method: string, url: string, body?: any): Promise<T | null> {
        const retry = () => this.requestRaw<T>(method, url, body);

        let json = await this.requestRaw<T>(method, url, body);

        if (this.tokenConfig?.isTokenExpired?.(json)) {
            const handled = await this.handleTokenExpired(json, retry);
            json = handled;
        }

        // 清理
        this.queryParams = {};
        this.options = {};

        if (json.code !== 0) {
            console.log(json.message || 'Request failed');
            return null;
        }

        return json.data ? (json.data as T) : null;
    }

    // ------------------------------
    // HTTP Methods
    // ------------------------------
    Params<T = any>(api: string, data: any, callback?: (ok: boolean, data?: T) => void): BatchRequest<T> {
        return {
            api,
            data,
            callback,
        };
    }
    async batchPost(requests: BatchRequest<any>[]): Promise<BatchResult<any>[]> {
        const results: BatchResult<any>[] = [];

        for (const req of requests) {
            try {
                const res = await this.Post<any>(req.api, req.data).callback((ok, data) => {
                    if (ok) req.callback?.(ok, data);
                });

                // 判断成功与否
                const ok = res.code === 0;
                const data = res.data;

                results.push({ ok, data });

                if (!ok) {
                    // 第一个失败就停止后续
                    break;
                }
            } catch (error) {
                results.push({ ok: false });
                break;
            }
        }

        return results;
    }

    // posts<T = any>
    Post<T = any>(api: string, body?: any) {
        // 返回原始 ApiResponse<T>
        const promise = this.requestRaw<T>('POST', api, body);

        return Object.assign(promise, {
            /**
             * 回调参数：
             * - ret: boolean → 是否成功
             * - data?: T → 成功时可选数据
             */
            callback: (fn: (ret: boolean, data?: T) => void) => {
                promise.then((res) => {
                    // res 类型为 ApiResponse<T>
                    const ok = res.code === 0;
                    fn(ok, res.data);
                });
                return promise;
            },
        });
    }

    Get<T = any>(api: string, data?: any) {
        const promise = this.request<T>('POST', api, data);
        return Object.assign(promise, {
            callback: (fn: (res: T | null) => void, skipNull = false) => {
                promise.then((res) => {
                    if (skipNull && res == null) return;
                    fn(res ?? null);
                });
                return this;
            },
        });
    }

    Delete<T = any>(api: string, body?: any) {
        // 返回原始 ApiResponse<T>
        const promise = this.requestRaw<T>('POST', api, body);

        return Object.assign(promise, {
            callback: (fn: (ret: boolean) => void) => {
                promise.then((res) => {
                    // res 类型为 ApiResponse<T>
                    const ok = res.code === 0;
                    fn(ok);
                });
                return promise;
            },
        });
    }

    //=====================================================
    doDelete(ids: number[], target: string) {
        return this.Delete('delete', { ids: ids, target: target });
    }

    doList<T = any>(target: string, params?: any) {
        return this.Get<T>('list', { ...params, target: target });
    }

    doGet<T = any>(id: number, target: string) {
        return this.Get<T>('fetch', { id: id, target: target });
    }

    doUpdate<T = any>(id: number, target: string, field: string, value: number | string) {
        return this.Post<T>('updater', { id: id, target: target, dtype: field, value: value });
    }
}

export default HttpClient;
