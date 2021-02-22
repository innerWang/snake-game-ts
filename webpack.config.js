const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 指定入口文件
  entry: './src/index.ts',
  // 指定打包文件所在目录和文件名
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    environment: {
      // 告诉 webpack 不使用箭头函数，即打包后的最终的立即执行函数不使用箭头函数
      arrowFunction: false,
      const: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  // 指定环境的插件
                  '@babel/preset-env',
                  {
                    // 要兼容的目标浏览器的版本
                    targets: {
                      chrome: '68',
                      ie: '11',
                    },
                    // 指定 corejs 的版本，使用 corejs 主要是为了使用 polyfill
                    corejs: 3,
                    // 指定使用 corejs 的方法, usage 表示按需加载，即用了的才会引入对应的polyfill
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  // 用于设置引用的模块
  resolve: {
    // 后缀如果不包含 .ts ，则无法将 .ts 文件作为模块导入
    extensions: ['.ts', '.js'],
  },
};
