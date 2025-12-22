import { Input } from '@/components/Basic/Input';
import ContentCard from '@/components/common/ContentCard';
import { Confirm, TagInput } from '@/components/composed';
import { CloseButton, Label, RadioSm } from '@/components/elements';
import Loading from '@/components/Loading/Loading';
import { defaultSku } from '@/defaults/product';
import { Card } from '@/feature/compos/layout';
import { PencilIcon, RefreshIcon } from '@/icons';
import { SRC } from '@/lib/image';
import { formartValue, keyDownNumberInput } from '@/utils';
import { Md5 } from 'ts-md5';
import { ProductContext } from '../context';
import { makeSkuListByAttrs } from '../utils/attrs';

import { Activity, useContext, useEffect, useRef, useState } from 'react';

export default function ProductOptions({ onOpenSelected, selectedSkuImages }: { selectedSkuImages: ImageChannelType; onOpenSelected?: (target: ImageTargetType) => void }) {
    // const [options, setOptions] = useState<any[]>([]);

    const context = useContext(ProductContext);
    if (!context) {
        return <Loading title="Product Options" />; // 或者其他处理方式
    }
    const { productId, productData, setProductData, productDataInit } = context;
    const [productAttr, setProductAttr] = useState<AttrType[]>([]);
    const [skuList, setSkuList] = useState<SkuType[] | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isEditAttr, setIsEditAttr] = useState<number | string>(-1);
    const [syncValue, setSyncValue] = useState<{ price: string | number; stock: string | number }>({ price: '', stock: '' });
    const fiexdTagsRef = useRef<AttrType[] | null>(null);

    //初始化，编辑
    useEffect(() => {
        setProductAttr([]);
        setSkuList([]);
        if (productId <= 0) {
            return;
        }
        if (productDataInit.options) {
            setProductAttr(productDataInit.options);
        }
        if (productDataInit.skus) {
            setSkuList(productDataInit.skus);
        }

        if (fiexdTagsRef.current === null && productDataInit.options.length > 0) {
            fiexdTagsRef.current = productDataInit.options;
        }
    }, [productDataInit.skus, productDataInit.options]);

    const makeNewAttr = (option: string) => ({ attr_id: 'a' + '#' + Md5.hashStr(option), name: option, label: option, display: 'text', sort: 0, values: [] }) as AttrType;
    const makeNewAttrValue = (option: string, value: string) => ({ value_id: 'v' + '#' + Md5.hashStr(option + ':' + value), value: value, label: value, content: value }) as AttrValueType;
    const handleOption = (option: string) => {
        if (productAttr.length >= 3) {
            Confirm('Error', '最多只能添加三个维度');
            return;
        }

        setProductAttr((prev) => [...prev, makeNewAttr(option)]); // 清空属性
    };
    //只添加有value的或者修改
    const handleValueChange = (option: string, value: string) => {
        if (!option || !value) {
            return;
        }

        setProductAttr((prev) =>
            prev.map(
                (item) =>
                    item.name === option
                        ? { ...item, values: [...item.values, makeNewAttrValue(option, value)] } // 找到就 append
                        : item // 其他 option 保留不变
            )
        );
    };

    useEffect(() => {
        const sortProductAttr = productAttr.map((item, index) => ({ ...item, sort: index }));
        setProductData((prev) => ({ ...prev, options: sortProductAttr }));
        setTimeout(() => {
            if (productId > 0) {
                return;
            }
            makeSkuList(productId);
        }, 500);
    }, [productAttr]);

    useEffect(() => {
        setProductData((prev) => ({ ...prev, skus: skuList || [] }));
    }, [skuList]);

    const makeSkuList = (productId: number) => {
        if (productAttr.length <= 0) {
            return;
        }
        if (!productAttr?.every((item) => item.values && item.values.length > 0)) {
            return; // 有至少一个 item.values 为空，就退出
        }
        const genSkuList = makeSkuListByAttrs(productAttr);
        const newSkuList = genSkuList.map(
            (skuAttrArray, index) =>
                ({
                    ...defaultSku,
                    product_id: productId > 0 ? productId : 0,
                    id: index,
                    title: skuAttrArray.map((attr) => attr.value).join('-'),
                    image: productData?.images?.[0] || '',
                    price: productData?.product?.price || 0,
                    stored: 0,
                    ukey: '',
                    akey: skuAttrArray.map((attr) => attr.value).join('-'),
                    stock: parseInt((Math.random() * 100).toFixed(2)),
                    attrs: skuAttrArray,
                }) as SkuType
        );
        if (productId > 0) {
            setSkuList((prev) => {
                const old = prev?.filter((x) => x.ukey !== '') || [];
                const newList = newSkuList.filter((item) => !(old || []).some((x) => x.akey === item.akey));
                return [...old, ...newList];
            });
            // console.log(skuList);
            return;
        }
        setSkuList(newSkuList);
    };

    useEffect(() => {
        switch (selectedSkuImages.target) {
            case 'sku_image':
                setSkuList((prev) => prev && prev.map((item, index) => (index === selectedSkuImages.index ? { ...item, image: selectedSkuImages.images[0] || '' } : item)));
                break;
            case 'attr_value_image':
                setProductAttr((prev) =>
                    prev.map((item) =>
                        item.attr_id === selectedSkuImages.selector?.attr_id
                            ? { ...item, values: item.values.map((value) => (value.value_id === selectedSkuImages.selector?.value_id ? { ...value, content: selectedSkuImages.images[0] || '' } : value)) }
                            : item
                    )
                );
                break;
        }
    }, [selectedSkuImages]);

    //输入金额等
    const handleSkuInput = (index: number, key: keyof SkuType, value: string) => {
        setSkuList((prev) => prev && prev.map((item, i) => (i === index ? { ...item, [key]: formartValue(key, value) } : item)));
    };

    //批量编辑
    const handleBatch = (key: keyof SkuType, value: string) => {
        let newValue = formartValue(key, value);
        setSyncValue((prev) => ({ ...prev, [key]: newValue }));
        setSkuList(
            (prev) =>
                prev &&
                prev.map((item) => ({
                    ...item,
                    [key]: newValue,
                }))
        );
    };

    const handleOptionLabel = (index: number, label: string) => {
        setProductAttr((prev) => prev.map((item, i) => (i === index ? { ...item, label: label } : item)));
    };

    const handleChangeValue = (attrIndex: number, index: number, field: string, label: string) => {
        setProductAttr((prev) =>
            prev.map((item, i) => {
                if (i === attrIndex) {
                    // 对item进行浅拷贝，并更新values数组
                    const updatedValues = item.values.map((value, j) => {
                        if (j === index) {
                            // 对value进行浅拷贝并更新label
                            if (field === 'color') {
                                return { ...value, content: label };
                            }
                            return { ...value, label: label };
                        }
                        return value;
                    });

                    // 返回更新后的item，保留其他字段不变
                    return { ...item, values: updatedValues };
                }
                return item; // 如果没有匹配的attrIndex，保持原来的item不变
            })
        );
    };

    //重新生成sku&&同步
    const handleRemove = (option: string, tag: string) => {
        //编辑时，禁止删除option
        if (productId > 0) {
            if (option === '' && tag === '') {
                Confirm('Error', 'Cannot delete the original attribute name.');
                return false;
            }
            const hasValue = fiexdTagsRef.current?.find((x) => x.name === option)?.values?.length == productAttr?.find((x) => x.name === option)?.values?.length;
            if (hasValue) {
                Confirm('Error', 'Cannot delete the original attribute value.');
                return false;
            }
        }
        //delete 删除option
        if (option === '' && tag === '') {
            setProductAttr((prev) => prev.slice(0, -1));
            return;
        }
        if (option != '' && tag === '') {
            setProductAttr((prev) =>
                prev.map((item) => {
                    // console.log('Before update, item.values:', item.values); // 打印当前值
                    if (item.name === option && item.values.length > 0) {
                        return { ...item, values: item.values.slice(0, -1) }; // 去掉最后一个元素
                    }
                    return item;
                })
            );

            return;
        }
        //delete 删除option
        if (option === '') {
            setProductAttr((prev) => prev.filter((x) => x.name !== tag));
            return;
        }
        if (option !== '' && tag !== '') {
            setProductAttr((prev) => {
                return prev.map((item) =>
                    item.name === option
                        ? { ...item, values: item.values.filter((x) => x.value !== tag) } // 删除指定 tag
                        : item
                );
            });
        }
    };

    const moveDown = (index: number) => {
        // console.log(index, 'index-down');
        if (index === productAttr.length - 1) return; // 如果是最后一个元素，则不执行操作
        const newItems = [...productAttr];
        // 交换当前元素和下一个元素的位置
        [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
        setProductAttr(newItems);
    };
    const moveUp = (index: number) => {
        // console.log(index, 'index-up');
        if (index === 0) return; // 如果是第一个元素，则不执行操作
        const newItems = [...productAttr];
        // 交换当前元素和上一个元素的位置
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
        setProductAttr(newItems);
    };
    const handleChangeDisplay = (idx: number, tag: AttrDisplayType) => {
        setProductAttr((prev) => {
            return prev.map((item, index) => {
                if (index === idx) {
                    return { ...item, display: tag };
                } else {
                    return item;
                }
            });
        });
    };

    return (
        <>
            <Card title="Product Options">
                <ContentCard className="flex flex-col gap-1">
                    <Activity mode={isEditAttr === 'option' ? 'hidden' : 'visible'}>
                        <div className="flex items-center justify-between gap-2 px-1">
                            <span className="text-black font-medium dark:text-gray-300">Options</span>
                            {productAttr && productAttr?.length > 0 && (
                                <button className="text-base" onClick={() => setIsEditAttr((prev) => (prev === 'option' ? -1 : 'option'))}>
                                    <span className="text-blue-600 tex-sm dark:text-gray-300">[✏ 编辑]</span>
                                </button>
                            )}
                        </div>
                        <TagInput
                            disabled={productId > 0 && productDataInit.skus.length > 0 ? true : false}
                            tags={productAttr && productAttr?.map((item) => item.name)}
                            onRemove={(tag) => handleRemove('', tag)}
                            onChange={(tag) => handleOption(tag)}
                            placeholder="Input option name, and press Enter"
                        />
                    </Activity>
                    <Activity mode={isEditAttr === 'option' ? 'visible' : 'hidden'}>
                        <div className="flex items-center justify-between gap-2 px-1">
                            <span className="text-black font-medium dark:text-gray-300">Options</span>
                        </div>
                        <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
                            {/* <span className="text-black font-medium dark:text-gray-300">[{item.option}]</span> */}
                            <div className="flex flex-col gap-2 p-1">
                                {productAttr &&
                                    (productAttr || [])?.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between gap-2 p-2 border-b dark:border-gray-700">
                                            {/* Option Display and Input */}
                                            <div className="flex items-center justify-start gap-2">
                                                <div className="flex items-center space-x-2 text-base">
                                                    {/* <span className="font-medium text-gray-800 rounded-sm">[{item.option}]</span> */}
                                                    <Input
                                                        type="text"
                                                        custom={true}
                                                        value={item.label}
                                                        onChange={(e) => handleOptionLabel(index, e.target.value)}
                                                        className="w-28 h-6 px-2 py-1 text-sm font-medium border-none text-gray-900 rounded-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-15">
                                                {/* Additional Info Section */}
                                                <div className="flex items-center space-x-2 text-sm text-gray-800 dark:text-gray-200">
                                                    {/* <span>[Text]{index}</span> */}
                                                    <RadioSm
                                                        id={`text-${index}`}
                                                        label="Text"
                                                        name={item.name} // ✅ 每行独立分组
                                                        value="text"
                                                        checked={item.display === 'text'}
                                                        onChange={() => handleChangeDisplay(index, 'text')}
                                                    />
                                                    <RadioSm
                                                        id={`image-${index}`}
                                                        label="Image"
                                                        name={item.name} // ✅ 每行独立分组
                                                        value="image"
                                                        checked={item.display === 'image'}
                                                        onChange={() => handleChangeDisplay(index, 'image')}
                                                    />
                                                    <RadioSm
                                                        id={`color-${index}`}
                                                        label="Color"
                                                        name={item.name} // ✅ 每行独立分组
                                                        value="color"
                                                        checked={item.display === 'color'}
                                                        onChange={() => handleChangeDisplay(index, 'color')}
                                                    />
                                                </div>

                                                <div className="flex flex-col items-center justify-center  text-blue-300">
                                                    {index > 0 && (
                                                        <button onClick={() => moveUp(index)}>
                                                            <span className="text-xs hover:text-blue-600">▲</span>
                                                        </button>
                                                    )}
                                                    {index < productAttr.length - 1 && (
                                                        <button onClick={() => moveDown(index)}>
                                                            <span className="text-xs hover:text-blue-600">▼</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <div>{/* <Input type="text" className="w-28 h-8 px-1 py-1 rounded-sm" custom={true} value={item.option} /> */}</div>
                            <div className="flex items-center justify-end gap-2">
                                <button className="text-base" onClick={() => setIsEditAttr(-1)}>
                                    <span className="text-blue-600 text-sm dark:text-gray-300">[Save]</span>
                                </button>
                            </div>
                        </div>
                    </Activity>
                    {productAttr && productAttr.length > 0 && <div className="h-px border-b-2  border-gray-100  mt-5 mb-5 dark:border-gray-700"></div>}
                    {/*values*/}
                    {productAttr &&
                        productAttr.length > 0 &&
                        productAttr.map((item, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <Activity mode={isEditAttr === index ? 'hidden' : 'visible'}>
                                    <div className="flex flex-col gap-1 pt-1">
                                        <div className="flex items-center justify-between gap-2 px-1">
                                            <div className="flex items-center justify-between gap-2 px-1">
                                                <span className="text-black font-medium dark:text-gray-300">
                                                    [{item.name}]: {item.label}
                                                </span>
                                            </div>
                                            {item.values.length > 0 && (
                                                <button className="text-base" onClick={() => setIsEditAttr((prev) => (prev === index ? -1 : index))}>
                                                    <span className="text-blue-600 tex-sm dark:text-gray-300">[✏ 编辑]</span>
                                                </button>
                                            )}
                                        </div>
                                        <TagInput
                                            tags={item.values.map((x) => x.value)}
                                            // initTags={fiexdTagsRef && fiexdTagsRef?.current ? fiexdTagsRef?.current[index].values.map((x) => x.value) : []}
                                            onRemove={(tag) => handleRemove(item.name, tag)}
                                            placeholder="Input value, and press Enter"
                                            onChange={(tag) => handleValueChange(item.name, tag)}
                                        />
                                    </div>
                                    <div className="flex flex-col h-5 gap-2 "></div>
                                </Activity>
                                <Activity mode={isEditAttr === index ? 'visible' : 'hidden'}>
                                    <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
                                        <span className="text-black  font-medium dark:text-gray-300 px-1">
                                            [{item.name}]: {item.label}
                                        </span>
                                        {item.values.map((value, idx) => (
                                            <div key={idx} className="flex items-center justify-start gap-2 border-b dark:border-gray-700">
                                                <div className="flex w-full items-center justify-between p-1">
                                                    <div>
                                                        {item.name}, "{value.value}"
                                                    </div>
                                                    {item.display === 'image' || item.display === 'icon' ? (
                                                        <div className="flex items-center justify-start gap-5">
                                                            <div>{value.label}</div>
                                                            <div className="flex items-center justify-start gap-2">
                                                                <div className="w-3">
                                                                    <button
                                                                        className="w-full h-full flex items-center justify-center"
                                                                        onClick={() => {
                                                                            onOpenSelected?.({ target: 'attr_value_image', index: idx, limit: 1, selector: { attr_id: item.attr_id, value_id: value.value_id } });
                                                                        }}
                                                                    >
                                                                        <PencilIcon className="w-4 h-4 hover:text-blue-600 dark:hover:text-white" />
                                                                    </button>
                                                                </div>
                                                                <img src={SRC(value.content)} className="w-8 h-8 rounded-sm" />
                                                            </div>
                                                        </div>
                                                    ) : item.display === 'color' ? (
                                                        // <div className="flex items-center justify-start gap-5">
                                                        <Input
                                                            type="text"
                                                            className="w-28 h-8 px-1 py-1 rounded-sm"
                                                            custom={true}
                                                            value={value.content}
                                                            onChange={(e) => handleChangeValue(index, idx, 'color', e.target.value)}
                                                        />
                                                    ) : (
                                                        // </div>
                                                        <Input
                                                            type="text"
                                                            className="w-28 h-8 px-1 py-1 rounded-sm"
                                                            custom={true}
                                                            value={value.label}
                                                            onChange={(e) => handleChangeValue(index, idx, 'label', e.target.value)}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="flex items-center justify-end gap-2 p-2">
                                            <button className="text-base" onClick={() => setIsEditAttr(-1)}>
                                                <span className="text-blue-600 text-sm dark:text-gray-300">[Save]</span>
                                            </button>
                                        </div>
                                    </div>
                                </Activity>
                            </div>
                        ))}
                </ContentCard>
                <Activity mode={(productAttr && productAttr.length > 0) || productId > 0 ? 'visible' : 'hidden'}>
                    <ContentCard className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-center">
                            <Label>Product Variant</Label>
                            <div>
                                <button onClick={() => makeSkuList(productId)}>
                                    <RefreshIcon className="transition-transform  duration-800  hover:rotate-90" />
                                </button>
                            </div>
                        </div>

                        <Activity mode={skuList && skuList.length > 0 ? 'visible' : 'hidden'}>
                            <div className="h-5"></div>
                            <div className="w-full flex flex-col">
                                <div className="h-11 px-4  w-full flex  justify-between items-center bg-gray-100 dark:bg-gray-700">
                                    <div className="flex items-center">Attrbuite</div>
                                    <div className="w-full flex justify-end items-center gap-4">
                                        <div className="flex items-center justify-start min-w-11">Image</div>
                                        <div className="flex items-center min-w-11">Price</div>
                                        <div className="flex items-center min-w-11">Stock</div>
                                        <div className="w-3">
                                            <button className="text-base" onClick={() => setIsEdit((prev) => !prev)}>
                                                <PencilIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 mt-1">
                                    <Activity mode={isEdit ? 'visible' : 'hidden'}>
                                        <div className="flex justify-between items-center px-4">
                                            <div></div>
                                            <div className="flex gap-4 items-center">
                                                <div className="flex items-center min-w-11">
                                                    <div className="w-11 h-11 rounded-md" />
                                                </div>
                                                <div className="flex items-center min-w-11">
                                                    <Input type="number" className="w-11 px-1 py-2" value={syncValue.price} onChange={(e) => handleBatch('price', e.target.value)} />
                                                </div>
                                                <div className="flex items-center min-w-11">
                                                    <Input type="text" className="w-11 px-1 py-2" onKeyDown={keyDownNumberInput} value={syncValue.stock} onChange={(e) => handleBatch('stock', e.target.value)} />
                                                </div>
                                                <div className="w-3"></div>
                                            </div>
                                        </div>
                                    </Activity>
                                    {skuList?.map((sku, index) => (
                                        <div key={index}>
                                            <div key={index} className="flex justify-between items-center px-4 hover:bg-gray-100 dark:hover:bg-gray-800">
                                                <div>
                                                    <Input type="text" className="w-full px-1 py-2 border-none" value={sku.title} onChange={(e) => handleSkuInput(index, 'title', e.target.value)} />
                                                </div>
                                                <div className="flex gap-4 items-center">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 flex items-center justify-center  rounded-lg hover:bg-blue-200 dark:hover:bg-gray-600">
                                                            <button
                                                                className="w-full h-full flex items-center justify-center"
                                                                onClick={() => {
                                                                    onOpenSelected?.({ target: 'sku_image', index: index, limit: 1 });
                                                                }}
                                                            >
                                                                <PencilIcon className="w-4 h-4 hover:text-blue-600 dark:hover:text-white" />
                                                            </button>
                                                        </div>
                                                        {sku.image ? (
                                                            <div className="aspect-square w-11 h-11">
                                                                <img src={SRC(sku.image)} alt="" className="w-11 h-11 flex items-center rounded-md object-cover" onChange={() => handleSkuInput(index, 'image', '')} />
                                                            </div>
                                                        ) : (
                                                            <div className="w-11 h-11 flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-600">Img</div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <Input type="number" className="w-11 flex items-center" value={sku.price} onChange={(e) => handleSkuInput(index, 'price', e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <Input
                                                            type="text"
                                                            className="w-11 flex items-center"
                                                            onKeyDown={keyDownNumberInput}
                                                            value={sku.stock}
                                                            onChange={(e) => handleSkuInput(index, 'stock', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="w-3">
                                                        {sku.ukey == '' ? (
                                                            <CloseButton
                                                                onClose={() => {
                                                                    setSkuList(skuList.filter((_, i) => i !== index));
                                                                }}
                                                            />
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Activity>
                    </ContentCard>
                </Activity>
            </Card>
        </>
    );
}
