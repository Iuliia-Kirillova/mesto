const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
	entry: { main: './src/pages/index.js' },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test: /.(png|svg|jpg|gif)$/,
				loader: 'file-loader?name=./images/[name].[ext]'
			},
			{
				test: /.(eot|ttf|woff|woff2)$/,
				loader: 'file-loader?name=./vendor/[name].[ext]',
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
			}
		]
	},

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		hot: true,
		compress: true,
		port: 9001
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin()
	]
};