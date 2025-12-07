import { t } from 'i18next';

export default function ProductCard({ data }: { data: ProductMainType | null }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* 顶部红色横幅 */}
            <div className="bg-red-500 text-white p-3 flex justify-between items-center">
                <div>
                    <div className="text-lg font-bold">
                        {/* {data?.stock}积分<span className="text-yellow-200">+{(data?.stock || 0) / 100}元</span> */}
                        <span className="text-brand ml-1 text-red-100">
                            {t('common.symbol')}
                            {data?.price}
                        </span>
                    </div>
                    <div className="text-xs text-red-100 mt-1">{t('product.detail.marketing.save', { save: data?.points ? (data?.points || 0) / 100 : 0 })}</div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="text-sm font-medium">{t('product.detail.marketing.limit')}</div>
                    <div className="text-xs text-red-100 mt-1">{t('product.detail.marketing.monthlySales', { sales_count: data?.sales_count })}</div>
                </div>
            </div>

            {/* 中间标签 */}
            <div className="px-3 py-2">
                <div className="flex gap-2 mb-2">
                    <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded">{t('product.detail.marketing.label1')}</span>
                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded">{t('product.detail.marketing.label2')}</span>
                </div>

                {/* 商品标题 */}
                <div className="text-sm leading-tight">
                    <span className="text-main">{data?.name}</span>
                </div>
            </div>
        </div>
    );
}
