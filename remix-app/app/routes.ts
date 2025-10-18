import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';
export default [
    layout('layouts/main.tsx', [
        index('routes/home.tsx'),
        // route('product', 'routes/home.tsx'),
        route('collections', 'routes/products.tsx'),
        route('collections/:handle', 'routes/product.tsx'),
        route('test', 'routes/test.tsx'),
        // route("contacts/:contactId/edit", "routes/edit-contact.tsx"),
        // route("contacts/:contactId/destroy", "routes/destroy-contact.tsx"),
        // route("test", "routes/test.tsx"),
    ]),
] satisfies RouteConfig;
