// DropzoneSortable.tsx
import ComponentCard from '@/components/common/ComponentCard';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type ImageItem = {
    id: string;
    file: File;
    preview: string;
};

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

const SortableImage = ({ item, idx, onRemove, onSetMain }: { item: ImageItem; idx: number; onRemove: (id: string) => void; onSetMain?: (id: string) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: item.id,
    });
    console.log(idx);
    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
        boxShadow: isDragging ? '0 8px 20px rgba(0,0,0,0.15)' : undefined,
        zIndex: isDragging ? 9999 : 'auto', // 排在前面的拖动会在最下方，添加这个修复
    };

    return (
        <div ref={setNodeRef} style={style} className="relative w-28 h-28 rounded-xl overflow-hidden">
            <img src={item.preview} alt={item.file.name} className="w-full h-full object-cover cursor-grab active:cursor-grabbing" {...attributes} {...listeners} />
            <div className="absolute top-1 left-1 bg-white/80 text-xs px-1 py-1 rounded">{idx > 0 ? idx + 1 : '✅'}</div>
            {/* overlay buttons */}
            <div className="absolute top-1 right-1 flex gap-1">
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(item.id);
                    }}
                    className="bg-black/60 text-white text-xs px-2 py-1 rounded"
                    title="Remove"
                >
                    DEL
                </button>
            </div>
            {/* optional 'set main' button */}
            {onSetMain && idx > 0 && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSetMain(item.id);
                    }}
                    className="absolute left-1 bottom-1 bg-white/80 text-xs px-1 py-0.5 rounded"
                >
                    设为主图
                </button>
            )}
        </div>
    );
};

const DropzoneSortable = () => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const sensors = useSensors(useSensor(PointerSensor));

    // dropzone onDrop: create preview urls and push into state
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newItems = acceptedFiles.map((file) => ({
            id: generateId(),
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...newItems]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': [],
            'image/jpeg': [],
            'image/webp': [],
            'image/svg+xml': [],
        },
        multiple: true,
    });

    // cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            images.forEach((img) => URL.revokeObjectURL(img.preview));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // when removing single item, revoke
    const handleRemove = (id: string) => {
        setImages((prev) => {
            const next = prev.filter((i) => i.id !== id);
            const removed = prev.find((i) => i.id === id);
            if (removed) URL.revokeObjectURL(removed.preview);
            return next;
        });
    };

    const handleSetMain = (id: string) => {
        setImages((prev) => {
            const idx = prev.findIndex((p) => p.id === id);
            console.log(idx);
            console.log(prev);
            if (idx <= 0) return prev;
            const item = prev[idx];
            const copy = [...prev];
            copy.splice(idx, 1);
            copy.unshift(item);
            return copy;
        });
    };

    // dnd-kit onDragEnd: reorder
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;
        if (active.id !== over.id) {
            setImages((prev) => {
                const oldIndex = prev.findIndex((i) => i.id === active.id);
                const newIndex = prev.findIndex((i) => i.id === over.id);
                if (oldIndex === -1 || newIndex === -1) return prev;
                return arrayMove(prev, oldIndex, newIndex);
            });
        }
    };

    // example upload handler
    const handleUpload = async () => {
        if (images.length === 0) {
            alert('没有图片要上传');
            return;
        }
        const form = new FormData();
        images.forEach((img, idx) => {
            // name can be like images[], or image_0 etc depending on backend
            form.append('images[]', img.file, img.file.name);
        });

        try {
            // 更换为你自己的上传地址
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: form,
            });
            if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
            const data = await res.json();
            console.log('上传成功：', data);
            alert('上传成功');
            // 根据后端返回做后续处理，例如清空列表：
            // setImages([]);
        } catch (err) {
            console.error(err);
            alert('上传失败，请查看控制台');
        }
    };

    return (
        <ComponentCard title="Upload Image">
            {/* 操作按钮 */}
            <div className="mt-3 flex gap-0">
                <button type="button" onClick={handleUpload} className="px-4 rounded bg-brand-500 text-white hover:opacity-95">
                    上传全部
                </button>
                <button
                    type="button"
                    onClick={() => {
                        // 清空并释放 URL
                        images.forEach((i) => URL.revokeObjectURL(i.preview));
                        setImages([]);
                    }}
                    className="px-4 py-2 rounded border"
                >
                    清空
                </button>
            </div>
            {/* 下方：dropzone */}
            <div className="transition border-2 border-gray-300 m-0 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 hover:border-brand-500 rounded-tr-xl rounded-tl-xl">
                <form
                    {...getRootProps()}
                    className={`dropzone rounded-xl border-dashed border-gray-300 px-7 py-4 ${
                        isDragActive ? 'border-brand-500 bg-gray-100 dark:bg-gray-800' : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
                    }`}
                    id="demo-upload"
                >
                    <input {...getInputProps()} />
                    <div className="dz-message flex flex-col items-center ">
                        <h4 className="font-semibold text-gray-800 text-theme-xl dark:text-white/90">{isDragActive ? 'Drop Files Here' : 'Drag & Drop Files Here'}</h4>
                        <span className="font-medium underline text-theme-sm text-brand-500">Browse File</span>
                    </div>
                </form>
            </div>

            {/* 上方：图片网格（支持拖动排序） */}
            <div className="w-full">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={images.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                        <div className="flex flex-wrap gap-2 p-4 bg-white min-h-68 border-2 border-gray-400 rounded-br-xl rounded-bl-xl border-t-0">
                            {images.length === 0 && <div className="w-full text-sm text-gray-500">暂无图片，拖入或点击上方上传</div>}
                            {images.map((item, idx) => (
                                <SortableImage key={item.id} idx={idx} item={item} onRemove={handleRemove} onSetMain={handleSetMain} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </ComponentCard>
    );
};

export default DropzoneSortable;
