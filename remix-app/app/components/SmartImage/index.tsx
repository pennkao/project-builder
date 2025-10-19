import { Cdn_Config } from '@/config/cdn';
import { getFastestCdn } from '@/utils/cdnChecker';
import React, { useEffect, useRef, useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    width?: number | string;
    height?: number | string;
    className?: string;
    skeletonClassName?: string;
}

export default function SmartImage({ src, alt = '', width = '100%', height = '', className = '', skeletonClassName = '', ...rest }: SmartImageProps) {
    const [loaded, setLoaded] = useState(false);
    const [url, setUrl] = useState<string | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!src) return;
        const base = getFastestCdn();
        setUrl(base + src);
    }, [src]);
    
    return (
        <div className="relative overflow-hidden rounded-xl" >
            {/* 占位层 */}
            {(!loaded || !url) && (
                <div className={`absolute inset-0 ${Cdn_Config.placeholderClass} z-0 ${skeletonClassName} ${className}` }>
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
            )}

            {/* 图片层 */}
            {url && (
                <img
                    ref={imgRef}
                    src={url}
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
