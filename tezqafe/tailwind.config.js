/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#D62828',
          'red-dark': '#B81D1D',
          yellow: '#FFC300',
          cream: '#FFF8EC',
          brown: '#5C3A21',
          green: '#3A7D44',
          charcoal: '#1F1F1F',
          surface: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
