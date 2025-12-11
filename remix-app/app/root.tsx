// app/root.tsx
import Skeleton from '@/components/Skeleton';
import { loader } from '@/loaders/root.server'; // ✅ 只引入函数
import NotFound from '@/pages/NotFound';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Outlet, Scripts, ScrollRestoration, useLoaderData, useLocation, useNavigate, useRouteError } from 'react-router';
import { Keys } from './config/keys';
import i18n from './i18n';
import styles from './main.css?url';
export { loader }; // ✅ 让 Remix 识别 loader

export default function App() {
    const { lang, resources } = useLoaderData<typeof loader>();
    const [ready, setReady] = useState(false); // 确保 i18n 初始化完成
    const location = useLocation();

    useEffect(() => {
        // 初始化 i18n 资源
        i18n.services.resourceStore.data = resources;

        // 异步 changeLanguage 保证不会在 render 阶段触发更新
        i18n.changeLanguage(lang).then(() => {
            setReady(true); // i18n 准备好后才渲染 Outlet
        });

        // 设置文档语言和 cookie
        document.documentElement.lang = lang;
        // const clientLang = Intl.NumberFormat().resolvedOptions().locale;
        const clientLang = 'en';
        document.cookie = `${Keys.Lang}=${clientLang}; path=/; max-age=${60 * 60 * 24 * 365}`;
        if (typeof window === 'undefined') return; // SSR 时跳过
    }, [lang, resources]);

    if (!ready) {
        // i18n 还没准备好，避免渲染 Outlet 导致错误
        if (location.pathname === '/') {
            return (
                <div className="space-y-1">
                    <Skeleton className="w-full h-[84px]" />
                    <Skeleton className="w-full h-[170px]" />
                    <div className="grid grid-cols-2 p-2 gap-x-1 gap-y-25">
                        <Skeleton className="w-[180px] h-[200px] rounded-md" />
                        <Skeleton className="w-[180px] h-[200px] rounded-md" />
                        <Skeleton className="w-[180px] h-[200px] rounded-md" />
                        <Skeleton className="w-[180px] h-[200px] rounded-md" />
                    </div>
                </div>
            );
        }
        if (location.pathname.startsWith('/products/')) {
            return (
                <div className="space-y-1 p-1">
                    <Skeleton className="w-full h-[384px] rounded-md" />
                    <div className="w-full h-[64px] px-5 flex justify-center gap-2">
                        <Skeleton className="w-[64px] h-[64px] rounded-md" />
                        <Skeleton className="w-[64px] h-[64px] rounded-md" />
                        <Skeleton className="w-[64px] h-[64px] rounded-md" />
                        <Skeleton className="w-[64px] h-[64px] rounded-md" />
                    </div>

                    <Skeleton className="w-full h-[64px] rounded-md" />
                    <Skeleton className="w-full h-[73px] rounded-md" />
                    <Skeleton className="w-full h-[67px] rounded-md" />
                    <Skeleton className="w-full h-[40px] rounded-md" />
                </div>
            );
        }
        return <Skeleton className="w-full h-full" />;
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

export function ErrorBoundary1() {
    const navigate = useNavigate();
    const error = useRouteError();

    useEffect(() => {
        // 延迟跳转可以解决 iOS Safari 闪烁
        const timer = setTimeout(() => {
            navigate('/error');
        }, 50);

        return () => clearTimeout(timer);
    }, [navigate, error]);

    // 渲染占位
    return <div></div>;
}
interface Error404 {
    status: number;
    statusText: string;
    internal: boolean;
    data: string;
}

export function ErrorBoundary() {
    const error = useRouteError() as Error404;
    console.error('Route error:', error);
    return <NotFound />;
}

export function HydrateFallback() {
    return (
        <div id="loading-splash">
            <div id="loading-splash-spinner" />
            <p>Loading, please wait...</p>
        </div>
    );
}
