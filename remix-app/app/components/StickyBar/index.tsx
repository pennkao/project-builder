// components/StickyBar.tsx
import React from 'react';

const StickyBar = React.memo(({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={`fixed w-full bottom-0 pb-safe left-0 z-50 bg-gray-100 border-t border-gray-200 ${className}`}>
            <div className="">{children}</div>
        </div>
    );
});

export default StickyBar;
