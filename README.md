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
	├──  baiduNews.js  百度新闻的爬取案例
	├──  bossData.js  boss直聘数据的爬取案例
	├──  hotSearch.js  微博热搜接口
	├──  other.js  其他接口
	├──  pneumonia.js  丁香园疫情接口
	└──  v2ex.js  v2ex网站接口
├── static  静态文件
	├──  bossData.json  爬取的boss直聘的json数据
	├──  hotSearch.json  爬取的微博热搜的json数据
	└──  pneumonia.json  爬取的丁香园疫情的json数据
├── util  公共方法
	├──  crawlItems  爬虫方法
	└──  scheduleJob  定时任务
├── apidoc.json  apidoc的配置文件
└── index.js  入口文件
    
```


#### 安装和使用说明

1.  `npm install` 安装依赖
2.  `node index.js` 运行 或者全局安装`nodemon`（`npm install nodemon -g`）之后 `npm run dev`，端口号默认3000
3.  全局安装`apidoc`（`npm install apidoc -g`）之后导出接口文档 `npm run apidoc`

#### 接口文档

- [接口文档](https://heerey525.github.io/node-crawler/apidoc/ "接口文档")

   
