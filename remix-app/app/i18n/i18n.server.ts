// app/i18n.server.ts
import { createInstance } from 'i18next';
import { resolve } from 'node:path';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import zh from './zh.json';

export async function initServerI18n(lng: string) {
    const i18n = createInstance();
    await i18n.use(initReactI18next).init({
        resources: {
            en: { translation: en },
            zh: { translation: zh },
        },
        lng,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        supportedLngs: ['en', 'zh'],
        backend: {
            loadPath: resolve('./app/i18n/{{lng}}.json'),
        },
    });

    return i18n;
}
