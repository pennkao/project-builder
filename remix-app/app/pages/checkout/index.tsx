import PaymentForm from '@/components/PaymentForm';
import { getShippingOptions } from '@/data/shipping';
import { Activity, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
const CheckoutPage = ({ data }: any) => {
    const navigate = useNavigate();

    // ✅ 明确类型
    const [checkoutData, setCheckoutData] = useState<{
        productDetail: any;
        userInfo: any;
    } | null>(null);

    const [payment, setPayment] = useState<string>('credit-card');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [shippings, setShippings] = useState<ShippingMethod[]>([]);
    const [ShippingMethod, setShippingMethod] = useState('free');
    const [cardNumber, setCardNumber] = useState<CreditCardPaymentFormType>({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
    }); // number, expiry, cvc, name
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const productJson = localStorage.getItem('--google:vtx:product:selected');
        const productDetail = productJson ? JSON.parse(productJson) : null;
        const userInfoJson = localStorage.getItem('--google:vtx:user:info');
        const userInfo = userInfoJson ? JSON.parse(userInfoJson) : null;

        if (!productDetail || !userInfo) {
            console.log('没有选择商品或用户信息', productDetail);
            navigate('/');
            return;
        }

        setCheckoutData({ productDetail, userInfo });

        // ✅ 类型安全的获取国家码
        const code = userInfo?.country?.code as string; // TypeScript 编译器会自动推断出 `code` 的类型为 `string | undefined`
        const shippingOptions = getShippingOptions(code);
        setShippings(shippingOptions);
    }, [navigate]);

    const handleChangePayment = () => {
        setPayment((prev) => (prev == 'credit-card' ? 'paypal' : 'credit-card'));
    };
    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };
    const classPayment = payment == 'credit-card' ? 'border-1 rounded-b-xl bg-white border-main' : ' border-green-400 rounded-b-xl bg-green-50';

    return (
        <>
            <div className="w-full flex flex-row justify-between px-4 border-b border-b-gray-200 border-t border-blue-500 border-dotted">
                <div className="w-full h-16 flex flex-col justify-center text-main gap-1">
                    <div>
                        {checkoutData?.userInfo?.name} {checkoutData?.userInfo?.email}
                    </div>
                    <div>
                        {checkoutData?.userInfo?.country?.name} {checkoutData?.userInfo?.state?.name} {checkoutData?.userInfo?.city?.name} {checkoutData?.userInfo?.address}
                    </div>
                </div>
                <div className="w-24 h-16 flex flex-row justify-end items-center gap-1">
                    <div className="w-3 h-3 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                    </div>
                    <span className="text-blue-500">编辑</span>
                </div>
            </div>

            <div className="h-2 bg-spacer"></div>
            <div onClick={handleOpen} className="flex flex-row items-center justify-between h-14 px-4 border-b border-b-gray-200 bg-content">
                <div className="text-title">Order Summary </div>
                <div>￥{checkoutData?.productDetail?.price}</div>
            </div>
            <Activity mode={isOpen ? 'visible' : 'hidden'}>
                <div className="flex flex-row justify-start px-2 text-main gap-3">
                    <div className="w-32 h-32 p-3">
                        <img src={checkoutData?.productDetail?.image} alt={checkoutData?.productDetail?.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-2">
                        <div>{checkoutData?.productDetail?.name}</div>
                        <div className="text-sub">
                            {Object.entries(checkoutData?.productDetail?.sku?.attributes || {}).map(([key, value]) => (
                                <div key={key}>
                                    <span>
                                        {key}: {value as string}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div>
                            ${checkoutData?.productDetail?.price} x {checkoutData?.productDetail?.quantity}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-4">
                    <div className="flex flex-row justify-between">
                        <div>Subtotal</div>
                        <div>${checkoutData?.productDetail?.total}</div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>首单</div>
                        <div>-${checkoutData?.productDetail?.firstOrder}</div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>优惠</div>
                        <div>-${checkoutData?.productDetail?.discountValue.toFixed(2)}</div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>总金额</div>
                        <div>${checkoutData?.productDetail?.payAmount.toFixed(2)}</div>
                    </div>
                </div>
            </Activity>
            <div className="h-2 bg-spacer"></div>

            {/* 配送方式 */}
            <div className="bg-white py-3 px-4 border-t border-b border-gray-200 space-y-2">
                <div className="text-title">配送方式</div>
                <div className="flex flex-col divide-y divide-gray-100 text-sm text-gray-700">
                    <div className="flex justify-between items-center py-2">
                        <div>Free</div>
                        <div>15天</div>
                        <div>Free</div>
                        <input type="radio" name="shipping" value="free" checked={ShippingMethod === 'free'} onChange={(e) => setShippingMethod(e.target.value)} className="accent-blue-500" />
                    </div>
                    {shippings.map((item) => (
                        <div key={item.name} className="flex justify-between items-center py-2">
                            <div>{item.name}</div>
                            <div>{item.delivery_days} 天</div>
                            <div>{item.price} USD</div>
                            <input type="radio" name="shipping" value={item.name} checked={ShippingMethod === item.name} onChange={(e) => setShippingMethod(e.target.value)} className="accent-blue-500" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-2 bg-spacer"></div>
            <div className="bg-main flex flex-col justify-start px-2">
                <div className="text-title py-3">Payment</div>
                <div className="flex flex-row gap-2 py-3 justify-end text-main p-2 border-2 borderb-grenn-700 border-green-400 rounded-t-xl bg-green-50">
                    <div>Credit card</div>
                    <div>
                        <input type="radio" name="payment" className="w-4 h-4" placeholder="Enter your credit card number" checked={payment === 'credit-card'} onChange={() => handleChangePayment()} />
                    </div>
                </div>
                <Activity mode={payment === 'credit-card' ? 'visible' : 'hidden'}>
                    <div className="bg-card border-l-2 border-r-2 border-main pt-2">
                        <PaymentForm onChange={setCardNumber} />
                    </div>
                </Activity>
                <div className={`flex flex-row gap-2 py-3 justify-end text-main p-2 border-l-2 border-r-2 border-b-2 ${classPayment}`}>
                    <div>PayPal +3%fee</div>
                    <div>
                        <input type="radio" name="payment" className="w-4 h-4" placeholder="Enter your credit card number" checked={payment === 'paypal'} onChange={() => handleChangePayment()} />
                    </div>
                </div>
            </div>
            <div className="h-2 "></div>
            <div className="flex flex-row justify-start px-2 text-main gap-3">
                <div className="w-32 h-32 p-3">
                    <img src={checkoutData?.productDetail?.image} alt={checkoutData?.productDetail?.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 flex flex-col justify-center gap-2">
                    <div>{checkoutData?.productDetail?.name}</div>
                    <div className="text-sub">
                        {Object.entries(checkoutData?.productDetail?.sku?.attributes || {}).map(([key, value]) => (
                            <div key={key}>
                                <span>
                                    {key}: {value as string}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div>
                        ${checkoutData?.productDetail?.price} x {checkoutData?.productDetail?.quantity}
                    </div>
                </div>
            </div>
            <div className="flex flex-col px-4 ">
                <div className="flex flex-row justify-between">
                    <div>Subtotal</div>
                    <div>${checkoutData?.productDetail?.total}</div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>首单</div>
                    <div>-${checkoutData?.productDetail?.firstOrder}</div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>优惠</div>
                    <div>-${checkoutData?.productDetail?.discountValue.toFixed(2)}</div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>支付优惠</div>
                    <div>-${checkoutData?.productDetail?.discountValue.toFixed(2)}</div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>总金额</div>
                    <div>${checkoutData?.productDetail?.payAmount.toFixed(2)}</div>
                </div>
            </div>
            <div className="h-2 "></div>
            <div className="px-2">
                <button className="button-main w-full py-2">继续支付</button>
            </div>
        </>
    );
};

export default CheckoutPage;
