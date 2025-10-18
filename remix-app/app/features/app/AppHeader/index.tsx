import imgUrl from '@/assets/images/banner1.jpeg';

import { useEffect, useRef, useState } from 'react';

const AppHeader = ({ className }: { className?: string }) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        // 组件挂载后，读取 Header 的实际高度
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }

        // 可选：监听窗口 resize（比如横竖屏切换）
        const handleResize = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <header ref={headerRef} className="fixed top-0 left-1/2 transform -translate-x-1/2 z-10 bg-red-600 text-white p-3 flex flex-col max-w-4xl w-full">
                <div className="flex justify-between items-center mb-2 text-sm ">
                    <span>我的账户</span>
                    <span className="text-yellow-200 font-semibold">
                        可用积分: <strong className="text-white">396500</strong>
                    </span>
                </div>

                <div className="flex items-center space-x-5 justify-between">
                    <span className="font-medium text-xl text-white whitespace-nowrap">限时兑</span>

                    {/* 搜索框容器：加 relative！ */}
                    <div className="h-8 max-w-xs flex rounded-full bg-white overflow-hidden shadow-md relative">
                        {/* 输入框：pl-8 足够避开图标 */}
                        <input type="text" placeholder="水果手表" className="flex-1 px-3 pl-10 text-gray-700 focus:outline-none min-w-0" />

                        {/* SVG 放大镜：必须有 path！ */}
                        <svg className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>

                        <button className="bg-orange-500 text-white px-3 py-1.5 text-sm font-medium">搜索</button>
                    </div>

                    <span className="text-white text-lg whitespace-nowrap">🎧</span>
                </div>
            </header>
            <div style={{ height: `${headerHeight}px` }}></div>
            <section className={`relative w-full ${className}`}>
                {/* 占位元素：高度 = 宽度 * (高度/宽度) */}
                <div className="pb-[31.25%]">
                    {' '}
                    {/* 16:5 → 5/16 = 31.25% */}
                    <img src={imgUrl} alt="banner" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                </div>
            </section>
        </>
    );
};
export default AppHeader;
