import { Keys } from '@/config/keys';
import { buildJsonByOrderKeys, discount, discountMoneyFormat, moneyFormat } from '@/utils/tools';
import { t } from 'i18next';
import { useEffect, useMemo, useState } from 'react';
const FirstOrder = 3;
export default function ProductSelector({ options, skus, action, product }: ProductSelectorProps) {
    const [quantity, setQuantity] = useState(1);
    const [discountValue, setDiscountInfo] = useState<DiscountInfoType>({
        discount: 0.0,
        total: 0.0,
        num: 0,
        payAmount: 0.0,
        nextDiscount: 0.0,
        nextDiscountNum: 0,
        paymentDiscount: 0.0,
    });
    skus.sort((a, b) => a.price - b.price); // 按价格排序
    const [selectedSKU, setSelectedSKU] = useState<SKUType>(skus[0]);
    const sortAttributes = useMemo(() => options.sort((a, b) => a.sort - b.sort).map((o) => o.label), [options]); // 排序属性
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const handleOptionClick = (optionLabel: string, value: string, isSelected: boolean) => {
        setSelectedOptions((prev) => ({ ...prev, [optionLabel]: value }));
        if (isSelected) {
            setSelectedSKU(skus[0]);
            setSelectedOptions({});
            return;
        }
        setSelectedSKU((prev) => {
            const newprev = { ...prev.attributes, [optionLabel]: value };
            const changeSku = skuMap.get(buildJsonByOrderKeys(sortAttributes, { ...prev.attributes, [optionLabel]: value })) || prev;
            return changeSku;
        });
    };
    useEffect(() => {
        setDiscountInfo(discount(quantity, selectedSKU.price, '', FirstOrder));
    }, [quantity, selectedSKU.price]);

    const [skuMap, optionsWithValues, matchValues] = useMemo(() => {
        const map = new Map<string, SKUType>();
        const optionsWithValues = new Map<string, Set<string>>();
        const matchValues = new Map<string, Set<string>>(); // key: "尺码S", value: Set["颜色红", "颜色蓝"]

        skus.forEach((sku) => {
            // 1. 构建 skuMap 的 key
            const key = buildJsonByOrderKeys(sortAttributes, sku.attributes);
            map.set(key, sku);

            // 2. 收集所有属性的可选值
            Object.entries(sku.attributes).forEach(([k, v]) => {
                if (!optionsWithValues.has(k)) {
                    optionsWithValues.set(k, new Set());
                }
                optionsWithValues.get(k)!.add(v);
            });

            // 3. 构建 matchValues：每个属性值 -> 其他属性值的集合
            const entries = Object.entries(sku.attributes); // [['尺码','S'], ['颜色','红']]
            entries.forEach(([k, v]) => {
                const currentKey = k + v; // "尺码S"

                if (!matchValues.has(currentKey)) {
                    matchValues.set(currentKey, new Set());
                }

                // 把同一个 SKU 中其他属性的 "属性名+值" 加入
                entries.forEach(([otherK, otherV]) => {
                    if (otherK === k && otherV === v) return; // 跳过自己
                    matchValues.get(currentKey)!.add(otherK + otherV);
                });
            });
        });

        return [map, optionsWithValues, matchValues];
    }, [skus]); // ⚠️ 别忘了 sortAttributes 也在依赖中！

    const isDisabled = (label: string, value: string) => {
        const otherSelected = Object.entries(selectedOptions).filter(([k]) => k !== label);
        if (otherSelected.length === 0) return false;

        const currentKey = label + value;
        return otherSelected.some(([k, v]) => {
            const set = matchValues.get(k + v);
            return !set?.has(currentKey);
        });
    };

    useEffect(() => {
        const productDefault = JSON.parse(localStorage.getItem(Keys.Product) || '{}');

        if (productDefault) {
            setQuantity(productDefault?.quantity || 1);
            setSelectedSKU(productDefault?.sku || skus[0]);
            setSelectedOptions(productDefault?.sku?.attributes || {});
        }
    }, []);

    const handleSubmit = () => {
        console.log('selectedSKU', selectedSKU);
        if (!selectedSKU.id) {
            return;
        }
        const productSelected = {
            productId: product.id,
            name: product.name,
            sku: selectedSKU,
            firstOrder: FirstOrder, // 首单优惠
            quantity: quantity,
            price: selectedSKU.price,
            image: selectedSKU.url || skus[0].url,
            total: discountValue.total, // 折扣后的总价
            discountValue: discountValue.discount,
            payAmount: discountValue.payAmount,
        };
        localStorage.setItem(Keys.Product, JSON.stringify(productSelected));
        action('tab2');
    };
    return (
        <div className="flex flex-col justify-start w-full h-full">
            <div className="p-1 bg-white rounded-lg shadow-md w-full mx-auto space-y-4 overflow-hidden flex-shrink-0">
                {/* 第一行：图片 + 价格 + 数量 */}
                <div className="flex items-center gap-3">
                    <img src={selectedSKU.url || skus[0].url} alt="product" className="w-[120px] h-[120px] object-cover rounded-md flex-shrink-0" />
                    <div className="flex-1 flex flex-col justify-center h-full pr-2">
                        <div className="flex justify-start items-center text-sm pr-5">
                            <div className=" text-lg text-brand leading-[28px]">
                                {t('common.symbol')}
                                {discountValue.total.toFixed(2)}
                            </div>
                            {/* <div className="text-lg text-red-500 font-semibold leading-[28px]">${(selectedSKU.price * quantity).toFixed(2)}</div> */}
                        </div>
                        <div className="flex items-start gap-1 mt-0 text-sm pr-1">
                            <div className="w-8 text-xs text-left text-tip ">{t('product.selected')}:</div>
                            <div className="flex-1 text-xs min-w-0 text-left">
                                <div className="flex flex-wrap gap-x-2 gap-y-1 break-words pr-2 text-tip  overflow-hidden">
                                    {Object.entries(selectedSKU.attributes).map(([k, v]) => (
                                        <span key={k} className="whitespace-nowrap">
                                            {`${k}:${v}`}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 mt-4">
                            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-6 h-6 border rounded text-lg flex items-center justify-center hover:bg-gray-100">
                                -
                            </button>
                            <input type="number" value={quantity} onFocus={(e) => e.target.select()} onChange={(e) => setQuantity(Number(e.target.value))} className="w-5 h-5 mx-0 text-center rounded text-main" />
                            <button onClick={() => setQuantity((q) => q + 1)} className="w-6 h-6 border rounded text-lg flex items-center justify-center hover:bg-gray-100">
                                +
                            </button>
                            <div className="flex-1 text-xs text-left px-2">
                                <span className="text-sub">{t('product.stock')}</span>
                                <span className="text-main">16</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/** 第二行：商品属性选择 */}
                <div className="space-y-1">
                    {sortAttributes.map((label) => {
                        const values = Array.from(optionsWithValues.get(label) || []); // Map 用 .get()
                        if (!values || values.length === 0) return null;

                        return (
                            <div key={label}>
                                <div className="mb-1 text-label">{label}</div>
                                <div className="flex flex-wrap gap-2 ">
                                    {values.map((value) => (
                                        <button
                                            key={value}
                                            disabled={isDisabled(label, value)}
                                            onClick={() => handleOptionClick(label, value, selectedOptions[label] === value ? true : false)}
                                            className={`px-2 py-1 w-auto text-attr border-2 border-content-attr inline-block rounded bg-content-attr text-left ${
                                                selectedOptions[label] === value
                                                    ? 'border-selected-attr text-selected-attr bg-selected-attr '
                                                    : !isDisabled(label, value)
                                                      ? ''
                                                      : 'bg-gray-100 text-gray-400 border-gray-300 opacity-60 cursor-not-allowed'
                                            }`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/** 优惠 */}
            <div className="h-2"></div>
            <div className="text-right px-3 gap-1">
                <div className="flex justify-between text-main items-center sp-border-main py-1">
                    <span className="text-sub-main">{t('product.total')}</span>
                    <span className="text-main line-through">
                        {t('common.symbol')}
                        {discountValue.total.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between text-main items-center sp-border-main py-1">
                    <span className="text-sub-main">{t('product.first_order')}</span>
                    <span className="text-main">
                        -{t('common.symbol')}
                        {FirstOrder}
                    </span>
                </div>

                <div className="flex justify-between items-center text-main sp-border-main py-1">
                    <span className="flex items-center text-sub-main w-10">{t('product.tiered_discount')} </span>
                    <span className="flex flex-row font-medium">
                        <span className="mr-3 text-sub"></span>
                        <span className="text-main">{discountMoneyFormat(discountValue.discount, t('common.symbol'))}</span>
                    </span>
                </div>
                <div className="flex justify-end items-center text-tip sp-border-main py-1">
                    {discountValue.discount <= 0
                        ? ''
                        : t('product.tiered_discount_text', {
                              num: discountValue.nextDiscountNum - quantity,
                              discount: moneyFormat(discountValue.nextDiscount),
                          })}
                </div>
                <div className="flex justify-between text-important">
                    <span>{t('product.pay_amount')}</span>
                    <span>
                        {t('common.symbol')}
                        {discountValue.payAmount.toFixed(2)}
                    </span>
                </div>
            </div>
            <div className="h-4"></div>
            <button onClick={handleSubmit} className="w-full  py-2 button-main">
                {t('product.continue')}
            </button>
        </div>
    );
}
