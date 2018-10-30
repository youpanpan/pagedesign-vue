
 
// // 获取配置
// var config = require('./webpack.dev.js')

 
// // 一个可以调用默认软件打开网址、图片、文件等内容的插件
// // 这里用它来调用默认浏览器打开dev-server监听的端口，例如：localhost:8080
// var opn = require('opn')
// var path = require('path')
// var express = require('express')
// var webpack = require('webpack')
 
// // 一个express中间件，用于将http请求代理到其他服务器
// // 例：localhost:8080/api/xxx  -->  localhost:3000/api/xxx
// // 这里使用该插件可以将前端开发中涉及到的请求代理到API服务器上，方便与服务器对接
// var proxyMiddleware = require('http-proxy-middleware')
 
// // 根据 Node 环境来引入相应的 webpack 配置
// var webpackConfig = config;
 
// // dev-server 监听的端口，默认为config.dev.port设置的端口，即8080
// var port = 9090;
 
// // 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false
// var autoOpenBrowser = true;
 
// // 定义 HTTP 代理表，代理到 API 服务器
// var proxyTable = [];
 
// // 创建1个 express 实例
// var app = express()
 
// // 根据webpack配置文件创建Compiler对象
// var compiler = webpack(webpackConfig)
 
// // webpack-dev-middleware使用compiler对象来对相应的文件进行编译和绑定
// // 编译绑定后将得到的产物存放在内存中而没有写进磁盘
// // 将这个中间件交给express使用之后即可访问这些编译后的产品文件
// var devMiddleware = require('webpack-dev-middleware')(compiler, {
//   publicPath: webpackConfig.output.publicPath,
//   quiet: true
// })
 
// // webpack-hot-middleware，用于实现热重载功能的中间件
// var hotMiddleware = require('webpack-hot-middleware')(compiler, {
//   log: () => {}
// })
 
// // 当html-webpack-plugin提交之后通过热重载中间件发布重载动作使得页面重载
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })
 
// // 将 proxyTable 中的代理请求配置挂在到express服务器上
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   // 格式化options，例如将'www.example.com'变成{ target: 'www.example.com' }
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })
 
// // handle fallback for HTML5 history API
// // 重定向不存在的URL，常用于SPA
// app.use(require('connect-history-api-fallback')(
//     {
//         rewrites: [
//             {
//                 from: /^\/src\/assets\/.*$/,
//                 to: function(context) {
//                     return '/dist' + context.parsedUrl.pathname;
//                 }
//             },
//             {
//                 from: /\.css$/,
//                 to: function(context) {
//                     return '/' + context.parsedUrl.pathname;
//                 }
//             }
//         ]
        
//     }
// ));
 
// // serve webpack bundle output
// // 使用webpack开发中间件
// // 即将webpack编译后输出到内存中的文件资源挂到express服务器上
// app.use(devMiddleware)
 
// // enable hot-reload and state-preserving
// // compilation error display
// // 将热重载中间件挂在到express服务器上
// app.use(hotMiddleware)
 
// // serve pure static assets
// // 静态资源的路径
// var staticPath = path.posix.join('/', 'dist')
 
// // 将静态资源挂到express服务器上
// app.use(staticPath, express.static('./dist'))
 
// // 应用的地址信息，例如：http://localhost:8080
// var uri = 'http://localhost:' + port
 
// // webpack开发中间件合法（valid）之后输出提示语到控制台，表明服务器已启动
// devMiddleware.waitUntilValid(function () {
//   console.log('> Listening at ' + uri + '\n')
// })
 
// // 启动express服务器并监听相应的端口（8080）
// module.exports = app.listen(port, function (err) {
//   if (err) {
//     console.log(err)
//     return
//   }
 
//   // when env is testing, don't need open it
//   // 如果符合自动打开浏览器的条件，则通过opn插件调用系统默认浏览器打开对应的地址uri
//   if (autoOpenBrowser ) {
//     opn(uri)
//   }
// })

const express = require('express');
const history = require('connect-history-api-fallback');
const app = express();
var webpack = require('webpack');
var config = require('./webpack.common.js');

// // 根据webpack配置文件创建Compiler对象
var compiler = webpack(config);
 
// webpack-dev-middleware使用compiler对象来对相应的文件进行编译和绑定
// 编译绑定后将得到的产物存放在内存中而没有写进磁盘
// 将这个中间件交给express使用之后即可访问这些编译后的产品文件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.path,
  quiet: true
});
app.use(devMiddleware);

app.use(history({
    index: '/',
    disableDotRule: false,
}));

const port = 9090;
app.listen(port, () => {
  console.log(`Example app listening on port ${9090}!`);
});