// vue.config.js
module.exports = {
  // 修改的配置
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "http://127.0.0.1:9000",
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         "^/api": ""
  //       }
  //     }
  //   }
  // }
  baseUrl: '/admin/'
  // NODE_ENV == 'production' ? '/admin/' : '/'
}
// .env.development
// VUE_APP_BASE_API=/api
