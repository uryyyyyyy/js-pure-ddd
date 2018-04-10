const webpack = require('webpack');
const path = require("path");
const {AngularCompilerPlugin} = require('@ngtools/webpack')

module.exports = {
  mode: 'production',
  entry: {
    polyfills: './src/polyfills.ts',
    app: './src/main.ts'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },

  resolve: {
    extensions: [
      '.js', '.ts'
    ]
  },

  optimization: {
    splitChunks: {
      name: 'common',
      chunks: 'initial'
    }
  },

  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: {
          loader: '@ngtools/webpack'
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
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)fesm5/,
      path.resolve('src'),
      {}
    ),
    new webpack.DefinePlugin({
      ENV_PRODUCTION: true,
    }),
    new AngularCompilerPlugin({
      tsConfigPath: './tsconfig.json',
      mainPath: path.resolve('src/main.ts')
    })
  ]
};
