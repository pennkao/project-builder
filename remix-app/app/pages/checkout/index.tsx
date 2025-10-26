import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const CheckoutPage = ({ data }: any) => {
    const navigate = useNavigate();
    const [checkoutData, setCheckoutData] = useState<any>(null);
    useEffect(() => {
        // SSR 安全检查（Remix 中非常重要）
        if (typeof window === 'undefined') return;

        const productJson = localStorage.getItem('--google:vtx:product:selected');
        const productDetail = productJson ? JSON.parse(productJson) : null;
        const useuserInfoJson = localStorage.getItem('--google:vtx:user:info');
        const userInfo = useuserInfoJson ? JSON.parse(useuserInfoJson) : null;
        if (!productDetail || !userInfo) {
            console.log('没有选择商品或用户信息', productDetail);
            navigate('/'); // 没有 token 跳回首页
            // return;
        }
        setCheckoutData({
            productDetail,
            userInfo,
        });
        console.log('checkoutData', checkoutData);
    }, []);
    return (
        <div className="w-full bg-main">
           <div className="w-full h-16 bg-slate-200">
                {checkoutData?.userInfo?.name} {checkoutData?.userInfo?.email}
           </div>
            <div>
                {checkoutData?.userInfo?.country} {checkoutData?.userInfo?.city} {checkoutData?.userInfo?.address}
            </div>
        </div>

    );
};
export default CheckoutPage;
