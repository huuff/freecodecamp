module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#A4B494',
        secondary: '#BEC5AD',
        tertiary: '#3B5249',
        quaternary: '#519872',
        quinary: '#34252F'
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-16': 'span 16 / span 16',
        'span-13': 'span 13 / span 13',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
