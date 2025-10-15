import { Link } from 'react-router';
import styles from './styles.module.css';
const Sidebar = () => {
    return (
        <nav className={styles.sidebar}>
            <div className={styles.item}>
                <Link to="/">🏠 Home</Link>
            </div>
            <div className={styles.item}>
                <Link to="/login">🔑 Login</Link>
            </div>
            <div className={styles.item}>
                <Link to="/admin">⚙️ Admin</Link>
            </div>
        </nav>
    );
};

export default Sidebar;
