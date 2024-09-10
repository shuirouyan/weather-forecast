const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/myApi': {
        target: 'http://apis.juhe.cn/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/myApi': ''
        }
      }
    }
  }
})
