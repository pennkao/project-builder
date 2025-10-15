// src/core/router/pageMap.ts
import { lazy } from 'react';
export const getPage = (name: string) => {
    const map: Record<string, any> = {
        HomePage: lazy(() => import('@/pages/Home')),
        LoginPage: lazy(() => import('@/pages/Login')),
        AdminPage: lazy(() => import('@/pages/Admin')),
    };
    return map[name];
};

    