/**
 * =============================================================================
 *  Cooking Config
 * =============================================================================
 *
 * @see http://cookingjs.github.io/zh-cn/configuration.html
 * @permission Engineer
 *
 * @author dondevi
 * @create 2018-02-02
 *
 * @update 2018-03-13 dondevi
 * @update 2018-03-21 dondevi
 *   1.Add: Babel for Quasar !
 * @update 2018-03-22 dondevi
 *   1.Update: Chunk config !
 * @update 2018-03-23 dondevi
 *   1.Add: build/quasar.js !
 */

const fs   = require("fs");
const path = require("path");
const cooking = require("cooking");
const webpack = require("webpack");
const isDev = "development" === process.env.NODE_ENV;


let cookingConfig = {
  entry: {
    app: "src/main.js",
    mock: "mock/index.js",
  },
  chunk: [
    { name: "vue", chunks: ["app"],
      minChunks: module => /node_modules[\/\\]vue/.test(module.context),
    },
    { name: "quasar", chunks: ["app"],
      minChunks: module => /node_modules[\/\\]quasar/.test(module.context),
    },
    { name: "echarts", chunks: ["app"],
      minChunks: module => /node_modules[\/\\]echarts/.test(module.context),
    },
    { name: "manifest", minChunks: Infinity },
  ],
  template: {
    "index.html": {
      template: "src/index.html", chunksSortMode: "manual",
      chunks: ["manifest", "vue", "quasar", "echarts", "mock", "app"],
    },
  },

  dist: "dist",
  publicPath: "./",
  assetsPath: "./",

  hash: true,
  clean: true,
  postcss: [],
  /**
   * For stylus, you need to add blow to {user_home}/.cooking/package.json:
   *   devDependencies: {
   *     "stylus": "^0.54.5",
   *     "stylus-loader": "^3.0.1",
   *     ...
   *   }
   */
  extends: ["vue2", "stylus", "autoprefixer"],
  minimize: true,
  // sourceMap: "cheap-module-eval-source-map",
  sourceMap: isDev ? "source-map" : false,
  extractCSS: true,

  alias: {
    "src": path.resolve(__dirname, "src"),
    "mock": path.resolve(__dirname, "mock"),
    "config": path.resolve(__dirname, "src/config"),
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
    port: 8101,
    hostname: "0.0.0.0",
    publicPath: "/",
    contentBase: "dist",
    clean: false,
    extractCSS: false,
    proxy: {
      "/(path)/websocket/**": {
        changeOrigin: true,
        target: "ws://(host)",
        ws: true,
      },
    },
  },
};

cooking.set(cookingConfig);

cooking.add("loader.html", {
  test: /\.html$/, loader: "html-loader",
  options: { attrs: ["img:src", "link:href"] },
});
cooking.add("loader.mp3", {
  test: /\.mp3$/, loader: "url-loader",
  options: { limit: 1000, name: "[name].[hash:7].[ext]" },
});


// Config For Quasar
const quasarTheme = "mat" || "ios";
const quasarFilepath = require("./build/quasar.js")(quasarTheme);

cooking.add("resolve.alias[quasar-framework-custom]", quasarFilepath);
cooking.add("resolve.extensions", [".js", ".vue", `.${quasarTheme}.js`, `.${quasarTheme}.vue`]);
cooking.add("plugin.DefineQuasar", new webpack.DefinePlugin({ "__THEME__": JSON.stringify(quasarTheme) }));

// Babel for Quasar
!isDev && cooking.add("loader.js", {
  test: /\.(jsx?|babel|es6)$/,
  include: [
    path.resolve(__dirname, "src"),
    path.resolve(__dirname, "mock"),
    // path.resolve(__dirname, "node_modules/quasar-framework"),  // Problem with "npm link"
    fs.realpathSync("node_modules/quasar-framework"),
  ],
  use: {
    loader: "babel-loader",
    /**
     * If not set this, ".babelrc" will be searched on resovle path,
     *   and faied in "node_modules/quasar-framework".
     * @see http://babeljs.io/docs/usage/babelrc/#lookup-behavior
     */
    options: {
      babelrc: false,
      extends: path.resolve(__dirname, ".babelrc"),
    },
  },
});



let webpackConfig = cooking.resolve();

module.exports = webpackConfig;
