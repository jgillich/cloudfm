var webpack = require("webpack");
var path = require("path");
var failPlugin = require("webpack-fail-plugin");
var htmlPlugin = new (require("html-webpack-plugin"))({
  title: "cloudfm",
});

require("dotenv").config({silent: true, path: "../.env"});
var envPlugin = new webpack.DefinePlugin({
    "process.env.DATABASE_URL": `"${process.env.DATABASE_URL}"`,
    "process.env.SERVER_URL": `"${process.env.SERVER_URL}"`
});

module.exports = {
  entry: "./src/main.tsx",
  output: {
    path: path.resolve("target"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".css"]
  },
  module: {
    preLoaders: [
      { test: /\.tsx?$/, loader: "tslint" }
    ],
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: "file" },
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader?modules" }
    ]
  },
  plugins: [ failPlugin, htmlPlugin, envPlugin ],
  devtool: "eval"
}
