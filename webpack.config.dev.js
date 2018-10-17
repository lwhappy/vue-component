//const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
module.exports = merge(common,{
  devtool: 'eval-source-map',
  
  devServer: {
      contentBase:'./public',//本地服务器所加载的页面所在的目录
      port : 8081,
      /*proxy : 
      	{
      		'/test': {
    			target: 'http://www.test.com',
    			changeOrigin: true,
    			pathRewrite: {
    				'^/test': '/abc/def/'
    			}
    		}
    	}*/
    	
    }

})