import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "navy": "#0D1B40",
        "gold": "#C8972A",
        "gold-light": "#E8B84B",
        "ivory": "#FAF8F3",
        "cream": "#F0EBE1",
        "muted": "#B8C5D9",
      },
      fontFamily: {
        "display": ['Cormorant Garamond', 'serif'],
        "body": ['DM Sans', 'sans-serif'],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "count-up": "countUp 2s ease-out forwards",
        "pulse-gold": "pulseGold 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
