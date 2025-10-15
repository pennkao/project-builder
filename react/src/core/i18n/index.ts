/*index.ts*/
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zh from './locales/zh.json';

// 🌍 初始化
i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        zh: { translation: zh },
    },
    lng: 'zh', // 默认语言
    fallbackLng: 'en', // 找不到时回退
    interpolation: { escapeValue: false },
});

export default i18n;
