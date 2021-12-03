const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const autoprefixer = require('autoprefixer');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const dotenv = require('dotenv');
const minimist = require('minimist')

const args = minimist(process.argv.slice(2));
const mode = args.mode;

const envFile = dotenv.config({path: path.join(__dirname, "/.env." + mode)}).parsed;
const envKeys = Object.keys(envFile).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envFile[next]);
    return prev;
}, {});

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.[fullhash].js",
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
                        options: {outputPath: 'css/', name: '[name].min.css'}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['ie >= 10', 'last 4 version'],
                                    })
                                ],
                            },
                            sourceMap: mode !== 'prod'
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
        new NodePolyfillPlugin(),
        new webpack.DefinePlugin(envKeys),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    devtool: mode === 'dev' ? 'source-map' : false,
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    },
};
