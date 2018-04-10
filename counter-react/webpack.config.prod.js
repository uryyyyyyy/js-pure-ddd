'use strict';

module.exports = {
  mode: 'production',
  entry: './src/application/prod-bootstrap.tsx',
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