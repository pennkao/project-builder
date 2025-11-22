import { ReactNode } from 'react';
const Action = ({ children, className }: { children: ReactNode; className?: string }) => {
    return <div className={`flex justify-between gap-2 px-5 py-4 border-b border-gray-200 sm:flex-row sm:items-center dark:border-gray-800 ${className || ''}`}>{children}</div>;
};
export default Action;
