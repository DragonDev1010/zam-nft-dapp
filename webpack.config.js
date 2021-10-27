const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const autoprefixer = require('autoprefixer');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, "src/"),
        },
        extensions: ['.js', '.jsx'],
        fallback: {
            "crypto": false,
            "stream": require.resolve("stream-browserify"),
            "assert": false,
            "util": false,
            "http": require.resolve("stream-http"),
            "https": require.resolve("stream-http"),
            "os": false
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'css/', name: '[name].min.css'}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 10', 'last 4 version'],
                                    })
                                ],
                            },
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        // new webpack.ProvidePlugin({
        //     process: 'process/browser',
        // }),
        new NodePolyfillPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    },
};
