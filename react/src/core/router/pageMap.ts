// src/core/router/pageMap.ts
import { lazy } from 'react';

// 用函数返回懒加载组件（不是直接元素）
export function getPage(page: string) {
    switch (page) {
        case 'HomePage':
            return lazy(() => import('@/pages/Admin'));
        case 'IndexPage':
            return lazy(() => import('@/pages/Index'));
        case 'LoginPage':
            return lazy(() => import('@/pages/Login'));
        default:
            return null;
    }
}
