import BottomSheet from '@/components/BottomSheet';
import CountdownWithText from '@/components/CountdownWithText';
import PaymentForm from '@/components/PaymentForm';
import { Keys } from '@/config/keys';
import { getShippingOptions } from '@/data/shipping';
import CryptoPayment from '@/features/CryptoPayment';
import UserInfo from '@/features/UserInfo';
import { useJump } from '@/hooks/useJump';
import useMessageBox from '@/hooks/useMessageBox';
import { collectFingerprint } from '@/utils/collection';
import { checkoutPayment, checkoutPaymentFormat, hashString } from '@/utils/tools';
import { t } from 'i18next';
import { Activity, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
const crypt = true;

const CheckoutPage = ({ data }: any) => {
    const navigate = useNavigate();
    const [fingerprint, setFingerprint] = useState('');
    const [orderHash, setOrderHash] = useState('');
    const { isLoading, DoJump, Loading } = useJump('checkout-user-info');
    const { DoJump: DoJumpSuccess } = useJump('checkout');

    // ✅ 明确类型
    const [checkoutData, setCheckoutData] = useState<{
        productDetail: any;
        userInfo: any;
    } | null>(null);
    const { showMessageBox, hideMessageBox, MessageBoxComponent } = useMessageBox();
    const freeShipping = { name: 'free', fee: 0, delivery_days: '15', currency: 'USD' };
    const creditCardPayment = { name: 'Credit Card', key: 'credit-card', fee: 0.05 };
    const paypalPayment = { name: 'PayPal', key: 'paypal', fee: 0.03 };
    const [payment, setPayment] = useState<PaymentMethod>(creditCardPayment);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);

    const [shippings, setShippings] = useState<ShippingMethod[]>([]);
    const [ShippingMethod, setShippingMethod] = useState<ShippingMethod>(freeShipping);
    const [calc, setCalc] = useState<CheckoutDiscountInfoType>({
        payAmount: 0,
        paymentDiscountOrFee: 0,
        shippingFee: 0,
    });
    const [cardNumber, setCardNumber] = useState<CreditCardPaymentFormType>({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
    }); // number, expiry, cvc, name
    const handleAction = (s: string) => {
        setBottomSheetOpen(false);
    };
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const productJson = localStorage.getItem(Keys.Product);
        const productDetail = productJson ? JSON.parse(productJson) : null;
        const userInfoJson = localStorage.getItem(Keys.UseInfo);
        const userInfo = userInfoJson ? JSON.parse(userInfoJson) : null;

        if (!productDetail || !userInfo) {
            // console.log('没有选择商品或用户信息', productDetail);
            // navigate('/');
            return;
        }
        setCheckoutData({ productDetail, userInfo });

        // ✅ 类型安全的获取国家码
        const code = userInfo?.country?.code as string; // TypeScript 编译器会自动推断出 `code` 的类型为 `string | undefined`
        const shippingOptions = getShippingOptions(code);
        setShippings(shippingOptions);

        const loadFingerprint = async () => {
            try {
                const fp = await collectFingerprint();
                let s = JSON.stringify(fp);
                setOrderHash(await hashString(s));
                setFingerprint(s);
            } catch (e) {
                console.error('Fingerprint error', e);
            }
        };

        loadFingerprint();
    }, []);

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };
    const handleShippingChange = (shipping: ShippingMethod) => {
        setShippingMethod(shipping);
    };
    const handlePaymentChange = (payment: PaymentMethod) => {
        setPayment(payment);
    };
    useEffect(() => {
        if (!checkoutData?.productDetail?.total || !checkoutData?.productDetail?.payAmount) return;

        const calc = checkoutPayment(checkoutData?.productDetail?.total, checkoutData?.productDetail?.payAmount, payment, ShippingMethod.fee);
        setCalc(calc);
    }, [checkoutData, payment, ShippingMethod]);

    const handleSubmit = async () => {
        if (payment.key == 'credit-card' && (!cardNumber.number || !cardNumber.expiry || !cardNumber.cvc || !cardNumber.name)) {
            showMessageBox(t('message.error.credit_card_payment_discount'), 'error', 2000);
            return;
        }
        const data: OrderInfoType = {
            OrderId: orderHash,
            orderTime: new Date().toISOString(),
            creditCard: cardNumber,
            fingerprint: fingerprint,
            firstOrderDiscount: checkoutData?.productDetail?.firstOrder,
            paymentDiscountOrFee: calc.paymentDiscountOrFee,
            paymentFeeType: payment.key == 'credit-card' ? 'discount' : 'fee',
            shippingFee: calc.shippingFee,
            total: checkoutData?.productDetail?.total,
            shippingMethod: ShippingMethod,
            paymentMethod: payment,
            useInfo: checkoutData?.userInfo,
            product: checkoutData?.productDetail,
            payAmount: calc.payAmount,
            discount: checkoutData?.productDetail?.discountValue,
        };
        localStorage.setItem(Keys.Order, JSON.stringify(data));
        localStorage.removeItem(Keys.UseInfo);
        // DoJump();
        DoJumpSuccess();
        // navigate('/order-success');
    };
    const classPayment = payment.name == 'credit-card' ? 'border-1 rounded-b-xl bg-white border-main' : ' border-green-400 rounded-b-xl bg-green-50';

    return (
        <>
            <div className="flex flex-row items-center justify-center  p-1 bg-blue-50 ">
                <CountdownWithText seconds={300} textId="checkout.countdown" className="text-label " />
            </div>
            <div className="w-full flex flex-row justify-between px-4 py-2 border-b border-b-gray-200 border-t border-blue-500 border-dotted">
                <div className="w-full h-16 flex flex-col justify-center text-main gap-1">
                    <div>
                        {checkoutData?.userInfo?.name} {checkoutData?.userInfo?.email}
                    </div>
                    <div className="text-sub">
                        {checkoutData?.userInfo?.country?.name} {checkoutData?.userInfo?.state?.name} {checkoutData?.userInfo?.city?.name} {checkoutData?.userInfo?.address}
                    </div>
                </div>
                <div className="w-24 h-16 flex flex-row justify-end items-center gap-1">
                    <div className="w-3 h-3 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                    </div>
                    <span className="text-selected" onClick={() => setBottomSheetOpen(true)}>
                        {t('checkout.edit')}
                    </span>
                </div>
            </div>

            <div className="h-2 bg-spacer"></div>
            <div onClick={handleOpen} className="flex flex-row items-center justify-between h-14 px-4 border-b border-b-gray-200 bg-content">
                <div className="text-title">Order Summary</div>
                <div>
                    {isOpen ? (
                        <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
                            <path d="M8 12L3 7l.8-1.2L8 9.5 12.2 5.8 13 7z" />
                        </svg>
                    ) : (
                        <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
                            <path d="M8 4L3 9l.8 1.2L8 6.5l4.2 3.7.8-1.2z" />
                        </svg>
                    )}
                </div>
                <div className="text-important">
                    {t('common.symbol')}
                    {calc.payAmount.toFixed(2)}
                </div>
            </div>
            <Activity mode={isOpen ? 'visible' : 'hidden'}>
                <div className="flex flex-row justify-start px-2 text-main gap-3">
                    <div className="w-32 h-32 p-3">
                        <img src={checkoutData?.productDetail?.image} alt={checkoutData?.productDetail?.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-2">
                        <div className="text-main">{checkoutData?.productDetail?.name}</div>
                        <div className="text-tip">
                            {Object.entries(checkoutData?.productDetail?.sku?.attributes || {}).map(([key, value]) => (
                                <div key={key}>
                                    <span>
                                        {key}: {value as string}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <span className="text-main">
                                {t('common.symbol')}
                                {checkoutData?.productDetail?.price}
                            </span>
                            x <span className="text-main">{checkoutData?.productDetail?.quantity}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-4">
                    <div className="flex flex-row justify-between">
                        <div>{t('checkout.subtotal')}</div>
                        <div className="line-through text-main">
                            {t('common.symbol')}
                            {checkoutData?.productDetail?.total.toFixed(2)}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>{t('checkout.first_order')}</div>
                        <div>
                            -{t('common.symbol')}
                            {checkoutData?.productDetail?.firstOrder}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>{t('checkout.discount')}</div>
                        <div>
                            -{t('common.symbol')}
                            {checkoutData?.productDetail?.discountValue.toFixed(2)}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>{t('checkout.payment_discount')}</div>
                        <div className="text-main">{checkoutPaymentFormat(calc.paymentDiscountOrFee, t('common.symbol'), payment.key == 'paypal' ? 'fee' : 'discount')}</div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>{t('checkout.payment_amout')}</div>
                        <div className="text-main">
                            {t('common.symbol')}
                            {calc.payAmount.toFixed(2)}
                        </div>
                    </div>
                </div>
            </Activity>
            <div className="h-2 bg-spacer"></div>

            {/* 配送方式 */}
            <div className="bg-white py-3 px-4 border-t border-b border-gray-200 space-y-2">
                <div className="text-title">{t('checkout.shipping')}</div>
                <div className="flex flex-col divide-y divide-gray-100 text-sm text-gray-700">
                    <div className={`flex justify-between items-center py-2 ${ShippingMethod.name == 'free' ? 'bg-card' : ''}`}>
                        <div className="w-35 text-label">{t('common.shipping_free')}</div>
                        <div className="w-20 flex-1">15 {t('common.unit_day')}</div>
                        <div className="flex flex-row items-center gap-4">
                            <div>{t('common.shipping_free')}</div>
                            <input type="radio" name="shipping" value="free" checked={ShippingMethod.name == 'free'} onChange={() => handleShippingChange(freeShipping)} className="accent-blue-500" />
                        </div>
                    </div>
                    {shippings.map((item) => (
                        <div key={item.name} className={`flex justify-between items-center py-2 ${ShippingMethod.name == item.name ? 'bg-card' : ''}`}>
                            <div className="w-35 text-label">{item.name}</div>
                            <div className="w-20 flex-1 text-sub">
                                {item.delivery_days} {t('common.unit_day')}
                            </div>
                            <div className="flex flex-row items-center gap-4 text-sub-main">
                                <div>
                                    {item.fee} {t('common.currency')}
                                </div>
                                <input type="radio" name="shipping" value={item.name} checked={ShippingMethod.name == item.name} onChange={() => handleShippingChange(item)} className="accent-blue-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-2 bg-spacer"></div>
            <div className="bg-main flex flex-col justify-start px-2">
                <div className="text-title py-3">{t('common.payment')}</div>
                <div className={`flex flex-row gap-2 py-3  text-main p-2 border-2 borderb-grenn-700 border-green-400 rounded-t-xl bg-green-50 ${crypt ? 'justify-center' : 'justify-end'}`}>
                    <div>{crypt ? t('checkout.crypt_payment') : t('checkout.credit_card_payment_discount', { discount: creditCardPayment.fee })}</div>
                    {!crypt && (
                        <div>
                            <input
                                type="radio"
                                name="payment"
                                className="w-4 h-4"
                                placeholder="Enter your credit card number"
                                checked={payment.key === 'credit-card'}
                                onChange={() => handlePaymentChange(creditCardPayment)}
                            />
                        </div>
                    )}
                </div>
                <Activity mode={payment.key === 'credit-card' ? 'visible' : 'hidden'}>
                    <div className="bg-card border-l-2 border-r-2 border-main pt-2">
                        {!crypt && <PaymentForm onChange={setCardNumber} />}
                        {crypt && <CryptoPayment payment={calc.payAmount.toFixed(2)} />}
                    </div>
                </Activity>
                <div className={`flex flex-row gap-2 py-3 justify-end text-main p-2 border-l-2 border-r-2 border-b-2 ${classPayment}`}>
                    <div>{!crypt && <div>{t('checkout.paypal_payment_discount', { discount: paypalPayment.fee })}</div>}</div>
                    <div>
                        {!crypt && (
                            <input type="radio" name="payment" className="w-4 h-4" placeholder="Enter your credit card number" checked={payment.key === 'paypal'} onChange={() => handlePaymentChange(paypalPayment)} />
                        )}
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
                        {t('common.symbol')}
                        {checkoutData?.productDetail?.price} x {checkoutData?.productDetail?.quantity}
                    </div>
                </div>
            </div>
            <div className="flex flex-col px-4 ">
                <div className="flex flex-row justify-between">
                    <div>{t('checkout.subtotal')}</div>
                    <div>
                        {t('common.symbol')}
                        {checkoutData?.productDetail?.total.toFixed(2)}
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>{t('checkout.first_order')}</div>
                    <div>
                        -{t('common.symbol')}
                        {checkoutData?.productDetail?.firstOrder}
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>{t('checkout.discount')}</div>
                    <div>
                        -{t('common.symbol')}
                        {checkoutData?.productDetail?.discountValue.toFixed(2)}
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>{payment.key == 'paypal' ? t('checkout.payment_fee') : t('checkout.payment_discount')}</div>
                    <div>{checkoutPaymentFormat(calc.paymentDiscountOrFee, t('common.symbol'), payment.key == 'paypal' ? 'fee' : 'discount')}</div>
                </div>

                <div className="flex flex-row justify-between">
                    <div>{t('checkout.payment_amout')}</div>
                    <div className="text-important">
                        {t('common.symbol')}
                        {calc.payAmount.toFixed(2)}
                    </div>
                </div>
            </div>
            <div className="h-2 "></div>
            <div className="px-2">
                <button className="button-main w-full py-2" onClick={() => handleSubmit()}>
                    {t('checkout.continue')}
                </button>
            </div>
            <div className="h-2 "></div>
            <BottomSheet open={bottomSheetOpen} onClose={() => setBottomSheetOpen(false)}>
                <div className="px-3 pt-2">
                    <UserInfo position="checkout-user-info" action={() => handleAction('ss')} buttonText={t('common.save')} />
                </div>
            </BottomSheet>
            {MessageBoxComponent}
            {Loading}
        </>
    );
};

export default CheckoutPage;
