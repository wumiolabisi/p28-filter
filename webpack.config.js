const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './assets/js/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].min.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // Pour les fichiers SCSS et CSS
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,  // Extraction du CSS dans un fichier séparé
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].min.css',  // Emplacement du fichier CSS final
        }),
    ],
    resolve: {
        extensions: ['.js', '.scss'],  // Extensions à traiter
    },
    mode: 'development',
    devtool: 'source-map',
};
