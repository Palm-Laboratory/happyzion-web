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
      spacing: {
        // ── Component gap ──────────────────────────
        "comp-xxs":  "4px",
        "comp-xs":   "6px",
        "comp-sm":   "8px",
        "comp-md":   "12px",
        "comp-base": "16px",
        "comp-lg":   "20px",
        "comp-xl":   "24px",
        "comp-xxl":  "28px",
        "comp-3xl":  "32px",
        "comp-4xl":  "36px",
        // ── Component padding ──────────────────────
        "pad-3xs":   "8px",
        "pad-xxs":   "12px",
        "pad-xs":    "16px",
        "pad-sm":    "20px",
        "pad-md":    "24px",
        "pad-base":  "28px",
        "pad-lg":    "32px",
        "pad-xl":    "36px",
        "pad-xxl":   "40px",
        "pad-3xl":   "44px",
        "pad-4xl":   "48px",
        // ── Layout gap ─────────────────────────────
        "layout-xs":   "2px",
        "layout-sm":   "16px",
        "layout-base": "24px",
        "layout-md":   "32px",
        "layout-lg":   "48px",
        "layout-xl":   "60px",
        "layout-xxl":  "80px",
        // ── Section ────────────────────────────────
        "section-sm": "60px",
        "section-md": "80px",
        "section-lg": "100px",
        "section-xl": "200px",
      },
    },
  },
  plugins: [],
};

export default config;
