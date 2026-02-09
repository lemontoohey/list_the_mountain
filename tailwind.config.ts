import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-background": "#120E1A",
        "brand-accent": "#E64A2E",
        "brand-parchment": "#F4F1EA",
      },
      fontFamily: {
        "brand-header": ["var(--font-josefin)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-josefin)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-montserrat)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        poster: "0.2em",
        "widest-custom": "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
