var path = require('path');
var failPlugin = require('webpack-fail-plugin');
var html = new (require('html-webpack-plugin'))({
  title: 'cloudfm'
});

module.exports = {
  entry: './src/main.tsx',
  output: {
    path: path.resolve("target"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader?modules" }
    ]
  },
  plugins: [ failPlugin, html ],
  devtool: 'eval'
}
