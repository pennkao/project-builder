const baseUrl = import.meta.env.VITE_APP_API_URL;
export const usePost = async <T>(api: string, callback: (data: T) => void) => {
    const res = await fetch(`${baseUrl}/${api}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (res.ok) {
        const result = await res.json();
        if (result && result.data) {
            callback(result.data as T);
        }
    } else {
        console.error('CORS or Network Error', res);
        const errorText = await res.text();
        console.error('Error Text:', errorText);
    }
};
