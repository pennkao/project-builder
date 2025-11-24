//routes/checkout.tsx
import CheckoutPage from '@/pages/checkout';
import type { Route } from './+types/checkout';

export const loader = async () => {
    return {};
};
export const clientLoader = async () => {
    return {};
};
export default function Checkout({ loaderData }: Route.ComponentProps) {
    const data = loaderData;
    return (
        <>
            <CheckoutPage data={null} />
        </>
    );
}
