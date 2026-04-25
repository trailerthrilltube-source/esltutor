import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0D1B40",
        gold: "#C8972A",
        "gold-light": "#E8B84B",
        ivory: "#FAF8F3",
        cream: "#F0EBE1",
        muted: "#B8C5D9",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseGold: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(200,151,42,0.35)" },
          "50%": { boxShadow: "0 0 0 10px rgba(200,151,42,0)" },
        },
        floatOrb: {
          "0%,100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-24px) translateX(12px)" },
        },
        waveform: {
          "0%,100%": { transform: "scaleY(0.35)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "pulse-gold": "pulseGold 2s infinite",
        "float-orb": "floatOrb 20s ease-in-out infinite",
        waveform: "waveform 1s ease-in-out infinite",
      },
    },
  },
};

export default config;
