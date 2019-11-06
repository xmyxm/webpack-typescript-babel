// webpackruntime.js
// 执行命令 webpack --config ./webpackdemo/webpackruntime.config.js

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//webpack插件，用于清除目录文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const packageFilePath = path.join(__dirname, '../dist');
const DEV_MODE = "development"

module.exports = {
    mode: "development",
    entry: {
        index: ['./src/page/index.tsx']
    },
    output: {
        path: packageFilePath,
        filename: 'js/[name].js'
    },
    mode: DEV_MODE, //'production',
    cache: true,
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        },
        runtimeChunk: {
            // manifest文件用来引导所有模块的交互。manifest文件包含了加载和处理模块的逻辑。
            // 当webpack编译器处理和映射应用代码时，它把模块的详细的信息都记录到了manifest文件中。当模块被打包并运输到浏览器上时，
            name: 'manifest'
        }
    },
    module: {
        rules: [{
            test: /\.(es6|jsx|js|tsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader", "ts-loader"]
        },
        {
            test: /\.less$/,
            use: [
                {
                    loader: DEV_MODE ? 'style-loader' : MiniCssExtractPlugin.loader,
                    options: {
                        // 您可以在这里指定公共路径,默认情况下，它在webpackOptions.output中使用publicPath
                    }
                },
                'css-loader',
                'postcss-loader',
                'less-loader'
            ]
        },
        {
            test: /\.woff|ttf|woff2|eot$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            ]
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1
                    }
                }
            ]
        }]
    },
    plugins: [
        new webpack.BannerPlugin('点评平台研发中心-灵犀打点助手'),
        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['dist'] }),//每次打包清理上次的打包文件
        // css文件抽离设置
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new DashboardPlugin(),
        new HtmlWebpackPlugin({
            template: './src/html/index.html'
            , filename: 'index.html'//可以使用hash命名
            , title: 'index'
            , inject: 'body'//脚本包含到body 也可以写到head里面
            , chunks: ['manifest', 'commons', 'index']//指定当前模板需要打入哪些js模块
            , minify: {//启用代码代码压缩
                removeComments: false,//移除注释
                collapseWhitespace: false//移除空格
            }
        }),
        // 允许你创建一个在编译时可以配置的全局常量，只能在被打包的文件中读取到这个全局变量
        new webpack.DefinePlugin({
            'env': DEV_MODE
        })
    ],
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*' //支持服务跨域
        },
        contentBase: packageFilePath,
        watchContentBase: true,//告诉服务器监视那些通过 devServer.contentBase 选项提供的文件。文件改动将触发整个页面重新加载。默认被禁用。
        compress: true,//一切服务都启用gzip 压缩：
        inline: true,//应用程序启用内联模式,默认内联模式,当源文件改变时会自动刷新页面
        hot: true,//启用 webpack 的模块热替换特性
        host: 'localhost',//指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定为ip
        stats: { colors: true },// 用颜色标识
        historyApiFallback: {//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
            index: 'dist/index.html'
        },
        port: 3000, // 如果是小于1000的端口号，是需要sudo权限的，启用方式 sudo node server.js即可(可使用默认80端口)
        proxy: {
            '/content': {
                target: 'http://m.dianping.com',
                changeOrigin: true,
                secure: false
            },
        }
    }
}

