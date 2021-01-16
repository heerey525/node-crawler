define({ "api": [
  {
    "type": "get",
    "url": "/baiduNews",
    "title": "百度新闻（最热新闻和本地新闻）",
    "name": "百度新闻（最热新闻和本地新闻）",
    "group": "baiduNews",
    "version": "0.0.0",
    "filename": "router/baiduNews.js",
    "groupTitle": "baiduNews"
  },
  {
    "type": "get",
    "url": "/bossData",
    "title": "boss直聘",
    "name": "boss直聘",
    "group": "bossData",
    "description": "<p>boss直聘会读取cookie，没有cookie或者cookie失效则返回空，如希望能正常爬取，则需替换最新的cookie信息</p>",
    "version": "0.0.0",
    "filename": "router/bossData.js",
    "groupTitle": "bossData"
  },
  {
    "type": "get",
    "url": "/pneumonia",
    "title": "（丁香园）疫情",
    "name": "疫情",
    "group": "pneumonia",
    "description": "<p>（丁香园）疫情爬取</p>",
    "version": "0.0.0",
    "filename": "router/pneumonia.js",
    "groupTitle": "pneumonia"
  },
  {
    "type": "get",
    "url": "/pneumonia",
    "title": "（丁香园）疫情数据请求",
    "name": "疫情数据请求",
    "group": "pneumonia",
    "description": "<p>（丁香园）疫情数据请求</p>",
    "version": "0.0.0",
    "filename": "router/pneumonia.js",
    "groupTitle": "pneumonia"
  }
] });
