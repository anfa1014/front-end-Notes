/**
 * 打包生成两个页面list和detail
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry:{ //多入口
        list: './src/js/list.js',
        detial: './src/js/detail.js'
    },
    output: { //多出口
        path: path.resolve(__dirname, './build'),
        filename: '[name].[hash:8].js'
    },
    devServer: {
        contentBase: './build',
        port: 8090,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {loader: babel-loader}
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: style-loader},
                    {loader: css-loader},
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['./buid']), //每次构建都清空build文件夹
        new HtmlWebpackPlugin({// 根据模板index,生成detail.html.插入打包后detail.[hash].js
            filename: 'detail.html',
            template: './src/index.html',
            hash: true,
            chunks: ['detail']
        }),
        new HtmlWebpackPlugin({// 根据模板index,生成list.html.插入打包后list.[hash].js
            filename: 'list.html',
            template: './src/index.html',
            hash: true,
            chunks: ['list']
        })
    ],
    mode: 'development'
}