const AppFooter = ({ className }: { className?: string }) => {
    className = className || '';
    return (
        <div className={`h-16 mx-auto text-center bg-gray-800 text-white py-4 ${className}`}>
            <p>&copy; 2023 React Router Contacts. All rights reserved.</p>
        </div>
    );
};

export default AppFooter;
