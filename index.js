const express = require('express')
const app = express()

// 路由
const baiduNewsRouter = require('./router/baiduNews');
const bossDataRouter = require('./router/bossData');
// 百度新闻
app.use('/baiduNews', baiduNewsRouter)
// boss直聘
app.use('/bossData', bossDataRouter)


let server = app.listen(3000, function () {
  const port = server.address().port
  console.log('Your App is running at http://localhost:' + port)
})
