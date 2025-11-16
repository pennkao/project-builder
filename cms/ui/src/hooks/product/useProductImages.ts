import { useModal } from '@/hooks/useModal';
import { useState } from 'react';

export function useProductImages() {
    const { isOpen, openModal, closeModal } = useModal();
    const [uploadType, setUploadType] = useState<UploadSelectType>('single');
    const [skuIndex, setSkuIndex] = useState<number | null>(null);
    const [selectedSkuImages, setSelectedSkuImages] = useState<SkuSeletedImageType>({ index: 0, image: '' });
    const [galleryImages, setGalleryImages] = useState<string[]>([]);

    const handleSelectedImages = (selectedImages: string[]) => {
        if (!selectedImages.length) return;
        if (uploadType === 'single' && skuIndex !== null) {
            setSelectedSkuImages({ index: skuIndex, image: selectedImages[0] || '' });
        }
        if (uploadType === 'multiple') setGalleryImages(selectedImages);
        closeModal();
    };

    const openSingleImage = (index: number) => {
        setUploadType('single');
        setSkuIndex(index);
        openModal();
    };

    const openGallery = () => {
        setUploadType('multiple');
        openModal();
    };

    return { selectedSkuImages, galleryImages, handleSelectedImages, openSingleImage, openGallery, isOpen, closeModal, uploadType };
}
