const path = require('path')

const pages = require('./pagesConfig')

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]

module.exports = {
  entry: {
    login: './app/assets/scripts/Login.js',
    main: './app/assets/scripts/main.js',
    welcome: './app/assets/scripts/welcome.js',
    mail: './app/assets/scripts/mail.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}]
      },
      {
        test: /\.svg$/i,
        use: 'svg-sprite-loader'
      },
      {
        test: /\.ejs$/i,
        use: 'ejs-compiled-loader'
      }
    ]
  },
  plugins: [...pages],
  devServer: {
    static: {
      directory: path.join(__dirname, 'app'),
      watch: false
    },
    watchFiles: './app/pages/**/*',
    compress: true,
    port: 3000,
    hot: true,
    host: '0.0.0.0',
    open: 'http://localhost:3000/login.html'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  optimization: {
    runtimeChunk: 'single'
  }
}