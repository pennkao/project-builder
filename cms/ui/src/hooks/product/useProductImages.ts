import { useModal } from '@/hooks/useModal';
import { useState } from 'react';

export function useProductImages() {
    const { isOpen, openModal, closeModal } = useModal();
    const [uploadType, setUploadType] = useState<UploadSelectType>('single');
    const [imageTarget, setImageTarget] = useState<ImageTargetType | null>(null);
    const [imagesChannel, setImagesChannel] = useState<ImageChannelType>({
        images: [],
    });

    // const handleSelectedImages = (selectedImages: string[]) => {
    //     if (!selectedImages || selectedImages.length === 0) return;
    //     if (uploadType === 'single' && skuIndex !== null && selectedImages[0].length > 0) {
    //         setSelectedSkuImages({ index: skuIndex, image: selectedImages[0] || '' }); //sku 选择图
    //         setGalleryImages(selectedImages);
    //     }
    //     if (uploadType === 'multiple') setGalleryImages(selectedImages);
    //     closeModal();
    // };

    // const openSingleImage = (index: number, attrId: string, valueId: string) => {
    //     if (!attrId && !valueId) {
    //         setUploadType('single');
    //     } else {
    //         setUploadType('single');
    //         setSkuIndex(index);
    //     }
    //     openModal();
    // };

    // const handleSelectedImages1 = (selectedImages: string[]) => {
    //     if (!selectedImages || selectedImages.length === 0) return;
    //     if (uploadType === 'single' && skuIndex !== null && selectedImages[0].length > 0) {
    //         setSelectedSkuImages({ index: skuIndex, image: selectedImages[0] || '' }); //sku 选择图
    //         setGalleryImages(selectedImages);
    //     }
    //     if (uploadType === 'multiple') setGalleryImages(selectedImages);
    //     closeModal();
    // };
    const handleSelectedImages = (selectedImages: string[]) => {
        if (!selectedImages || selectedImages.length === 0) return;

        switch (imageTarget?.target || '') {
            case 'sku_image':
                setImagesChannel({ target: 'sku_image', index: imageTarget?.index || 0, images: selectedImages }); //sku 选择图
                break;
            case 'product_image':
                setImagesChannel({ target: 'product_image', images: selectedImages }); //属性值选择图
                break;
            case 'attr_value_image':
                setImagesChannel({ target: 'attr_value_image', index: imageTarget?.index || 0, images: selectedImages, selector: imageTarget?.selector || {} }); //属性值选择图
                break;
            default:
                break;
        }
        setImageTarget(null);
        closeModal();
    };
    const openImageSelector = (target: ImageTargetType) => {
        console.log('openImageSelector', target);
        if (!target.limit || target.limit > 1) {
            setUploadType('multiple');
        } else {
            setUploadType('single');
        }
        setImageTarget(target);
        openModal();
    };

    return {  imagesChannel, openImageSelector, handleSelectedImages, isOpen, closeModal, uploadType };
}
