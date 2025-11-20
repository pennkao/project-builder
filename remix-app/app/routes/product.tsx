//routes/product.tsx
import ProductPage from '@/pages/product';
import type { Route } from './+types/product';

export const loader = async ({ params }: Route.LoaderArgs) => {
    const { handle } = params;
    try {
        const response = await fetch(`http://localhost:8080/api/product/${handle}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            credentials: 'include',
        });
        if (!response.ok) {
            throw new Response('Product not found', { status: 404 });
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        throw new Response('Internal Server Error', { status: 500 });
    }
};
// export const clientLoader = async () => {
//     return {};
// };
export default function Product({ loaderData }: Route.ComponentProps) {
    const data = loaderData;
    console.log('detail:', data);
    return (
        <>
            <ProductPage productMain={data.data} />
        </>
    );
}
