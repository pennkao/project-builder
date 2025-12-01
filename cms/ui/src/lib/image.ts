import { config } from '@/config/config';
export function SRC(src: string) {
    if (src.startsWith('http')) {
        return src;
    }
    if (src.startsWith('blob:')) {
        return src;
    }
    if (src.startsWith('data:image')) {
        return src;
    }
    return config.IMAGE_URL + src;
}
