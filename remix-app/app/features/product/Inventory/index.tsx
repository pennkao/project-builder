import Countdown from '@/components/Countdown';
import { useState } from 'react';

export default function Inventory() {
    const [inventory, setInventory] = useState(250);
    return (
        <div className="flex justify-between items-center p-2">
            <div className="text-sub-main">
                厂家直供，仅剩<span className="text-brand">{inventory}</span>件
            </div>
            <div className="flex items-end gap-1 text-red-600 text-sm font-medium leading-tight">
                <span className="text-sm">⏰</span>
                <span className="text-sm font-medium">限时抢购</span>
                <Countdown seconds={3600} color="red" />
            </div>
        </div>
    );
}
