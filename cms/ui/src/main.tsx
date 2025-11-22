import 'flatpickr/dist/flatpickr.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'swiper/swiper-bundle.css';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { AppWrapper } from './feature/common/layout/compos/PageMeta.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <AppWrapper>
                <App />
            </AppWrapper>
        </ThemeProvider>
    </StrictMode>
);
