import Label from '@/components/form/Label';
import ModalBase from '@/components/ModalBase';
import { usePost } from '@/hooks/usePost';
import { useEffect, useState } from 'react';

const ImageSelector = ({
    // onChange,
    isOpen,
    doAction,
    closeModal,
    selectType,
}: {
    selectType: UploadSelectType;
    onChange?: (data: string[]) => void;
    isOpen: boolean;
    doAction?: (data: any) => void;
    closeModal: () => void;
}) => {
    const [dbImages, setDbImages] = useState<ImageType[]>([]);
    const { doPost } = usePost<ImageType[]>('list-images');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const handleSelectedImages = (dtype: typeof selectType, img: string) => {
        if (dtype === 'single') {
            setSelectedImages([img]);
        } else {
            setSelectedImages((prev) => [...prev, img]);
        }
    };
    const handleAction = () => {
        doAction?.(selectedImages);
    };
    useEffect(() => {
        doPost({}, (list) => {
            setDbImages(list);
        });
    }, []);

    return (
        <>
            <ModalBase isOpen={isOpen} closeModal={closeModal} doAction={handleAction} onChange={(data) => console.log(data)} title="Product Image" tips="Upload product image">
                <div className="w-full h-[400px]  dark:bg-gray-700">
                    <div className="w-full h-full overflow-y-scroll">
                        {dbImages.length > 0 && <div className="h-1 border-b-2 border-gray-200 dark:border-gray-700 my-2"></div>}
                        <Label>Gallery </Label>
                        <div className="flex flex-wrap gap-2 ">
                            {dbImages.map((item, index) => (
                                <div key={index} className="relative group">
                                    <img src={item.url} alt={item.alt_text} className="w-28 h-28 object-cover" onClick={() => handleSelectedImages(selectType, item.url)} />
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
