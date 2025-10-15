// src/layouts/MainLayout/index.tsx
import AppFooter from '@/features/app/components/AppFooter';
import AppHeader from '@/features/app/components/AppHeader';
import AppSidebar from '@/features/app/components/AppSidebar';
import { Outlet } from 'react-router';
import styles from './styles.module.css';

export default function MainLayout() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <AppHeader />
            </div>
            <div className={styles.body}>
                <AppSidebar />
                <div className={styles.content}>
                    <main className={styles.main}>
                        <Outlet />
                    </main>
                    <AppFooter />
                </div>
            </div>
        </div>
    );
}

    