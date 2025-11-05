import LoadingOverlay from '@/components/LoadingOverlay';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Jump() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = async () => {
        setLoading(true);

        await new Promise((res) => setTimeout(res, 2000)); // 模拟等待2秒
        navigate('/target');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {/* 全局遮罩 */}
            <LoadingOverlay show={loading} />
        </div>
    );
}
