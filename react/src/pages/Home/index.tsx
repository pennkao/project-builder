// src/pages/Home/index.tsx
import { Link } from 'react-router';
import styles from './styles.module.css';
const HomePage = () => {
    return (
        <>
            <h1>🏠 This is Home Page</h1>
            <div className={styles.container}>

                <div className={`${styles.item}  ${styles.first}`}>
                    <span>Home</span>
                    <Link to="/">Home</Link>
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


    