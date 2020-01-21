module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'BrandywineEditor',
      externals: {
        react: 'React'
      }
    }
  }
}
