module.exports = {
    entry: './public/client.js',
    output: {
        filename: 'bundle.js',
    },
node: {
   fs: 'empty',
   net: 'empty',
   tls: 'empty',
},
module: {
    rules: [
        {
            test: /JSONstream/,
            use: 'shebang-loader',
        },
    ],
},
};