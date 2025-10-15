// src/layouts/MainLayout/index.tsx
import React from 'react';
import { Outlet } from 'react-router';

import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './styles.module.css';
export function MainLayout({ children }: { children?: React.ReactNode }) {
    return (
        <div className={styles.content}>
            <Header />
            <Sidebar />
            <main>{children || <Outlet />}</main>
            <Footer />
        </div>
    );
}

export default MainLayout;


    