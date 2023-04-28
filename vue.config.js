const path = require("path");
const tinyPngWebpackPlugin = require("tinypng-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  // where to output built files
  outputDir: "./dist",
  // where to put static assets (js/css/img/font/...)
  assetsDir: "static",
  // 不需要生产环境的 source map
  productionSourceMap: false,
  filenameHashing: true,
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8000,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "https://api.vpemjjvb.com",
        changeOrigin: true,
      },
    },
    before: (app) => {
      // `app` 是一个 express 实例
      // let fs = require('fs')
      // app.route('/api/:apiName').all((req, res) => {
      //   fs.readFile('./db.json', 'utf8', (err, data) => {
      //     if (err) throw err
      //     data = JSON.parse(data)
      //     if (data[req.params.apiName]) {
      //       res.json(data[req.params.apiName])
      //     } else {
      //       res.send('no such api name')
      //     }
      //   })
      // })
    },
  },

  lintOnSave: true,
  chainWebpack: (config) => {
    // set alias
    config.resolve.alias
      .set("@", resolve("src"))
      .set("common", resolve("src/common"))
      .set("vue$", "vue/dist/vue.esm.js");

    // 所有组件中导入公共styl
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("stylus").oneOf(type))
    );
    function addStyleResource(rule) {
      rule
        .use("style-resource")
        .loader("style-resources-loader")
        .options({
          patterns: [
            path.resolve(__dirname, "./src/common/stylus/var.styl"),
            path.resolve(__dirname, "./src/common/stylus/mixin.styl"),
          ],
        });
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 打包压缩图片
      // config.plugins.push(
      //   new tinyPngWebpackPlugin({
      //     key: "hGNNp1mZp5c19X9fsdc0bDwQScGJ6yDw"
      //   })
      // )
      config.plugins.push(
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css$/, // 需要压缩的文件类型
          threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
          deleteOriginalAssets: false, // 是否删除原文件
        })
      );
    }
  },
};
