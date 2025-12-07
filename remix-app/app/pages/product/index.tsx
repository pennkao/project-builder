import BackToTopButton from '@/components/BackToTopButton';
import BottomSheet from '@/components/BottomSheet';
import HorizontalTabs from '@/components/HorizontalTabs';
import StickyBar from '@/components/StickyBar';
import SwiperImage from '@/components/SwiperImage';
import ThumbGallery from '@/components/ThumbGallery';
import BuyRecords from '@/features/product/BuyRecords';
import ProductCard from '@/features/product/ProductCard';
import ProductDetail from '@/features/product/ProductDetail';
import ProductSelector from '@/features/product/ProductSelector';
import ReviewCard from '@/features/product/ReviewCard';
import UserInfo from '@/features/UserInfo';
import { useApi } from '@/hooks/useApi';
import { decontent } from '@/lib/content';
import { getSiteId } from '@/utils/tools';

import { t } from 'i18next';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { useNavigate } from 'react-router';

const ProductPage = ({ productData }: { productData: ProductType | null }) => {
    // if (productData === null) return null;
    const [tabActiveKey, setTabActiveKey] = useState<string | null>(null);
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const buyButtonRef = useRef<HTMLElement>(null); // 👈 就用 useRef
    const [content, setContent] = useState<string>('');
    const [open, setOpen] = useState(false);
    const { api } = useApi();

    const reviews: ReviewType[] = [
        // {
        //     id: 'url1',
        //     avatar: url1,
        //     username: '33333333333',
        //     images: [url1, url2, url3],
        //     comment: '232dddddddddddddddddddd3',
        // },
    ];
    const handleAction = (key: string | null) => {
        if (key) {
            setTabActiveKey(key);
        }
        // navigate('/checkout');
    };

    useEffect(() => {
        if (productData === null || productData.main.id < 0) return;
        const sid = getSiteId();
        if (!sid) {
            return;
        }
        api.doGetOne<string>('content', productData.main.id, sid).callback((data) => {
            if (data === null) return;
            setContent(data);
        });
    }, [productData?.main.id]);

    return (
        <div className="bg-primary flex flex-col">
            <div className="h-96">
                <SwiperImage images={productData?.images || []} autoPlayInterval={4000} onIndexChange={setActiveIndex} className="rounded-lg min-h-[300px]" />
            </div>
            <div className="h-1"></div>
            <div className="lg:h-28 h-16">
                <ThumbGallery images={productData?.images || []} activeIndex={activeIndex} onClick={setActiveIndex} />
            </div>
            <div className="p-1 py-1">
                <ProductCard data={productData?.main || null} />
                <div className="h-1"></div>
                <button
                    ref={buyButtonRef as RefObject<HTMLButtonElement>}
                    className="button-main w-full"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    {t('common.buynow')}
                </button>
            </div>
            <div className="h-1"></div>

            <BuyRecords stock={productData?.main?.stock || 0} />

            <div className="h-3"></div>
            {reviews && reviews.length > 0 && <ReviewCard reviews={reviews} />}
            <div className="px-2">
                <ProductDetail data={decontent(content)} />
            </div>

            <StickyBar ref={buyButtonRef as RefObject<HTMLDivElement>}>
                <button className="button-main w-full" onClick={() => setOpen(true)}>
                    {t('common.buynow')}
                </button>
            </StickyBar>

            <BottomSheet open={open} onClose={() => setOpen(false)}>
                <HorizontalTabs
                    activeKey={tabActiveKey}
                    onTabChange={setTabActiveKey}
                    tabs={[
                        {
                            key: 'tab1',
                            label: t('product.select_product') + ' >',
                            content: <ProductSelector product={productData || ({} as ProductType)} action={handleAction} />,
                        },
                        { key: 'tab2', label: t('product.use_address') + ' >', content: <UserInfo position="user-info" action={handleAction} /> },
                    ]}
                />
            </BottomSheet>
            <BackToTopButton />
        </div>
    );
};
export default ProductPage;
