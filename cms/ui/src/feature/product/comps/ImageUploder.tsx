// DropzoneSortable.tsx
import { ItemLoading } from '@/components/Loading/ItemLoading';
import Button from '@/components/ui/button/Button';
import { Card } from '@/feature/common/layout';

import { TrashIcon, UploadFileIcon } from '@/icons';
import { isrc, makeLocalImage, makeNetImage } from '@/utils/image';
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
const empty = '';
interface ImageUploaderProps {
    upLoadUrl: string;
    aotoUpLoad?: boolean;
    outSelected?: ImageChannelType;
    images?: string[]; //初始化
    onChange: (images: string[]) => void;
    onOpenSelected?: (target: ImageTargetType) => void;
}
const ImageUploader = ({ upLoadUrl, aotoUpLoad, onChange, onOpenSelected, images, outSelected }: ImageUploaderProps) => {
    const [internalImages, setInternalImages] = useState<ImageItemType[]>([]);
    const sensors = useSensors(useSensor(PointerSensor));
    //init
    useEffect(() => {
        if (!images || images.length <= 0) {
            return;
        }
        const initImages: ImageItemType[] = images.map((imageName, _) => makeNetImage(imageName, imageName.split('/').pop() || ''));
        setInternalImages(initImages);
    }, [images]);

    useEffect(() => {
        setInternalImages((prev) => [...prev, ...(outSelected?.images || []).map((s) => makeNetImage(s, s.split('/').pop() || ''))]);
    }, [outSelected]);

    useEffect(() => {
        // return ;
        if (internalImages.length === 0) {
            onChange([]);
            return;
        }

        onChange(
            internalImages.map((i) => i.url).filter((url): url is string => !!url) // 类型守卫，确保 url 是 string
        );
    }, [internalImages]); // 上传完成后，更新外部状态

    // dropzone onDrop: create preview urls and push into state
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newItems = acceptedFiles.map((file) => makeLocalImage(file, URL.createObjectURL(file)));
        setInternalImages((prev) => [...prev, ...newItems]);
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
            internalImages.forEach((img) => URL.revokeObjectURL(img?.preview || ''));
        };
    }, []);

    // when removing single item, revoke
    const handleRemove = (id: string) => {
        setInternalImages((prev) => {
            const next = prev.filter((i) => i.id !== id);
            const removed = prev.find((i) => i.id === id);
            if (removed) URL.revokeObjectURL(removed?.preview || '');
            return next;
        });
    };

    const handleSetMain = (id: string) => {
        setInternalImages((prev) => {
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
            setInternalImages((prev) => {
                const oldIndex = prev.findIndex((i) => i.id === active.id);
                const newIndex = prev.findIndex((i) => i.id === over.id);
                if (oldIndex === -1 || newIndex === -1) return prev;
                return arrayMove(prev, oldIndex, newIndex);
            });
        }
    };

    const updateStatus = (uploadImages: ImageItemType[], status: ImageItemType['status']) => {
        setInternalImages((prev) => prev.map((img) => (uploadImages.some((f) => f.id === img.id) ? { ...img, status } : img)));
    };
    // example upload handler
    const handleUpload = () => {
        const filterd = internalImages.filter((img) => img.file && img.file.size > 0 && img?.url?.length == 0);
        updateStatus(filterd, 'upLoading');
        if (filterd.length == 0) {
            return;
        }
        doUpload(
            filterd,
            'images',
            (uploadedImages) => {
                setInternalImages((prev) =>
                    prev.map((img) => {
                        const match = uploadedImages.find((r) => r.file_name === img.file?.name);
                        return match ? makeNetImage(match.url, match.file_name) : img;
                    })
                );
            },
            (err) => {
                updateStatus(filterd, 'local');
                console.error(err);
            }
        );
    };

    const doUpload = async (images: ImageItemType[], dir: string, onSuccess?: (images: UploadResponseType[]) => void, onError?: (err: Error) => void) => {
        if (images.length === 0) {
            return;
        }
        const form = new FormData();
        images.forEach((img, idx) => {
            form.append('images[]', img.file || new Blob([], { type: 'image/png' }), img.file?.name || `image_${idx}`);
        });
        form.append('dir', dir);
        try {
            const res = await fetch(upLoadUrl, { method: 'POST', body: form });
            if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
            const data = await res.json(); // 假设 data.data 是数组
            if (!data || data.code !== 0 || !Array.isArray(data.data)) throw new Error('Invalid response format');
            if (!data || !data.data) throw new Error('Invalid response format');
            if (data && data.data) onSuccess?.(data.data);
        } catch (err) {
            onError?.(err as Error);
        }
    };

    return (
        <Card title="Upload Image">
            {/* 上方：dropzone */}
            <div className="transition border-4 border-gray-300 m-0 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 hover:border-brand-500 hover:border-4 rounded-tr-xl rounded-tl-xl">
                <form
                    {...getRootProps()}
                    className={`dropzone rounded-xl border-dashed border-gray-300 px-7 py-4 ${
                        isDragActive ? 'border-brand-500 bg-gray-100 dark:bg-gray-800' : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
                    }`}
                    // id="demo-upload"
                >
                    <input {...getInputProps()} />
                    <div className="dz-message flex flex-col items-center ">
                        <h4 className="font-semibold text-gray-800 text-theme-xl dark:text-white/90">{isDragActive ? 'Drop Files Here' : 'Drag & Drop Files Here'}</h4>
                        <span
                            className="font-medium underline text-theme-sm text-brand-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpenSelected?.({ target: 'product_image', limit: null });
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
                    <SortableContext items={internalImages.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                        <div className="flex flex-wrap gap-2 p-4 bg-white min-h-68 border-4 border-gray-300 rounded-br-xl rounded-bl-xl border-t-0 border-dashed dark:bg-gray-800 dark:border-gray-700">
                            {internalImages.length === 0 && <div className="w-full text-sm text-gray-500">No images available; drag or click above to upload.</div>}
                            {internalImages.map((item, idx) => (
                                <ImageItem key={item.id} idx={idx} item={item} onRemove={handleRemove} onSetMain={handleSetMain} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
            {/* 操作按钮 */}
            {internalImages.length > 0 && aotoUpLoad && (
                <div className="mt-2 flex justify-end gap-2">
                    <Button
                        variant="outline"
                        startIcon={<TrashIcon className="w-5 h-5 inline-block text-red-500 dark:fill-white" />}
                        onClick={() => {
                            // 清空并释放 URL
                            internalImages.forEach((i) => URL.revokeObjectURL(i?.preview || ''));
                            setInternalImages([]);
                        }}
                        className="px-4 py-2 rounded border dark:hover:bg-gray-500 dark:hover:text-white"
                    >
                        {empty}
                    </Button>
                    <Button onClick={handleUpload} startIcon={<UploadFileIcon className="w-5 h-5 inline-block dark:fill-white" />}>
                        {empty}
                    </Button>
                </div>
            )}
        </Card>
    );
};

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
    const url = item?.url || item?.preview || '';
    const className = item.url ? '' : 'opacity-40';

    return (
        <div ref={setNodeRef} style={style} className="relative w-28 h-28 rounded-xl overflow-hidden">
            <img src={isrc(url)} className={`w-full h-full  object-cover cursor-grab active:cursor-grabbing ${className}`} {...attributes} {...listeners} />
            <div className="absolute top-1 left-1  bg-white/80 text-xs px-1 py-1 rounded">{idx > 0 ? idx + 1 : '✅'}</div>
            <div className="absolute w-28 h-28 flex inset-0 items-center pointer-events-none justify-center">{item.status === 'upLoading' && <ItemLoading />}</div>
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

export default ImageUploader;
