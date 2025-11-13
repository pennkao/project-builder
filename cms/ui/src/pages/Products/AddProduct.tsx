import Page from '@/components/page/Page';
import PageFooterAction from '@/components/page/PageFooterAction';
import Button from '@/components/ui/button/Button';
// import { seoData } from '@/defaults/product';
import { defaultProductMain } from '@/defaults/product';
import ImageSelector from '@/feature/product/ImageSelector';
import ProductOptions from '@/feature/product/ProducOptions';
import ProductMain from '@/feature/product/ProductMain';
import ProductSeo from '@/feature/product/ProductSeo';
import UploadImage from '@/feature/product/UploadImae';
import { useModal } from '@/hooks/useModal';
import { useBatchPost } from '@/hooks/usePost';
import { fnv1a32, generateId } from '@/utils/product';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function AddProduct() {
    const navigate = useNavigate();

    const [images, setImages] = useState<ImageItemType[]>([]);
    const [productMain, setProductMain] = useState<ProductMainType>(defaultProductMain);
    const [skuList, setSkuList] = useState<SkuType[]>([]);
    const [selectedSkuImages, setSelectedSkuImages] = useState<{ index: number; img: string }>({ index: 0, img: '' });
    const [attrOptions, setAttrOptions] = useState<ProductOptionsType>([]);
    const { isOpen, openModal, closeModal } = useModal();
    const [uploadType, setUploadType] = useState<UploadSelectType>('single');
    const [skuIndex, setSkuIndex] = useState<number | null>(null);
    const [initImages, setInitImages] = useState<ImageItemType[]>([]);
    const handleSelectedImages = (selectedImages: string[]) => {
        if (selectedImages.length <= 0) {
            return;
        }
        if (uploadType === 'single' && skuIndex !== null) {
            setSelectedSkuImages({ index: skuIndex, img: selectedImages[0] || '' });
        }
        if (uploadType === 'multiple') {
            const newImages: ImageItemType[] = selectedImages.map((item, _) => ({
                url: item,
                file: null, // 必须是 File | null
                preview: item, // 如果 preview 也指向 URL，可以直接用 item
                id: generateId(), // 或者用 uuid / 时间戳生成唯一 id
            }));

            setInitImages(newImages);
        }

        closeModal();
    };

    const handleOpenModal = (key: string | number) => {
        setUploadType('single');
        setSkuIndex(Number(key));
        openModal();
    };

    const handleOpenUploadGallery = () => {
        setUploadType('multiple');
        openModal();
    };

    const { doBatchPost, Params } = useBatchPost();
    const handleSave = () => {
        if (!productMain.handle || !productMain.handle) {
            alert('Please enter handle');
            return;
        }
        if (images.length <= 0) {
            alert('Please upload main image');
            return;
        }
        const id = fnv1a32(productMain.handle);
        productMain.id = id;
        const res = doBatchPost([
            Params('add-product', {
                params: productMain,
            }),
            Params('add-product-details', {
                params: {
                    product_id: id,
                    images: images.map((item) => item.preview),
                    videos: [],
                    specs: {},
                },
            }),
            Params('add-product-skus', {
                params: {
                    product_id: id,
                    skus: skuList,
                },
            }),
            Params('add-product-options', {
                params: {
                    product_id: id,
                    options: attrOptions,
                },
            }),
            Params('add-product-sku-json', {
                params: {
                    product_id: productMain.id,
                    skus: skuList,
                },
            }),
        ]);
        // navigate(`/products-list`);
        res.then((res) => {
            console.log(res);
            if (!res) {
                alert('Add product failed');
                return;
            }
            const ok = res[0] !== null && res.slice(1).filter((item) => item !== null).length === 0;
            if (!ok) {
                navigate(`/products-list`);
                return;
            }
            navigate(`/products-list`);
        });
        console.log(res);
    };
    return (
        <Page pageTitle="Add Product" showBackgroud={false}>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <ProductMain onChange={(productMain) => setProductMain(productMain)} />
                    <ProductSeo />
                </div>
                <div className="space-y-6">
                    <UploadImage initImages={initImages} onChange={setImages} onOpenSelected={handleOpenUploadGallery} />
                    <ProductOptions onSkuChange={setSkuList} selectedSkuImages={selectedSkuImages} onChange={setAttrOptions} onOpenSelected={(key) => handleOpenModal(key)} />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 mt-6 bg-white p-4 rounded-lg">
                4444444444444
            </div>
            <PageFooterAction className="justify-end gap-2 ">
                <Button variant="outline" onClick={() => alert('Draft')}>
                    Draft
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save & Create
                </Button>
            </PageFooterAction>
            <ImageSelector doAction={handleSelectedImages} selectType={uploadType} isOpen={isOpen} closeModal={closeModal} uploadedImages={images} />
        </Page>
    );
}
