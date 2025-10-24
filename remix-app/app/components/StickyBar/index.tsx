// components/StickyBar.tsx
import { useElementVisibility } from '@/hooks/useElementVisibility';
import React from 'react';

const StickyBar = React.memo(({ ref, children, className = '' }: StickyBarProps) => {
    const [isShow, setisShow] = useElementVisibility(ref);

    return (
        <div
            className={`
    fixed bottom-0 left-0 right-0
    mx-auto w-full max-w-4xl
    pb-safe z-50 bg-white/0 ${className}
    ${!isShow ? 'block' : 'hidden'}
  `}
        >
            <div>{children}</div>
        </div>
    );
});

export default StickyBar;
