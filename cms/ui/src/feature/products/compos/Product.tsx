import { Input as InputField } from '@/components/Basic/Input';
import Loading from '@/components/Loading/Loading';
import { Input, Label, TextArea } from '@/components/elements';
import { Card } from '@/feature/compos/layout';
import { useApi } from '@/hooks/useApi';
import { formartValue, formInput, genHandle, keyDownNumberInput } from '@/utils/product';
import { useContext, useEffect } from 'react';
import { ProductContext } from '../context';
export default function ProductMain() {
    const context = useContext(ProductContext);
    if (!context) {
        return <Loading title="Product" />; // 或者其他处理方式
    }
    const { productId, productData, setProductData } = context;
    const { api } = useApi();

    const setProductMainField = (field: keyof ProductMainType, value: string | string[] | number) => {
        setProductData((prev) => ({ ...prev, product: { ...prev.product, [field]: value } }));
    };

    //update handle
    useEffect(() => {
        if (!productData.product.title) {
            return;
        }
        if (productData.product.id && productData.product.id > 0) {
            return;
        }
        setProductMainField('handle', genHandle(productData.product.title, 0));
    }, [productData.product.title]);

    const handleCheckHandle = async () => {
        if (productData.product.id && productData.product.id > 0) {
            return;
        }
        if (!productData.product.title) {
            return;
        }
        if (!productData.product.handle) {
            return;
        }
        const count = await api.Get<number>('product-handle-count', { handle: productData.product.handle });
        if (count && count > 0) {
            setProductMainField('handle', genHandle(productData.product.title, count));
        }
    };

    const handleChange = (field: keyof ProductMainType, value: string) => {
        setProductMainField(field, formartValue(field, value));
    };

    return (
        <Card title="Product">
            <div className="space-y-6">
                <div>
                    <Label htmlFor="input">Product Title</Label>
                    <InputField
                        type="text"
                        className="w-full px-4 py-2.5"
                        id="input"
                        placeholder="Product Title"
                        value={productData.product?.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        onBlur={handleCheckHandle}
                    />
                </div>
                <div>
                    <Label htmlFor="input">Subtitle</Label>
                    <InputField
                        type="text"
                        className="w-full px-4 py-2.5"
                        id="input"
                        placeholder="Subtitle"
                        value={productData.product?.subtitle}
                        onChange={(e) => handleChange('subtitle', e.target.value)}
                        onBlur={handleCheckHandle}
                    />
                </div>
                <div>
                    <Label htmlFor="input">Handle</Label>
                    <Input type="text" placeholder="Handle" disabled={productId > 0} value={productData.product?.handle} onChange={(e) => handleChange('handle', e.target.value)} />
                </div>
                <div className="flex flex-row gap-1">
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Price</Label>
                        <Input type="number" placeholder="Price" min={'1'} step={5} value={formInput(productData.product?.price || '')} onChange={(e) => handleChange('price', e.target.value)} />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="input">Tags</Label>
                        <Input type="text" id="input" value={(productData.product?.tags ?? []).join(',')} placeholder="Tags" onChange={(e) => handleChange('tags', e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-row gap-1">
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Category</Label>
                        <Input type="text" placeholder="Category" value={productData.product?.category} onChange={(e) => handleChange('category', e.target.value)} />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Brand</Label>
                        <Input type="text" placeholder="Brand" value={productData.product?.brand} onChange={(e) => handleChange('brand', e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-row gap-1">
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Stock</Label>
                        <Input
                            type="number"
                            placeholder="Stock"
                            min={'500'}
                            step={100}
                            onKeyDown={keyDownNumberInput}
                            value={formInput(productData.product?.stock)}
                            onChange={(e) => handleChange('stock', e.target.value)}
                        />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Weigth (g)</Label>
                        <Input
                            type="number"
                            placeholder="Weight"
                            min={'100'}
                            step={50}
                            onKeyDown={keyDownNumberInput}
                            value={formInput(productData.product?.weight_g)}
                            onChange={(e) => handleChange('weight_g', e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-1">
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Points</Label>
                        <Input
                            type="number"
                            placeholder="Points"
                            min={'1'}
                            step={5}
                            onKeyDown={keyDownNumberInput}
                            value={formInput(productData.product?.points || '')}
                            onChange={(e) => handleChange('points', e.target.value)}
                        />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="input">Sales</Label>
                        <Input
                            type="number"
                            placeholder="Sales"
                            min={'0'}
                            step={1}
                            onKeyDown={keyDownNumberInput}
                            value={formInput(productData.product?.sales_count)}
                            onChange={(e) => handleChange('sales_count', e.target.value)}
                        />
                    </div>
                </div>
                <Label htmlFor="inputTwo">Description</Label>
                <TextArea placeholder="Description" className="w-full px-4 py-2.5" value={productData.product?.description} onChange={(value) => handleChange('description', value)} rows={5} />
            </div>
        </Card>
    );
}
