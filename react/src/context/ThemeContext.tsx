// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // 从 localStorage 读取，或默认 light
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  useEffect(() => {
    // 更新 html 的 data-theme 属性
    document.documentElement.setAttribute("data-theme", theme);
    // 保存到 localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 方便在组件中使用
export const useTheme = () => useContext(ThemeContext);

    