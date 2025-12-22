import { config } from '@/config/config';
export function SRC(src: string) {
    if (!src) return '';

    const isAbsolute = src.startsWith('http') || src.startsWith('blob:') || src.startsWith('data:image');

    // if (!isLocal) {
    //     return isAbsolute ? src : 'https://img.shopifycdn.store/images/' + src;
    // } else {
    //     return isAbsolute ? src : config.IMAGE_URL + src;
    // }

    return isAbsolute ? src : config.IMAGE_URL + src;
}
