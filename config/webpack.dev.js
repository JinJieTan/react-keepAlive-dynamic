const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const os = require('os');
module.exports = {
  entry: {
    app: ['babel-polyfill', './src/index.js'],
    vendor: ['react']
  },
  output: {
    filename: '[name].[hash:8].js',
    path: resolve(__dirname, '../build')
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(less|css)$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader'
              },
              {
                loader: 'less-loader',
                options: { javascriptEnabled: true }
              }
            ]
          },
          {
            test: /\.(html)$/,
            loader: 'html-loader'
          },
          {
            test: /\.(js|jsx)$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  //jsx语法
                  presets: [
                    '@babel/preset-react',
                    //tree shaking 按需加载babel-polifill
                    [
                      '@babel/preset-env',
                      { modules: false, useBuiltIns: 'false', corejs: 2 }
                    ]
                  ],
                  plugins: [
                    //识别class组件
                    ['@babel/plugin-proposal-class-properties', { loose: true }]
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  mode: 'development',
  devServer: {
    contentBase: '../build',
    open: true,
    port: 8000,
    hot: true
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all'
    }
  }
};
