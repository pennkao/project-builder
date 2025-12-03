import { defaultProductMain } from '@/defaults/product';
import { useBatchPost } from '@/hooks/usePost';
import { decontent } from '@/lib/content';
import { useEffect, useState } from 'react';
import { normalizeProduct, normalizeProductSkus } from '../utils/format';

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
                    const normalized = normalizeProduct(res);
                    setByKey('main', normalized);
                    setInitByKey('main', normalized);
                }),
                Params<SkuType[]>('fetch', { params: { id: productId, target: 'product-skus' } }, (res) => {
                    const normalized = normalizeProductSkus(res);
                    setByKey('skus', normalized);
                    setInitByKey('skus', normalized);
                }),
                Params<ProductAttrType>('fetch', { params: { id: productId, target: 'product-options' } }, (res) => {
                    setByKey('options', res);
                    setInitByKey('options', res);
                }),
                Params<ProductDetailsType>('fetch', { params: { id: productId, target: 'product-details' } }, (res) => {
                    setByKey('images', res.images);
                    setInitByKey('images', res.images);
                }),
                Params<string>('fetch', { params: { id: productId, target: 'product-content' } }, (res) => {
                    const content = decontent(res);
                    setByKey('content', content);
                    setInitByKey('content', content);
                }),
            ]);
        }

        fetchProduct();
    }, [productId]);

    return { productData, setProductData, productDataInit, setByKey };
}
