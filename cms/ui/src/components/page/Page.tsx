import { ReactNode } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
export default function Page({ children, pageTitle, showBackgroud }: { children: ReactNode; showBackgroud: boolean; pageTitle?: string; showBack?: boolean }) {
    const content = showBackgroud ? <div className="min-h-screen rounded-2xl border border-gray-200 bg-white  dark:border-gray-800 dark:bg-white/3 xl:px-0 xl:py-1">{children}</div> : <>{children}</>;

    return (
        <div>
            <PageMeta title={pageTitle || ''} description="" />
            <PageBreadcrumb pageTitle={pageTitle || ''} />
            {content}
        </div>
    );
}
