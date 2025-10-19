import Countdown from '@/components/Countdown';
import { useState } from 'react';

export default function Inventory() {
    const [inventory, setInventory] = useState(250);
    return (
        <div className="flex justify-between items-center p-2">
            <div className="text-sm font-medium text-gray-700">
                厂家直供，仅剩<span className="font-bold text-red-600">{inventory}</span>件
            </div>
            <div className="flex items-center justify-center text-red-600">
                <span className="text-xs mr-1">⏰</span>
                <span className="text-sm font-medium">限时抢购</span>
                <Countdown seconds={3600} color="red" />
            </div>
        </div>
    );
}
