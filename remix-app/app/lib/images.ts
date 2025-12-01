import { config } from '@/config/config';

export function SRC(src: string): string {
    if (!src) return '';

    const isAbsolute = src.startsWith('http') || src.startsWith('blob:') || src.startsWith('data:image');

    return isAbsolute ? src : config.IMAGE_URL + src;
}
