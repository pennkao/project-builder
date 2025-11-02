// import { type LoaderFunctionArgs } from '@remix-run/node';
// import { loader } from '@/loaders/root';
import { useEffect } from 'react';
// import { I18nextProvider } from 'react-i18next';
import { isRouteErrorResponse, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { Route } from './+types/root';
// import { initI18n } from './i18n';

import { detectFastestCdnOnce } from './utils/cdnChecker';

// import stylesHref from "./styles/global.module.css?url";
import styles from './main.css?url';

// ---------- [SSR 阶段：检测浏览器语言] ----------

export default function App1() {
//   const isClient = typeof window !== 'undefined';

  // SSR 阶段安全默认
//   const defaultLang = 'en';

  // 初始化 i18n SSR 阶段不会出错
//   const i18n = initI18n(defaultLang);

  useEffect(() => {
    // 浏览器端：获取用户语言
    const lang =
    //   localStorage.getItem('lang') || (navigator.language.startsWith('zh') ? 'zh' : 'en');
    
    // 初始化 i18n（覆盖 SSR 默认）
    // initI18n(lang);

    // CDN 检测
    detectFastestCdnOnce();
  }, []);

  return (
    // <I18nextProvider i18n={i18n}>
      <Outlet />
    // </I18nextProvider>
  );
}

// The Layout component is a special export for the root route.
// It acts as your document's "app shell" for all route components, HydrateFallback, and ErrorBoundary
// For more information, see https://reactrouter.com/explanation/special-files#layout-export
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

// The top most error boundary for the app, rendered when your app throws an error
// For more information, see https://reactrouter.com/start/framework/route-module#errorboundary
function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = 'Oops!';
    let details = 'An unexpected error occurred.';
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error';
        details = error.status === 404 ? 'The requested page could not be found.6666666666' : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main id="error-page">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre>
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}

// existing imports & exports

export function HydrateFallback() {
    return (
        <div id="loading-splash">
            <div id="loading-splash-spinner" />
            <p>Loading, please wait...</p>
        </div>
    );
}
