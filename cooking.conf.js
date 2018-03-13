/**
 * =============================================================================
 *  Cooking Config
 * =============================================================================
 *
 * @see http://cookingjs.github.io/
 * @permission Engineer
 *
 * @author dondevi
 * @create 2018-02-02
 *
 * @update 2018-03-13 dondevi
 */

const path = require("path");
const cooking = require("cooking");

const assetsPath = "./";


cooking.set({

  entry: "src/main.js",
  template: "src/index.html",

  dist: "dist",
  publicPath: "./",
  assetsPath: assetsPath,

  hash: true,
  chunk: true,
  clean: true,
  postcss: [],
  extends: ["vue2", "autoprefixer"],
  minimize: true,
  sourceMap: false,
  // extractCSS: true,

  alias: {
    "quasar-framework-js": "quasar-framework/dist/quasar.mat.esm.js",
    "quasar-framework-css": "quasar-framework/dist/umd/quasar.mat.css",
    "src": path.resolve(__dirname, "src"),
    "mock": path.resolve(__dirname, "mock"),
    "router": path.resolve(__dirname, "src/router"),
    "service": path.resolve(__dirname, "src/service"),
    "pages": path.resolve(__dirname, "src/pages"),
    "frames": path.resolve(__dirname, "src/frames"),
    "assets": path.resolve(__dirname, "src/assets"),
    "filters": path.resolve(__dirname, "src/filters"),
    "modules": path.resolve(__dirname, "src/modules"),
    "components": path.resolve(__dirname, "src/components"),
  },

  devServer: {
    contentBase: "dist",
    port: 8101,
    clean: false,
    hostname: "0.0.0.0",
    sourceMap: true,
    publicPath: "/",
    proxy: {
      "/(path)/websocket/**": {
        changeOrigin: true,
        target: "ws://(domain)",
        ws: true,
      },
    },
  },

});

cooking.add("devtool", "source-map");

cooking.add("loader.mp3", {
  test: /\.mp3$/,
  loader: 'url-loader',
  options: {
    limit: 5000,
    name: path.posix.join(assetsPath, "[name].[hash:7].[ext]"),
  }
});


module.exports = cooking.resolve();
