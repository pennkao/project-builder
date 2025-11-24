// hooks/useElementVisibility.ts
import LoadingOverlay from '@/components/LoadingOverlay';
import { Keys } from '@/config/keys';
import { hashString } from '@/utils/tools';
// import { console } from 'inspector';
import { useState } from 'react';
import { useNavigate } from 'react-router';
export const useJump = (start: string, switcher?: (str: string) => void) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const DoJump = async () => {
        setIsLoading(true);
        const hash = await hashString(new Date().toISOString().substring(0, 10));
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        if (start === 'product-selector') {
            const stored = localStorage.getItem(Keys.UseInfo);

            if (stored) {
                navigate(`/checkout/${hash}`);
                return;
            }
            switcher?.('tab2');
            return;
        }
        if (start === 'checkout') {
            navigate(`/order-success/${hash}`);
            return;
        }
        if (start === 'user-info') {
            navigate(`/checkout/${hash}`);
            return;
        }
        if (start === 'checkout-user-info') {
            switcher?.('');
            return;
        }
        navigate('/target');
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
