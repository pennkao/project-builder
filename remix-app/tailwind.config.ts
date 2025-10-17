import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      brand: "#3b82f6",
    },
    maxWidth: {
      "8xl": "800px",   // ✅ v4 允许直接写，不需要 extend
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
} satisfies Config;
