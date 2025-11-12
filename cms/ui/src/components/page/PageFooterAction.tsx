import { ReactNode } from 'react';
const PageFooterAction = ({ children, className }: { children: ReactNode; className?: string }) => {
    return <div className={`flex items-center  justify-between px-5 py-4  border-t border-gray-200 ${className || ''}`}>{children}</div>;
};
export default PageFooterAction;
