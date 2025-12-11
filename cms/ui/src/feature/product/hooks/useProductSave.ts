import { Confirm } from '@/components/composed';
import { useApi } from '@/hooks/useApi';
import { encontent } from '@/lib/content';
import { formatNumbers } from '@/utils/pre';
import { fnv1a32 } from '@/utils/product';

import { denormalizeProduct, denormalizeProductSkus } from '../utils/format';

export function useProductSave(productId: number, productData: ProductType, productDataInit: ProductType, navigate: Function) {
    const { api } = useApi();

    const message = async (message: string) => {
        const confirm = await Confirm('Error', message, { confirmText: 'Confirm', cancelText: 'Cancel', danger: true });
        if (!confirm) return false;
        return true;
    };

    const checkParams = (data: ProductType) => {
        const rules = [
            { valid: !!data.main.name, msg: 'Please enter name' },
            { valid: !!data.main.handle, msg: 'Please enter handle' },
            { valid: data.images.length > 0, msg: 'Please upload main image' },
        ];

        const failed = rules.find((r) => !r.valid);
        return failed ? failed.msg : null; // return null 表示全部通过
    };

    const saveProduct = async () => {
        const valid = checkParams(productData);
        if (valid) {
            await message(valid);
            return;
        }

        const confirm = await message('Are you sure you want to save this site?');
        if (!confirm) return false;

        const id = fnv1a32(productData.main.handle);
        productData.main.id = id;
        productData.content = encontent(productData.content);
        const res = await api.batchPost([
            api.Params('add-product', denormalizeProduct(formatNumbers(productData.main))),
            api.Params('add-product-content', { product_id: id, content: productData.content }),
            api.Params('add-product-details', { product_id: id, images: Array.from(new Set(productData.images)), videos: [], specs: {} }),
            api.Params('add-product-skus', { product_id: id, skus: denormalizeProductSkus(formatNumbers(productData.skus)) }),
            api.Params('add-product-options', { product_id: id, options: productData.options }),
            api.Params('add-product-sku-json', { product_id: id, skus: productData.skus }),
        ]);

        let ret = true;
        res.forEach((i) => {
            if (!i.ok) {
                ret = false;
            }
        });
        if (!ret) {
            await message('Add product failed');
            return;
        }
        navigate('/products');
    };

    const updateProduct = async () => {
        const valid = checkParams(productData);
        if (valid) {
            await message(valid);
            return;
        }

        if (JSON.stringify(formatNumbers(productData)) === JSON.stringify(formatNumbers(productDataInit))) {
            await message('No change');
            return;
        }

        const confirm = await message('Are you sure you want to save this site?');
        if (!confirm) return false;

        productData.content = encontent(productData.content);

        const res = await api.batchPost([
            api.Params('update-product', denormalizeProduct(formatNumbers(productData.main))),
            api.Params('update-product-content', { product_id: productId, content: productData.content }),
            api.Params('update-product-details', { product_id: productId, images: Array.from(new Set(productData.images)), videos: [], specs: {} }),
            api.Params('update-product-skus', { product_id: productId, skus: denormalizeProductSkus(formatNumbers(productData.skus)) }),
            api.Params('update-product-options', { product_id: productId, options: productData.options }),
            api.Params('update-product-sku-json', { product_id: productId, skus: productData.skus }),
        ]);
        let ret = true;
        res.forEach((i) => {
            if (!i.ok) {
                ret = false;
            }
        });
        if (!ret) {
            await message('Add product failed');
            return;
        }
        navigate('/products');
    };

    return { saveProduct, updateProduct };
}
