import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';

import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react(),
        viteMockServe({
            mockPath: 'mock', // mock 文件目录
            logger: true, // 打印日志
            }),
    ],
    resolve: { alias: { '@': resolve(__dirname, 'src') } },
});
