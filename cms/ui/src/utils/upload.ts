import { config } from '@/config/config';

export const doUpload = async (images: ImageItemType[], onChange?: (images: UploadResponseType[]) => void) => {
    if (images.length === 0) {
        // alert('没有图片要上传');
        return;
    }

    const form = new FormData();
    // return ;
    const filterd = images.filter((img) => img.file && img.file.size > 0 && img?.url?.length == 0);
    if (filterd.length == 0) {
        // alert('没有图片要上传');
        return;
    }
    filterd.forEach((img, idx) => {
        form.append('images[]', img.file || new Blob([], { type: 'image/png' }), img.file?.name || `image_${idx}`);
    });

    try {
        const res = await fetch(config.apiBaseUrl + 'file/upload', { method: 'POST', body: form });
        if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
        const data = await res.json(); // 假设 data.data 是数组

        // 映射后端返回 URL
        if (data && data.data) onChange?.(data.data);
        // alert('上传成功');
    } catch (err) {
        console.error(err);
        alert('上传失败，请查看控制台');
    }
};
