import { Input as InputField } from '@/components/Basic/Input';
import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Loading from '@/components/Loading/Loading';
import { ProductContext } from '@/context/product';
import { usePost } from '@/hooks/usePost';
import { genHandle } from '@/utils/product';
import { formartInputNumber } from '@/utils/tools';
import { useContext, useEffect } from 'react';
export default function ProductMain() {
    const context = useContext(ProductContext);
    if (!context) {
        return <Loading title="Product" />; // 或者其他处理方式
    }
    const { productId, productData, setProductData } = context;
    const { doPost } = usePost<number>('product-handle-count');

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
        const count = await doPost({
            params: {
                handle: productData.main.handle,
            },
        });
        if (count && count > 0) {
            setProductMainField('handle', genHandle(productData.main.name, count));
        }
    };

    const formartValue = (field: keyof ProductMainType, value: string): string | string[] | number => {
        switch (field) {
            case 'stock':
            case 'weight_g':
                return Number.parseInt(value);
            case 'price':
                return Number.parseFloat(value);
            case 'tags':
                return value
                    .trim()
                    .replace(/[，。；：！,]/g, ',')
                    .replace(',,', ',')
                    .split(',')
                    .map((tag) => tag.trim());
            default:
                return value;
        }
    };
    const handleChange = (field: keyof ProductMainType, value: string) => {
        const val = formartValue(field, value);
        setProductMainField(field, val);
    };

    return (
        <ComponentCard title="Product">
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
                        <Input type="number" placeholder="Price" value={formartInputNumber(productData.main?.price)} onChange={(e) => handleChange('price', e.target.value)} />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="input">Tags</Label>
                        <Input type="text" id="input" value={productData.main?.tags?.join(',')} onChange={(e) => handleChange('tags', e.target.value)} />
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
                        <Input type="number" placeholder="Stock" value={formartInputNumber(productData.main?.stock)} onChange={(e) => handleChange('stock', e.target.value)} />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Weigth (g)</Label>
                        <Input type="number" placeholder="Weight" value={formartInputNumber(productData.main?.weight_g)} onChange={(e) => handleChange('weight_g', e.target.value)} />
                    </div>
                </div>
            </div>
        </ComponentCard>
    );
}
