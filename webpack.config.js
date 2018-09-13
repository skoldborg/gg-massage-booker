require('babel-polyfill');

const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const config = {
    entry: ['babel-polyfill', path.join(__dirname, 'client/app.js')],
    
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    // https://webpack.js.org/guides/code-splitting/
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // },

    performance: {
        hints: false
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/,
                exclude: /node_modules\/(?!react-datetime\/).*/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    require('autoprefixer')('last 2 versions')
                                }
                            }
                        },
                        'sass-loader',
                        'import-glob-loader'
                    ]
                })
            }
        ]
    },

    devtool: 'source-map',

    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 3000,
        historyApiFallback: true,
        stats: 'errors-only'
    },

    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new HTMLWebpackPlugin({
			template: path.join(__dirname, 'client/index.html')
		}),
        new ExtractTextPlugin({ filename: '[name].css', allChunks: true })
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static'
        // })
    ],
    
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    }
}

module.exports = config;