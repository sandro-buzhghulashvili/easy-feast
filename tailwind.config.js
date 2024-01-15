/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary_orange: '#fe724c',
      light_orange: '#fed2c7',
      primary_yellow: '#ffc529',
      typography_color: '#1a1d26',
      gray_color: '#9a9fae',
      white_color: '#fff',
      red_color: 'red',
      green_color: 'green',
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
