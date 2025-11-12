import ModalBase from '@/components/ModalBase';
import { usePost } from '@/hooks/usePost';
import { useEffect, useState } from 'react';
import Label from '../../../components/form/Label';
const ImageSelector = ({
    uploadedImages,
    onChange,
    isOpen,
    doAction,
    closeModal,
    selectType,
}: {
    selectType: 'single' | 'multiple';
    uploadedImages: ImageItem[];
    onChange?: (data: string[]) => void;
    isOpen: boolean;
    doAction?: (data: any) => void;
    closeModal: () => void;
}) => {
    const [dbImages, setDbImages] = useState<Image[]>([]);
    const { doPost } = usePost<Image[]>('list-images');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const handleSelectedImages = (dtype: typeof selectType, img: string) => {
        console.log(dtype, img);
        if (dtype === 'single') {
            setSelectedImages([img]);
        } else {
            setSelectedImages((prev) => [...prev, img]);
        }
    };
    const handleAction = () => {
        doAction?.(selectedImages);
    };
    // useEffect(() => {
    //     console.log(selectedImages, 'imageSelector,selectedImages');
    //     onChange?.(selectedImages);
    // }, [selectedImages]);

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
                        <Label>Product uploaded image</Label>
                        <div className="flex flex-wrap gap-2 ">
                            {uploadedImages.map((item) => (
                                <div className="relative group">
                                    <img key={item.id} src={item.preview} alt="" className="w-28 h-28 object-cover" onClick={() => handleSelectedImages(selectType, item.preview)} />
                                    {selectedImages.includes(item.preview) && <span className="text-xs text-gray-500 absolute top-0 right-0">✅</span>}
                                </div>
                            ))}
                        </div>
                        {dbImages.length > 0 && <div className="h-1 border-b-2 border-gray-200 dark:border-gray-700 my-2"></div>}
                        <Label>Gallery </Label>
                        <div className="flex flex-wrap gap-2 ">
                            {dbImages.map((item) => (
                                <div className="relative group">
                                    <img key={item.id} src={item.url} alt={item.alt_text} className="w-28 h-28 object-cover" onClick={() => handleSelectedImages(selectType, item.url)} />
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
