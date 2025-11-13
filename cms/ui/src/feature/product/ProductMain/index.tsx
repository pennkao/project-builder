import { Input as InputField } from '@/components/Basic/Input';
import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { defaultProductMain } from '@/defaults/product';
import { usePost } from '@/hooks/usePost';
import { genHandle } from '@/utils/product';
import { useEffect, useState } from 'react';
export default function ProductMain({ onChange }: { onChange: (productMain: ProductMainType) => void }) {
    const [productMain, setProductMain] = useState<ProductMainType>(defaultProductMain);
    const { doPost } = usePost<number>('product-handle-count');

    const handleCheckHandle = async () => {
        if (!productMain.name) {
            return;
        }
        if (!productMain.handle) {
            return;
        }
        const count = await doPost({
            params: {
                handle: productMain.handle,
            },
        });
        if (count && count > 0) {
            setProductMain((prev) => ({ ...prev, handle: genHandle(productMain.name, count) }));
        }
    };
    const handleChange = (field: keyof ProductMainType, value: string) => {
        if (field === 'tags') {
            setProductMain((prev) => ({
                ...prev,
                [field]: value
                    .trim()
                    .replace(/[，。；：！,]/g, ',')
                    .replace(',,', ',')
                    .split(',')
                    .map((tag) => tag.trim()),
            }));
            return;
        }
        if (field === 'name') {
            setProductMain((prev) => ({ ...prev, name: value }));

            return;
        }
        setProductMain(() => ({ ...productMain, [field]: value }));
    };

    useEffect(() => {
        setProductMain((prev) => ({ ...prev, handle: genHandle(prev.name, 0) }));
    }, [productMain.name]);
    useEffect(() => {
        onChange(productMain);
    }, [productMain]);

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
                        value={productMain?.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={handleCheckHandle}
                    />
                </div>
                <div>
                    <Label htmlFor="input">Handle</Label>
                    <Input type="text" id="input" placeholder="Handle" value={productMain?.handle} onChange={(e) => handleChange('handle', e.target.value)} />
                </div>
                <div className="flex flex-row gap-1">
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Price</Label>
                        <Input type="number" id="inputTwo" placeholder="Price" value={productMain?.price} onChange={(e) => handleChange('price', e.target.value)} />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="input">Tags</Label>
                        <Input type="text" id="input" value={productMain?.tags?.join(',')} onChange={(e) => handleChange('tags', e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-row gap-1">
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Category</Label>
                        <Input type="text" id="inputTwo" placeholder="Category" value={productMain?.category} onChange={(e) => handleChange('category', e.target.value)} />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Brand</Label>
                        <Input type="text" id="inputTwo" placeholder="Brand" value={productMain?.brand} onChange={(e) => handleChange('brand', e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-row gap-1">
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Stock</Label>
                        <Input type="number" id="inputTwo" placeholder="Stock" value={productMain?.stock} onChange={(e) => handleChange('stock', e.target.value)} />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Weigth (g)</Label>
                        <Input type="number" id="inputTwo" placeholder="Weigth" value={productMain?.weight_g} onChange={(e) => handleChange('weight_g', e.target.value)} />
                    </div>
                </div>
            </div>
        </ComponentCard>
    );
}
