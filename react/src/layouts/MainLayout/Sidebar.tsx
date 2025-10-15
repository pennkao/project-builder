// Sidebar.tsx
import styles from './sidebar.module.css';
import { Link } from 'react-router';
const Sidebar = () => {
    return (
        <nav className={styles.sidebar}>
            <ul>
                <li><Link to="/">🏠 Home</Link></li>
                <li><Link to="/login">🔑 Login</Link></li>
                <li><Link to="/admin">⚙️ Admin</Link></li>
            </ul>
        </nav>
    );
};

export default Sidebar;
    