import Page from '@/components/page/Page';
import { usePost } from '@/hooks/usePost';
import { useEffect, useState } from 'react';

export default function Images() {
    const [images, setImages] = useState<Image[]>([]);
    const { doPost } = usePost<Image[]>('list-images');
    useEffect(() => {
        doPost({}, (list) => {
            setImages(list || []);
        });
    }, []);
    const className = 'border border-gray-200 rounded-xl dark:border-gray-800 w-30 h-30';
    return (
        <>
            <Page pageTitle="Images" showBackgroud={true}>
                <div className="flex flex-row justify-start flex-wrap  p-1 gap-1 sm:gap-1 xl:gap-1">
                    {images.length === 0 && <div className="text-center">No images found</div>}
                    {images.map((item) => (
                        <div key={item.id}>
                            <div className={`relative border border-red-500 ${className}`}>
                                <span className="text-xs text-gray-500 absolute top-1 left-1">
                                    {item.width_px}x{item.height_px}
                                </span>
                                <span className="text-xs text-gray-500 absolute top-0 right-0">✅</span>
                                <img src={item.url} alt={item.alt_text} className={className} />
                            </div>
                        </div>
                    ))}
                </div>
            </Page>
        </>
    );
}
