const defaults = require('tailwindcss/stubs/defaultConfig.stub');
const green = defaults.theme.colors.green;

module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', ...defaults.theme.fontFamily.sans],
        heading: ['"Lato"', ...defaults.theme.fontFamily.sans],
      },
      colors: {
        primary: green['600'],
        'primary-dark': green['800'],
        'primary-light': green['400'],
      },
      height: {
        '9/12': '75%',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
};
