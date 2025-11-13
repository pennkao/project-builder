import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { defaultProductMain } from '@/defaults/product';
import { genHandle } from '@/utils/product';
import { useEffect, useState } from 'react';

export default function ProductSeo() {
    const [productMain, setProductMain] = useState<ProductMainType>(defaultProductMain);

    useEffect(() => {
        setProductMain((prev) => ({ ...prev, handle: genHandle(prev.name, 0) }));
    }, [productMain.name]);
    useEffect(() => {
        // onChange(productMain);
    }, [productMain]);

    return (
        <ComponentCard title="Product SEO">
            <div className="space-y-6">
                <div>
                    <Label htmlFor="input">Meta Description</Label>
                    <Input type="text" id="inputTwo" placeholder="Category" />
                </div>
            </div>
        </ComponentCard>
    );
}
