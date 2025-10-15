import styles from './styles.module.css';

import Language from '@/components/common/Language';
const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.logo}>MyApp</div>
            </div>

            <div className={styles.center}>
                <input className={styles.search} placeholder="搜索..." />
            </div>

            <div className={styles.right}>
                <Language />
                <button className={styles.themeBtn}>🌙</button>
                <div className={styles.user}>
                    <img src="/avatar.png" alt="user" className={styles.avatar} />
                    <span>reco</span>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
