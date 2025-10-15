// @ts-nocheck 忽略类型检查，防止“找不到类型定义”等无关错误
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: { alias: { '@': resolve(__dirname, 'src') } },
});
