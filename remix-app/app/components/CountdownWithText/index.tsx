import { useEffect, useRef, useState } from 'react';
import { Trans } from 'react-i18next';

interface CountdownWithTextProps {
    textId: string;
    seconds?: number;
    className?: string;
    color?: string;
}

const CountdownWithText = ({ textId, seconds = 3600, className = '', color = 'red' }: CountdownWithTextProps) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const secRef = useRef(seconds);

    // 动态 Tailwind 颜色类
    const colorClasses: Record<string, string> = {
        red: 'text-red-600',
        blue: 'text-blue-600',
        green: 'text-green-600',
        gray: 'text-gray-600',
        yellow: 'text-yellow-600',
        indigo: 'text-indigo-600',
        purple: 'text-purple-600',
    };

    const textColor = colorClasses[color] || 'text-red-600';

    useEffect(() => {
        if (timeLeft <= 0) {
            setTimeLeft(seconds); // 可选：重置倒计时
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, seconds]);

    const formatTime = (s: number) => {
        const total = secRef.current;
        const h = String(Math.floor(s / 3600)).padStart(2, '0');
        const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
        const sec = String(s % 60).padStart(2, '0');

        if (total > 3600) return `${h}:${m}:${sec}`;
        if (total > 60) return `${m}:${sec}`;
        return `${sec}`;
    };

    return (
        <span className={`font-mono tabular-nums tracking-[0.5px] ${className}`}>
            <Trans
                i18nKey={textId}
                values={{ seconds: formatTime(timeLeft) }}
                components={{
                    red: <span className={textColor} />,
                }}
            />
        </span>
    );
};

export default CountdownWithText;
