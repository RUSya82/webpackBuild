const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

const generateFileName = (ext) => {
    return isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        filename: `./js/${generateFileName('js')}`,
        path: path.resolve(__dirname, 'dist'),
        environment: {
            arrowFunction: false,
        }
    },
    mode,
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                test: /\.(jpe?g|png|gif|svg)$/i,
                minimizer: {
                    implementation: ImageMinimizerPlugin.squooshMinify,
                    options: {
                        encodeOptions: {
                            mozjpeg: {
                                // That setting might be close to lossless, but it’s not guaranteed
                                // https://github.com/GoogleChromeLabs/squoosh/issues/85
                                quality: 80,
                            },
                            webp: {
                                lossless: 0.8,
                            },
                            avif: {
                                // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
                                cqLevel: 0,
                            },
                            optipng: {
                                optimizationLevel: 1
                            }
                        },
                    },
                },
            }),
        ],
    },

    // optimization: {
    //     minimizer: [
    //         // Extend default minimizer, i.e. `terser-webpack-plugin` for JS
    //         "...",
    //         // We recommend using only for the "production" mode
    //         new ImageMinimizerPlugin({
    //             minimizer: {
    //                 implementation: ImageMinimizerPlugin.imageminMinify,
    //                 options: {
    //                     plugins: [
    //                         "imagemin-gifsicle",
    //                         "imagemin-mozjpeg",
    //                         "imagemin-pngquant",
    //                         "imagemin-svgo",
    //                     ],
    //                 },
    //             },
    //             // Disable `loader`
    //             loader: false,
    //         }),
    //     ],
    // },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new HTMLWebpackPlugin({
            filename: 'politic.html',
            template: "./politic.html",
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new MiniCssExtractPlugin({
            filename: `./css/${generateFileName('css')}`,
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './img',
                    to: path.resolve(__dirname, 'dist/img'),
                },
            ]
        }),

    ],
    devServer: {
        hot: true,
        static: {
            directory: './dist',
            watch: true
        }
    },
    devtool: isDev  && 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../",
                    },
                },  "css-loader" ]
            },
            {
                test: /\.html$/i,
                use: ['html-loader' ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../",
                        },
                    },
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'img',
                },
            },
            {
                test: /\.(woff|woff2)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts',
                    name: `[name].[ext]`,
                },
            }
        ]
    }
};
