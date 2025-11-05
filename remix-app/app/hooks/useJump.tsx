// hooks/useElementVisibility.ts
import LoadingOverlay from '@/components/LoadingOverlay';
import { Keys } from '@/config/keys';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const useJump = (start: string, switcher?: (str: string) => void) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const DoJump = async () => {
        setIsLoading(true);

        // await new Promise((res) => setTimeout(res, 2000)); // 模拟等待2秒
        setTimeout(() => {
            console.log('timeout triggered');

            setIsLoading(false);
        }, 2000);

        if (start === 'product-selector') {
            const stored = localStorage.getItem(Keys.UseInfo);
            if (stored) {
                navigate('/checkout');
                return;
            }
            switcher?.('tab2');
            return;
        }
        if (start === 'checkout') {
            navigate('/order-success');
            return;
        }
        if (start === 'user-info') {
            navigate('/checkout');
            return;
        }
        if (start === 'checkout-user-info') {
            switcher?.('');
            return;
        }
        // navigate('/target');
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
