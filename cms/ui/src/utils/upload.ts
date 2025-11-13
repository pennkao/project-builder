import { config } from '@/config/config';

export const doUpload = async (images: ImageItemType[], setImages: (images: ImageItemType[]) => void) => {
    if (images.length === 0) {
        // alert('没有图片要上传');
        return;
    }

    const form = new FormData();
    // return ;
    images
        .filter((img) => img.file && img.file.size > 0 && img.url.length == 0)
        .forEach((img, idx) => {
            form.append('images[]', img.file || new Blob([], { type: 'image/png' }), img.file?.name || `image_${idx}`);
        });

    try {
        const res = await fetch(config.apiBaseUrl + 'file/upload', { method: 'POST', body: form });
        if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
        const data = await res.json(); // 假设 data.data 是数组

        // 映射后端返回 URL
        const uploadedImages: ImageItemType[] = images.map((img, idx) => ({
            ...img,
            url: data.data[idx]?.url || img.url, // 用后端返回的 URL
            file: null, // 上传成功可以清空 file
            preview: data.data[idx]?.url || img.preview,
        }));

        setImages(uploadedImages); // 更新状态
        // alert('上传成功');
    } catch (err) {
        console.error(err);
        alert('上传失败，请查看控制台');
    }
};
