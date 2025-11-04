// app/root.tsx
import { loader } from '@/loaders/root.server'; // ✅ 只引入函数
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router';

import i18n from './i18n';
import styles from './main.css?url';
export { loader }; // ✅ 让 Remix 识别 loader

export default function App() {
    const { lang, resources } = useLoaderData<typeof loader>();
    const [ready, setReady] = useState(false); // 确保 i18n 初始化完成

    useEffect(() => {
        // 初始化 i18n 资源
        i18n.services.resourceStore.data = resources;

        // 异步 changeLanguage 保证不会在 render 阶段触发更新
        i18n.changeLanguage(lang).then(() => {
            setReady(true); // i18n 准备好后才渲染 Outlet
        });

        // 设置文档语言和 cookie
        document.documentElement.lang = lang;
        const clientLang = Intl.NumberFormat().resolvedOptions().locale;
        document.cookie = `--google:vtx:lang=${clientLang}; path=/; max-age=${60 * 60 * 24 * 365}`;
        if (typeof window === 'undefined') return; // SSR 时跳过
    }, [lang, resources]);

    if (!ready) {
        // i18n 还没准备好，避免渲染 Outlet 导致错误
        return null;
    }

    return (
        <I18nextProvider i18n={i18n}>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
        </I18nextProvider>
    );
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href={styles} />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
