import { NavLink } from 'react-router';
import styles from './styles.module.css';
const AppSidebar = () => {
    const routers = [
        {
            path: '/',
            name: 'Home',
            icon: '🏠',
        },
        {
            path: '/login',
            name: 'Login',
            icon: '🔑',
        },
        {
            path: '/admin',
            name: 'Admin',
            icon: '⚙️',
        },
    ];

    return (
        <nav className={styles.sidebar}>
            {routers.map((item, index) => (
                <NavLink to={item.path} key={index} className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.active}` : styles.navItem)}>
                    {item.icon} {item.name}
                </NavLink>
            ))}
        </nav>
    );
};

export default AppSidebar;
