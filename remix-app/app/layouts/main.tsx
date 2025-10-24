// MainLayout.tsx
import BackToTopButton from '@/components/BackToTopButton';
import AppFooter from '@/features/app/AppFooter';
import { detect } from '@/utils/location';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
const MainLayout = () => {
    useEffect(() => {
        detect();
    }, []);

    return (
        // MainLayout.tsx
        <main className={`min-h-screen bg-white max-w-4xl mx-auto overflow-scroll`}>
            <Outlet />
            <AppFooter />
            <BackToTopButton />
        </main>
    );
};

export default MainLayout;
