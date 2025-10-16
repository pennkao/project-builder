// src/App.tsx
import { ThemeProvider } from '@/context/ThemeContext';
import '@/core/i18n';
import AppRouter from '@/core/router';

const App = () => {
    return (
        <ThemeProvider>
            <AppRouter />
        </ThemeProvider>
    );
};

export default App;
