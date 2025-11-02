import imgUrl1 from '@/assets/images/s1.jpg';
import imgUrl2 from '@/assets/images/s2.jpg';
import imgUrl3 from '@/assets/images/s3.jpg';
import imgUrl4 from '@/assets/images/s4.jpg';
import imgUrl5 from '@/assets/images/s5.jpg';
import { useTranslation } from 'react-i18next';

import SwiperImage from '@/components/SwiperImage';
import { useEffect, useRef, useState } from 'react';

const bannerImages = [imgUrl1, imgUrl2, imgUrl3, imgUrl4, imgUrl5];

const AppHeader = ({ className }: { className?: string }) => {
    const { t, i18n } = useTranslation(); // 默认 namespace 是 "common"

    const headerRef = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState(85);
    className = className || '';
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
                    <span>{t('header.myaccount')}</span>
                    <span className="text-yellow-200 font-semibold">
                        {t('header.score')}: <strong className="text-white">396500</strong>
                    </span>
                </div>

                <div className="flex items-center space-x-5 justify-between">
                    <span className="font-medium text-xl text-white whitespace-nowrap">{t('header.score_limit')}</span>

                    {/* 搜索框容器：加 relative！ */}
                    <div className="h-8 max-w-xs flex rounded-full bg-white overflow-hidden shadow-md relative">
                        {/* 输入框：pl-8 足够避开图标 */}
                        <input type="text" placeholder="水果手表" className="flex-1 px-3 pl-10 text-gray-700 focus:outline-none min-w-0" />

                        {/* SVG 放大镜：必须有 path！ */}
                        <svg className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>

                        <button className="bg-orange-500 text-white px-3 py-1.5 text-sm font-medium">{t('header.search')}</button>
                    </div>

                    <span className="text-white text-lg whitespace-nowrap">🎧</span>
                </div>
            </header>
            <div className={`h-[84px]`}></div>
            <section className="min-h-[170px] ">
                {/* 占位元素：高度 = 宽度 * (高度/宽度) */}
                <SwiperImage images={bannerImages} autoPlayInterval={4000} className="rounded-lg" />
            </section>
        </>
    );
};
export default AppHeader;
