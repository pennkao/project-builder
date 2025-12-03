import { Input, Label } from '@/components/elements';
import { defaultProductMain } from '@/defaults/product';
import { Card } from '@/feature/compos/layout';
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
        <Card title="Product SEO">
            <div className="space-y-6">
                <div>
                    <Label htmlFor="input">Meta Description</Label>
                    <Input type="text" id="inputTwo" placeholder="Category" />
                </div>
            </div>
        </Card>
    );
}
