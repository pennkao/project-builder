import { ReactNode } from 'react';
import { PageBreadcrumb, PageMeta } from './compos';
export default function Page({ children, title, showBackgroud }: { children: ReactNode; showBackgroud: boolean; title?: string; showBack?: boolean }) {
    const content = showBackgroud ? <div className="min-h-screen rounded-2xl border border-gray-200 bg-white  dark:border-gray-800 dark:bg-white/3 xl:px-0 xl:py-1">{children}</div> : <>{children}</>;

    return (
        <div>
            <PageMeta title={title || ''} description="" />
            <PageBreadcrumb pageTitle={title || ''} />
            {content}
        </div>
    );
}
