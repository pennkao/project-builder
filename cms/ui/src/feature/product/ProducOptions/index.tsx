import CloseButton from '@/components/Basic/CloseButton';
import { Input } from '@/components/Basic/Input';
import ComponentCard from '@/components/common/ComponentCard';
import ContentCard from '@/components/common/ContentCard';
import Label from '@/components/form/Label';
import TagInput from '@/components/TagInput';
import Button from '@/components/ui/button/Button';
import { defaultSku } from '@/defaults/product';
import { PencilIcon } from '@/icons';
import { isrc } from '@/utils/image';
import { genProductSkuByOptions } from '@/utils/product';
import { Activity, useEffect, useState } from 'react';
export default function ProductOptions({
    onChange,
    onOpenSelected,
    onSkuChange,
    selectedSkuImages,
}: {
    selectedSkuImages: { index: number; img: string };
    onChange?: (attrOptions: ProductOptionsType) => void;
    onSkuChange?: (skuList: SkuType[]) => void;
    onOpenSelected?: (key: string | number) => void;
}) {
    const [options, setOptions] = useState<any[]>([]);
    const [attrOptions, setAttrOptions] = useState<ProductOptionsType>([]);
    const [skuList, setSkuList] = useState<SkuType[] | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [syncValue, setSyncValue] = useState<{ price: string | number; stock: string | number }>({ price: '', stock: '' });
    useEffect(() => {
        if (skuList && skuList.length > 0) {
            onSkuChange?.(skuList);
        }
    }, [skuList]);
    //只添加有value的或者修改
    const handleValueChange = (option: string, values: string[]) => {
        if (!options.includes(option)) {
            return;
        }
        if (values.length <= 0) {
            return;
        }
        setAttrOptions((prev) => {
            const f = prev.filter((item) => item.option !== option || item.values.length <= 0);
            return [...f, { option: option, values: values }];
        });
        // setAttrOptions((prev) => [...prev, { option: option, values: values }]);
    };

    useEffect(() => {
        onChange?.(attrOptions);
    }, [attrOptions]);

    //只删除
    useEffect(() => {
        if (options.length == 0) {
            setAttrOptions([]);
            return;
        }
        if (options.length > 0) {
            setAttrOptions((prev) => {
                return prev.filter((item) => options.includes(item.option));
            });
        }
    }, [options]);
    const handleClear = () => {
        // setAttrOptions([]);
        // setOptions([]);
        setSkuList(null);
    };
    const handleGen = () => {
        if (attrOptions.length <= 0) {
            return;
        }
        const genSkuList = genProductSkuByOptions(attrOptions);
        const newSkuList = genSkuList.map((sku, index) => ({
            ...defaultSku,
            id: index,
            name: attrOptions.map((opt) => sku[opt.option]).join('-'),
            img: '',
            price: 10,
            stock: parseInt((Math.random() * 100).toFixed(2)),
            attrs: sku,
        }));
        setSkuList(newSkuList);
    };
    useEffect(() => {
        setSkuList((prev) => prev && prev.map((item, index) => (index === selectedSkuImages.index ? { ...item, img: selectedSkuImages.img } : item)));
    }, [selectedSkuImages]);
    const handleSkuInput = (index: number, key: keyof SkuType, value: string | number) => {
        setSkuList((prev) => prev && prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
    };
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
    return (
        <>
            <ComponentCard title="Product Options w-full">
                <ContentCard className="flex flex-col gap-1">
                    <Label>Options</Label>
                    <TagInput onChange={setOptions} placeholder="Input option name, and press Enter" />
                    {options.length > 0 && <div className="h-px border-b-2  border-gray-100  mt-5 mb-5 dark:border-gray-700"></div>}

                    {options.map((option, index) => (
                        <>
                            <Label key={index - option} className="m-0 mt-4 text-sm font-medium text-gray-600 ">
                                [{option}]
                            </Label>
                            <TagInput
                                key={index}
                                onChange={(values) => {
                                    handleValueChange(option, values);
                                }}
                                placeholder="Input value, and press Enter"
                            />
                        </>
                    ))}
                </ContentCard>

                <Activity mode={options && options.length > 0 ? 'visible' : 'hidden'}>
                    <ContentCard className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-center">
                            <Label>Product Variant</Label>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        handleClear();
                                    }}
                                >
                                    Clean Up
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        handleGen();
                                    }}
                                >
                                    Generate Variants
                                </Button>
                            </div>
                        </div>

                        {/* <Activity mode={skuList && skuList.length > 0 ? 'visible' : 'hidden'}> */}
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
                                    <>
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
                                                    {sku.img ? (
                                                        <img src={isrc(sku.img)} alt="" className="w-11 h-11 flex items-center rounded-md" onChange={() => handleSkuInput(index, 'img', '')} />
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
                                                    <CloseButton
                                                        onClose={() => {
                                                            setSkuList(skuList.filter((_, i) => i !== index));
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                        {/* </Activity> */}
                    </ContentCard>
                </Activity>
            </ComponentCard>
        </>
    );
}
