import SmartImage from '@/components/SmartImage';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
interface SwiperImageProps {
    images: string[];
    selectIndex?: number;
    onIndexChange?: (index: number) => void;
    autoPlayInterval?: number;
    className?: string;
}

export default function SwiperImage({ images, autoPlayInterval = 5000,  className = '', selectIndex, onIndexChange }: SwiperImageProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // 👇 触摸相关状态
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [isTouching, setIsTouching] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // 处理受控 selectIndex
    useEffect(() => {
        if (selectIndex !== undefined) {
            setCurrentIndex(selectIndex);
            setIsPaused(true);
        }
    }, [selectIndex]);

    // 自动播放
    useEffect(() => {
        if (!isPaused && images.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => {
                    const next = prev === images.length - 1 ? 0 : prev + 1;
                    onIndexChange?.(next);
                    return next;
                });
            }, autoPlayInterval);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, images.length, autoPlayInterval]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        onIndexChange?.(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => {
            const next = prev === images.length - 1 ? 0 : prev + 1;
            onIndexChange?.(next);
            return next;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => {
            const next = prev === 0 ? images.length - 1 : prev - 1;
            onIndexChange?.(next);
            return next;
        });
    };

    // 👇 触摸事件处理
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsTouching(true);
        setStartX(e.touches[0].clientX);
        setCurrentX(e.touches[0].clientX);
        setIsPaused(true); // 用户触摸，暂停自动播放
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isTouching) return;
        setCurrentX(e.touches[0].clientX);
        // 阻止页面滚动（可选，提升体验）
        if (Math.abs(e.touches[0].clientX - startX) > 10) {
            // e.preventDefault();
        }
    };

    const handleTouchEnd = () => {
        if (!isTouching) return;
        setIsTouching(false);

        const diff = startX - currentX; // 正：左滑（下一张），负：右滑（上一张）
        const threshold = 50; // 滑动阈值（像素）

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        // 重置
        setStartX(0);
        setCurrentX(0);
    };

    if (images.length === 0) return null;

    return (
        <div
            className={`relative w-full h-full overflow-hidden rounded-lg ${className} group touch-pan-y`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            // 👇 仅添加触摸事件（移除鼠标拖拽）
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd} // 安全兜底
        >
            {/* 轮播容器 */}
            <div className={`flex transition-transform duration-300 h-full w-full ease-out ${styles['swiper-container']}`} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((img, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        <SmartImage src={img} alt={`slide-${index}`} className="w-full h-full object-cover" loading={index === 0 ? 'eager' : 'lazy'} draggable={false} />
                    </div>
                ))}
            </div>

            {/* 箭头 */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-opacity focus:outline-none z-10 opacity-0 group-hover:opacity-100"
                        aria-label="上一张"
                    >
                        ‹
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-opacity focus:outline-none z-10 opacity-0 group-hover:opacity-100"
                        aria-label="下一张"
                    >
                        ›
                    </button>
                </>
            )}

            {/* 指示点 */}
            {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                            aria-label={`跳转到第 ${index + 1} 张`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
