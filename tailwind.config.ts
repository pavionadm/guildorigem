import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0b0906",
        "void-2": "#15100a",
        parchment: "#f3e3b8",
        "parchment-2": "#e8d39c",
        gold: "#c9a227",
        "gold-light": "#e0c25f",
        ember: "#8a2b12",
        "ember-light": "#b5401d",
        ink: "#211708",
        mist: "#d8cdb0",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "guild-vignette":
          "radial-gradient(ellipse at 50% 20%, rgba(201,162,39,0.12), transparent 60%), linear-gradient(180deg, rgba(11,9,6,0.55) 0%, rgba(11,9,6,0.85) 55%, #0b0906 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
