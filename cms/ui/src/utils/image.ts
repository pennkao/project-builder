import { config } from '@/config/config';
export function isrc(src: string) {
    if (src[0] == '/images') {
        return config.imageUrl + src;
    }
    if (src.startsWith('http')) {
        
        return src;
    }
    if (src.startsWith('blob:')) {
        return src;
    }
    return config.imageUrl + '/images/' + src;
}
