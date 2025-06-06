require('babel-polyfill');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env, options) => {
    return {
        entry: {
            app: ['babel-polyfill', path.join(__dirname, 'client/app.js')],
            styles: path.join(__dirname, 'client/styles/styles.scss')
        },
        
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js',
            publicPath: ''
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
                },
                {
                    test: /\.(png|jp(e*)g|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8000 // Convert images < 8kb to base64 strings
                        }
                    }]
                }
            ]
        },

        devtool: 'source-map',

        watch: false,

        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
            new CopyWebpackPlugin([{
                from: './favicon.ico'
            }])
            // new BundleAnalyzerPlugin({
            //     analyzerMode: 'static'
            // })

        ],
        
        resolve: {
            extensions: ['.js', '.jsx']
        }
    }
}
