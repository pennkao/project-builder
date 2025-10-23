import type { Config } from 'tailwindcss';

const theme = {
    // 正文文字与次要文字
    'slate-700': '#334155', // 正文文字
    'slate-500': '#64748b', // 次要文字

    // 边框
    'slate-200': '#e5e7eb', // 浅灰边框

    // 背景
    'slate-50': '#f8fafc', // 浅灰底

    // 状态色（语义色）
    'primary-500': '#3b82f6', // 主色 示例蓝色
    'primary-600': '#2563eb', // 主按钮默认颜色
    'primary-700': '#1d4ed8', // 主按钮悬停状态颜色

    'success-500': '#10b981', // 成功
    'warning-500': '#f59e0b', // 警告
    'error-500': '#ef4444', // 错误
    'info-500': '#3b82f6', // 信息

    // 更多自定义颜色...
};
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
