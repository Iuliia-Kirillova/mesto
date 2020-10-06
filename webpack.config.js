const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: { loader: 'babel-loader' },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                },
                    'postcss-loader']
            },
            {
                test: /\.(woff|woff2|ttf)$/,
                use: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
                test: /\.(jpg|jpeg|png|svg|webp)$/,
                use: 'file-loader?name=./images/[name].[ext]&esModule=false'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new WebpackMd5Hash()
    ]
} 