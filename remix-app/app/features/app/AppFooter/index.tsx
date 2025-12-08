const AppFooter = ({ className }: { className?: string }) => {
    className = className || '';
    return (
        <div className={` mx-auto text-center bg-gray-800 text-white px-4 py-5 ${className}`}>
            <p>©2025 Biiyea Inc. All rights reserved.</p>
        </div>
    );
};

export default AppFooter;
