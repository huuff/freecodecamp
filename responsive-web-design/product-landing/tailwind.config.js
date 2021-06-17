module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'background': '#050404',
        'highlighted': '#51CB20',
        'separator': '#2708A0',
        'box-head': '#6184D8',
        'box-content': '#0D5D56',
      },
      outline: {
        highlighted: '3px solid #51CB20',
      }
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
