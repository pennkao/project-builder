const makeParams = (api: string, page?: number, id?: number) => {
    let url = `http://localhost:8080/api/${api}`;

    if (id && id !== undefined) {
        url += `/${id}`;
    }
    if (page && page !== undefined) {
        url += `?page=${page}`;
    }

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-Time': Date.now().toString(),
        },
        credentials: 'include',
    };

    return [url, params];
};

export const doList = async <T = any>(api: string, page: number, callback?: (data?: T) => void): Promise<T> => {
    const [url, params] = makeParams(api, page, undefined);

    try {
        const response = await fetch(url as string, params as RequestInit);
        if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const json = (await response.json()) as { code: number; data?: T; message: string };

        if (json.code !== 0) {
            throw new Error(json.message || 'api error!');
        }

        if (callback) {
            if (json.data) {
                callback(json.data);
            } else {
                callback();
            }
        }
        return json.data as T;
    } catch (error) {
        console.log(error);
    } finally {
    }
    return null as T;
};

export const doGet = async <T = any>(api: string, id: number, callback?: (data?: T) => void): Promise<T> => {
    const [url, params] = makeParams(api, undefined, id);
    try {
        const response = await fetch(url as string, params as RequestInit);
        if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const json = (await response.json()) as { code: number; data?: T; message: string };

        if (json.code !== 0) {
            throw new Error(json.message || 'api error!');
        }

        if (callback) {
            if (json.data) {
                callback(json.data);
            } else {
                callback();
            }
        }
        return json.data as T;
    } catch (error) {
        console.log(error);
    } finally {
    }
    return null as T;
};
