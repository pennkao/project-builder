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
        <>
            <div className="w-full bg-main flex flex-row justify-between px-4 border-b border-b-gray-200 border-t border-blue-500 border-dotted">
                <div className="w-full h-16 flex flex-col justify-center text-main gap-1">
                    <div className="">
                        {checkoutData?.userInfo?.name} {checkoutData?.userInfo?.email}
                    </div>
                    <div>
                        {checkoutData?.userInfo?.country.name} {checkoutData?.userInfo?.state.name} {checkoutData?.userInfo?.city.name} {checkoutData?.userInfo?.address}
                    </div>
                </div>
                <div className="w-24 h-16 flex flex-row justify-end items-center gap-1">
                    <div className="w-3 h-3 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                    </div>
                    <span className="text-blue-500">编辑</span>
                </div>
            </div>
            <div className="dash" />
            <div className="h-2 bg-surface"></div>
            <div className="flex flex-row justify-start  px-[18px] text-main gap-3">
                <div className="w-32 h-32 p-3">
                    <img src={checkoutData?.productDetail?.image} alt={checkoutData?.productDetail?.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 flex flex-col justify-center gap-2">
                    <div>{checkoutData?.productDetail?.name}</div>
                    <div className="text-sub">
                        {Object.entries(checkoutData?.productDetail?.sku?.attributes || {}).map(([key, value]) => (
                            <div key={key}>
                                <span className="">
                                    {key}: {value as string}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div>￥{checkoutData?.productDetail?.price}</div>
                </div>
            </div>
        </>
    );
};
export default CheckoutPage;
