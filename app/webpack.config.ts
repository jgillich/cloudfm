var path = require('path');
var failPlugin = require('webpack-fail-plugin');
var html = new (require('html-webpack-plugin'))({
  title: 'cloudfm'
});

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve("target"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [ failPlugin, html ],
  devtool: 'source-map'
}
