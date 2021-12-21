module.exports = ({env}) => ({
  plugins: [
    env !== 'production' && require('stylelint')(),
    // require('postcss-import')(),
    // require('postcss-url')(),
    require('autoprefixer')(),
    require('postcss-nesting')(),
    require('postcss-dark-theme-class')(),
  ],
});
