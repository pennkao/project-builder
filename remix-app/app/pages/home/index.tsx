import BaseImage from '@/components/BaseImage';

import BackToTopButton from '@/components/BackToTopButton';
import { Keys } from '@/config/keys';
import AppHeader from '@/features/app/AppHeader';
import { useApi } from '@/hooks/useApi';
import { denormalizeProductList } from '@/lib/convert';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import AppFooter from '@/features/app/AppFooter';

const HomePage = ({ data }: any) => {
    const { api } = useApi();
    const [products, setProducts] = useState<ProductItemType[]>([]);
    const { t, i18n } = useTranslation(); // 默认 namespace 是 "common"
    const [bannerImages, setBannerImages] = useState<string[]>([]);

    useEffect(() => {
        api.query({ page: 1, size: 12 })
            .doGetList<ProductItemType[]>('products')
            .callback((data) => {
                if (data && data.length) {
                    const pdata = denormalizeProductList(data);
                    setProducts(pdata);
                }
            });

        api.doGetOne('site', 234134134).callback((data) => {
            if (data && data.config && data.config.banners) {
                setBannerImages(data?.config?.banners || []);
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
            <AppFooter />
            <BackToTopButton />
        </>
    );
};

export default HomePage;
