//routes/product.tsx
import ProductPage from '@/pages/product';
import type { Route } from './+types/product';

export const loader = async ({ params }: Route.LoaderArgs) => {
    console.log(params);
    return {};
};
export const clientLoader = async () => {
    return {};
};
export default function Product({ loaderData }: Route.ComponentProps) {
    const data = loaderData;
    return (
        <>
            <ProductPage data={data} />
        </>
    );
}
