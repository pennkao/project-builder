import { useEffect, useState } from 'react';

const typeClasses: Record<MessageBoxType, string> = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-yellow-500 text-black',
};

export default function MessageBox({ message, type = 'info', visible, onClose, autoCloseMs = 6000, exitAnimationMs = 200 }: MessageBoxProps) {
    const [rendered, setRendered] = useState(visible);
    const [active, setActive] = useState(false);

    // 控制渲染与动画
    useEffect(() => {
        if (visible) {
            setRendered(true);
            requestAnimationFrame(() => setActive(true));
        } else if (rendered) {
            setActive(false);
            const t = setTimeout(() => setRendered(false), exitAnimationMs);
            return () => clearTimeout(t);
        }
    }, [visible, exitAnimationMs, rendered]);

    // ✅ 自动关闭逻辑（必须依赖 active）
    useEffect(() => {
        if (!active || autoCloseMs <= 0) return;
        const t = setTimeout(() => {
            setActive(false);
            setTimeout(() => onClose(), exitAnimationMs); // 等动画结束再关闭
        }, autoCloseMs);
        return () => clearTimeout(t);
    }, [active, autoCloseMs, exitAnimationMs, onClose]);

    if (!rendered) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[999]" aria-live="polite">
            <div
                className={[
                    'max-w-sm w-auto px-4 py-3 rounded-lg shadow-lg text-white flex items-center justify-between gap-3 pointer-events-auto',
                    'transform transition-all duration-200 ease-out',
                    active ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3',
                    typeClasses[type],
                ].join(' ')}
                role="status"
            >
                <div className="flex-1 pr-2 break-words">{message}</div>
                <button
                    onClick={() => {
                        setActive(false);
                        setTimeout(() => onClose(), exitAnimationMs);
                    }}
                    aria-label="Close toast"
                    className="ml-2 text-lg leading-none select-none focus:outline-none"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
