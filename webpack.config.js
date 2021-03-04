const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "node_modules/paper/dist/paper-full.min.js", to: "paper.js" },
            ],
        }),
    ],
};
