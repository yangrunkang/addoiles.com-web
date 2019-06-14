const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
/* 加载 compression-webpack-plugin 插件 */
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const fs = require('fs');
const path = require('path');

fs.open('./src/config/env.js', 'w', function (err, fd) {
    const buf = 'export default "production";';
    //fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer){});
    fs.write(fd, buf, 0, 'utf-8', function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath:"./",
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    plugins: [
        /* 使用 compression-webpack-plugin 插件进行压缩 */
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            // 压缩js,css
            test: new RegExp('\\.(js|css)$'),
            //// 资源文件大于10240B=10kB时会被压缩
            threshold: 10240,
            // 最小压缩比达到0.8时才会被压缩
            minRatio: 0.8
        }),
        new cleanWebpackPlugin(['../dist/*'], {
            root: path.resolve(__dirname, '../dist')
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.[hash].js'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../dist/index.html',
            template: './src/template/index.ejs',
            inject: false
        })
    ]
});