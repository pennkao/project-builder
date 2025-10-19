import type { Config } from 'tailwindcss';

const THEME = 'orange'; // 编译期选择主题
const themes = {
    orange: {
        primary: '#0000FF',
        'primary-hover': '#ea580c',
        secondary: '#fbbf24',
        accent: '#fef3c7',
        background: '#ffffff',
        text: '#1f2937',
        'secondary-text': '#4b5563',
        border: '#fcd34d',
        link: '#ea580c',
        prose: {
            text: '#1f2937',
            headings: '#f97316',
            links: '#ea580c',
        },
    },
    gray: {
        primary: '#6b7280',
        'primary-hover': '#4b5563',
        secondary: '#d1d5db',
        accent: '#f9fafb',
        background: '#f3f4f6',
        text: '#111827',
        'secondary-text': '#374151',
        border: '#d1d5db',
        link: '#6b7280',
        prose: {
            text: '#111827',
            headings: '#6b7280',
            links: '#6b7280',
        },
    },
};

const themeColors = themes[THEME];

export default {
    content: ['./app/**/*.{js,ts,jsx,tsx}'], // 1️⃣ 扫描文件路径（v4 已自动推断）
    prefix: '', // 6️⃣ 类名前缀（可选）引用的适合需要加上 写法 spm:px-4
    important: false, // 7️⃣ 全局 !important
    // darkMode: 'class', // 5️⃣ 暗色模式配置
    theme: {
        extend: {
            extend: {
                colors: {
                    // ...themeColors,
                },
                borderColor: {
                    // DEFAULT: 'var(--color-border)',
                },
                backgroundColor: {
                    // DEFAULT: 'var(--color-bg)',
                },
                textColor: {
                    // DEFAULT: 'var(--color-text)',
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
