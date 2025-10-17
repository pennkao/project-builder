import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';
// import ssr from 'vite-plugin-ssr/plugin';

import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react(),
        // ssr(),
        tailwindcss(),
        viteMockServe({
            mockPath: 'mock', // mock 文件目录
            logger: true, // 打印日志
        }),
    ],
    resolve: { alias: { '@': resolve(__dirname, 'src') } },

    // build: {
    //     ssr: 'render-snippets.vite.ts', // 指定 SSR 构建入口
    //     outDir: 'dist',
    // },
});
