// hooks/useElementVisibility.ts
import { useEffect, useState } from 'react';

export const useElementVisibility = (elementRef: React.RefObject<HTMLElement | null>) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!elementRef) return;
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [elementRef]);

    return [isVisible, setIsVisible] as const;
};
