const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sass = require('sass');

const contentBase = path.resolve(__dirname, './public');
const prodBuild = path.resolve(__dirname, './dist');

const port = 3001;
const startFile = 'index.tsx';

const isDevelopment = process.env.NODE_ENV !== 'production';

const src = path.join(__dirname, '/src');

const config = {
  entry: {
    app: path.resolve(__dirname, `./src/${startFile}`),
  },
  output: {
    path: prodBuild,
    filename: '[name].bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },

      {
        test: /\.module\.(s[ac]|c)ss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,

              implementation: sass,
              sassOptions: {
                fiber: false,
              },
              webpackImporter: true,
            },
          },
        ],
      },
      {
        test: /\.(s[ac]|c)ss$/,
        exclude: /\.module\.(s[ac]|c)ss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
    modules: [src, 'node_modules'],
    alias: {
      src,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      favicon: './public/favicon.ico',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
  ],

  devServer: {
    static: contentBase,
    port,
    historyApiFallback: true,
    hot: true,
  },
  devtool: isDevelopment ? 'source-map' : undefined,
};

const fnConfig = (globalConfig) => {
  if (!isDevelopment) {
    // do production stuff here...
  }
  return config;
};
module.exports = fnConfig;
