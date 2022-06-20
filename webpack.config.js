const path = require('path')
const fse = require('fs-extra')
const pages = require('./pagesConfig')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

const currentTask = process.env.npm_lifecycle_event

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy assets', function() {

      fse.copySync('./app/assets/images', './docs/assets/images', {filter: src => {

        if(fse.lstatSync(src).isDirectory()) return true

        if(src.endsWith('.png')) return true

        return false

      } })

    })
    compiler.hooks.done.tap('Clean licences', () => {

      const allFiles = fse.readdirSync('./docs').map(file => path.join(__dirname, 'docs/', file))

      allFiles.forEach(path => {

        if(path.endsWith('LICENSE.txt')) fse.removeSync(path)
      })

    })
  }
}

const cssRule = {
  test: /\.css$/i,
  use: ['css-loader', {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}]
}

const config = {
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
  module: {
    rules: [
      cssRule,
      {
        test: /\.svg$/i,
        use: 'svg-sprite-loader'
      },
      {
        test: /\.ejs$/i,
        use: 'ejs-compiled-loader'
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [...pages]
}

if(currentTask === 'dev') {

  config.mode = 'development'

  cssRule.use.unshift('style-loader')

  config.output = {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'app'),
    assetModuleFilename: '[name][ext]'
  }

  config.devServer = {
    static: {
      directory: path.join(__dirname, 'app'),
      watch: false
    },
    watchFiles: './app/pages/**/*',
    compress: true,
    port: 3000,
    hot: true,
    host: '0.0.0.0',
    open: 'http://localhost:3000/'
  }

  config.optimization = {
    runtimeChunk: 'single'
  }

}

if(currentTask === 'build') {

  config.mode = 'production'

  cssRule.use.unshift(MiniCssExtractPlugin.loader)

  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  })

  config.plugins.push(
    new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
    new RunAfterCompile()
  )

  config.output = {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'docs'),
    assetModuleFilename: 'assets/images/[name][ext]',
    clean: true
  }

  config.optimization = {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimize: true,
    minimizer: [`...`, new CssMinimizerWebpackPlugin()]
  }

}

module.exports = config