import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  "#f0f5e8",
          100: "#d9eac3",
          200: "#b8d494",
          300: "#8fba5e",
          400: "#6fa035",
          500: "#4A7C59",
          600: "#2D5016",
          700: "#1e3a0e",
          800: "#122509",
          900: "#0a1504",
        },
        cream: {
          50:  "#FDFAF5",
          100: "#F8F3E9",
          200: "#EDE4D3",
          300: "#DDD0B8",
          400: "#C9B898",
          500: "#B5A07A",
        },
        wood: {
          300: "#C49A6C",
          400: "#A67C52",
          500: "#8B5E3C",
          600: "#6B4226",
          700: "#4A2C14",
        },
        gold: {
          300: "#E8C97A",
          400: "#D4A853",
          500: "#B8882A",
        },
        night: {
          700: "#1A2744",
          800: "#111827",
          900: "#0D1421",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans:  ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "texture-noise":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-up":   "fadeUp 0.8s ease forwards",
        "fade-in":   "fadeIn 1s ease forwards",
        "float":     "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
