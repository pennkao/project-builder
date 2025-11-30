//routes/order.tsx
import OrderPage from '@/pages/order';
import type { Route } from './+types/order';

export const loader = async ({ params }: Route.LoaderArgs) => {
    const { orderId } = params;
    return orderId;
};
export default function Order({ loaderData }: Route.ComponentProps) {
    const orderId = loaderData;
    return (
        <>
            <OrderPage orderId={orderId} />
        </>
    );
}
