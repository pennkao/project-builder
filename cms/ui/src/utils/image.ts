export const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

export function makeLocalImage(file: File, preview: string): ImageItemType {
    const imageItem: ImageItemType = {
        id: generateId(),
        fileName: file.name,
        status: 'local',
        url: '',
        preview: preview,
        file: file, // 本地文件（File对象），网络图片可以不填
        fileType: file.type,
    };

    return imageItem;
}

export function makeNetImage(url: string, fileName: string): ImageItemType {
    const imageItem: ImageItemType = {
        id: generateId(),
        fileName: fileName,
        status: 'upLoaded',
        url: url,
        preview: '',
        file: null, // 本地文件（File对象），网络图片可以不填
        fileType: '',
    };

    return imageItem;
}

export const getImageInfo = async (file: File | null) => {
    if (!file) return null;
    const img = new Image();
    const url = URL.createObjectURL(file);

    const dimensions = await new Promise<{ width: number; height: number }>((res, rej) => {
        img.onload = () => res({ width: img.width, height: img.height });
        img.onerror = rej;
        img.src = url;
    });

    return {
        file,
        width: dimensions.width,
        height: dimensions.height,
        size: file.size,
    };
};
