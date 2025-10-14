import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';
const AuthLayout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className={styles.content}>
            <Header />
            <main>{children || <Outlet />}</main>
            <Footer />
        </div>
    );
};

export default AuthLayout;
