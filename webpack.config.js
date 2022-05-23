// MEMO: npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader html-webpack-plugin
// package.json > scripts > "dev": "webpack serve"

// remember: npm i style-loader --save (-D/--save-dev isn't enough)

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // from where webpack starts gathering depencies and building (key will be the name of the file)
    bundle: path.resolve(__dirname, './src/app.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
  },
  devtool: 'inline-source-map', // to enable source maps (for debugging .ts files in browser)
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // to tell what files 'ts-loader' goes through (ie. all .ts files)
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
    // handles creating html file for dist based on template (template doesn't need link/css or script tags)
    new HtmlWebpackPlugin({
      title: 'App Name',
      filename: 'index.html',
      template: 'src/template.html',
    }),
  ],
};
