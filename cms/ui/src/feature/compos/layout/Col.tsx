import { ReactNode } from 'react';

// const Footer = ({ children, className }: { children: ReactNode; className?: string }) => {
//     return <div className={`flex items-center  justify-between px-5 py-4 pr-10 border-t border-gray-200 ${className || ''}`}>{children}</div>;
// };
const Col = ({ children, className = 'space-y-6' }: { children: ReactNode; className?: string }) => {
    return <div className={className || ''}>{children}</div>;
};
export default Col;
