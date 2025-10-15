// src/pages/Home/index.tsx
import { Link } from 'react-router';
const HomePage = () => {
    return (
        <>
            <h1>🏠 This is Home Page</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="root">root</Link>
                </li>
                <li>
                    <Link to="login">login</Link>
                </li>
            </ul>
        </>
    );
};

export default HomePage;


    