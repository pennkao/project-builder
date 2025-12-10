// hooks/useElementVisibility.ts
import LoadingOverlay from '@/components/LoadingOverlay';
import { Keys } from '@/config/keys';
import { hashString } from '@/utils/tools';
import { useState } from 'react';
import { useNavigate } from 'react-router';
export const useJump = (start: string, switcher?: (str: string) => void) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const DoJump = async (ok: boolean, target?: string) => {
        setIsLoading(true);
        const hash = await hashString(new Date().toISOString().substring(0, 10));
        setTimeout(() => {
            setIsLoading(false);

            if (start === 'product-selector') {
                if (!ok) return;
                const stored = localStorage.getItem(Keys.UseInfo);
                if (stored) {
                    navigate(`/checkout/${hash}`);
                    return;
                }
                switcher?.('tab2');
                return;
            }
            if (start === 'checkout') {
                if (ok) {
                    const orderId = localStorage.getItem(Keys.UUID);
                    if (!orderId || !ok) return;
                    navigate(`/order-success/${orderId}`);
                    return;
                }
                if (target) {
                    navigate(target);
                    return;
                }

                return;
            }
            if (start === 'user-info') {
                if (ok) {
                    navigate(`/checkout/${hash}`);
                    return;
                }
                switcher?.('tab1');
                return;
            }
            if (start === 'checkout-user-info') {
                switcher?.('');
            }
        }, 1000);
    };

    const Loading = (
        <>
            {/* 全局遮罩 */}
            <LoadingOverlay show={isLoading} />
        </>
    );
    return {
        isLoading,
        DoJump,
        Loading,
    };
};
