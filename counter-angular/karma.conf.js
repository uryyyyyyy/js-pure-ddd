const args = process.argv;
args.splice(0, 4);

const polyfills = [];

const files = polyfills.concat(args);

module.exports = (config) => {
  config.set({

    basePath: '',
    frameworks: ['jasmine'],
    files: files,
    preprocessors: {
      '**/*.spec.ts': ['webpack']
    },
    mime: {
      'text/x-typescript': ['ts']
    },
    webpack: {
      resolve: {
        extensions: ['.ts', '.js']
      },
      module: {
        rules: [
          {
            test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
            use: {
              loader: '@ngtools/webpack',
              options: {
                mainPath: "src/main.ts",
                tsConfigPath: 'tsconfig.json',
                sourceMap: true
              }
            }
          },
          {
            test: /\.html$/,
            use: 'html-loader'
          },
          {
            test: /\.scss$/,
            use: ['to-string-loader', 'css-loader', 'sass-loader']
          }
        ]
      }
    },
    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  })
};