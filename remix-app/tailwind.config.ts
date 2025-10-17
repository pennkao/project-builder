import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        brand: "#3b82f6", // 自定义主题色
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
} satisfies Config;
