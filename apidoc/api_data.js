define({ "api": [
  {
    "type": "get",
    "url": "/baiduNews",
    "title": "百度新闻（最热新闻和本地新闻）",
    "name": "百度新闻（最热新闻和本地新闻）",
    "group": "baiduNews",
    "description": "<p>实时爬取展示，相当于代理访问</p>",
    "version": "0.0.0",
    "filename": "router/baiduNews.js",
    "groupTitle": "baiduNews"
  },
  {
    "type": "get",
    "url": "/bossData/list",
    "title": "boss直聘",
    "name": "boss直聘",
    "group": "bossData",
    "description": "<p>boss直聘</p>",
    "version": "0.0.0",
    "filename": "router/bossData.js",
    "groupTitle": "bossData"
  },
  {
    "type": "get",
    "url": "/bossData",
    "title": "boss直聘爬取",
    "name": "boss直聘爬取",
    "group": "bossData",
    "description": "<p>boss直聘会读取cookie，没有cookie或者cookie失效则返回空，如希望能正常爬取，则需替换最新的cookie信息 （请求一次爬取一次）</p>",
    "version": "0.0.0",
    "filename": "router/bossData.js",
    "groupTitle": "bossData"
  },
  {
    "type": "get",
    "url": "/hotSearch",
    "title": "微博热搜",
    "name": "微博热搜",
    "group": "hotSearch",
    "description": "<p>微博热搜（项目运行起来定时任务每1分钟重新爬取一次）</p>",
    "version": "0.0.0",
    "filename": "router/hotSearch.js",
    "groupTitle": "hotSearch"
  },
  {
    "type": "get",
    "url": "/pneumonia",
    "title": "（丁香园）疫情数据请求",
    "name": "疫情数据请求",
    "group": "pneumonia",
    "description": "<p>（丁香园）疫情数据请求（项目运行起来定时任务每5分钟重新爬取一次）</p>",
    "version": "0.0.0",
    "filename": "router/pneumonia.js",
    "groupTitle": "pneumonia"
  }
] });
