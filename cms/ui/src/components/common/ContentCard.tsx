import { ReactNode } from 'react';

const ContentCard = ({ children, className }: { children: ReactNode; className?: string }) => {
    return <div className={`rounded-xl border border-gray-200 p-4 bg-white dark:border-gray-800 dark:bg-white/3 ${className}`}>{children}</div>;
};

export default ContentCard;
