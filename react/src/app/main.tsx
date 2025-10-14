// src/app/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 🧩 global styles
import "@/styles/animations.css";
import "@/styles/global.css";
import "@/styles/tailwind.css";
import "@/styles/variables.css";

// 🧩 React 18 的新 root API
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

