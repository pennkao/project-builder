import react from '@vitejs/plugin-react';
// import { resolve } from "path";
import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                icon: true,
                // This will transform your SVG to a React component
                exportType: 'named',
                namedExport: 'ReactComponent',
            },
        }),
    ],
    resolve: { alias: { '@': resolve(__dirname, 'src') } },
    build: {
        outDir: path.resolve(__dirname, '../serv/dist'),
        emptyOutDir: true, // 构建前清空
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'), // 默认后台入口
                login: resolve(__dirname, 'login.html'), // 登录页入口
            },
        },
    },
});
