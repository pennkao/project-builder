// Sidebar.tsx
import styles from './sidebar.module.css';
const Sidebar = () => {
    return (
        <nav className={styles.sidebar}>
            <ul>
                <li>🏠 Home</li>
                <li>🔑 Login</li>
                <li>⚙️ Admin</li>
            </ul>
        </nav>
    );
};

export default Sidebar;
    