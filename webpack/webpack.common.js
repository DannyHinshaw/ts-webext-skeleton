const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
	entry: {
		popup: path.join(__dirname, '../src/popup/index.ts'),
		options: path.join(__dirname, '../src/options/index.ts'),
		background: path.join(__dirname, '../src/background/index.ts'),
		content_script: path.join(__dirname, '../src/content/index.ts')
	},
	output: {
		path: path.join(__dirname, '../dist/compiled'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}, {
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					'sass-loader'
				],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.scss', '.ts', '.tsx', '.js']
	},
	plugins: [
		// exclude locale files in moment
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),

		new CopyWebpackPlugin([{
			from: 'src/**/*',
			to: '../',
			ignore: ['*.ts', '*.scss'],
			flatten: true,
			force: true
		}])
	]
};
