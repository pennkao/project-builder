//routes/product.tsx
import { denormalizeProduct } from '@/lib/convert';
import ProductPage from '@/pages/product';
import { doGet } from '@/utils/api';
import { fnv1a32 } from '@/utils/tools';
import type { Route } from './+types/product';
export const loader = async ({ params }: Route.LoaderArgs) => {
    const { handle } = params;
    const id = fnv1a32(handle);
    const res = await doGet<ProductType>('product', id);
    return denormalizeProduct(res);
};

export default function Product({ loaderData }: Route.ComponentProps) {
    const data = loaderData;
    return (
        <>
            <ProductPage productData={data} />
        </>
    );
}
