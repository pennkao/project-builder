import { useEffect, useRef, useState } from 'react';

interface CountdownProps {
    seconds?: number;
    className?: string;
    color?: 'red' | 'blue' | 'green' | 'gray' | 'yellow' | 'indigo' | 'purple'; // 可扩展
}

const Countdown = ({ seconds = 3600, className = '', color = 'red' }: CountdownProps) => {
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
            setTimeLeft(seconds); // 重置倒计时
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

        if (total > 3600) {
            return `${h}:${m}:${sec}`;
        } else if (total > 60) {
            return `${m}:${sec}`;
        } else {
            return `${sec}`;
        }
    };

    return <span className={`font-mono tabular-nums tracking-[0.5px] align-bottom text-right ${textColor} ${className}`}>{formatTime(timeLeft)}</span>;
};

export default Countdown;
