import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { useState } from 'react';

export default function ProductMain() {
    const [showPassword, setShowPassword] = useState(false);
    const options = [
        { value: 'marketing', label: 'Marketing' },
        { value: 'template', label: 'Template' },
        { value: 'development', label: 'Development' },
    ];
    const handleSelectChange = (value: string) => {
        console.log('Selected value:', value);
    };

    return (
        <ComponentCard title="Product">
            <div className="space-y-6">
                <div>
                    <Label htmlFor="input">Name</Label>
                    <Input type="text" id="input" />
                </div>
                <div>
                    <Label htmlFor="input">Handle</Label>
                    <Input type="text" id="input" />
                </div>
                <div className="flex flex-row gap-1">
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Category</Label>
                        <Input type="text" id="inputTwo" placeholder="Category" />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Brand</Label>
                        <Input type="text" id="inputTwo" placeholder="Brand" />
                    </div>
                </div>
                <div className="flex flex-row gap-1">
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Sales Count</Label>
                        <Input type="number" id="inputTwo" placeholder="Sales Count" />
                    </div>
                    <div className="w-1/2">
                        <Label htmlFor="inputTwo">Weigth (g)</Label>
                        <Input type="number" id="inputTwo" placeholder="Weigth" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="input">Tags</Label>
                    <Input type="text" id="input" />
                </div>
            </div>
        </ComponentCard>
    );
}
