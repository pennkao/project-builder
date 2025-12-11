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
    const url = new URL(request.url);
    const origin = url.origin;
    const res = await api.setHeader('Origin', origin).doGet<ProductType>('product', { id: id });
    if (!res) throw new Response('Not found', { status: 404 });

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
