// package.json > scripts > "build": "webpack --config webpack.config.prod.js"

// remember: npm i style-loader --save (-D/--save-dev isn't enough)

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    bundle: path.resolve(__dirname, 'src/app.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true, // enable clearing dist folder before building to only have optimized code
  },
  devtool: false, // optimize further by disabling source maps
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // MEMO: remember to create 'src/Globals.d.ts' file with: declare module '*.css';
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ProjectManager',
      filename: 'index.html',
      template: 'src/template.html',
    }),
  ],
};
