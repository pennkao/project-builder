// src/core/router/index.ts
import { appRoutes } from '@/core/config/app.routers';
import { Suspense } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router';
import { layoutMap } from './layoutMap';
import { getPage } from './pageMap';

function buildRoutes(appRoutes: any[]): RouteObject[] {
    return appRoutes.map((route) => {
        const Layout = layoutMap[route.layout as keyof typeof layoutMap];

        return {
            path: route.path,
            element: (
                <Suspense fallback={<div>Loading layout...</div>}>
                    <Layout />
                </Suspense>
            ),
            children: route.children?.map((child: any) => {
                const Page = getPage(child.component)!;
                if (child.index) {
                    return {
                        index: true,
                        element: (
                            <Suspense fallback={<div>Loading page...</div>}>
                                <Page />
                            </Suspense>
                        ),
                    };
                }
                return {
                    path: child.path,
                    element: (
                        <Suspense fallback={<div>Loading page...</div>}>
                            <Page />
                        </Suspense>
                    ),
                };
            }),
        };
    });
}

const router = createBrowserRouter(buildRoutes(appRoutes));

export default function AppRouter() {
    return <RouterProvider router={router} />;
}


    