export const doUpload = async (url: string, images: ImageItemType[], dir: string, onSuccess?: (images: UploadResponseType[]) => void, onError?: (err: Error) => void) => {
    if (images.length === 0) {
        return;
    }
    const form = new FormData();
    images.forEach((img, idx) => {
        form.append('images[]', img.file || new Blob([], { type: 'image/png' }), img.file?.name || `image_${idx}`);
    });
    form.append('dir', dir);
    try {
        const res = await fetch(url, { method: 'POST', body: form });
        if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
        const data = await res.json(); // 假设 data.data 是数组
        if (!data || data.code !== 0 || !Array.isArray(data.data)) throw new Error('Invalid response format');
        if (!data || !data.data) throw new Error('Invalid response format');
        if (data && data.data) onSuccess?.(data.data);
    } catch (err) {
        onError?.(err as Error);
    }
};
