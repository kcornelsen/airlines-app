module.exports = {
  pluginOptions: {
    quasar: {
      theme: 'mat',
      rtlSupport: true,
      importAll: true
    }
  },
  configureWebpack: {
    devtool: "source-map"
  },
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar-framework[\\\/]/
  ]
}
