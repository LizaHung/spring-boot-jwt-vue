/* eslint-disable */
const path = require('path');
module.exports = () => {
 return {
  devServer: {
    contentBase: '.',
    host: 'localhost',
    port: 9001,
    open: true,
    proxy: {
      '/api': {
          target: 'http://localhost:7070',
          changeOrigin: true,
          secure: false,
          ws: true, // websocket
          logLevel: "debug",
          pathRewrite: {
            '^/api': ''
        }
      }
    }
  }
 }
}