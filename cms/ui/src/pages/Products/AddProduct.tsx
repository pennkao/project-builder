import Page from '@/components/page/Page';
import PageFooterAction from '@/components/page/PageFooterAction';
import Button from '@/components/ui/button/Button';
import { config } from '@/config/config';
import { ProductContext } from '@/context/product';
import ImageSelector from '@/feature/product/ImageSelector';
import ImageUploader from '@/feature/product/ImageUploader';
import ProductOptions from '@/feature/product/ProducOptions';
import ProductMain from '@/feature/product/ProductMain';
import ProductSeo from '@/feature/product/ProductSeo';
import { useProduct, useProductImages, useProductSave } from '@/hooks/product';
import { useNavigate, useParams } from 'react-router';
export default function AddProduct() {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const product_id = Number.parseInt(id || '0');
    // Confirm('确认删除吗？', `删除后将无法恢复${param_id}`);

    // const { doBatchPost, Params } = useBatchPost();
    const { productData, setProductData, productDataInit, setByKey } = useProduct(product_id);
    const { saveProduct, updateProduct, test } = useProductSave(product_id, productData, productDataInit, navigate);
    const { imagesChannel, handleSelectedImages, openImageSelector, isOpen, closeModal, uploadType } = useProductImages();

    const handleSave = (product_id: number) => {
        if (product_id > 0) {
            updateProduct();
        } else {
            saveProduct();
        }
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
                            onChange={(images) => setByKey('images', images)}
                            outSelected={imagesChannel}
                            onOpenSelected={openImageSelector}
                        />
                        <ProductOptions selectedSkuImages={imagesChannel} onOpenSelected={(key) => openImageSelector(key)} />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 mt-6 bg-white p-4 rounded-lg">4444444444444</div>
                <PageFooterAction className="justify-end gap-2 ">
                    <Button variant="outline" onClick={() => alert('Draft')}>
                        Draft
                    </Button>
                    <Button variant="primary" onClick={() => handleSave(product_id)}>
                        Save & Create
                    </Button>
                </PageFooterAction>

                <ImageSelector doAction={handleSelectedImages} productImages={productData.images} selectType={uploadType} isOpen={isOpen} closeModal={closeModal} />
            </Page>
        </ProductContext.Provider>
    );
}
