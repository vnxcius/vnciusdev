/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'source-sans': ["'Source Sans 3', 'sans-serif'"],
        'adamina': ["'Adamina', 'serif'"],
        'mojangles': ["'Mojangles', 'monospace'"],
      },
      colors: {
        'neutral-925': '#101010',
        'accent': '#985eff',
        'primary': '#fffbf5',
      },
    },
  },
  plugins: [],
}