// src/config/shared-config.ts

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
export const CDN_URL = import.meta.env.VITE_CDN_URL ?? 'http://localhost:3000/static';
export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'MyApp';

// 可判断当前环境
export const ENV = import.meta.env.MODE; // 'development' | 'production' | 'test'
export const IS_PROD = ENV === 'production';
export const IS_DEV = ENV === 'development';
export const IS_TEST = ENV === 'test';

export const config = {
    APP_NAME: import.meta.env.VITE_APP_NAME ?? 'MyApp1111',
    DOMAIN: 'localhost',
    PORT: '8080',

    ENV: import.meta.env.MODE, // 'development' | 'production' | 'test'
    IS_PROD: import.meta.env.MODE === 'production',
    IS_DEV: import.meta.env.MODE === 'development',

    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    CDN_URL: import.meta.env.VITE_CDN_URL || 'http://localhost:3000/static',
    IMAGE_URL: import.meta.env.VITE_IMAGE_URL || '/public/images/',
    WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:8080/wss/chat',
    CONTENT_PREFIX: import.meta.env.VITE_CONTENT_PREFIX || '/public/images/',
    CONTENT_REPLACE: import.meta.env.VITE_CONTENT_REPLACE || '{{@#base_url#@}}',
    SEARCH_SITE: import.meta.env.VITE_SEARCH_SITE || 'http://localhost:8080',
    SEARCH_WORD: import.meta.env.VITE_SEARCH_KEYWORD || 'ABC', // 搜索关键词
    FallBacks: [
        'https://cdn1.example.com/', //
        'https://cdn2.example.com/',
        'https://cdn3.example.com/',
        'https://cdn4.example.com/',
        'http://localhost:5173',
    ],
};
