//routes/product.tsx
import { createApi } from '@/hooks/useApi';
import { denormalizeProduct } from '@/lib/convert';
import ProductPage from '@/pages/product';
import { fnv1a32 } from '@/utils/tools';

import type { Route } from './+types/product';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const { handle } = params;
    const api = createApi();
    const id = fnv1a32(handle);
    const res = await api.setHeader('Origin', 'http://localhost:5174').doGet<ProductType>('product', { id: id });
    if (!res) return null;
    return denormalizeProduct(res);
};

export default function Product({ loaderData }: Route.ComponentProps) {
    const data = loaderData;
    if (!data) {
        return <div>Product not found</div>;
    }
    return (
        <>
            <ProductPage productData={data} />
        </>
    );
}
