import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import { useEffect, useEffectEvent, useRef } from 'react';

export interface JsonEditorProps {
    value: any;
    onChange?: (value: Record<string, any>) => void;
    mode?: JSONEditorOptions['mode'];
    modes?: JSONEditorOptions['modes'];
    height?: string | number;
}

export default function JsonEditor({ value, onChange, mode = 'tree', modes = ['tree', 'code'], height = 500 }: JsonEditorProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const editorRef = useRef<JSONEditor | null>(null);
    const lastValueRef = useRef<any>(null);

    // React 19 useEffectEvent —— 保证事件函数始终是最新版本
    const handleChange = useEffectEvent((json: any) => {
        console.log(typeof json);
        if (typeof json === 'string') {
            onChange?.(JSON.parse(json));
        } else {
            onChange?.(json);
        }
        lastValueRef.current = json;
    });

    // 初始化 jsoneditor（只执行一次）
    useEffect(() => {
        if (!containerRef.current) return;

        editorRef.current = new JSONEditor(containerRef.current, {
            mode,
            modes,
            onChangeText: handleChange,
            mainMenuBar: true,
            // onCreateMenu: (items, node) => {
            //     const newItems = [];
            //     items.forEach((item) => {
            //         // 找到 type 子菜单
            //         if (item.type === 'type') {
            //             if (item.menu && Array.isArray(item.menu)) {
            //                 // 将子菜单平铺插入主菜单
            //                 newItems.push(...item.menu);
            //             }
            //         } else {
            //             newItems.push(item);
            //         }
            //     });
            //     return newItems;
            // },
        });

        // 初始值
        editorRef.current.set(value);
        lastValueRef.current = value;

        return () => {
            editorRef.current?.destroy();
            editorRef.current = null;
        };
    }, []);

    // 外部 value 变化才更新 editor（避免死循环）
    useEffect(() => {
        if (!editorRef.current) return;

        const isSame = JSON.stringify(value) === JSON.stringify(lastValueRef.current);

        if (!isSame) {
            editorRef.current.update(value);
            lastValueRef.current = value;
        }
    }, [value]);

    return (
        <div
            ref={containerRef}
            style={{
                height,
                border: '1px solid #e5e7eb',
                borderRadius: 6,
                overflow: 'hidden',
            }}
        />
    );
}
