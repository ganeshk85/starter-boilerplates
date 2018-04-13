const webpack = require('webpack');
const path =require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
var styleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

let config = {
    context: path.resolve(__dirname, './'),
    entry: ['./src/assets/js/index.js'], // entry file
    output: {
        path: path.resolve(__dirname, './public/assets'),// ouput path
        filename: 'js/[name].bundle.js',
        publicPath: '/public/assets'
    },
    module: {
        rules: [ // loader rules
            {
                test: /\.js$/, // files ending with .js
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/, // files ending with .scss
                use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({  // HMR for styles
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
                })),
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=/fonts/[name].[ext]'
            },
        ] //end rules
    },
    plugins: [
        //new ExtractTextWebpackPlugin('css/styles.css'),
        new styleLintPlugin({
              configFile: '.stylelintrc',
              context: 'src/assets/stylesheets/scss',
              files: '**/*.s?(a|c)ss',
              syntax: 'scss',
              failOnError: false,
              quiet: false,
        }),
        new HtmlWebpackPlugin({
          filename: '../index.html',
          template: 'src/index.html',
          inject: true
        }),
        // for bootstrap4 beta2 and above, load jquery as below for global usage
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Popper: ['popper.js', 'default'],
            'Util': "exports-loader?Util!bootstrap/js/dist/util"
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './public'),// A directory or URL to serve HTML content from.
        historyApiFallback: true, // fallback to /index.html for Single Page Applications.
        inline: true, // inline mode (set to false to disable including client scripts (like livereload)
        open: true, // open default browser while launching
        compress: true, // Enable gzip compression for everything served
        hot: true // Enable webpack's Hot Module Replacement feature
    },
    devtool: 'eval-source-map'
}

module.exports = config;

if(process.env.NODE_ENV === 'production'){
    module.exports.plugins.push(
        new ExtractTextWebpackPlugin('css/styles.[contenthash:8].css'),
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeCSSAssets()
    );
}
else{
    module.exports.plugins.push(
        new ExtractTextWebpackPlugin('css/styles.css')
    );
}