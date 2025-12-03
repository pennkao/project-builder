import 'flatpickr/dist/flatpickr.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'swiper/swiper-bundle.css';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';
import { AppWrapper } from './layout/compos/common/AppWrapper';
// export const AppWrapper = ({ children }: { children: React.ReactNode }) => <HelmetProvider>{children}</HelmetProvider>;
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <AppWrapper>
                <App />
            </AppWrapper>
        </ThemeProvider>
    </StrictMode>
);
