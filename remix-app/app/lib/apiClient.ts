// HttpClient.ts
export class HttpClient {
    private baseURL: string;
    private queryParams: Record<string, any> = {};
    private options: RequestInit = {};
    private timeout = 15000;

    constructor(baseURL = '') {
        this.baseURL = baseURL;
    }

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

    private buildUrl(url: string) {
        const q = new URLSearchParams(this.queryParams).toString();
        return q ? `${this.baseURL}${url}?${q}` : `${this.baseURL}${url}`;
    }

    private createTimeout() {
        return new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Request timeout')), this.timeout));
    }

    private async request<T>(method: string, url: string, body?: any): Promise<T> {
        const finalUrl = this.buildUrl(url);
        const finalOptions: RequestInit = { method, ...this.options };

        if (body instanceof FormData) {
            finalOptions.body = body;
        } else if (body !== undefined) {
            finalOptions.body = JSON.stringify(body);
            finalOptions.headers = { ...(finalOptions.headers || {}), 'Content-Type': 'application/json', 'X-Requested-Time': Date.now().toString() };
        }

        const response = await Promise.race([fetch(finalUrl, finalOptions), this.createTimeout()]);
        // const data = await (response as Response).json();
        const contentType = response.headers.get('content-type');

        let data: any;

        if (contentType?.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        return data as T;
    }

    // ------------------------------
    // GET / POST 封装
    // ------------------------------
    Get<T = any>(url: string, body?: any) {
        const promise = this.request<T>('POST', url, body);
        return Object.assign(promise, {
            callback: (fn: (data: T | null) => void, skipNull = false) => {
                promise.then((res) => {
                    if (skipNull && res == null) return;
                    fn(res ?? null);
                });
                return promise;
            },
        });
    }

    Post<T = any>(url: string, body?: any) {
        const promise = this.request<T>('POST', url, body);
        return Object.assign(promise, {
            callback: (fn: (data: T | null) => void) => {
                promise.then((res) => fn(res ?? null));
                return promise;
            },
        });
    }

    doGet<T = any>(id: number, target: string) {
        return this.Get<T>(`${target}/${id}`);
    }
}

// ------------------------------
// 实例
// ------------------------------
// export const api = new HttpClient('https://api.example.com/');
