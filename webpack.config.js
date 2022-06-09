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
    app: './app/assets/scripts/App.js',
    login: './app/assets/scripts/Login.js',
    organizer: './app/assets/scripts/Organizer.js',
    mail: './app/assets/scripts/Mail.js',
    team: './app/assets/scripts/Team.js',
    chat: './app/assets/scripts/Chat.js',
    search: './app/assets/scripts/Search.js',
    profile: './app/assets/scripts/Profile.js'
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
      },
      {
        test: /\.png$/i,
        type: 'asset/resource'
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
    open: 'http://localhost:3000/profile.html'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
    assetModuleFilename: '[name][ext]'
  },
  optimization: {
    runtimeChunk: 'single'
  }
}