import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryLight: "#329ec6",
        primaryDark: "#1892bf",
        greenLight: "#34d399",
        greenDark: "#059669",
        grayDark: "#6B7280",
      },
    },
    keyframes: {
      zoomIn: {
        "0%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.25)" },
        "100%": { transform: "scale(1)" },
      },
    },
    animation: {
      zoomIn: "zoomIn 1s ease-in-out",
    },
  },
  plugins: [],
};
export default config;
