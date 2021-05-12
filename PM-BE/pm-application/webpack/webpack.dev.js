const webpack = require('webpack');
const webpackMerge = require('webpack-merge').merge;
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';

module.exports = options =>
    webpackMerge(commonConfig({env: ENV}), {
        devtool: 'cheap-module-source-map',
        mode: ENV,
        entry: ['./src/main/webapp/app/index'],
        output: {
            path: utils.root('build/resources/main/static/'),
            filename: 'app/[name].bundle.js',
            chunkFilename: 'app/[id].chunk.js',
        },
        optimization: {
            moduleIds: 'named',
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ],
                },
            ],
        },
        devServer: {
            stats: options.stats,
            hot: true,
            contentBase: './build/resources/main/static/',
            proxy: [
                {
                    context: [
                        '/api',
                        '/services',
                        '/management',
                        '/swagger-resources',
                        '/v2/api-docs',
                        '/v3/api-docs',
                        '/oauth2',
                        '/login',
                        '/auth'
                    ],
                    target: `http${options.tls ? 's' : ''}://localhost:8080`,
                    secure: false,
                    changeOrigin: options.tls,
                },
            ],
            watchOptions: {
                ignore: [/node_modules/, utils.root('src/test')],
            },
            https: options.tls,
            historyApiFallback: true,
        },
        stats: process.env.JHI_DISABLE_WEBPACK_LOGS ? 'none' : options.stats,
        plugins: [
            process.env.JHI_DISABLE_WEBPACK_LOGS
                ? null
                : new SimpleProgressWebpackPlugin({
                    format: options.stats === 'minimal' ? 'compact' : 'expanded',
                }),
            new FriendlyErrorsWebpackPlugin(),
            new BrowserSyncPlugin(
                {
                    https: options.tls,
                    host: 'localhost',
                    port: 9002,
                    proxy: {
                        target: `http${options.tls ? 's' : ''}://localhost:9060`,
                        proxyOptions: {
                            changeOrigin: false, //pass the Host header to the backend unchanged  https://github.com/Browsersync/browser-sync/issues/430
                        },
                    },
                    socket: {
                        clients: {
                            heartbeatTimeout: 60000,
                        },
                    },
                    /*
                ,ghostMode: { // uncomment this part to disable BrowserSync ghostMode; https://github.com/jhipster/generator-jhipster/issues/11116
                  clicks: false,
                  location: false,
                  forms: false,
                  scroll: false
                } */
                },
                {
                    reload: false,
                }
            ),
            new webpack.HotModuleReplacementPlugin(),
            new WebpackNotifierPlugin({
                title: 'JobsGo',
                contentImage: path.join(__dirname, 'Logo_official.png'),
            }),
        ].filter(Boolean),
    });
