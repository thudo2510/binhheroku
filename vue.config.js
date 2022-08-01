const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "test",
    themeColor: "#ffffff",
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/mstile-150x150.png",
    },
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: "web.config" }],
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 100000,
        maxSize: 250000,
        cacheGroups: {
          default: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
        },
      },
      runtimeChunk: {
        name: "runtime",
      },
    },
    output: {
      path: path.join(__dirname, "./dist"),
      filename: "static/[name].[chunkhash:8].bundle.js",
      chunkFilename: "static/[name].[chunkhash:8].bundle.js",
    },
  },
});
