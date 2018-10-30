# 在线页面设计工具
> 在线页面设计工具是一个在线页面设计工具（目前更好的理解是原型设计工具），随着版本的升级支持的东西会越来越多。  
> 本项目基于Vue进行开发的，开发者可以扩展自己的组件并注册到页面中。

## 截图
![组件列表](https://raw.githubusercontent.com/youpanpan/pagedesign-vue/master/screenshot/%E7%BB%84%E4%BB%B6.png)  

![设计界面](https://github.com/youpanpan/pagedesign-vue/blob/master/screenshot/%E8%AE%BE%E8%AE%A1%E7%95%8C%E9%9D%A2.png?raw=true)  

![预览](https://github.com/youpanpan/pagedesign-vue/blob/master/screenshot/%E9%A2%84%E8%A7%88.png?raw=true)  


## 运行
- 1.初始化
```
npm install
```

- 2.1开发环境
```
npm run server 
```
接着访问localhost:9090/page
- 2.2.生产环境
```
npm run build 
```
在dist目录下会生成打包后的文件


## 版本说明
### V1.0
- 1.基础组件
    - 按钮
    -   图标
	-   图片
	-   文本
	-   链接
	-   标签
	-   输入框
	-   矩形块	
- 2.预览
- 3.保存
- 4.页面管理（恢复已有页面组件）

## 后台支持
> 如果不需要后台支持，则不能预览与保存，后台使用了SpringBoot进行开发  
> 地址为：[在线页面设计工具后台](https://github.com/youpanpan/pagedesign-vue-springboot)， 后台服务地址需要通过src/main.js中进行配置。

