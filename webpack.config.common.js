//const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack')
module.exports = {
  entry: {
            //global : __dirname + "/js/src/global.js",
            main : __dirname + "/src/js/main.js",
  },
  output: {
    path: __dirname + "/public/",//打包后的文件存放的地方
    filename: "[name].js",//打包后输出文件的文件名
	//publicPath: __dirname + "/"
  },
  plugins: [
	new webpack.ProvidePlugin({
	$: "jquery",
	jQuery: "jquery",
	jquery: "jquery",
	"window.jQuery": "jquery"
 })
],
  module: {
          rules: [
              /*{
                  test: /(\.jsx|\.js)$/,
                  use: {
                      loader: "babel-loader"
                  },
                  exclude: /node_modules/
              },*/
              {
                  test: /\.css$/,
                  use: [
                      {
                          loader: "style-loader"
                      }, {
                          loader: "css-loader"
                      }
                  ]
              },
              {
                  test: /\.vue$/,
                  use: [
                      {
                          loader: "vue-loader"
                      }
                  ]
              },
			  {
				test: /\.(jpg|png|gif)/,
				use: "url-loader?limit=8000"
			  }
          ]
      } 
  
};