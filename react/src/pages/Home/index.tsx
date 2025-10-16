// src/pages/Home/index.tsx
import React, { Activity, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import styles from './styles.module.css';

const HomePage = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { t } = useTranslation();
    const [count, setCount] = useState(0);

    const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
    const UserList = React.memo(({ users }: { users: { id: number; name: string }[] }) => {
        console.log('Render UserList');
        return (
            <div>
                {users.map((user: { id: number; name: string }) => (
                    <div key={user.id}>{user.name}</div>
                ))}
            </div>
        );
    });

    useEffect(() => {
        fetch('/api/users')
            .then((res) => res.json())
            .then((data) => setUsers(data.data));
    }, []);

    return (
        <>
            <button onClick={() => setCount((c) => c + 1)}>点击 {count}</button>
            <Activity mode={count > 5 ? 'visible' : 'hidden'}>
                <p>
                    当前位置：{position.x} - {position.y}
                </p>
            </Activity>
            <UserList users={users} />
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
                    <Link to="admin">{t('common.wellcome')}</Link>
                </div>
            </div>
        </>
    );
};

export default HomePage;
