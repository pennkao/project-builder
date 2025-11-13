import ComponentCard from '@/components/common/ComponentCard';
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import { useState } from 'react';
export default function ProductDescription() {
    const [message, setMessage] = useState('');
 
    return (
        <ComponentCard title="Product Description">
            <div className="space-y-6">
                {/* Default TextArea */}
                <div>
                    <Label>Description</Label>
                    <TextArea value={message} onChange={(value) => setMessage(value)} rows={5} />
                </div>

                <div>
                    {/* <ProductEditor /> */}
                </div>
            </div>
        </ComponentCard>
    );
}
