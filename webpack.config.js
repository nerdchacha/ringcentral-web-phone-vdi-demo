const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const libConfig = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		'ringcentral-web-phone': './node_modules/ringcentral-web-phone/lib/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: ['RingCentral', 'WebPhone'],
		libraryTarget: 'umd',
		libraryExport: 'default',
	},
	cache: true,
	module: {
		rules: [
			{
				test: /\.m?js?$/,
				resolve: {
					fullySpecified: false,
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	externals: {
		'sip.js': {
			commonjs: 'sip.js',
			commonjs2: 'sip.js',
			amd: 'sip.js',
			root: 'SIP',
		},
	},
	devServer: {
		port: 8080,
		client: {
			overlay: true,
		},
		static: {
			directory: __dirname,
			publicPath: '/',
		},
	},
};

module.exports = [
	libConfig,
	// Demo
	{
		mode: libConfig.mode,
		devtool: libConfig.devtool,
		entry: {
			demo: './demo/index.ts',
			demoCallback: './demo/callback.ts',
		},
		output: {
			path: libConfig.output.path,
			filename: libConfig.output.filename,
		},
		externals: {
			'ringcentral-web-phone': {
				commonjs: 'ringcentral-web-phone',
				commonjs2: 'ringcentral-web-phone',
				amd: 'ringcentral-web-phone',
				root: ['RingCentral', 'WebPhone'],
			},
		},
		resolve: {
			fallback: {
				querystring: require.resolve('querystring-es3'),
			},
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
					exclude: /node_modules\/(^jsonrpc-bidirectional)/,
				},
				{
					test: /\.m?js?$/,
					resolve: {
						fullySpecified: false,
					},
				},
			],
		},
		plugins: [
			new webpack.ProvidePlugin({
				process: 'process/browser',
			}),
			new HtmlWebpackPlugin({
				template: './demo/index.html',
				inject: false,
				chunks: ['demo', 'demoVendor'],
			}),
			new HtmlWebpackPlugin({
				template: './demo/callback.html',
				filename: 'callback.html',
				chunks: ['demoCallback', 'demoVendor'],
			}),
			new CopyPlugin({
				patterns: [
					{ from: 'node_modules/bootstrap', to: 'bootstrap' },
					{ from: 'audio', to: 'audio' },
					{ from: 'demo/img', to: 'img' },
				],
			}),
		],
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		optimization: {
			minimize: true,
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /node_modules/,
						name: 'demoVendor',
						chunks: 'all',
					},
				},
			},
		},
	},
];
