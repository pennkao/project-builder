import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';
export default [
    layout('layouts/main.tsx', [
        index('routes/home.tsx'),
        route('products', 'routes/_product.tsx'),
        route('products/:handle', 'routes/product.tsx'),
        route('detect', 'routes/detect.tsx'),
        route('checkout', 'routes/_checkout.tsx'),
        route('checkout/:checkoutId', 'routes/checkout.tsx'),
        route('order-success/:orderId', 'routes/order.tsx'),
        route('payment', 'routes/pay.tsx'),
    ]),
] satisfies RouteConfig;
