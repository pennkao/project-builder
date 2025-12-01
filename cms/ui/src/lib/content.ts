import { config } from '@/config/config';
export function decontent(html: string, baseUrl: string = config.IMAGE_URL) {
    if (!html) return '';
    // const escaped = config.CONTENT_REPLACE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 转义特殊字符
    // const regex = new RegExp(escaped, 'g'); // g = global
    // return html.replace(regex, baseUrl);
    return html.split(config.CONTENT_REPLACE).join(baseUrl);
}

export function encontent(html: string, prefix = config.CONTENT_PREFIX) {
    if (!html) return '';
    const regex = new RegExp(`https?:\\/\\/[^\\/]+${prefix.replace(/\//g, '\\/')}([^"'>\\s]+)`, 'g');
    const replace = config.CONTENT_REPLACE + '$1';
    return html.replace(regex, (_, filename) => `${replace.replace('$1', filename)}`);
}
