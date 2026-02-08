/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ninja: {
          orange: '#FA6400',
          dark: '#050505',
          green: '#A3E635',
          border: '#E2E8F0',
          banner: '#F0F9FF', // adjusted for the top banner look
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
