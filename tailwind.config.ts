import type { Config } from "tailwindcss";

export default {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cinder": "#101218",
        "soapstone": "#fffbf5",
        "baltic-sea": "#292c32",
      },
    },
  },
  plugins: [],
} satisfies Config;
