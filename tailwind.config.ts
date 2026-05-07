import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05070d",
        paper: "#f6f8ff",
        moss: "#ffd02f",
        clay: "#2f6df6",
        skywash: "#dbe7ff",
        navy: "#0d3a96",
        steel: "#697488",
        night: "#050914"
      },
      boxShadow: {
        soft: "0 22px 60px rgba(5, 9, 20, 0.16)",
        glow: "0 24px 80px rgba(47, 109, 246, 0.26)",
        lift: "0 26px 70px rgba(5, 9, 20, 0.24)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
        display: [
          "Segoe UI Variable Display",
          "Inter",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
        ui: [
          "Segoe UI Variable Text",
          "Inter",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "drift-grid": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "54px 54px" }
        },
        "scan-line": {
          "0%, 100%": { transform: "translateY(-18%)", opacity: "0.15" },
          "50%": { transform: "translateY(118%)", opacity: "0.35" }
        },
        "pulse-border": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.85" }
        },
        "ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "float-card": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "line-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.75s ease-out both",
        "drift-grid": "drift-grid 14s linear infinite",
        "scan-line": "scan-line 5s ease-in-out infinite",
        "pulse-border": "pulse-border 2.8s ease-in-out infinite",
        "ticker": "ticker 22s linear infinite",
        "float-card": "float-card 5s ease-in-out infinite",
        "scale-in": "scale-in 0.45s ease-out both",
        "line-sweep": "line-sweep 2.7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
