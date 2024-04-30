/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        debug: '#3e4fd3',
        delete: '#d33e43',
      }
    },
  },
  plugins: [],
}

