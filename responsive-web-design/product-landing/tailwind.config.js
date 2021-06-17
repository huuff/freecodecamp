module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#394648',
        'secondary': '#69995D',
        'tertiary': '#CBAC88',
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
