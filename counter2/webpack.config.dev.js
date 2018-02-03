'use strict';

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/dev-bootstrap.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
  }
};