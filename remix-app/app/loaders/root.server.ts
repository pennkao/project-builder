// app/loaders/root.server.ts
import { initServerI18n } from '@/i18n/i18n.server';

export async function loader({ request }: { request: Request }) {
    const cookieHeader = request.headers.get('cookie') || '';

    const match = cookieHeader.match(/lang=(\w+)/);
    let lang = match?.[1];
    if (!lang) {
        const acceptLang = request.headers.get('accept-language') ?? 'en';
        lang = acceptLang.includes('zh') ? 'zh' : 'en';
    }
    if (!lang) {
        lang = 'en';
    }
    console.log('lang', lang, '555');
    const serverI18n = await initServerI18n(lang);

    return {
        lang,
        resources: serverI18n.services.resourceStore.data,
    };
}
