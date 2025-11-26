import url1 from '@/assets/images/product/10001.jpeg';
import url2 from '@/assets/images/product/10002.jpeg';
import url3 from '@/assets/images/product/10003.jpeg';
import BackToTopButton from '@/components/BackToTopButton';
import BottomSheet from '@/components/BottomSheet';
import HorizontalTabs from '@/components/HorizontalTabs';
import StickyBar from '@/components/StickyBar';
import SwiperImage from '@/components/SwiperImage';
import ThumbGallery from '@/components/ThumbGallery';
import BuyRecords from '@/features/product/BuyRecords';
import Inventory from '@/features/product/Inventory';
import ProductCard from '@/features/product/ProductCard';
import ProductDetail from '@/features/product/ProductDetail';
import ProductSelector from '@/features/product/ProductSelector';
import ReviewCard from '@/features/product/ReviewCard';
import UserInfo from '@/features/UserInfo';
import { t } from 'i18next';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { useNavigate } from 'react-router';
import { doGet } from '../../utils/api';

// const images = [url1, url2, url3, url4, url5, url6, url7, url8, url9];
const data = `<div style="line-height: 0;"><img src="https://cdn1.tiantiandui.cn/2NqEvu6CI5n6sLHeUxZ9dpbY9kfyTvu6?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/r2ah8qB9tU3EZ7ToQThBzmUbllWrz52u?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/ZsiiVBXye5M8HZr3tvvtUhAmFkh3vRQ3?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/S2btqjRqmx7GHXmVYqFNNaAX2Fe5tWyc?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/q4s2x7vZonMAx3X75UUW1NJ91fPxOPXL?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/hzqQdIgg7RLzXb4fNojL72everA7svCu?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/L3w5SZoHvYXeltzUJiHWUgA0fvUuFk2z?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/Eg36WuwoMePuca2vaD5Y3nz1ZuZJ9xJg?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/qQs0YmgPE9zxx3fYZqwPyt0Uettd6ioh?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/flqo3TpRWrMzc7eO09UIYCK5frqCGn5F?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/rzdu2hUP6no8u6a96fuyRZph68nGfMYE?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/HOCr5cQTCrb6rzMIAQrs9Y3zU5h1xkKH?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/CFaYUfbDiDN4rGvUizqA4nKIJdKZZRiu?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/TkLZcNrVRul6Qmok1mhq3UYZZ566b06t?x-oss-process=image/resize,w_800,m_lfit"></div>`;

const ProductPage = ({ productData }: { productData: ProductType }) => {
    const [tabActiveKey, setTabActiveKey] = useState<string | null>(null);
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const buyButtonRef = useRef<HTMLElement>(null); // 👈 就用 useRef
    const [content, setContent] = useState<string>('');
    const [open, setOpen] = useState(false);
    const reviews: ReviewType[] = [
        {
            id: 'url1',
            avatar: url1,
            username: '33333333333',
            images: [url1, url2, url3],
            comment: '232dddddddddddddddddddd3',
        },
    ];
    const handleAction = (key: string | null) => {
        if (key) {
            setTabActiveKey(key);
        }
        // navigate('/checkout');
    };

    useEffect(() => {
        doGet('content', productData.main.id).then((res) => {
            setContent(res);
        });
    }, [content]);

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
                <ProductCard data={productData.main} />
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

            <Inventory />
            <BuyRecords />

            <div className="h-3"></div>
            <ReviewCard reviews={reviews} />
            <div className="px-2">
                <ProductDetail data={content} />
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
                            content: <ProductSelector product={productData} action={handleAction} />,
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
