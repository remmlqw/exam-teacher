const path=require('path');
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry : './src/index.js',
  output : {
    path : path.resolve(__dirname,'dist'),
    filename : './js/bundle.js'
  },
  resolve: {
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['*', '.js', '.json', '.less','.jsx'],
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
      '@components': path.resolve(__dirname,'src/components'),
      '@assets':path.resolve(__dirname,'src/assets')
    }
  },
  module : {
    rules : [
      {
        test : /\.js$/,
        use : {
          loader : "babel-loader",
          options : {
            presets : ['es2015','react']
          }
        },
        exclude : /node_modules/
      },
      {
        test : /\.css$/,
        use : [
        {
        	loader : "style-loader"
        },
        {
        	loader : "css-loader"
        }
        ]
      },
      {
        test : /\.(png|jpg)$/,
        use : {
          loader : 'url-loader',
          options : {
            limit : '8192'
          }
        }
      }
    ]
  },
  plugins: [
    // html 模板插件
    new HtmlWebpackPlugin({
        template: __dirname + '/index.html'
    }),

    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),

    // 打开浏览器
    new OpenBrowserPlugin({
      url: 'http://localhost:8080/#/login'
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    }),

  ],
  //我们在这里对webpack-dev-server进行配置
  devServer: {
    contentBase:"./",// 本地服务器在哪个目录搭建页面，一般我们在当前目录即可；
    historyApiFallback:true,//当我们搭建spa应用时非常有用，它使用的是HTML5 History Api，任意的跳转或404响应可以指向 index.html 页面；
    inline:true,//用来支持dev-server自动刷新的配置，webpack有两种模式支持自动刷新，一种是iframe模式，一种是inline模式；使用iframe模式是不需要在devServer进行配置的，只需使用特定的URL格式访问即可；不过我们一般还是常用inline模式，在devServer中对inline设置为true后，当我们启动webpack-dev-server时仍要需要配置inline才能生效
    hot:true,// 启动webpack热模块替换特性,这里是个坑
    port:8080,//配置服务端口号
    host:'localhost',//服务器的IP地址，可以使用IP也可以使用localhost
    compress:true,//服务端压缩是否开启
  }
}
