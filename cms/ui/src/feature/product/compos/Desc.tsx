import Label from '@/components/elements/Label';
import TextArea from '@/components/elements/TextArea';
import { Card } from '@/feature/compos/layout';
import { useState } from 'react';
export default function ProductDescription() {
    const [message, setMessage] = useState('');

    return (
        <Card title="Product Description">
            <div className="space-y-6">
                {/* Default TextArea */}
                <div>
                    <Label>Description</Label>
                    <TextArea value={message} onChange={(value) => setMessage(value)} rows={5} />
                </div>

                <div>{/* <ProductEditor /> */}</div>
            </div>
        </Card>
    );
}
