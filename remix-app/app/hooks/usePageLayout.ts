import { useEffect, useState } from 'react';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface PageLayout {
    viewportHeight: number;
    viewportWidth: number;
    mainHeight: number;
    mainOffsetTop: number;
    mainOffsetBottom: number;
    paddingBottom: number;
    breakpoint: Breakpoint;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

export default function usePageLayout(mainSelector = 'main') {
    const [layout, setLayout] = useState<PageLayout>({
        viewportHeight: 0,
        viewportWidth: 0,
        mainHeight: 0,
        mainOffsetTop: 0,
        mainOffsetBottom: 0,
        paddingBottom: 0,
        breakpoint: 'sm',
        isMobile: true,
        isTablet: false,
        isDesktop: false,
    });

    // 获取断点
    const getBreakpoint = (width: number): Breakpoint => {
        if (width >= 1536) return '2xl';
        if (width >= 1280) return 'xl';
        if (width >= 1024) return 'lg';
        if (width >= 768) return 'md';
        return 'sm';
    };

    useEffect(() => {
        if (typeof window === 'undefined') return; // SSR 安全

        const updateLayout = () => {
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            const mainEl = document.querySelector(mainSelector) as HTMLElement | null;
            const mainHeight = mainEl?.offsetHeight || 0;
            const mainOffsetTop = mainEl?.getBoundingClientRect().top || 0;
            const mainOffsetBottom = viewportHeight - (mainEl?.getBoundingClientRect().bottom || 0);

            const breakpoint = getBreakpoint(viewportWidth);
            const isMobile = breakpoint === 'sm';
            const isTablet = breakpoint === 'md';
            const isDesktop = ['lg', 'xl', '2xl'].includes(breakpoint);

            const paddingBottom = Math.max(viewportHeight - mainHeight, 0);
            console.log('paddingBottom', {
                viewportHeight,
                viewportWidth,
                mainHeight,
                mainOffsetTop,
                mainOffsetBottom,
                paddingBottom,
                breakpoint,
                isMobile,
                isTablet,
                isDesktop,
            });
            setLayout({
                viewportHeight,
                viewportWidth,
                mainHeight,
                mainOffsetTop,
                mainOffsetBottom,
                paddingBottom,
                breakpoint,
                isMobile,
                isTablet,
                isDesktop,
            });
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, [mainSelector]);

    return layout;
}


// | 字段                 | 说明                                   |
// | ------------------ | ------------------------------------ |
// | `viewportHeight`   | 可视区域高度（window.innerHeight）           |
// | `viewportWidth`    | 可视区域宽度（window.innerWidth）            |
// | `mainHeight`       | 指定主容器高度，方便动态计算 padding 或撑开页面         |
// | `mainOffsetTop`    | 主容器距离视口顶部                            |
// | `mainOffsetBottom` | 主容器距离视口底部                            |
// | `paddingBottom`    | 根据视口和内容自动计算的底部 padding，保证内容不被裁切      |
// | `breakpoint`       | 当前 Tailwind 响应式断点（sm / md / lg / xl） |
// | `isMobile`         | 是否移动端（viewportWidth < 768px）         |
// | `isTablet`         | 是否平板（viewportWidth >= 768 && <1024）  |
// | `isDesktop`        | 是否桌面（viewportWidth >= 1024）          |
