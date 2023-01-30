/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#000000',
          white: '#fafafa',
        },
        system: {
          grey1: '#F8F8F8',
          grey2: '#ECEDED',
          grey3: '#C3C4C8',
          grey4: '#969BA5',
          grey5: '#6E717A',
          grey6: '#292A2D',
          grey7: '#131416',
        },
      },
      textColor: (theme) => theme('colors'),
      caretColor: (theme) => theme('colors'),
      divideColor: (theme) => theme('colors'),
      backgroundColor: (theme) => theme('colors'),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
};
