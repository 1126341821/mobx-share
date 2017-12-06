var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map', // ，使得编译后的代码可读性更高，也更容易调试
  entry: [
    './src/demo/actionAutorun.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }]
  }
};
