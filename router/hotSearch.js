const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

/**
 * @api {get} /hotSearch 微博热搜
 * @apiName 微博热搜
 * @apiGroup hotSearch
 * @apiDescription 微博热搜（项目运行起来定时任务每15分钟重新爬取一次）
 */
router.get('/', function (req, res, next) {
  //  读取本地数据
  fs.readFile(path.join(__dirname, '../static/hotSearch.json'), 'utf-8', (err, data) => {
    if (err) {
      res.send({ code: 500, msg: '微博热搜数据获取失败'})
    } else {
      res.send({ code: 200, data: JSON.parse(data), msg: '微博热搜数据获取成功'})
    }
  })
})

module.exports = router
