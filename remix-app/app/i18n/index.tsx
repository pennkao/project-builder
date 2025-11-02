// app/i18n/index.tsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import zh from './zh.json';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        zh: { translation: zh },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh'],

    detection: {
        // 语言检测优先顺序
        order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
        // 检测使用的 key
        lookupCookie: 'lang',
        lookupLocalStorage: 'lang',
        // 当检测不到时是否缓存
        caches: ['cookie'],
        cookieMinutes: 60 * 24 * 365, // 1年
    },

    interpolation: { escapeValue: false },
});

export default i18n;
