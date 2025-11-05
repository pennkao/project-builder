// hooks/useElementVisibility.ts
import LoadingOverlay from '@/components/LoadingOverlay';
import { Keys } from '@/config/keys';
import CryptoJS from 'crypto-js';
import { useState } from 'react';
import { useNavigate } from 'react-router';
export const useJump = (start: string, switcher?: (str: string) => void) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const DoJump = async () => {
        setIsLoading(true);
        const hash = CryptoJS.MD5(new Date().toISOString().substring(0, 10)).toString();
        // await new Promise((res) => setTimeout(res, 2000)); // 模拟等待2秒
        setTimeout(() => {
            console.log('timeout triggered');

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
