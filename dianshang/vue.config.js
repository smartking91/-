const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://192.168.84.216:8080', // 后端服务的地址
  //       ws: true,
  //       changeOrigin: true, // 如果后端服务支持跨域，则设置为true
  //       // pathRewrite: {
  //       //   '^/': '' // 重写路径: 去掉路径中的/api
  //       // },
  //     },
  //   }
  // }
})
