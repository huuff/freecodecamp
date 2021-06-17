module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'tertiary': '#CBAC88',
        'quaternary': '#BB342F',

        'background': '#F1F7EE',
        'highlighted': '#E7F59E',
        'separator': '#92AA83',
        'box-head': '#B0BEA9',
        'box-content': '#E0EDC5',
      },
      minHeight: {
        '1/4': '25%',
        '1/2': '50%',
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
    },
  },
  plugins: [],
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ]
}
