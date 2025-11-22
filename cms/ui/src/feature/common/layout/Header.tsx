import { ReactNode } from 'react';
export default function PageAction({ children, title, desc }: { children: ReactNode; title: string; desc?: string }) {
    const className = 'flex flex-col justify-between gap-5 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center dark:border-gray-800';
    return (
        <div className={className}>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{title}</h3>
                {desc && <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>}
            </div>
            <div className="flex gap-3">{children}</div>
        </div>
    );
}
