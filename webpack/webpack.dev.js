const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');


module.exports = merge(common, {
	devtool: 'inline-source-map',
	mode: 'development',
	plugins: [
		new WebpackShellPlugin({
			dev: false,
			onBuildStart:['echo "Webpack Start"'],
			onBuildEnd:['yarn build:web-ext']
		})
	],
});
