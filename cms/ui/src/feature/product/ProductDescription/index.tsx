import ComponentCard from '@/components/common/ComponentCard';
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import RichText from '@/components/RichText';
import { useState } from 'react';
export default function ProductDescription() {
    const [message, setMessage] = useState('');
    const [messageTwo, setMessageTwo] = useState('');
    return (
        <ComponentCard title="Product Description">
            <div className="space-y-6">
                {/* Default TextArea */}
                <div>
                    <Label>Description</Label>
                    <TextArea value={message} onChange={(value) => setMessage(value)} rows={5} />
                </div>

                {/* Error TextArea */}
                <div>
                    <Label>Product Description</Label>
                    <TextArea rows={6} value={messageTwo} error onChange={(value) => setMessageTwo(value)} hint="Please enter a valid message." />
                </div>
                <div>
                    {/* <RichText /> */}
                </div>
            </div>
        </ComponentCard>
    );
}
