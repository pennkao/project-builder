// tailwind.config.ts （或 .js）
import type { Config } from "tailwindcss";

export default {
  // 👇 必须包含 content！
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#3b82f6",
      },
      maxWidth: {
        '5xl': '200px', // ✅ 现在会生效
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },

  plugins: [],
} satisfies Config;