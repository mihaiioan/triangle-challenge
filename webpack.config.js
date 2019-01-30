/* eslint-env node */

const fs = require('fs');
const webpack = require('webpack');

module.exports = {
  entry: fs.readdirSync('./tests').map(s => `./tests/${s}`),
  output: {
    path: __dirname,
    filename: 'tests.js'
  },
  module: {
	rules: [{
		test: /\.test.js/,
		use: ['mocha-loader', 'script-loader']
	}]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    inline: true,
    port: 4444,
  }
};
