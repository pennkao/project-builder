// MainLayout.tsx
import { detect } from '@/utils/location';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
const MainLayout = () => {
    useEffect(() => {
        detect();
    }, []);

    return (
        // MainLayout.tsx
        <main className={`min-h-screen bg-page max-w-4xl mx-auto overflow-scroll`}>
            <Outlet />
        </main>
    );
};

export default MainLayout;
