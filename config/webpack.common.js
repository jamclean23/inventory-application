const path = require('path');

module.exports = {
    entry: {
        '/login/login': './src/login/login.js',
        '/homepage/homepage': './src/homepage/homepage.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }            
        ]
    }
}