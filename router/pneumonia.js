const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

/**
 * @api {get} /pneumonia （丁香园）疫情数据请求
 * @apiName 疫情数据请求
 * @apiGroup pneumonia
 * @apiDescription （丁香园）疫情数据请求（项目运行起来定时任务每5分钟重新爬取一次）
 */
router.get('/', function (req, res, next) {
  //  读取本地数据
  fs.readFile(path.join(__dirname, '../static/pneumonia.json'), 'utf-8', (err, data) => {
    if (err) {
      res.send({ code: 500, msg: '疫情数据获取失败'})
    } else {
      res.send({ code: 200, data: JSON.parse(data), msg: '疫情数据获取成功'})
    }
  })
})

module.exports = router
