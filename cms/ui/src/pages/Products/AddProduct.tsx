import Page from '@/components/page/Page';
import ImageSelector from '@/feature/product/ImageSelector';
import ProductOptions from '@/feature/product/ProducOptions';
import ProductDescription from '@/feature/product/ProductDescription';
import ProductMain from '@/feature/product/ProductMain';
import UploadImage from '@/feature/product/UploadImae';
import { useModal } from '@/hooks/useModal';
import { useEffect, useState } from 'react';
import PageFooterAction from '../../components/page/PageFooterAction';
import Button from '../../components/ui/button/Button';

export default function AddProduct() {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const { isOpen, openModal, closeModal } = useModal();
    const [selectedSkuImages, setSelectedSkuImages] = useState<{ index: number; img: string }>({ index: 0, img: '' });
    const [attrOptions, setAttrOptions] = useState<ProductOptionsType>([]);
    const handleSelectedImages = (images: string[]) => {
        setSelectedImages(images);
        closeModal();
    };

    const handleOpenModal = (key: string | number) => {
        setSelectedSkuImages({ index: Number(key), img: selectedImages[0] || '' });
        openModal();
    };
    useEffect(() => {
        console.log(attrOptions, 'addproduct,option');
    }, [attrOptions]);

    return (
        <Page pageTitle="Add Product" showBackgroud={false}>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <ProductMain />

                    <ProductDescription />
                </div>
                <div className="space-y-6">
                    <UploadImage onChange={setImages} />
                    <ProductOptions selectedSkuImages={selectedSkuImages} onChange={setAttrOptions} onOpenSelected={(key) => handleOpenModal(key)} />
                </div>
            </div>
            <PageFooterAction className="justify-end gap-2">
                <Button variant="outline">Draft</Button> <Button variant="primary">Save & Create</Button>
            </PageFooterAction>
            <ImageSelector doAction={handleSelectedImages} selectType="single" isOpen={isOpen} closeModal={closeModal} uploadedImages={images} />
        </Page>
    );
}
