import { config } from '@/config/config';

export function SRC(src?: string | null) {
    if (!src) return undefined; // 返回 undefined

    const isAbsolute = src.startsWith('http') || src.startsWith('blob:') || src.startsWith('data:image');

    return isAbsolute ? src : config.IMAGE_URL + src;
}
