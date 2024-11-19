import { DiBlackberry } from "react-icons/di";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#56cbec",
        blackPrimary: "#141e22",
        blackSecondary: "#1a262d",
        blackThirdy: "#202e36",
        red: "#fd3b75",
        yellow: "#ffeb39",
        green: "#39db7d",
        lightW: "#eceef0"
      },
    },
  },
  plugins: [],
} satisfies Config;
