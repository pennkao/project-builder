import { ReactNode } from 'react';
const Content = ({ children, className }: { children: ReactNode; className?: string }) => {
    return <div className={className || ''}>{children}</div>;
};
export default Content;
