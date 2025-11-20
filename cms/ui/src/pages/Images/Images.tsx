import Page from '@/components/page/Page';
import { useImages } from '@/hooks/product/useImages';

import { isrc } from '@/utils/image';
export default function Images() {
    const { data  } = useImages();

    const className = 'border border-gray-200 rounded-xl dark:border-gray-800 w-30 h-30';
    return (
        <>
            <Page pageTitle="Images" showBackgroud={true}>
                <div className="flex flex-row justify-start flex-wrap  p-1 gap-1 sm:gap-1 xl:gap-1">
                    {data.list.length === 0 && <div className="text-center">No images found</div>}
                    {data.list.map((item, index) => (
                        <div key={index}>
                            <div className={`relative border border-red-500 ${className}`}>
                                <span className="text-xs text-gray-500 absolute top-1 left-1">
                                    {item.width_px}x{item?.height_px || ''}
                                </span>
                                <span className="text-xs text-gray-500 absolute top-0 right-0">✅</span>
                                <img src={isrc(item.url)} alt={item.alt_text} className={className} />
                            </div>
                        </div>
                    ))}
                </div>
            </Page>
        </>
    );
}
