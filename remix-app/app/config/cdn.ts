export const Cdn_Config = {
    devBase: 'http://localhost:5173',
    defaultBase: 'http://localhost:5173',
    siteBase: 'http://localhost:5173/app/assets/images/',
    fallbacks: [
        'https://cdn1.example.com/', //
        'https://cdn2.example.com/',
        'https://cdn3.example.com/',
        'https://cdn4.example.com/',
        'http://localhost:5173',
    ],
    timeout: 1000,
    placeholderClass: 'bg-gray-200 animate-pulse',
    defaultPlaceholder: 'placeholder.svg', // 全局占位图
};

export const Cache_Key = '__cache:cdn_base';
