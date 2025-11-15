import { Confirm } from '@/components/Confirm';
import Page from '@/components/page/Page';
import PageFooterAction from '@/components/page/PageFooterAction';
import Button from '@/components/ui/button/Button';
import { config } from '@/config/config';
import { ProductContext } from '@/context/product';
import { defaultProductMain } from '@/defaults/product';
import ImageSelector from '@/feature/product/ImageSelector';
import ImageUploader from '@/feature/product/ImageUploader';
import ProductOptions from '@/feature/product/ProducOptions';
import ProductMain from '@/feature/product/ProductMain';
import ProductSeo from '@/feature/product/ProductSeo';
import { useModal } from '@/hooks/useModal';
import { useBatchPost } from '@/hooks/usePost';
import { fnv1a32 } from '@/utils/product';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
export default function AddProduct() {
    const navigate = useNavigate();
    
    const { id } = useParams<{ id: string }>();
    const product_id = Number.parseInt(id || '0');
    // Confirm('确认删除吗？', `删除后将无法恢复${param_id}`);
    const { doBatchPost, Params } = useBatchPost();

    const [productData, setProductData] = useState<ProductType>({
        main: defaultProductMain,
        options: [],
        skus: [],
        images: [],
        content: '',
    });
    const [productDataInit, setProductDataInit] = useState<ProductType>({
        main: defaultProductMain,
        options: [],
        skus: [],
        images: [],
        content: '',
    });
    const [selectedSkuImages, setSelectedSkuImages] = useState<{ index: number; img: string }>({ index: 0, img: '' });
    const { isOpen, openModal, closeModal } = useModal();
    const [uploadType, setUploadType] = useState<UploadSelectType>('single');
    const [skuIndex, setSkuIndex] = useState<number | null>(null);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    // useEffect(() => {
    //     console.log(productData.skus);
    // }, [productData.skus]);
    useEffect(() => {
        if (product_id <= 0) {
            return;
        }
        if (product_id > 0) {
            async function fetchProduct() {
                await doBatchPost([
                    Params<ProductMainType>(
                        'fetch',
                        {
                            params: {
                                id: product_id,
                                target: 'product',
                            },
                        },
                        (res) => {
                            console.log(res, 'main11111111');
                            setProductDataByKey('main', res as ProductMainType);
                            setProductDataInitByKey('main', res as ProductMainType);
                        }
                    ),
                    Params(
                        'fetch',
                        {
                            params: {
                                id: product_id,
                                target: 'product-skus',
                            },
                        },
                        (res) => {
                            console.log(res, 'skus333333333333');
                            setProductDataByKey('skus', res as SkuType[]);
                            setProductDataInitByKey('skus', res as SkuType[]);
                        }
                    ),
                    Params(
                        'fetch',
                        {
                            params: {
                                id: product_id,
                                target: 'product-options',
                            },
                        },
                        (res) => {
                            console.log(res, 'options4444444444');

                            setProductDataByKey('options', res);
                            setProductDataInitByKey('options', res);
                        }
                    ),
                    Params(
                        'fetch',
                        {
                            params: {
                                id: product_id,
                                target: 'product-details',
                            },
                        },
                        (res) => {
                            console.log(res, 'details4444444444');

                            setProductDataByKey('images', res.images as string[]);
                            setProductDataInitByKey('images', res.images as string[]);
                        }
                    ),
                    Params(
                        'fetch',
                        {
                            params: {
                                id: product_id,
                                target: 'product-content',
                            },
                        },
                        (res) => {
                            console.log(res, 'content content');
                            setProductDataByKey('content', res.content);
                            setProductDataInitByKey('content', res.content);
                        }
                    ),
                ]);
            }

            fetchProduct();
        }
    }, []);

    const setProductDataByKey = (key: keyof ProductType, value: any) => {
        setProductData((prev) => ({ ...prev, [key]: value }));
    };
    const setProductDataInitByKey = (key: keyof ProductType, value: any) => {
        setProductDataInit((prev) => ({ ...prev, [key]: value }));
    };
    const handleSelectedImages = (selectedImages: string[]) => {
        if (selectedImages.length <= 0) {
            return;
        }
        if (uploadType === 'single' && skuIndex !== null) {
            setSelectedSkuImages({ index: skuIndex, img: selectedImages[0] || '' });
        }
        if (uploadType === 'multiple') {
            setGalleryImages(selectedImages);
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

    const confirm = async (msg: string) => {
        const result = await Confirm('ERROR', msg);
        return result;
    };
    const handleSave = () => {
        if (!productData.main.name) {
            confirm('Please enter name');
            return;
        }
        if (!productData.main.handle) {
            confirm('Please enter handle');
            return;
        }
        if (productData.images.length <= 0) {
            confirm('Please upload main image' + JSON.stringify(productData.images));
            return;
        }
        const id = fnv1a32(productData.main.handle);
        productData.main.id = id;
        const res = doBatchPost([
            Params('add-product', {
                params: productData.main,
            }),
            Params('add-product-details', {
                params: {
                    product_id: id,
                    images: productData.images,
                    videos: [],
                    specs: {},
                },
            }),
            Params('add-product-skus', {
                params: {
                    product_id: id,
                    skus: productData.skus,
                },
            }),
            Params('add-product-options', {
                params: {
                    product_id: id,
                    options: productData.options,
                },
            }),
            Params('add-product-sku-json', {
                params: {
                    product_id: id,
                    skus: productData.skus,
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
        <ProductContext.Provider value={{ productId: Number.parseInt(id || '0'), productData, setProductData, productDataInit }}>
            <Page pageTitle="Add Product" showBackgroud={false}>
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="space-y-6">
                        <ProductMain />
                        <ProductSeo />
                    </div>
                    <div className="space-y-6">
                        <ImageUploader
                            upLoadUrl={config.apiBaseUrl + 'file/upload'}
                            aotoUpLoad={true}
                            images={productDataInit.images}
                            onChange={(images) => setProductDataByKey('images', images)}
                            selected={galleryImages}
                            onOpenSelected={handleOpenUploadGallery}
                        />
                        <ProductOptions selectedSkuImages={selectedSkuImages} onOpenSelected={(key) => handleOpenModal(key)} />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 mt-6 bg-white p-4 rounded-lg">4444444444444</div>
                <PageFooterAction className="justify-end gap-2 ">
                    <Button variant="outline" onClick={() => alert('Draft')}>
                        Draft
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save & Create
                    </Button>
                </PageFooterAction>

                <ImageSelector doAction={handleSelectedImages} selectType={uploadType} isOpen={isOpen} closeModal={closeModal} />
            </Page>
        </ProductContext.Provider>
    );
}
