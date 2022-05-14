/* eslint-disable */
const path = require('path');
module.exports = () => {
 return {
  publicPath: '',
  devServer: {
    contentBase: '.',
    host: 'localhost',
    port: 80,
    open: true,
    proxy: {
      '/api': {
          target: process.env.VUE_APP_PROXY_HOST,
          changeOrigin: true,
          secure: false,
          ws: true,
          logLevel: "debug",
          pathRewrite: {
            '^/api': ''
        }
      }
    }
  }
 }
}