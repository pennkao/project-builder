import React, { useEffect, useRef, useState } from 'react';
import { Cdn_Config } from '@/config/cdn';
interface SImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    width?: number | string;
    height?: number | string;
    className?: string;
    skeletonClassName?: string;
}

export default function BaseImage({ src, alt = '', width = '100%', height = 'auto', className = '', skeletonClassName = '', ...rest }: SImageProps) {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    if (import.meta.env.vVITE_ENV === 'PROD') {
        src = Cdn_Config.defaultBase + src;
    }else{
        src = Cdn_Config.devBase + src;
    }
    console.log('src', src);
    // 如果图片缓存中已加载完，直接设置 loaded
    useEffect(() => {
        const img = imgRef.current;
        if (img?.complete && img.naturalHeight > 0) {
            setLoaded(true);
        }
    }, [src]);

    return (
        <div className="relative overflow-hidden rounded-xl" style={{ width, height }}>
            {/* 骨架层 */}
            {!loaded && (
                <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 overflow-hidden z-0 ${skeletonClassName}`}>
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10" />
                </div>
            )}

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
