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
import { useState } from 'react';

const images = [url1, url2, url3, url4, url5, url6, url7, url8, url9];
const ProductPage = ({ data }: any) => {
    {
        const [activeIndex, setActiveIndex] = useState(0);
        return (
            <div className="">
                <SwiperImage images={images} autoPlayInterval={4000} selectIndex={activeIndex} onIndexChange={setActiveIndex} className="rounded-lg" />
                <ThumbGallery images={images} activeIndex={activeIndex} onClick={setActiveIndex} />
            </div>
        );
    }
};
export default ProductPage;
