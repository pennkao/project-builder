import { getFastestCdn } from '@/utils/cdnChecker';
import React, { useEffect, useRef, useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    skeletonClassName?: string;
}

export default function SmartImage({ src, alt = '', className = '', ...rest }: SmartImageProps) {
    const [loaded, setLoaded] = useState(false);
    const [url, setUrl] = useState<string | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!src) return;
        const base = getFastestCdn();
        if (src && !src.startsWith('http')) {
            src = base + src;
        }
        setUrl(src);
    }, [src]);

    return (
        <div className="relative overflow-hidden rounded-xl h-full w-full">
            {/* 占位层 */}
            {(!loaded || !url) && <div className={`absolute  inset-0 h-full w-full skeleton-shimmer ${className}`} />}

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
