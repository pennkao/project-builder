import Countdown from '@/components/Countdown';
import { t } from 'i18next';
import { useState } from 'react';

export default function Inventory() {
    const [inventory, setInventory] = useState(250);
    return (
        <div className="flex justify-between items-center p-2">
            <div className="text-sub-main">{t('product.factory_stock', { stock: inventory })}</div>
            <div className="flex items-end gap-1 text-red-600 text-sm font-medium leading-tight">
                <span className="text-xs">⏰</span>
                <span className="text-xs font-medium">{t('product.limited_buy')}</span>
                <Countdown seconds={3600} color="red" />
            </div>
        </div>
    );
}
