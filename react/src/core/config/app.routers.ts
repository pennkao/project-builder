// src/config/app.router.ts
export const appRoutes = [
    {
        path: '/',
        layout: 'MainLayout',
        children: [
            { index: true, component: 'HomePage' },//首页
            { path: 'login', component: 'LoginPage' },
            { path: 'root', component: 'AdminPage' },
        ],
    },
    {
        path: '/admin',
        layout: 'AdminLayout',
        children: [{ index: true, component: 'AdminPage' }],
    },
];
