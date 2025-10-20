import url1 from '@/assets/images/product/10001.jpeg';
import url2 from '@/assets/images/product/10002.jpeg';
import url3 from '@/assets/images/product/10003.jpeg';
import url4 from '@/assets/images/product/10004.jpeg';
import url5 from '@/assets/images/product/10005.jpeg';
import url6 from '@/assets/images/product/10006.jpeg';
import url7 from '@/assets/images/product/10007.jpeg';
import url8 from '@/assets/images/product/10008.jpeg';
import url9 from '@/assets/images/product/10009.jpeg';
import SwiperImage from '@/components/SwiperImage';
import ThumbGallery from '@/components/ThumbGallery';
import BuyRecords from '@/features/product/BuyRecords';
import Inventory from '@/features/product/Inventory';
import ProductCard from '@/features/product/ProductCard';
import ProductDetail from '@/features/product/ProductDetail';
import ReviewCard from '@/features/product/ReviewCard';
import { useElementVisibility } from '@/hooks/useElementVisibility';
import { useRef, useState } from 'react';
import StickyBar from '../../components/StickyBar';

const images = [url1, url2, url3, url4, url5, url6, url7, url8, url9];
const data = `<div style="line-height: 0;"><img src="https://cdn1.tiantiandui.cn/2NqEvu6CI5n6sLHeUxZ9dpbY9kfyTvu6?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/r2ah8qB9tU3EZ7ToQThBzmUbllWrz52u?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/ZsiiVBXye5M8HZr3tvvtUhAmFkh3vRQ3?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/S2btqjRqmx7GHXmVYqFNNaAX2Fe5tWyc?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/q4s2x7vZonMAx3X75UUW1NJ91fPxOPXL?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/hzqQdIgg7RLzXb4fNojL72everA7svCu?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/L3w5SZoHvYXeltzUJiHWUgA0fvUuFk2z?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/Eg36WuwoMePuca2vaD5Y3nz1ZuZJ9xJg?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/qQs0YmgPE9zxx3fYZqwPyt0Uettd6ioh?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/flqo3TpRWrMzc7eO09UIYCK5frqCGn5F?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/rzdu2hUP6no8u6a96fuyRZph68nGfMYE?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/HOCr5cQTCrb6rzMIAQrs9Y3zU5h1xkKH?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/CFaYUfbDiDN4rGvUizqA4nKIJdKZZRiu?x-oss-process=image/resize,w_800,m_lfit"><img src="https://cdn1.tiantiandui.cn/TkLZcNrVRul6Qmok1mhq3UYZZ566b06t?x-oss-process=image/resize,w_800,m_lfit"></div>`;
const ProductPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    // data = data.replace(/<img /g, '<img loading="lazy" ');
    const buyButtonRef = useRef<HTMLDivElement>(null); // 👈 就用 useRef
    const isVisible = useElementVisibility(buyButtonRef);

    return (
        <div className="bg-primary flex flex-col">
            <div className="h-96">
                <SwiperImage images={images} autoPlayInterval={4000} selectIndex={activeIndex} onIndexChange={setActiveIndex} className="rounded-lg min-h-[300px]" />
            </div>
            <div className="h-1"></div>
            <div className="h-16">
                <ThumbGallery images={images} activeIndex={activeIndex} onClick={setActiveIndex} />
            </div>
            <div className="p-1">
                <ProductCard>
                    <div ref={buyButtonRef} className="flex bg-blue-500 justify-center items-center bg-primary text-white px-4 py-2 rounded-full">
                        加入购物车
                    </div>
                </ProductCard>
            </div>
            <Inventory />
            <BuyRecords />
            <div className="h-1"></div>
            <ReviewCard total={100} reviews={[]} onSeeAll={() => {}} />
            <div className="px-2">
                <ProductDetail data={data as string} />
            </div>

            {!isVisible && (
                <StickyBar>
                    <div className="flex bg-blue-500 justify-center items-center bg-primary text-white px-4 py-2 rounded-full">加入购物车</div>
                </StickyBar>
            )}
        </div>
    );
};
export default ProductPage;
