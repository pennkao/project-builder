import { Confirm } from '@/components/composed';
import { useBatchPost } from '@/hooks/usePost';
// import { makeProductAttrs } from '@/utils/attrs';
import { formatNumbers } from '@/utils/pre';
import { fnv1a32 } from '@/utils/product';
export function useProductSave(productId: number, productData: ProductType, productDataInit: ProductType, navigate: Function) {
    const { doBatchPost, Params } = useBatchPost();

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

        const id = fnv1a32(productData.main.handle);
        productData.main.id = id;

        // return;
        const res = await doBatchPost([
            Params('add-product', { params: formatNumbers(productData.main) }),
            Params('add-product-details', { params: { product_id: id, images: Array.from(new Set(productData.images)), videos: [], specs: {} } }),
            Params('add-product-skus', { params: { product_id: id, skus: formatNumbers(productData.skus) } }),
            Params('add-product-options', { params: { product_id: id, options: productData.options } }),
            Params('add-product-sku-json', { params: { product_id: id, skus: productData.skus } }),
        ]);

        if (!res) {
            await message('Add product failed');
            return;
        }
        const ok = res[0] !== null && res.slice(1).every((item) => item === null);
        if (!ok) {
            await message('Add product failed');
            return;
        }
        navigate('/products-list');
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
        const res = await doBatchPost([
            Params('update-product', { params: formatNumbers(productData.main) }),
            Params('update-product-details', { params: { product_id: productId, images: Array.from(new Set(productData.images)), videos: [], specs: {} } }),
            Params('update-product-skus', { params: { product_id: productId, skus: formatNumbers(productData.skus) } }),
            Params('update-product-options', { params: { product_id: productId, options: productData.options } }),
            Params('update-product-sku-json', { params: { product_id: productId, skus: productData.skus } }),
        ]);

        if (!res) {
            await message('Update product failed');
            return;
        }
        const ok = res[0] !== null && res.slice(1).every((item) => item === null);
        if (!ok) {
            await message('Update product failed');
            return;
        }
        navigate('/products-list');
    };

    return { saveProduct, updateProduct };
}
