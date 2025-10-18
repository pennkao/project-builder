// ThumbnailGallery.jsx
import { useEffect, useRef } from 'react';

interface ThumbnailGalleryProps {
    images: string[];
    activeIndex: number;
    onClick: (index: number) => void;
}

export default function ThumbGallery({ images, activeIndex, onClick }: ThumbnailGalleryProps) {
    const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        if (thumbRefs.current[activeIndex]) {
            thumbRefs.current[activeIndex].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [activeIndex]);

    const handlePrev = () => {
        if (activeIndex > 0) onClick(activeIndex - 1);
    };

    const handleNext = () => {
        if (activeIndex < images.length - 1) onClick(activeIndex + 1);
    };

    return (
        <div className="text-center overflow-x-hidden flex items-center justify-center pb-2 scrollbar-hide">
            {/* ← 上一张按钮（优化后） */}
            <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className={`w-8 h-8 flex items-center cursor-pointer justify-center rounded-full transition-all ${
                    activeIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200'
                }`}
                aria-label="上一张"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* 缩略图区域 */}
            <div className="flex overflow-x-auto scrollbar-hide px-2">
                {images.map((src, index) => (
                    <button
                        key={index}
                        ref={(el) => (thumbRefs.current[index] = el) as any}
                        onClick={() => onClick(index)}
                        className={`p-1 w-16 h-16 flex-shrink-0 ${activeIndex === index ? 'ring-2 ring-blue-500 rounded-md' : 'opacity-70 hover:opacity-100'}`}
                        aria-label={`查看第 ${index + 1} 张图`}
                    >
                        <img src={src} alt="" className="w-full h-full object-cover rounded" loading="lazy" />
                    </button>
                ))}
            </div>

            {/* → 下一张按钮（优化后） */}
            <button
                onClick={handleNext}
                disabled={activeIndex === images.length - 1}
                className={`w-8 h-8 flex cursor-pointer items-center justify-center rounded-full transition-all ${
                    activeIndex === images.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200'
                }`}
                aria-label="下一张"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
