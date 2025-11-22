import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
export default function Popover({ button, children, toClose }: { button: React.ReactNode; children: React.ReactNode; toClose?: number | null }) {
    const [open, setOpen] = useState(false);

    const { refs, floatingStyles } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: 'bottom-end', // 右对齐
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(6), // 距离按钮 6px
            flip(), // 空间不足会自动翻转
            shift({ padding: 8 }), // 防止溢出
        ],
    });

    // 强制关闭 popover
    useEffect(() => {
        if (toClose !== null) setOpen(false);
    }, [toClose]);

    // 点击外部关闭
    useEffect(() => {
        // 注意：这里使用原生 Event 以匹配 addEventListener 的签名
        const handle = (evt: Event) => {
            // evt.target 可能是 null，所以先保护一下
            const target = evt.target as Node | null;
            if (!target) return;

            const referenceEl = refs.reference.current;
            const floatingEl = refs.floating.current;

            // 只有当 ref 真是 HTMLElement 时才调用 contains
            if (referenceEl instanceof HTMLElement && floatingEl instanceof HTMLElement) {
                if (!referenceEl.contains(target) && !floatingEl.contains(target)) {
                    setOpen(false);
                }
            } else {
                // 如果任一不是 HTMLElement（比如 VirtualElement），你可以选择直接关闭，或做其它逻辑
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handle);
        return () => {
            document.removeEventListener('mousedown', handle);
        };
        // 依赖 refs 不是必须，refs 的引用对象通常稳定；若你的 lint 要求加 refs，传 refs 也可以
    }, []);

    return (
        <>
            {/* 触发按钮 */}
            <div ref={refs.setReference} onClick={() => setOpen((v) => !v)}>
                {button}
            </div>

            {/* Portal 弹层 */}
            {open &&
                createPortal(
                    <div ref={refs.setFloating} style={floatingStyles} className="fixed z-500 bg-white shadow-lg border rounded-md p-4 min-w-[50px]">
                        {children}
                    </div>,
                    document.body
                )}
        </>
    );
}
