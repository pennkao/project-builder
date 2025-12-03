import { defaultProductMain } from '@/defaults/product';
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';
import { normalizeProduct, normalizeProductSkus } from '../utils/format';
export function useProduct(productId: number) {
    const { api } = useApi();
    // const { doBatchPost, Params } = useBatchPost();
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

        api.batchPost([
            api.Params<ProductMainType>('fetch', { id: productId, target: 'product' }, (ok, data) => {
                if (!ok) return;
                if (!data) return;
                const normalized = normalizeProduct(data);
                setByKey('main', normalized);
                setInitByKey('main', normalized);
            }),
            api.Params<SkuType[]>('fetch', { id: productId, target: 'product-skus' }, (ok, data) => {
                if (!ok) return;
                if (!data) return;
                const normalized = normalizeProductSkus(data);
                setByKey('skus', normalized);
                setInitByKey('skus', normalized);
            }),
            api.Params<ProductAttrType>('fetch', { id: productId, target: 'product-options' }, (ok, data) => {
                if (!ok) return;
                if (!data) return;
                setByKey('options', data);
                setInitByKey('options', data);
            }),
            api.Params<ProductDetailsType>('fetch', { id: productId, target: 'product-details' }, (ok, data) => {
                if (!ok) return;
                if (!data) return;
                setByKey('images', data.images);
                setInitByKey('images', data.images);
            }),
            api.Params<string>('fetch', { id: productId, target: 'product-content' }, (ok, data) => {
                if (!ok) return;
                if (!data) return;
                const content = decodeURIComponent(data);
                setByKey('content', content);
                setInitByKey('content', content);
            }),
        ]);
    }, [productId]);

    return { productData, setProductData, productDataInit, setByKey };
}
