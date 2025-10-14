// src/core/router/routes.ts
import { appRoutes } from '@/core/config/app.routers';
import { Suspense } from 'react';
import { BrowserRouter, Outlet, useRoutes } from 'react-router-dom';
import { layoutMap } from './layoutMap';
import { getPage } from './pageMap';

export function buildRoutes(appRoutes: any[]) {
    return appRoutes.map((route) => {
        const Layout = layoutMap[route.layout as keyof typeof layoutMap];

        return {
            path: route.path,
            element: (
                <Suspense fallback={<div>Loading layout...</div>}>
                    <Layout>
                        <Outlet />
                    </Layout>
                </Suspense>
            ),
            children: route.children?.map((child: any) => {
                const Page = getPage(child.component);
                return {
                    path: child.path,
                    element: <Suspense fallback={<div>Loading page...</div>}>getPage(child.component)</Suspense>,
                };
            }),
        };
    });
}

function RouterView() {
    const routeElements = buildRoutes(appRoutes);
    return useRoutes(routeElements);
}

const AppRouter = () => {
    return (
        <BrowserRouter>
            <RouterView />
        </BrowserRouter>
    );
};

export default AppRouter;
