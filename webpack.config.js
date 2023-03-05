const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        app: './src/index.tsx'
    },
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        sourcePrefix: ''
    },
    // devServer: {
    //     static: {
    //         directory: path.join(__dirname,'dist')
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: {
                                noEmit: false
                            }
                        }
                    }
                ]
            },
            // {
            //     test: /\.(ts|tsx)$/,
            //     exclude: /node_modules/,
            //     use: 'ts-loader'
            // },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|xml|json|glb)$/,
                use: [ 'url-loader' ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts','.tsx','.js','.jsx'],
        fallback: {
            "url": false,
            "zlib": false,
            "https": false,
            "http": false,
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
            manifest: "./public/manifest.json"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
                { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
                { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }
            ]
        }),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('')
        })
    ]
};