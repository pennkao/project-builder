const AppFooter = ({className}: {className?: string}) => {
  return (
    <footer className={`bg-gray-800 text-white py-4 ${className}`}>
      <div className="container mx-auto text-center">
        <p>&copy; 2023 React Router Contacts. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default AppFooter;