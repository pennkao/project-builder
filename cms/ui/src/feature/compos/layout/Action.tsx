import { Children, ReactNode } from 'react';
const Action = ({ children, className }: { children: ReactNode; className?: string }) => {
    return <div className={`flex justify-between gap-2 px-5 py-4 border-b border-gray-200 sm:flex-row sm:items-center dark:border-gray-800 ${className || ''}`}>{children}</div>;
};
export default Action;

const ActionLeft = ({ children, className }: { children?: ReactNode; className?: string }) => {
    return <div className={`flex items-center justify-start gap-2 ${className || ''}`}>{children}</div>;
};
const ActionRight = ({ children, className }: { children?: ReactNode; className?: string }) => {
    return <div className={`w-auto flex items-center justify-end gap-2 ${className || ''}`}>{children}</div>;
};
const ActionBatch = ({ isBatchMode, children, className }: { isBatchMode: boolean; children: ReactNode; className?: string }) => {
    const arrayChildren = Children.toArray(children);

    const defaultChildren = arrayChildren[0];
    const batchChildren = arrayChildren[1];

    return <div className={className}>{isBatchMode ? batchChildren : defaultChildren}</div>;
};
export { ActionBatch, ActionLeft, ActionRight };
