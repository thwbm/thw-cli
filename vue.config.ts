import scssVariables from "./src/styles/all";

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
    public: "0.0.0.0:8080",
    hot: true,
    disableHostCheck: true,
  },
};
