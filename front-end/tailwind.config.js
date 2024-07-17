/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      colors: {
        'sky-blue': '#87CEEB',
      }
    },
    screens: {
      'sm': '559px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
    }
  },
  plugins: [],
}

