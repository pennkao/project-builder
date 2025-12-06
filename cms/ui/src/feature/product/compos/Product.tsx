import { Input as InputField } from '@/components/Basic/Input';
import Loading from '@/components/Loading/Loading';
import { Input, Label } from '@/components/elements';
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
    // const { doPost } = usePost<number>('product-handle-count');
    const { api } = useApi();

    const setProductMainField = (field: keyof ProductMainType, value: string | string[] | number) => {
        setProductData((prev) => ({ ...prev, main: { ...prev.main, [field]: value } }));
    };

    //update handle
    useEffect(() => {
        if (!productData.main.name) {
            return;
        }
        if (productData.main.id && productData.main.id > 0) {
            return;
        }
        setProductMainField('handle', genHandle(productData.main.name, 0));
    }, [productData.main.name]);

    const handleCheckHandle = async () => {
        if (productData.main.id && productData.main.id > 0) {
            return;
        }
        if (!productData.main.name) {
            return;
        }
        if (!productData.main.handle) {
            return;
        }
        const count = await api.Get<number>('product-handle-count', { handle: productData.main.handle });
        if (count && count > 0) {
            setProductMainField('handle', genHandle(productData.main.name, count));
        }
    };

    const handleChange = (field: keyof ProductMainType, value: string) => {
        setProductMainField(field, formartValue(field, value));
    };

    return (
        <Card title="Product">
            <div className="space-y-6">
                <div>
                    <Label htmlFor="input">Product Name</Label>
                    <InputField
                        type="text"
                        className="w-full px-4 py-2.5"
                        id="input"
                        placeholder="Product Name"
                        value={productData.main?.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={handleCheckHandle}
                    />
                </div>
                <div>
                    <Label htmlFor="input">Handle</Label>
                    <Input type="text" placeholder="Handle" disabled={productId > 0} value={productData.main?.handle} onChange={(e) => handleChange('handle', e.target.value)} />
                </div>
                <div className="flex flex-row gap-1">
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Price</Label>
                        <Input type="number" placeholder="Price" min={'1'} step={5} value={formInput(productData.main?.price || '')} onChange={(e) => handleChange('price', e.target.value)} />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="input">Tags</Label>
                        <Input type="text" id="input" value={(productData.main?.tags ?? []).join(',')} placeholder="Tags" onChange={(e) => handleChange('tags', e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-row gap-1">
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Category</Label>
                        <Input type="text" placeholder="Category" value={productData.main?.category} onChange={(e) => handleChange('category', e.target.value)} />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Brand</Label>
                        <Input type="text" placeholder="Brand" value={productData.main?.brand} onChange={(e) => handleChange('brand', e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-row gap-1">
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Stock</Label>
                        <Input type="number" placeholder="Stock" min={'500'} step={100} onKeyDown={keyDownNumberInput} value={formInput(productData.main?.stock)} onChange={(e) => handleChange('stock', e.target.value)} />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Weigth (g)</Label>
                        <Input
                            type="number"
                            placeholder="Weight"
                            min={'100'}
                            step={50}
                            onKeyDown={keyDownNumberInput}
                            value={formInput(productData.main?.weight_g)}
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
                            value={formInput(productData.main?.points || '')}
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
                            value={formInput(productData.main?.sales_count)}
                            onChange={(e) => handleChange('sales_count', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}
