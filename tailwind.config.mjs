/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purplePrimary: '#7B2CBF',
        blackBg: '#0A0A0A',
        antiqueWhite: '#FAEBD7',
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: 0 },
          '20%': { opacity: 1 },
          '80%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        fadeInOut: 'fadeInOut 2s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};

