import { useEffect, useRef } from 'react';

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
}

export default function Drawer({ open, onClose, children, width = '400px' }: DrawerProps) {
    const drawerRef = useRef<HTMLDivElement>(null);
    // ESC 关闭
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // 点击抽屉外关闭
    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onClose]);

    return (
        <>
            {/* 右侧抽屉主体 */}
            <div
                ref={drawerRef}
                className={`fixed bottom-5 right-0 z-999 h-[85%] overflow-y-auto bg-white rounded-lg shadow-xl transform transition-transform duration-300 
                ${open ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ width }}
            >
                {children}
            </div>
        </>
    );
}
