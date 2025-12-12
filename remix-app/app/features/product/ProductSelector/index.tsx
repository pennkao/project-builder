import BaseImage from '@/components/BaseImage';
import { Keys } from '@/config/keys';
import { useJump } from '@/hooks/useJump';
import { SRC } from '@/lib/images';
import { discount, discountMoneyFormat, moneyFormat, randomIntRange } from '@/utils/tools';
import { t } from 'i18next';

import { useEffect, useMemo, useState } from 'react';
const FirstOrder = 3;
export default function ProductSelector({ action, product }: ProductSelectorProps) {
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(product.main.stock);
    const { isLoading, DoJump, Loading } = useJump('product-selector', action);

    const [discountValue, setDiscountInfo] = useState<DiscountInfoType>({
        discount: 0.0,
        total: 0.0,
        num: 0,
        payAmount: 0.0,
        nextDiscount: 0.0,
        nextDiscountNum: 0,
        paymentDiscount: 0.0,
    });
    if (product.skus.length > 1) {
        product.skus.sort((a, b) => a.price - b.price); // 按价格排序
    }
    const [selectedSKU, setSelectedSKU] = useState<SkuType>(product.skus[0]);
    const [sortedOptions, sortedAttrIds] = useMemo(() => {
        if (!product.options || product.options.length === 0) {
            return [[], new Map<string, number>()];
        }
        const attrIdSort = new Map<string, number>();
        const newOptions = (product.options || []).sort((a, b) => a.sort - b.sort).filter((x) => x.values.length > 0);
        newOptions.map((x) => attrIdSort.set(x.attr_id, x.sort));
        return [newOptions, attrIdSort];
    }, [product.options]);
    const [selectedValues, setSelecedValues] = useState<string[]>(Array.from({ length: sortedOptions.length }, () => ''));

    const handleOptionClick = (index: number, value_id: string, isSelected: boolean) => {
        if (isSelected) {
            setSelecedValues((prev) => [...prev.slice(0, index), '', ...prev.slice(index + 1)]);
            return;
        }
        setSelecedValues((prev) => [...prev.slice(0, index), value_id, ...prev.slice(index + 1)]);
    };

    useEffect(() => {
        setDiscountInfo(discount(quantity, selectedSKU.price, '', FirstOrder, product.main.points));
    }, [quantity, selectedSKU.price]);

    const [attr2SkuMap, attrHaveSku] = useMemo(() => {
        const map = new Map<string, SkuType>();
        let attrHaveSku = new Map<string, number>(); // key: "尺码S", value: Set["颜色红", "颜色蓝"]
        product.skus.forEach((sku) => {
            if (!sku.attrs || sku.attrs.length === 0 || sku.akey == 'default') {
                return;
            }
            const attrKey = sku?.attrs
                .sort((a, b) => (sortedAttrIds.get(a.attr_id) || 0) - (sortedAttrIds.get(b.attr_id) || 0))
                .map((x) => x.value_id)
                .join('#');
            map.set(attrKey, sku);
            if (sku && sku?.attrs.length > 0) {
                sku?.attrs.map((attr) => {
                    attrHaveSku.set(attr.value_id, 1);
                });
            }
        });

        return [map, attrHaveSku];
    }, [product.skus]); // ⚠️ 别忘了 sortAttributes 也在依赖中！

    const isDisabled = (attr_id: string, value_id: string) => {
        const h = attrHaveSku.get(value_id);
        if (h) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        const productDefault = JSON.parse(localStorage.getItem(Keys.Product) || '{}');
        const sku = productDefault?.sku as SkuType;
        if (productDefault) {
            setQuantity(productDefault?.quantity || 1);
            setSelectedSKU(productDefault?.sku || product.skus[0]);
            if (sku && sku?.attrs.length > 0) {
                setSelecedValues(sku?.attrs?.sort((a, b) => (sortedAttrIds.get(a.attr_id) || 0) - (sortedAttrIds.get(b.attr_id) || 0)).map((x) => x.value_id) || []);
            }
        }

        const vidx = localStorage.getItem(Keys.Index);
        if (vidx === null) {
            setTimeout(
                () => {
                    const vidx = localStorage.getItem(Keys.Index);
                    if (vidx !== null) {
                        return;
                    }

                    if (product.main.stock > 0) {
                        setStock((prev) => prev - 1);
                    }
                    localStorage.setItem(Keys.Index, String(stock));
                },
                randomIntRange(3000, 8000)
            );
        }
    }, []);

    //匹配sku
    useEffect(() => {
        for (let i = 0; i < selectedValues.length; i++) {
            if (selectedValues[i] === '') {
                setSelectedSKU(product.skus[0]);
                return;
            }
        }
        const attrKey = selectedValues.join('#');
        setSelectedSKU(attr2SkuMap.get(attrKey) || product.skus[0]);
    }, [selectedValues]);

    const handleSubmit = () => {
        if (!selectedSKU.id) {
            return;
        }
        const productSelected = {
            productId: product.main.id,
            title: product.main.title,
            sku: selectedSKU,
            firstOrder: FirstOrder, // 首单优惠
            points: product.main.points / 100,
            quantity: quantity,
            price: selectedSKU.price,
            image: selectedSKU.image || product.skus[0].image,
            total: discountValue.total, // 折扣后的总价
            discountValue: discountValue.discount,
            payAmount: discountValue.payAmount,
        };
        const pdata = JSON.stringify(productSelected);
        localStorage.setItem(Keys.Product, pdata);
        const ckdata = localStorage.getItem(Keys.Product);
        if (pdata == ckdata) {
            DoJump(true, '/checkout');
        }
    };

    const JsxValue = (optionItem: AttrType, value: AttrValueType, index: number, idx: number) => {
        let textClassName = 'px-2 py-1 w-auto text-attr border-2 text-left inline-block rounded';
        const defaultClassName = ' border-content-attr  bg-content-attr';
        const selectedClassName = 'border-selected-attr text-selected-attr bg-selected-attr';
        const disabledClassName = 'bg-gray-100 text-gray-400 border-gray-300 opacity-60 cursor-not-allowed';
        let colorClassName = 'px-2 py-1 w-auto text-attr text-left inline-block rounded ';
        let imageClassName = 'w-auto text-attr text-left inline-block rounded ';
        if (isDisabled(optionItem.attr_id, value.value_id)) {
            textClassName += ' ' + disabledClassName;
            colorClassName += ' opacity-20';
            imageClassName += ' opacity-20';
        } else {
            if (selectedValues[index] === value.value_id) {
                textClassName += ' ' + selectedClassName;
                colorClassName += ' border-3 border-gray-300';
                imageClassName += ' border-3 border-red-300';
            } else {
                textClassName += ' ' + defaultClassName;
                colorClassName += '  border-3 border-white';
                imageClassName += ' border-3 border-white';
            }
        }
        const jsxText = (
            <button key={idx} disabled={isDisabled(optionItem.attr_id, value.value_id)} onClick={() => handleOptionClick(index, value.value_id, selectedValues[index] === value.value_id)} className={textClassName}>
                {value.label}
            </button>
        );

        const jsxImage = (
            <button key={idx} disabled={isDisabled(optionItem.attr_id, value.value_id)} onClick={() => handleOptionClick(index, value.value_id, selectedValues[index] === value.value_id)} className={imageClassName}>
                <div className="w-8 h-8 flex items-center justify-center">
                    <img src={SRC(value.content)} alt="product" className=" w-full h-full object-cover flex-shrink-0 rounded-sm bg-cover" />
                    {/* <img src={value.content} alt="product" className="w-8 h-8 object-cover flex-shrink-0" /> */}
                </div>
            </button>
        );
        const jsxColor = (
            <button
                key={idx}
                disabled={isDisabled(optionItem.attr_id, value.value_id)}
                onClick={() => handleOptionClick(index, value.value_id, selectedValues[index] === value.value_id)}
                className={colorClassName}
                style={{ backgroundColor: value.content }}
            >
                <div className="w-3 h-5"></div>
            </button>
        );

        switch (optionItem.display) {
            case 'text':
                return jsxText;
            case 'image':
                return jsxImage;
            case 'color':
                return jsxColor;
            default:
                return jsxText;
        }
    };

    return (
        <>
            <div className="flex flex-col justify-start w-full h-full">
                <div className="p-1 bg-white rounded-lg shadow-md w-full mx-auto space-y-4 overflow-hidden flex-shrink-0">
                    {/* 第一行：图片 + 价格 + 数量 */}
                    <div className="flex items-center gap-3">
                        <div className="w-[120px] h-[120px]">
                            <BaseImage src={selectedSKU.image || product.skus[0].image} isUrl={true} alt="product" className="w-[120px] h-[120px] object-cover rounded-md flex-shrink-0" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center h-full pr-2">
                            <div className="flex justify-start items-center text-sm pr-5">
                                <div className="text-lg text-brand leading-[28px]">
                                    {t('common.symbol')}
                                    {discountValue.total.toFixed(2)}
                                </div>
                            </div>

                            <div className="flex items-start gap-1 mt-0 text-sm pr-1">
                                <div className="w-8 text-xs text-left text-tip ">{t('product.selected')}:</div>
                                <div className="flex-1 text-xs min-w-0 text-left">
                                    <div className="flex flex-wrap gap-x-2 gap-y-1 break-words pr-2 text-tip overflow-hidden">
                                        {selectedSKU.attrs.length > 0 &&
                                            selectedSKU.attrs.map((attr) => (
                                                <span key={attr.value_id} className="whitespace-nowrap">
                                                    {`${attr.name}:${attr.value}`}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 mt-4">
                                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-7 h-7 no-spinner border rounded  hover:bg-gray-100">
                                    -
                                </button>

                                <input
                                    type="number"
                                    value={quantity}
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-5 h-5 sm:w-12 sm:h-12 mx-0 text-center rounded text-main"
                                />

                                <button onClick={() => setQuantity((q) => q + 1)} className="w-7 h-7 border rounded  hover:bg-gray-100">
                                    +
                                </button>

                                <div className="flex-1 text-xs text-left px-2">
                                    <span className="text-sub">
                                        {t('product.stock')} <span className="text-blue-500">{stock}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 第二行：商品属性选择 */}
                    <div className="space-y-1">
                        {sortedOptions.map((optionItem, index) => {
                            return (
                                <div key={index}>
                                    <div className="mb-1 text-label">{optionItem.label}</div>

                                    <div className="flex flex-wrap gap-2">{optionItem.values.map((value, idx) => JsxValue(optionItem, value, index, idx))}</div>
                                </div>
                            );
                        })}
                    </div>
                    {/* 优惠 */}
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
                            <span className="text-sub-main">{t('product.points')}</span>
                            <span className="text-main">
                                {t('common.symbol')}
                                {(product.main.points / 100).toFixed(2)}
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
                            <span className="flex items-center text-sub-main w-30">{t('product.tiered_discount')}</span>
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

                    <button onClick={handleSubmit} className="w-full py-2 button-main">
                        {t('product.continue')}
                    </button>

                    {Loading}
                </div>
            </div>
        </>
    );
}
