const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  target: 'web',
  devtool : 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[fullhash:8].js',
    sourceMapFilename: '[name].[fullhash:8].map',
    chunkFilename: '[id].[fullhash:8].js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    inline: true,
    host: "localhost",
    port: 3000,
    watchOptions: {
      poll: true
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react"
          ],
          plugins: [
            [
              'module-resolver',
              {
                alias: {
                  containers: './src/containers',
                  components: './src/components',
                  utils: './src/utils',
                },
              },
            ],
            ['@babel/plugin-proposal-class-properties', {loose: true}],
            '@babel/plugin-transform-react-jsx',
            '@babel/plugin-transform-runtime'
          ],
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
      favicon: "./public/favicon.ico"
    })
  ],
  optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	}
};