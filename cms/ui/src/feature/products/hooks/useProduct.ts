import { defaultProductMain } from '@/defaults/product';
import { useApi } from '@/hooks/useApi';
import { decontent } from '@/lib/content';
import { useEffect, useState } from 'react';
import { normalizeProduct, normalizeProductSkus } from '../utils/format';
export function useProduct(productId: number) {
    const { api } = useApi();
    // const { doBatchPost, Params } = useBatchPost();
    const [productData, setProductData] = useState<ProductType>({
        product: defaultProductMain,
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
        api.doGet<ProductType>(productId, 'product').callback((data) => {
            if (!data) return;
            const product = normalizeProduct<ProductMainType>(data.product);
            setByKey('product', product);
            setInitByKey('product', product);

            const skus = normalizeProductSkus<SkuType>(data.skus);
            setByKey('skus', skus);
            setInitByKey('skus', skus);

            setByKey('options', data.options);
            setInitByKey('options', data.options);
            setByKey('images', data.details.images);
            setInitByKey('images', data.details.images);

            const content = decontent(data.content);
            setByKey('content', content);
            setInitByKey('content', content);
        });
    }, [productId]);

    return { productData, setProductData, productDataInit, setByKey };
}
