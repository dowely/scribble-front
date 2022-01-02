const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let pages = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './app/pages/index.html',
    title: 'test',
    templateParameters: {
      foo: 'bar'
    },
    chunks: ['index']
  })
]

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]

module.exports = {
  entry: {
    index: './app/assets/scripts/index.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        loader: 'ejs-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}]
      }
    ]
  },
  plugins: [...pages],
  devServer: {
    static: {
      directory: path.join(__dirname, 'app', 'pages'),
      watch: false
    },
    watchFiles: './app/pages/**/*',
    compress: true,
    port: 3000,
    hot: true,
    host: '0.0.0.0',
    open: 'http://localhost:3000'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs')
  }
}