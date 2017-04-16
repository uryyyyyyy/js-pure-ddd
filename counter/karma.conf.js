const args = process.argv;
args.splice(0, 4);

const polyfills = [];

const files = polyfills.concat(args);

module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: files,

    preprocessors: {
      '**/*.spec.ts': ['webpack'],
      '**/*.spec.tsx': ['webpack']
    },

    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    webpack: {
      resolve: {
        extensions: ['.ts', '.js', ".tsx"]
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
              {loader: "ts-loader"}
            ]
          }
        ]
      }
    },

    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
};