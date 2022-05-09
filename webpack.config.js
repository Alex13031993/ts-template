const webpack = require('webpack')
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'index.tsx'),
  },
  output: {
    publicPath: process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '/',
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].[hash].js',
  },
  resolve: {
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      components: path.resolve(__dirname, 'src/components'),
      contexts: path.resolve(__dirname, 'src/contexts'),
      utils: path.resolve(__dirname, 'src/utils'),
      types: path.resolve(__dirname, 'src/types'),
      styles: path.resolve(__dirname, 'src/styles'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      constants: path.resolve(__dirname, 'src/constants'),
      pages: path.resolve(__dirname, 'src/pages'),
      node_modules: path.resolve(__dirname, 'node_modules'),
      libs: path.resolve(__dirname, 'src/libs'),
      preloaders: path.resolve(__dirname, 'src/preloaders'),
      bufferConferenceRedux: path.resolve(__dirname, 'src/bufferConferenceRedux'),
      engineRedux: path.resolve(__dirname, 'src/engineRedux'),
      environment: path.resolve(__dirname, 'src/environment')
    },
    extensions: ['.ts', '.tsx', '.js', '.css']
  },

  devtool:'source-map',

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        use: [{loader: 'babel-loader'},
        {
          loader: '@linaria/webpack-loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
          },
        }],
        include: path.resolve(__dirname, 'src'),
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/,
          priority: 20,
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          minSize: 0,
          reuseExistingChunk: true,
        },
      },
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      systemvars: true,
      defaults: true, // load '.env.defaults' as the default values if empty.
    }),
  ],

  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist')
    },
    open: true,
    compress: true,
    hot: true,
    port: 9000,
  }
};
