import { buildJsonByOrderKeys, discount, discountMoneyFormat, moneyFormat } from '@/utils/tools';
import { useEffect, useMemo, useState } from 'react';

const FirstOrder = 3;
export default function ProductSelector({ options, skus, action }: ProductSelectorProps) {
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
    const [selectedPayment, setSelectedPayment] = useState('credit-card');
    useEffect(() => {
        setDiscountInfo(discount(quantity, selectedSKU.price, selectedPayment, FirstOrder));
    }, [quantity, selectedSKU.price, selectedPayment]);

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

    return (
        <div className="flex flex-col justify-start w-full h-full">
            <div className="p-1 bg-white rounded-lg shadow-md w-full mx-auto space-y-4 overflow-hidden flex-shrink-0">
                {/* 第一行：图片 + 价格 + 数量 */}
                <div className="flex items-center gap-3">
                    <img src={selectedSKU.url || skus[0].url} alt="product" className="w-[120px] h-[120px] object-cover rounded-md flex-shrink-0" />
                    <div className="flex-1 flex flex-col justify-center h-full pr-2">
                        <div className="flex justify-start items-center text-sm pr-5">
                            <div className=" text-lg text-brand leading-[28px]">${discountValue.total.toFixed(2)}</div>
                            {/* <div className="text-lg text-red-500 font-semibold leading-[28px]">${(selectedSKU.price * quantity).toFixed(2)}</div> */}
                        </div>
                        <div className="flex items-start gap-1 mt-0 text-sm pr-1">
                            <div className="w-8 text-xs text-left text-tip ">已选:</div>
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
                                <span className="text-sub">剩余</span>
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
                                <div className="text-sub-main mb-1">{label}</div>
                                <div className="flex flex-wrap gap-2 ">
                                    {values.map((value) => (
                                        <button
                                            key={value}
                                            disabled={isDisabled(label, value)}
                                            onClick={() => handleOptionClick(label, value, selectedOptions[label] === value ? true : false)}
                                            className={`px-3 py-1 border w-auto inline-block rounded-2xl text-sub text-left ${
                                                selectedOptions[label] === value
                                                    ? 'border-selected text-selected'
                                                    : !isDisabled(label, value)
                                                      ? 'bg-white text-gray-500 '
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

            <div className="flex justify-center items-center px-5 py-3 gap-7">
                <label className="flex items-center cursor-pointer py-2 px-3 border-1 border-green-600 rounded-full bg-green-100">
                    <input type="radio" name="payment" value="credit-card" checked={selectedPayment === 'credit-card'} onChange={() => setSelectedPayment('credit-card')} className="sr-only" />
                    <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2 ${selectedPayment === 'credit-card' ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                            {selectedPayment === 'credit-card' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className="text-main">Credit card</span>
                    </div>
                </label>

                <label className="flex items-center cursor-pointer px-3 py-2 border-1 border-blue-600 rounded-full  bg-blue-100">
                    <input type="radio" name="payment" value="paypal" checked={selectedPayment === 'paypal'} onChange={() => setSelectedPayment('paypal')} className="sr-only" />
                    <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2 ${selectedPayment === 'paypal' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                            {selectedPayment === 'paypal' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className="text-main">PayPal</span>
                    </div>
                </label>
            </div>

            {/** 优惠 */}
            <div className="text-right px-3 gap-1">
                <div className="flex justify-between text-sm  text-main sp-border-main pb-1">
                    <span className="text-sub-main">总金额</span>
                    <span className="text-main line-through">${discountValue.total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-main sp-border-main pb-1">
                    <span className="text-sub-main">首次购买</span>
                    <span className="text-main">-{FirstOrder}</span>
                </div>

                <div className="flex justify-between text-sm text-main sp-border-main pb-1">
                    <span className="text-sub-main">满减 </span>
                    <span className="font-medium">
                        <span className="mr-3 text-sub">
                            {discountValue.discount <= 0
                                ? ''
                                : `满${discountValue.num}减${moneyFormat(discountValue.discount)},再买${discountValue.nextDiscountNum - quantity}减${moneyFormat(discountValue.nextDiscount)}`}
                        </span>
                        <span className="text-main">{discountMoneyFormat(discountValue.discount)}</span>
                    </span>
                </div>
                <div className="flex justify-between text-sm text-black border-b pb-1">
                    <span className="text-sub">Payment Discount </span>
                    <span className="font-medium">
                        <span className="mr-3 text-sub-main">{discountValue.paymentDiscount <= 0 ? '' : `Credit Card Payment`}</span>
                        <span className="text-main">{discountMoneyFormat(discountValue.paymentDiscount)}</span>
                    </span>
                </div>
                <div className="flex justify-between text-important mt-2">
                    <span>总支付金额</span>
                    <span>${discountValue.payAmount.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={() => {
                    action('tab2');
                    console.log('action...');
                }}
                className="w-full  py-2 button-main"
            >
                继 续
            </button>
        </div>
    );
}
