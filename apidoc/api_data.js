define({ "api": [
  {
    "type": "post",
    "url": "/baiduNews",
    "title": "百度新闻（最热新闻和本地新闻）",
    "name": "百度新闻（最热新闻和本地新闻）",
    "group": "baiduNews",
    "version": "0.0.0",
    "filename": "router/baiduNews.js",
    "groupTitle": "baiduNews"
  },
  {
    "type": "post",
    "url": "/bossData",
    "title": "boss直聘",
    "name": "boss直聘",
    "group": "bossData",
    "description": "<p>boss直聘会读取cookie，没有cookie或者cookie失效则返回空，如希望能正常爬取，则需替换最新的cookie信息</p>",
    "version": "0.0.0",
    "filename": "router/bossData.js",
    "groupTitle": "bossData"
  }
] });