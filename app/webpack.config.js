"use strict";
const webpack = require("webpack");
const path = require("path");
const failPlugin = require("webpack-fail-plugin");
const htmlPlugin = new (require("html-webpack-plugin"))({
  title: "cloudfm",
});

require("dotenv").config({path: "../.env", silent: true});
const envPlugin = new webpack.DefinePlugin({
  "process.env": {
    "NODE_ENV": `"${process.env.NODE_ENV}"`,
    "DATABASE_URL": `"${process.env.DATABASE_URL || "http://localhost:5984"}"`,
    "SERVER_URL": `"${process.env.SERVER_URL || "http://localhost:8423"}"`,
  }
});

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  devtool: "#source-map",
  entry: "./src/main.tsx",
  module: {
    loaders: [
      {loader: "file", test: /\.(jpe?g|png|gif)$/i},
      {loader: "file", test: /\.(svg|woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i},
      {loader: "ts-loader", test: /\.tsx?$/},
      {loader: "style!css!postcss", test: /\.css$/},
      {loader: 'json', test: /\.json$/ },
    ],
    preLoaders: [
      {loader: "tslint", test: /\.tsx?$/},
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve("target"),
    publicPath: "/",
  },
  plugins: [failPlugin, htmlPlugin, envPlugin].concat(process.env.NODE_ENV === "production" ? [webpack.optimize.UglifyJsPlugin] : []),
  postcss: function () {
    return [
      "autoprefixer",
      "postcss-import",
      "postcss-custom-media",
      "postcss-custom-properties",
      "postcss-calc",
      "postcss-discard-comments",
      "postcss-remove-root",
      "postcss-reporter",
    ].map(require);
  },
  alias: {
    // FIXME doesn't work in TypeScript
    "app": path.join(__dirname, "./src/"),
  },
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js", ".css", ".json"],
    alias: {
      "basscss": "../node_modules/basscss/src/basscss.css",
    }
  },
};
