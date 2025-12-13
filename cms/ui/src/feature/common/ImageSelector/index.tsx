import { ModalBase } from '@/components/composed';
import Label from '@/components/elements/Label';
import { useListWitePage } from '@/hooks/useList';
import { SRC } from '@/lib/image';
import { useState } from 'react';

const ImageSelector = ({ isOpen, onClose, onSelect }: { isOpen: boolean; onClose: () => void; onSelect: (url: string) => void }) => {
    const { Result } = useListWitePage<ImageType>('image', 100);

    const [selectedImages, setSelectedImages] = useState<string>('');
    const handleSelect = (url: string) => {
        setSelectedImages(url);
    };
    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            // alert('已复制！');
        } catch (err) {
            // console.error('复制失败', err);
        }
    };

    return (
        <>
            <ModalBase
                isOpen={isOpen}
                doAction={() => {
                    onSelect(selectedImages);
                }}
                closeModal={onClose}
                title="Gallery"
                tips={selectedImages}
            >
                <div className="w-full h-[400px]  dark:bg-gray-700/10">
                    <div className="w-full h-full overflow-y-scroll">
                        {Result.list.length > 0 && <div className="h-1 border-b-2 border-gray-200 dark:border-gray-700 my-2"></div>}
                        <Label>Gallery </Label>
                        <div className="flex flex-wrap gap-2 ">
                            {Result.list.map((item, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={SRC(item.url)}
                                        alt={item.alt_text}
                                        className="w-28 h-28 object-cover"
                                        onClick={() => {
                                            handleSelect(item.url);
                                            handleCopy(item.url);
                                        }}
                                    />
                                    {selectedImages.includes(item.url) && <span className="text-xs text-gray-500 absolute top-0 right-0">✅</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ModalBase>
        </>
    );
};
export default ImageSelector;
