/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: '375px',
      tablet: '768px',
      desktop: '1024px',
    },
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
    fontSize: {
      h1: ['4rem', { lineHeight: '5.5rem', letterSpacing: '0.012rem', fontWeight: '700' }],
      h2: ['2.25rem', { lineHeight: '3.5rem', letterSpacing: '0.012em', fontWeight: '700' }],
      h3: ['1.75rem', { lineHeight: '2.5rem', letterSpacing: '0.008em', fontWeight: '700' }],
      h4: ['1.375rem', { lineHeight: '2rem', letterSpacing: '0.0024em', fontWeight: '700' }],
      h5: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.0024em', fontWeight: '700' }],
      title: ['1rem', { lineHeight: '1.75rem', letterSpacing: '0.004em', fontWeight: '500' }],
      body: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.004em', fontWeight: '400' }],
      subtitle: ['.875rem', { lineHeight: '1.25rem', letterSpacing: '0.008em', fontWeight: '500' }],
      footnote: ['.75rem', { lineHeight: '1.25rem', letterSpacing: '0.004em', fontWeight: '400' }],
      caption: ['.688rem', { lineHeight: '1rem', letterSpacing: '0.004em', fontWeight: '400' }],
    },
    textColor: (theme) => theme('colors'),
    caretColor: (theme) => theme('colors'),
    divideColor: (theme) => theme('colors'),
    backgroundColor: (theme) => theme('colors'),
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
};
