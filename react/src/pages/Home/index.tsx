// src/pages/Home/index.tsx
import { useState } from 'react';
import { Link } from 'react-router';
import styles from './styles.module.css';
const HomePage = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    return (
        <>
            <h1>🏠 This is Home Page</h1>
            <div className={styles.container}>
                <div className={`${styles.item}  ${styles.first}`}>
                    <span>
                        <Link className={styles.sp} style={{ verticalAlign: 'middle' }} to="/">
                            Home
                        </Link>

                        <img  className={styles.img} alt="" />
                    </span>
                </div>
                <div className={styles.item}>
                    <Link to="login">root</Link>
                </div>
                <div className={styles.item}>
                    <Link to="admin">login</Link>
                </div>
                <div className={styles.item}>
                    <Link to="admin">login</Link>
                </div>
                <div className={styles.item}>
                    <Link to="admin">login</Link>
                </div>
                <div className={styles.item}>
                    <Link to="admin">login</Link>
                </div>
            </div>
        </>
    );
};

export default HomePage;

    