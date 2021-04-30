const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const path = require('path');
module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'bundle.[contenthash].js',  
        publicPath: '', 
    },
    module: {  
        rules: [
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {

                test: /\.js$/,
                exclude: '/node_modules',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-proposal-class-properties','@babel/plugin-transform-runtime']
                    }
                }

            },
            {
                test: /\.(gif|png|svg|jpe?g)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: './src/static/images/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [  // Array of plugins to apply to build chunk
        new HtmlWebpackPlugin({
            template: __dirname + "/src/view/index.html",
            inject: 'body',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/view/home.html",
            inject: 'body',
            filename: 'home.html'
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/view/products.html",
            inject: 'body',
            filename: 'products.html'
        })
    ]
};