import { Button } from '@/components/elements';
import RichTextEditor from '@/components/RichTextEditor';
import { config } from '@/config/config';
import { Content, Footer, Page } from '@/feature/compos/layout';
import { useNavigate, useParams } from 'react-router';
import { ImageSelector, ImageUploder, Options, Product } from './compos';
import { ProductContext } from './context';
import { useProductImages, useProductSave } from './hooks';
export default function Add() {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const product_id = Number.parseInt(id || '0');
    const { updateOrSave, productData, setProductData, productDataInit, setByKey } = useProductSave(product_id, 'product');
    const { imagesChannel, handleSelectedImages, openImageSelector, isOpen, closeModal, uploadType } = useProductImages();

    return (
        <ProductContext.Provider value={{ productId: Number.parseInt(id || '0'), productData, setProductData, productDataInit }}>
            <Page title="Add Product" showBackgroud={false}>
                <Content className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="space-y-6">
                        <Product />
                        <RichTextEditor
                            uploadUrl={config.UPLOAD_URL}
                            uploadDir={config.UPLOAD_DIR}
                            onChange={(value) => {
                                setProductData({ ...productData, content: value });
                            }}
                            initData={productDataInit.content}
                        />
                    </div>
                    <div className="space-y-6">
                        <ImageUploder
                            upLoadUrl={config.UPLOAD_URL}
                            upLoadDir={config.UPLOAD_DIR}
                            aotoUpLoad={true}
                            images={productDataInit.images}
                            onChange={(images) => {
                                setByKey('images', images);
                                setProductData((prev) => ({ ...prev, product: { ...prev.product, main_image: images[0] || '' } }));
                            }}
                            outSelected={imagesChannel}
                            onOpenSelected={openImageSelector}
                        />
                        <Options selectedSkuImages={imagesChannel} onOpenSelected={(key) => openImageSelector(key)} />
                    </div>
                </Content>

                <Footer className="flex justify-end gap-2 ">
                    <Button
                        variant="outline"
                        onClick={() => {
                            navigate('/products');
                        }}
                    >
                        Draft
                    </Button>
                    <Button variant="primary" onClick={() => updateOrSave()}>
                        Save & Create
                    </Button>
                </Footer>

                <ImageSelector doAction={handleSelectedImages} productImages={productData.images} selectType={uploadType} isOpen={isOpen} closeModal={closeModal} />
            </Page>
        </ProductContext.Provider>
    );
}
