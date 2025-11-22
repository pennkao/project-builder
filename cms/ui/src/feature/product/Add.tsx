import { Button } from '@/components/elements';
import { config } from '@/config/config';
import { Content, Footer, Page } from '@/feature/common/layout';
import { ProductContext } from './context';

import { useNavigate, useParams } from 'react-router';
import { ImageSelector, ImageUploder, Options, Product, Seo } from './comps';
import { useProduct, useProductImages, useProductSave } from './hooks';
export default function Add() {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const product_id = Number.parseInt(id || '0');
    // Confirm('确认删除吗？', `删除后将无法恢复${param_id}`);

    // const { doBatchPost, Params } = useBatchPost();
    const { productData, setProductData, productDataInit, setByKey } = useProduct(product_id);
    const { saveProduct, updateProduct } = useProductSave(product_id, productData, productDataInit, navigate);
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
            <Page title="Add Product" showBackgroud={false}>
                <Content className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="space-y-6">
                        <Product />
                        <Seo />
                    </div>
                    <div className="space-y-6">
                        <ImageUploder
                            upLoadUrl={config.apiBaseUrl + 'file/upload'}
                            aotoUpLoad={true}
                            images={productDataInit.images}
                            onChange={(images) => setByKey('images', images)}
                            outSelected={imagesChannel}
                            onOpenSelected={openImageSelector}
                        />
                        <Options selectedSkuImages={imagesChannel} onOpenSelected={(key) => openImageSelector(key)} />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 mt-6 bg-white p-4 rounded-lg">4444444444444</div>
                </Content>

                <Footer className="flex justify-end gap-2 ">
                    <Button variant="outline" onClick={() => alert('Draft')}>
                        Draft
                    </Button>
                    <Button variant="primary" onClick={() => handleSave(product_id)}>
                        Save & Create
                    </Button>
                </Footer>

                <ImageSelector doAction={handleSelectedImages} productImages={productData.images} selectType={uploadType} isOpen={isOpen} closeModal={closeModal} />
            </Page>
        </ProductContext.Provider>
    );
}
