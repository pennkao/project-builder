// src/layouts/MainLayout/index.tsx
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './styles.module.css';

export default function MainLayout() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.body}>
                <Sidebar />
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}

    