import { Cdn_Config } from '@/config/cdn';
import React, { useEffect, useRef, useState } from 'react';
interface SImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    isUrl: boolean; //直接使用url
    skeletonClassName?: string;
}

export default function BaseImage({ src, alt = '', isUrl = false, className = '', skeletonClassName = '', ...rest }: SImageProps) {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    let baseUrl = '';
    if (import.meta.env.VITE_ENV === 'DEV') {
        baseUrl = Cdn_Config.defaultBase;
    } else {
        baseUrl = Cdn_Config.devBase;
    }
    if (src && !src.startsWith('http')) {
        src = baseUrl + src;
    }
    // 如果图片缓存中已加载完，直接设置 loaded
    useEffect(() => {
        const img = imgRef.current;
        if (img?.complete && img.naturalHeight > 0) {
            setLoaded(true);
        }
    }, [src]);

    return (
        <div className="relative overflow-hidden rounded-xl h-full w-full">
            {/* 骨架层 */}
            {!loaded && <div className={`absolute inset-0 h-full w-full bg-gray-200 dark:bg-gray-700 overflow-hidden z-0 skeleton-shimmer`} />}

            {/* 图片层 */}
            {src && (
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    className={`object-cover w-full h-full transition-opacity duration-500 ${loaded ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${className}`}
                    onLoad={() => setLoaded(true)}
                    onError={() => setLoaded(true)}
                    loading="lazy"
                    {...rest}
                />
            )}
        </div>
    );
}
