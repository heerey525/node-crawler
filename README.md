# nodeCrawler

#### 介绍
node写的爬虫案例，可以运行直接爬取数据作为代理服务，接口文档

#### 软件架构
```
.
├── apidoc  apidoc导出的（接口文档）文件
	└── index.html  可直接双击在浏览器端运行接口文档
├── node_modules  依赖包
├──	router  路由器实例（具体的接口处理逻辑）
	├──  baiduNews  百度新闻的爬取案例
	└──  bossData  boss直聘数据的爬取案例
├── apidoc  apidoc的配置文件
└── index.js  入口文件
    
```


#### 安装和使用说明

1.  `npm install` 安装依赖
2.  `node index.js` 运行 或者全局安装`nodemon`（`npm install nodemon -g`）之后 `npm run dev`，端口号默认3000
3.  全局安装`apidoc`（`npm install apidoc -g`）之后导出 `npm run apidoc`

#### 接口文档

1. `http://localhost:3000/baiduNews`  baiduNews - 百度新闻（最热新闻和本地新闻）

2. `http://localhost:3000/baiduNews`  bossData - boss直聘

   
