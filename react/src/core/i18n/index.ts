/*index.ts*/
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import zh from './locales/zh.json';

// 🌍 初始化
i18n
    // .use(HttpBackend)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: { translation: en },
            zh: { translation: zh },
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json', // 加载路径
        },
        detection: {
            // 👇 优先顺序：localStorage > HTML 标签 > 浏览器 > 默认
            order: ['localStorage', 'htmlTag', 'navigator'],
            caches: ['localStorage'], // 👈 自动记忆到 localStorage
        },
        // lng: localStorage.getItem('google_lang') || 'en',
        fallbackLng: 'en', // 找不到时回退
        interpolation: { escapeValue: false },
    });

export default i18n;
