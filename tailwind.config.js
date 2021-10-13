module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        primary: '#5CB85B',
        secondary: '#ffed4a',
        danger: '#e3342f',
      },
      backgroundColor: (theme) => ({
        primary: '#5CB85B',
        secondary: '#333333',
        tertiary: '#F5F5F5',
        danger: '#D73D42',
      }),
      borderColor: (theme) => ({
        DEFAULT: theme('colors.gray.300', 'currentColor'),
        primary: '#5CB85B',
        secondary: '#ffed4a',
        danger: '#e3342f',
      }),
      flex: {
        30: '0 1 30%',
        70: '0 1 70%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
