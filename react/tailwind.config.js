// tailwind.config.js
module.exports = {
    // 1. 必须配置：指定需要扫描的文件
    content: [
        './src/**/*.{css}',
        './public/index.html',
        // 添加所有包含Tailwind类名的文件路径
    ],

    // 2. 主题配置（影响类名排序分组）
    theme: {
        // 2.1 扩展默认主题
        extend: {
            colors: {
                primary: '#3b82f6',
            },
        },

        // 2.2 自定义排序分组（可选）
        order: {
            layouts: ['container', 'display'], // 布局类优先级
            typography: ['font', 'text'], // 文字类优先级
        },
    },

    // 3. 插件配置（影响类名处理）
    plugins: [
        require('@tailwindcss/forms'), // 表单类名处理
        require('@tailwindcss/typography'), // 排版类名处理
    ],

    // 4. 核心功能控制（可选）
    corePlugins: {
        float: false, // 禁用不使用的工具类
    },
};
    