const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    //开发模式
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        port: 9090,
        contentBase: '/dist',
        hot: true,
        // historyApiFallback: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/view\/$/, to: '/' }
            ]
        },
        publicPath: '/page',
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});