import { config } from '@/config/config';
export function isrc(src: string) {
    if (src.startsWith('http')) {
        return src;
    }
    if (src.startsWith('blob:')) {
        return src;
    }
    return config.imageUrl + src;
}
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
