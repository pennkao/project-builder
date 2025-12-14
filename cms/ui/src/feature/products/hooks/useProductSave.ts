import { Confirm } from '@/components/composed';
import { defaultProductMain } from '@/defaults/product';
import { useApi } from '@/hooks/useApi';
import { decontent, encontent } from '@/lib/content';
import { formatNumbers } from '@/utils/pre';
import { fnv1a32 } from '@/utils/product';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { denormalizeProduct, denormalizeProductSkus, normalizeProduct, normalizeProductSkus } from '../utils/format';
const message = async (message: string, confirmText: string = 'Confirm', cancelText: string = 'Cancel') => {
    const confirm = await Confirm(confirmText, message, { confirmText, cancelText, danger: true });
    if (!confirm) return false;
    return true;
};
export function useProductSave(productId: number, target: string) {
    const navigate = useNavigate();

    const { api } = useApi();
    const [productData, setProductData] = useState<ProductType>({
        product: defaultProductMain,
        options: [],
        skus: [],
        images: [],
        content: '',
    });
    const [productDataInit, setProductDataInit] = useState<ProductType>(productData);
    const checkParams = (data: ProductType) => {
        const rules = [
            { valid: !!data.product.title, msg: 'Please enter title' },
            { valid: !!data.product.handle, msg: 'Please enter handle' },
            { valid: data.images.length > 0, msg: 'Please upload main image' },
        ];

        const failed = rules.find((r) => !r.valid);
        return failed ? failed.msg : null; // return null 表示全部通过
    };

    const saveProduct = async () => {
        const valid = checkParams(productData);
        if (valid) {
            await message(valid, 'Error');
            return;
        }

        const confirm = await message('Are you sure you want to save?');
        if (!confirm) return false;

        const id = fnv1a32(productData.product.handle);
        productData.product.id = id;
        productData.content = encontent(productData.content);
        api.Post('add-product', {
            product: denormalizeProduct(formatNumbers(productData.product)),
            skus: denormalizeProductSkus(formatNumbers(productData.skus)),
            sku_json: denormalizeProductSkus(formatNumbers(productData.skus)),
            details: { images: Array.from(new Set(productData.images)), videos: [], specs: {} },
            options: productData.options,
            content: encontent(productData.content),
        }).callback((ok) => {
            if (ok) {
                navigate('/products');
            }
        });
    };

    const updateProduct = async () => {
        const valid = checkParams(productData);
        if (valid) {
            await message(valid, 'Error');
            return;
        }

        if (JSON.stringify(formatNumbers(productData)) === JSON.stringify(formatNumbers(productDataInit))) {
            await message('No change');
            return;
        }

        const confirm = await message('Are you sure you want to save?');
        if (!confirm) return false;

        productData.content = encontent(productData.content);
        api.Post(`update-${target}`, {
            product: denormalizeProduct(formatNumbers(productData.product)),
            skus: denormalizeProductSkus(formatNumbers(productData.skus)),
            sku_json: denormalizeProductSkus(formatNumbers(productData.skus)),
            details: { images: Array.from(new Set(productData.images)), videos: [], specs: {} },
            options: productData.options,
            content: encontent(productData.content),
        }).callback((ok) => {
            if (ok) {
                navigate('/products');
            }
        });
    };

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
        api.doGet<ProductType>(productId, target).callback((data) => {
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

    const updateOrSave = async () => {
        if (productId && productId > 0) {
            await updateProduct();
        } else {
            await saveProduct();
        }
    };
    return { updateOrSave, productData, setProductData, productDataInit, setByKey };
}
