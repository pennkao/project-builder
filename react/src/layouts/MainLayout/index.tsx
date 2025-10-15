// src/layouts/MainLayout/index.tsx
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Outlet } from 'react-router';
import styles from './styles.module.css';

export default function MainLayout() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.body}>
                <Sidebar />
                <div className={styles.content}>
                    <main className={styles.main}>
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
