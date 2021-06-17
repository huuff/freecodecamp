module.exports = {
  //plugins: {
    //tailwindcss: {},
    //autoprefixer: {},
  //}
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.html'
      ],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [] 
    }),
  ],
}
