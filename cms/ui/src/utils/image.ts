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

// interface ImageItemType {
//     id: string; // 唯一标识
//     status: ImageStatusType; // 上传状态
//     url?: string; // 网络图片地址（上传后）
//     preview?: string; // 预览图（本地 file 创建的 ObjectURL 或网络缩略图）
//     file?: File; // 本地文件（File对象），网络图片可以不填
//     fileType?: string; // 文件类型，如 image/png
// }
