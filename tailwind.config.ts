import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      colors: {
        palette: {
          background: "#f6f5f0",
          surface: "#fffdf7",
          surfaceSoft: "#f0ece0",
          ink: "#1f2b24",
          forest: "#335c4a",
          sage: "#7c9a7e",
          sand: "#d7c7a1",
          gold: "#c7a45f",
        },
        ivory: "#fffdf7",
        ink: "#1f2b24",
        forest: "#335c4a",
        sage: "#7c9a7e",
        sand: "#d7c7a1",
        gold: "#c7a45f",
        cedar: "#2a4f8f",
        themeBlue: "#1c2f48",
        "site-ink": "#10213f",
      },
      boxShadow: {
        soft: "0 14px 40px rgba(31, 43, 36, 0.12)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(400%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
