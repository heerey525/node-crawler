const express = require('express')
const app = express()
const scheduleJob = require('./util/scheduleJob') // 定时爬虫

// 路由
const baiduNewsRouter = require('./router/baiduNews')
const bossDataRouter = require('./router/bossData')
const pneumoniaRouter = require('./router/pneumonia')
const hotSearchRouter = require('./router/hotSearch')
const otherRouter = require('./router/other')
const v2exRouter = require('./router/v2ex')
// 百度新闻
app.use('/baiduNews', baiduNewsRouter)
// boss直聘
app.use('/bossData', bossDataRouter)
// 丁香园疫情
app.use('/pneumonia', pneumoniaRouter)
// 微博热搜
app.use('/hotSearch', hotSearchRouter)
// 其他
app.use('/other', otherRouter)
// v2ex
app.use('/v2ex', v2exRouter)

let server = app.listen(3000, function () {
  const port = server.address().port
  console.log('Your App is running at http://localhost:' + port)
})
