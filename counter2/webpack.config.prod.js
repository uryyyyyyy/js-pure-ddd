'use strict';

module.exports = {
  mode: 'production',
  entry: './src/./src/prod-bootstrap.ts',
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