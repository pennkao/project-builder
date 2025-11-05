import { Keys } from '@/config/keys';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const OrderPage = ({ data }: any) => {
    const navigate = useNavigate();

    const [orderInfo, setOrdrerInfo] = useState({} as OrderInfoType);
    const [productSelected, setProductSelected] = useState<ProductSelectedType>({} as ProductSelectedType);
    useEffect(() => {
        // const userInfo = JSON.parse(localStorage.getItem(userInfoKey) || '{}');
        const OrderInfo = JSON.parse(localStorage.getItem(Keys.Order) || '{}');
        if (!OrderInfo) {
            navigate('/');
        }
        setOrdrerInfo(OrderInfo);
    }, []);
    return (
        <div className="flex flex-col items-center justify-start bg-page w-full min-h-screen pt-1">
            {/* 支付成功提示区 */}
            <div className="bg-container rounded-2xl  w-full max-w-3xl p-6 flex flex-col gap-4">
                {/* 标题 */}
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-3xl font-semibold text-green-600 flex items-center gap-2">✅ {t('order.payment_success')}</div>
                    <div className="text-gray-600">{t('order.think_you')}</div>
                </div>

                {/* 基本信息 */}
                <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-700 border-b border-gray-200 pb-3">
                    <span>
                        {t('order.order_number')}：<strong>{orderInfo?.OrderId?.substring(0, 24) || ''}</strong>
                    </span>
                    <span>{t('order.order_time')}：{orderInfo?.orderTime?.substring(0, 10) || ''}</span>
                </div>

                {/* 收货信息 + 账单信息 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-card rounded-xl p-4">
                        <h3 className="text-title  mb-2">{t('order.shipping_text')}</h3>
                        <div className="text-main ">
                            <p>
                                {orderInfo?.useInfo?.firstName || ''} {orderInfo?.useInfo?.lastName || ''}
                            </p>
                            <p>{orderInfo?.useInfo?.email || ''}</p>
                            <p>
                                {orderInfo?.useInfo?.country?.name || ''} {orderInfo?.useInfo?.state?.name || ''} {orderInfo?.useInfo?.city?.name || ''}
                            </p>
                            <p>
                                {orderInfo?.useInfo?.address || ''} {orderInfo?.useInfo?.address2 || ''}
                            </p>
                            <p>
                                {t('order.shipping_method_text')}：{orderInfo?.shippingMethod?.name || ''}
                            </p>
                        </div>
                    </div>

                    <div className="bg-card rounded-xl p-4">
                        <h3 className="text-title mb-2">{t('order.billing_text')}</h3>
                        <div className="text-main ">
                            <p>
                                {t('order.payment_method_text')}：{orderInfo?.paymentMethod?.name || ''}
                            </p>
                            <p>
                                {t('order.status_text')}：{t('order.status_payed')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 商品列表 */}
                <div className="bg-card rounded-xl p-4 ">
                    <h3 className="text-title mb-3">{t('order.order_detail_text')}</h3>
                    <div className="divide-y divide-gray-200">
                        <div className="flex justify-between py-2">
                            <div className="flex items-center gap-3">
                                <img src={orderInfo?.product?.sku?.url || ''} alt="" className="w-14 h-14 rounded-md object-cover" />
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{orderInfo?.product?.name || ''}</p>
                                    <p className="text-xs text-gray-500">
                                        {Object.keys(orderInfo?.product?.sku?.attributes || {})
                                            .map((key) => ` ${orderInfo?.product?.sku?.attributes?.[key]}`)
                                            .join(' · ') || ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end py-2">
                            <span className="text-gray-700">
                                {t('common.symbol')} {orderInfo?.product?.sku?.price || 0} ×{orderInfo?.product?.quantity || 0}
                            </span>
                        </div>
                    </div>

                    {/* 小计与总价 */}
                    <div className="border-t border-gray-200 mt-3 pt-3 text-main">
                        <div className="flex justify-between">
                            <span>{t('product.total')}</span>
                            <span>
                                {t('common.symbol')} <span className="line-through">{orderInfo?.product?.total.toFixed(2) || 0}</span>
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('product.first_order')}</span>
                            <span>
                                -{t('common.symbol')} {orderInfo?.firstOrderDiscount?.toFixed(2) || 0}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>{t('product.tiered_discount')}</span>
                            <span>
                                -{t('common.symbol')} {orderInfo?.discount?.toFixed(2) || 0}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>{orderInfo?.paymentMethod?.name === 'paypal' ? t('order.payment_fee') : t('order.payment_discount')}</span>
                            <span>
                                -{t('common.symbol')} {orderInfo?.paymentDiscountOrFee?.toFixed(2) || 0}
                            </span>
                        </div>

                        <div className="flex justify-between text-brand mt-1">
                            <span>{t('product.pay_amount')}</span>
                            <span>
                                {t('common.symbol')} {orderInfo?.product?.payAmount.toFixed(2) || 0}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 ">
                    <button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 transition">
                        {t('order.continue_shopping')}
                    </button>
                </div>

                {/* 底部提示 */}
                <div className="text-sm text-gray-500 text-center ">
                    <span>{t('order.question')}</span>
                    <a href="/contact" className="text-blue-600 underline">
                        {t('order.contact_customer_service')}
                    </a>
                    。
                </div>
            </div>
        </div>
    );
};
export default OrderPage;
