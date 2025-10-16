// src/pages/Home/index.tsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import styles from './styles.module.css';

const HomePage = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('/api/users')
            .then((res) => res.json())
            .then((data) => setUsers(data.data));
    }, []);
    // const aaa = useEffectEvent(() => {
    //     console.log('position', position);
    // });

    useEffect(() => {
        document.addEventListener('mousemove', (e) => {
            // aaa();
        });
    }),
        [position];

    return (
        <>
            {users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
            <h1>🏠 This is Home Page</h1>
            <div className={styles.container}>
                <div className={`${styles.item}  ${styles.first}`}>
                    <span>
                        <Link className={styles.sp} style={{ verticalAlign: 'middle' }} to="/">
                            Home
                        </Link>
                        <img className={styles.img} alt="" />
                        {position.x} - {position.y}
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
                    <Link to="admin">{t('logout')}</Link>
                </div>
            </div>
        </>
    );
};

export default HomePage;
