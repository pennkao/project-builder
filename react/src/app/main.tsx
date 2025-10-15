// src/app/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 🧩 global styles
import '@/styles/animations.css';
import '@/styles/global.css';
import '@/styles/tailwind.css';
import '@/styles/variables.css';
import App from './App';
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
