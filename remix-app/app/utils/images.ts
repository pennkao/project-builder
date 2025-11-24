const baseImageUrl = import.meta.env.VITE_APP_IMAGE_URL; // 'https://images.azlyrics.com/albums/';
export function isrc(src: string) {
    if (!src) {
        return undefined;
    }
    if (src.startsWith('http')) {
        return src;
    }
    return baseImageUrl + src;
}
