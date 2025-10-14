// src/config/app.router.ts

export const appRoutes = [
    {
        path: '/',
        layout: 'MainLayout',
        children: [
            { path: '/', component: 'IndexPage' },
            { path: '/login', component: 'LoginPage' },
        ],
    },
    {
        path: '/admin',
        layout: 'AdminLayout',
        children: [{ path: '/admin/', component: 'AdminPage' }],
    },
];
