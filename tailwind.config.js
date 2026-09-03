/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0b",
          soft: "#111113",
          surface: "#17171a",
          surface2: "#1e1e22",
          border: "#2a2a2e",
        },
        signal: {
          DEFAULT: "#a6e22e", // terminal green — brand signature
          dim: "#7fb324",
        },
        pulse: {
          DEFAULT: "#38bdf8", // electric cyan — secondary accent
          dim: "#0ea5c9",
        },
        paper: {
          DEFAULT: "#f5f5f7",
          muted: "#9a9aa2",
          faint: "#6b6b72",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Courier New'", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(10,10,11,0) 0%, #0a0a0b 100%)",
        scanlines:
          "repeating-linear-gradient(to bottom, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(166,226,46,0.25), 0 8px 30px -8px rgba(166,226,46,0.35)",
        "glow-cyan":
          "0 0 0 1px rgba(56,189,248,0.25), 0 8px 30px -8px rgba(56,189,248,0.35)",
        card: "0 20px 50px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
