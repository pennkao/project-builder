import BaseImage from '@/components/BaseImage';

import BackToTopButton from '@/components/BackToTopButton';
import { Keys } from '@/config/keys';
import AppFooter from '@/features/app/AppFooter';
import AppHeader from '@/features/app/AppHeader';
import { useApi } from '@/hooks/useApi';
import { denormalizeProductList } from '@/lib/convert';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

const HomePage = ({ data }: any) => {
    const { api } = useApi();
    const [products, setProducts] = useState<ProductItemType[]>([]);
    const { t, i18n } = useTranslation(); // 默认 namespace 是 "common"
    const [bannerImages, setBannerImages] = useState<string[]>([]);
    const [page, setPage] = useState<number>(1);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [hasNext, setHasNext] = useState(true);

    const getProductList = (page: number, size: number) => {
        api.query({ page, size })
            .doGetList<ProductItemType[]>('products')
            .callback((data) => {
                if (!data) {
                    setHasNext(false);
                    return;
                }
                if (data && data.length) {
                    const pdata = denormalizeProductList(data);
                    setProducts((prev) => [...prev, ...pdata]);
                }
            });
    };

    useEffect(() => {
        if (!hasNext) {
            return;
        }

        console.log('page', page);
        getProductList(page, 8);
    }, [page]);
    useEffect(() => {
        if (!bottomRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    console.log('滑动到底部了！');
                    // 这里触发加载下一页
                    setPage((prev) => prev + 1);
                }
            },
            {
                root: null, // 默认 viewport
                rootMargin: '200px', // 提前加载
                threshold: 0.1, // 元素 10% 可见就触发
            }
        );

        observer.observe(bottomRef.current);

        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        api.doGetOne('site', 234134134).callback((data) => {
            if (data && data.meta && data.meta.banners) {
                setBannerImages(data?.meta?.banners || []);
                localStorage.setItem(Keys.Config, JSON.stringify(data || {}));
            }
        });
    }, []);

    return (
        <>
            <AppHeader images={bannerImages} />
            <div className="bg-white rounded-lg p-1 shadow-sm max-w-4xl w-full mx-auto">
                {/* <h2 className="text-xl font-bold text-gray-800 mb-4">热门商品</h2> */}

                {/* 商品网格 */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 auto-rows-min w-full">
                    {products.map((product, idx) => (
                        <div key={idx} data-idx={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200 flex flex-col">
                            <Link to={`/products/${product.handle}`} className="flex flex-col">
                                {/* 图片容器 */}
                                <div className="relative w-full aspect-[1/1] min-h-[200px] overflow-hidden">
                                    <BaseImage src={product.main_image} alt={product.title} className="w-full h-full object-cover" isUrl={true} />

                                    {/* 标签 */}
                                    {product.tags && <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{product.tags.join(' ')}</div>}
                                </div>

                                {/* 内容区 */}
                                <div className="p-3 flex flex-col justify-between">
                                    <h3 className="font-medium  text-gray-900 line-clamp-2 text-sm">{product.title}</h3>

                                    <div className="mt-2">
                                        <div className="text-lg font-bold text-red-600">
                                            {product.points} {t('common.score')}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-xs text-gray-500">{t('product.price', { price: product.price })}</div>
                                            <div className="text-xs text-orange-600">{t('common.monthly', { num: product.sales_count })}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {/* PC */}
            <div className="hidden md:block text-center my-4">
                {hasNext && (
                    <button onClick={() => setPage((prev) => prev + 1)} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                        {t('show.more')}
                    </button>
                )}
            </div>

            {/* Mobile */}
            {hasNext && <div className="block md:hidden" ref={bottomRef} />}

            <AppFooter />
            <BackToTopButton />
        </>
    );
};

export default HomePage;
