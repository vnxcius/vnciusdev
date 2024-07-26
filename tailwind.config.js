/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'source-sans': ["'Source Sans 3', 'sans-serif'"],
        'merriweather': ["'Merriweather', 'serif'"],
        'playwrite': ["'Playwrite DK Loopet', 'serif'"],
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