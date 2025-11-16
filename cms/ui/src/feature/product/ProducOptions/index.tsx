import CloseButton from '@/components/Basic/CloseButton';
import { Input } from '@/components/Basic/Input';
import ComponentCard from '@/components/common/ComponentCard';
import ContentCard from '@/components/common/ContentCard';
import { Confirm } from '@/components/Confirm';
import Label from '@/components/form/Label';
import Loading from '@/components/Loading/Loading';
import TagInput from '@/components/TagInput';
import { ProductContext } from '@/context/product';
import { defaultSku } from '@/defaults/product';
import { PencilIcon, RefreshIcon } from '@/icons';
import { isrc } from '@/utils/image';
import { genProductSkuByOptions } from '@/utils/product';
import { Activity, useContext, useEffect, useRef, useState } from 'react';

export default function ProductOptions({ onOpenSelected, selectedSkuImages }: { selectedSkuImages: SkuSeletedImageType; onOpenSelected?: (key: number) => void }) {
    // const [options, setOptions] = useState<any[]>([]);

    const context = useContext(ProductContext);
    if (!context) {
        return <Loading title="Product Options" />; // 或者其他处理方式
    }
    const { productId, productData, setProductData, productDataInit } = context;
    const [attrOptions, setAttrOptions] = useState<ProductOptionsType>([]);

    const [skuList, setSkuList] = useState<SkuType[] | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [syncValue, setSyncValue] = useState<{ price: string | number; stock: string | number }>({ price: '', stock: '' });
    const fiexdTagsRef = useRef<ProductOptionsType | null>(null);

    //初始化，编辑
    useEffect(() => {
        if (productId <= 0) {
            return;
        }
        // setOptions(data.options.map((item) => item.option));
        if (productDataInit.options) {
            setAttrOptions(productDataInit.options);
        }
        if (productDataInit.skus) {
            setSkuList(productDataInit.skus);
        }

        if (fiexdTagsRef.current === null && productDataInit.options.length > 0) {
            fiexdTagsRef.current = productDataInit.options;
        }
        // setProductAttrOptionsDb(data.options);
    }, [productDataInit.skus, productDataInit.options]);

    const handleOption = (option: string) => {
        if (attrOptions.length >= 3) {
            Confirm('Error', '最多只能添加三个维度');
            return;
        }
        setAttrOptions((prev) => {
            const h = prev.some((x) => x.option == option);
            if (!h) {
                return [...prev, { sort: 0, option: option, values: [] }];
            }
            return prev;
        });
    };
    //只添加有value的或者修改
    const handleValueChange = (option: string, value: string) => {
        if (!option || !value) {
            return;
        }

        setAttrOptions((prev) =>
            prev.map(
                (item) =>
                    item.option === option
                        ? { ...item, values: [...item.values, value] } // 找到就 append
                        : item // 其他 option 保留不变
            )
        );
    };

    useEffect(() => {
        setProductData({ ...productData, options: (attrOptions || []).map((item, index) => ({ ...item, sort: index })) });
        setTimeout(() => {
            makeSkuList(productId);
        }, 500);
    }, [attrOptions]);
    useEffect(() => {
        setProductData({ ...productData, skus: skuList || [] });
    }, [skuList]);

    const makeSkuList = (productId: number) => {
        if (attrOptions.length <= 0) {
            return;
        }
        if (!attrOptions?.every((item) => item.values && item.values.length > 0)) {
            return; // 有至少一个 item.values 为空，就退出
        }

        const genSkuList = genProductSkuByOptions(attrOptions);
        const newSkuList = genSkuList.map((sku, index) => ({
            ...defaultSku,
            id: index,
            name: attrOptions.map((opt) => sku[opt.option]).join('-'),
            img: productData?.images?.[0] || '',
            price: 10,
            stock: parseInt((Math.random() * 100).toFixed(2)),
            attrs: sku,
        }));
        if (productId > 0) {
            // setSkuList((prev) => [...(prev || []), ...(newSkuList || [])]);
            setSkuList((prev) => {
                const old = prev?.filter((x) => x.product_id === productId) || [];
                const newList = newSkuList.filter((item) => !(old || []).some((x) => x.name === item.name));
                return [...old, ...newList];
            });

            return;
        }
        setSkuList(newSkuList);
    };
    useEffect(() => {
        console.log(selectedSkuImages);
        setSkuList((prev) => prev && prev.map((item, index) => (index === selectedSkuImages.index ? { ...item, image: selectedSkuImages.image } : item)));
    }, [selectedSkuImages]);

    //输入金额等
    const handleSkuInput = (index: number, key: keyof SkuType, value: string | number) => {
        setSkuList((prev) => prev && prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
    };

    //批量编辑
    const handleBatch = (key: keyof SkuType, value: string) => {
        setSyncValue((prev) => ({ ...prev, [key]: value }));
        setSkuList(
            (prev) =>
                prev &&
                prev.map((item) => ({
                    ...item,
                    [key]: value,
                }))
        );
    };

    //进制删除的tag，编辑产品时，原有的option和value不能删除
    const lockTags = (option: string, tag: string) => {
        if (option === '' && tag === '') {
            Confirm('Error', 'Cannot delete the original attribute name.');
            return false;
        }
        const hasValue = fiexdTagsRef.current?.find((x) => x.option === option)?.values?.length == attrOptions?.find((x) => x.option === option)?.values?.length;
        if (hasValue) {
            Confirm('Error', 'Cannot delete the original attribute value.');
            return false;
        }
        return true;
    };

    //重新生成sku&&同步
    const handleRemove = (option: string, tag: string) => {
        //编辑时，禁止删除option
        if (productId > 0 && !lockTags(option, tag)) {
            return;
        }

        //delete 删除option
        if (option === '' && tag === '') {
            setAttrOptions((prev) => prev.slice(0, -1));
            return;
        }
        if (tag === '') {
            setAttrOptions((prev) =>
                prev.map((item) =>
                    item.option === option
                        ? { ...item, values: item.values.slice(0, -1) } // 去掉最后一个
                        : item
                )
            );
            return;
        }
        //delete 删除option
        if (option === '') {
            setAttrOptions((prev) => prev.filter((x) => x.option !== tag));
            return;
        }
        setAttrOptions((prev) => {
            return prev.map((item) =>
                item.option === option
                    ? { ...item, values: item.values.filter((x) => x !== tag) } // 删除指定 tag
                    : item
            );
        });
    };

    return (
        <>
            <ComponentCard title="Product Options">
                <ContentCard className="flex flex-col gap-1">
                    <Label>Options</Label>
                    <TagInput
                        disabled={productId > 0 && attrOptions.length > 0 ? true : false}
                        tags={[...(attrOptions || [])].map((item) => item.option)}
                        onRemove={(tag) => handleRemove('', tag)}
                        onChange={(tag) => handleOption(tag)}
                        placeholder="Input option name, and press Enter"
                    />
                    {attrOptions && attrOptions.length > 0 && <div className="h-px border-b-2  border-gray-100  mt-5 mb-5 dark:border-gray-700"></div>}

                    {attrOptions &&
                        attrOptions.length > 0 &&
                        attrOptions.map((item, index) => (
                            <div key={index}>
                                <Label className="m-0 mt-4 text-sm font-medium text-gray-600 ">[{item.option}]</Label>
                                <TagInput
                                    tags={item.values}
                                    // initTags={fiexdTagsRef.current[index].values}
                                    onRemove={(tag) => handleRemove(item.option, tag)}
                                    placeholder="Input value, and press Enter"
                                    onChange={(tag) => handleValueChange(item.option, tag)}
                                />
                            </div>
                        ))}
                </ContentCard>

                <Activity mode={skuList && skuList.length > 0 ? 'visible' : 'hidden'}>
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
                                                    <Input type="number" className="w-11 px-1 py-2" value={syncValue.stock} onChange={(e) => handleBatch('stock', e.target.value)} />
                                                </div>
                                                <div className="w-3"></div>
                                            </div>
                                        </div>
                                    </Activity>
                                    {skuList?.map((sku, index) => (
                                        <div key={index}>
                                            <div key={index} className="flex justify-between items-center px-4 hover:bg-gray-100 dark:hover:bg-gray-800">
                                                <div>{sku.name}</div>
                                                <div className="flex gap-4 items-center">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 flex items-center justify-center  rounded-lg hover:bg-blue-200 dark:hover:bg-gray-600">
                                                            <button
                                                                className="w-full h-full flex items-center justify-center"
                                                                onClick={() => {
                                                                    onOpenSelected?.(index);
                                                                }}
                                                            >
                                                                <PencilIcon className="w-4 h-4 hover:text-blue-600 dark:hover:text-white" />
                                                            </button>
                                                        </div>
                                                        {sku.image ? (
                                                            <img src={isrc(sku.image)} alt="" className="w-11 h-11 flex items-center rounded-md" onChange={() => handleSkuInput(index, 'image', '')} />
                                                        ) : (
                                                            <div className="w-11 h-11 flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-600">Img</div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <Input type="number" className="w-11 flex items-center" value={sku.price} onChange={(e) => handleSkuInput(index, 'price', e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <Input type="number" className="w-11 flex items-center" value={sku.stock} onChange={(e) => handleSkuInput(index, 'stock', e.target.value)} />
                                                    </div>
                                                    <div className="w-3">
                                                        {!productId || !sku.product_id ? (
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
            </ComponentCard>
        </>
    );
}
