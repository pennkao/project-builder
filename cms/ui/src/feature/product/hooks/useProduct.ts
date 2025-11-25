import { defaultProductMain } from '@/defaults/product';
import { useBatchPost } from '@/hooks/usePost';
import { useEffect, useState } from 'react';
export function useProduct(productId: number) {
    const { doBatchPost, Params } = useBatchPost();
    const [productData, setProductData] = useState<ProductType>({
        main: defaultProductMain,
        options: [],
        skus: [],
        images: [],
        content: '',
    });
    const [productDataInit, setProductDataInit] = useState<ProductType>(productData);

    const setByKey = (key: keyof ProductType, value: any) => {
        if (key === 'images') {
            setProductData((prev) => ({ ...prev, images: value }));
            return;
        }
        setProductData((prev) => ({ ...prev, [key]: value }));
    };
    const setInitByKey = (key: keyof ProductType, value: any) => {
        setProductDataInit((prev) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        if (productId <= 0) return;

        async function fetchProduct() {
            await doBatchPost([
                Params<ProductMainType>('fetch', { params: { id: productId, target: 'product' } }, (res) => {
                    setByKey('main', res);
                    setInitByKey('main', res);
                }),
                Params('fetch', { params: { id: productId, target: 'product-skus' } }, (res) => {
                    setByKey('skus', res);
                    setInitByKey('skus', res);
                }),
                Params('fetch', { params: { id: productId, target: 'product-options' } }, (res) => {
                    setByKey('options', res);
                    setInitByKey('options', res);
                }),
                Params('fetch', { params: { id: productId, target: 'product-details' } }, (res) => {
                    setByKey('images', res.images);
                    setInitByKey('images', res.images);
                }),
                Params('fetch', { params: { id: productId, target: 'product-content' } }, (res) => {
                    console.log('product-content', res);
                    setByKey('content', res);
                    setInitByKey('content', res);
                }),
            ]);
        }

        fetchProduct();
    }, [productId]);

    return { productData, setProductData, productDataInit, setByKey };
}
