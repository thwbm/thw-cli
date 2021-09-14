/* eslint-disable @typescript-eslint/no-var-requires */
const scssVariables = require("./src/styles/all.ts");

module.exports = {
  css: {
    // scss添加公共样式
    loaderOptions: {
      sass: {
        prependData: Object.keys(scssVariables)
          .map((k) => `$${k.replace("_", "-")}: ${scssVariables[k]};`)
          .join("\n"),
      },
    },
  },
  configureWebpack: {
    // other webpack options to merge in ...
  },
  // devServer Options don't belong into `configureWebpack`
  devServer: {
    // Network
    public: "http://192.168.1.102:8080",
    // Locale
    host: "0.0.0.0",
    port: "8080",
    // 跨域
    proxy: {
      "/api": {
        target: "http://localhost:4000/", //后端接口的根目录
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hotOnly: false,
    disableHostCheck: true,
  },
};
