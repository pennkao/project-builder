import { Link } from 'react-router';
import styles from './styles.module.css';
const AppSidebar = () => {
    return (
        <nav className={styles.sidebar}>
            <Link to="/" className={styles.navItem}>
                🏠 Home
            </Link>
            <Link to="/login" className={styles.navItem}>
                🔑 Login
            </Link>
            <Link to="/admin" className={styles.navItem}>
                ⚙️ Admin
            </Link>
        </nav>
    );
};

export default AppSidebar;
