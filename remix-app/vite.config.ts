import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths"; // 👈 关键插件

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(), // 👈 关键插件
    tailwindcss(),
  ],
});
