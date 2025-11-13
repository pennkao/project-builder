// DropzoneSortable.tsx
import ComponentCard from '@/components/common/ComponentCard';
import { isrc } from '@/utils/image';
import { doUpload } from '@/utils/upload';
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

const ImageItem = ({ item, idx, onRemove, onSetMain }: { item: ImageItemType; idx: number; onRemove: (id: string) => void; onSetMain?: (id: string) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: item.id,
    });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
        boxShadow: isDragging ? '0 8px 20px rgba(0,0,0,0.15)' : undefined,
        zIndex: isDragging ? 9999 : 'auto', // 排在前面的拖动会在最下方，添加这个修复
    };
    const url = item.url || item.preview;
    const className = item.url ? '' : 'opacity-40';
    return (
        <div ref={setNodeRef} style={style} className="relative w-28 h-28 rounded-xl overflow-hidden">
            <img src={isrc(url)} className={`w-full h-full  object-cover cursor-grab active:cursor-grabbing ${className}`} {...attributes} {...listeners} />
            <div className="absolute top-1 left-1  bg-white/80 text-xs px-1 py-1 rounded">{idx > 0 ? idx + 1 : '✅'}</div>
            {/* overlay buttons */}
            <div className="absolute top-1 right-1 flex gap-1">
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(item.id);
                    }}
                    className="bg-black/30 text-white text-xs px-2 py-1 rounded"
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
                    Set Main
                </button>
            )}
        </div>
    );
};

const UploadImage = ({ onChange, onOpenSelected, initImages }: { initImages: ImageItemType[]; onChange: (images: ImageItemType[]) => void; onOpenSelected?: (key: string | number | null) => void }) => {
    const [images, setImages] = useState<ImageItemType[]>([]);
    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        setImages((prev) => [...prev, ...initImages]);
    }, [initImages]);
    useEffect(() => {
        onChange(images);
    }, [images]);
    // dropzone onDrop: create preview urls and push into state
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newItems = acceptedFiles.map((file) => ({
            id: generateId(),
            file,
            url: '',
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
    const handleUpload = () => {
        doUpload(images, setImages);
    };

    return (
        <ComponentCard title="Upload Image">
            {/* 上方：dropzone */}
            <div className="transition border-4 border-gray-300 m-0 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 hover:border-brand-500 hover:border-4 rounded-tr-xl rounded-tl-xl">
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
                        <span
                            className="font-medium underline text-theme-sm text-brand-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpenSelected?.(null);
                            }}
                        >
                            Browse Gallery
                        </span>
                    </div>
                </form>
            </div>

            {/* 下方：图片网格（支持拖动排序） */}
            <div className="w-full">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={images.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                        <div className="flex flex-wrap gap-2 p-4 bg-white min-h-68 border-4 border-gray-300 rounded-br-xl rounded-bl-xl border-t-0 border-dashed dark:bg-gray-800 dark:border-gray-700">
                            {images.length === 0 && <div className="w-full text-sm text-gray-500">No images available; drag or click above to upload.</div>}
                            {images.map((item, idx) => (
                                <ImageItem key={item.id} idx={idx} item={item} onRemove={handleRemove} onSetMain={handleSetMain} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
            {/* 操作按钮 */}
            {images.length > 0 && (
                <div className="mt-2 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            // 清空并释放 URL
                            images.forEach((i) => URL.revokeObjectURL(i.preview));
                            setImages([]);
                        }}
                        className="px-4 py-2 rounded border"
                    >
                        Clean Up
                    </button>
                    <button type="button" onClick={handleUpload} className="px-4 rounded bg-brand-500 text-white hover:opacity-95">
                        Upload All
                    </button>
                </div>
            )}
        </ComponentCard>
    );
};

export default UploadImage;
