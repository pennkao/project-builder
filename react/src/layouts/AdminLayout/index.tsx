import { Link, Outlet } from 'react-router-dom';

const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
           {children || <Outlet />}
            <Link to="/">← Back Home</Link>
        </div>
    );
};

export default AdminLayout;
