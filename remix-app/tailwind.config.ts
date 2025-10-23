import type { Config } from 'tailwindcss';
// import colors from './app/theme/colors';

export default {
    content: [
        './app/**/*.{js,ts,jsx,tsx}', // 必须包含 JSX/TSX
        './app/**/*.css', // 如果有全局 CSS 或 module CSS
    ],
    prefix: '', // 6️⃣ 类名前缀（可选）引用的适合需要加上 写法 spm:px-4
    important: false, // 7️⃣ 全局 !important
    // darkMode: 'class', // 5️⃣ 暗色模式配置
    theme: {
        extend: {
            colors: {
                // ...colors,
            },
            borderColor: {
                // // 只影响 border-* 类
                // DEFAULT: 'var(--color-border)',
            },
            backgroundColor: {
                // 只影响 bg-* 类名
                // DEFAULT: 'var(--color-bg)',
            },
            textColor: {
                // DEFAULT: 'var(--color-text)',
            },
        },
    },
    plugins: [],
} satisfies Config;
