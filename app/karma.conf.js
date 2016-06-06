var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'tests/**/*.ts',
      'tests/**/*.tsx'
    ],
    exclude: [
    ],
    preprocessors: {
      'tests/**/*.ts': ['webpack'],
      'tests/**/*.tsx': ['webpack'],
    },
    webpack: Object.assign(webpackConfig, {
      entry: {},
      externals: {
        'jsdom': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    }),
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox', 'jsdom'],
    singleRun: false,
    concurrency: Infinity
  })
}
