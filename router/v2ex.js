const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const cheerio = require('cheerio')

/**
 * @api {get} /v2ex/hot 最热主题
 * @apiName 最热主题
 * @apiGroup v2ex
 * @apiDescription 最热主题 相当于首页右侧的 10 大每天的内容
 */
router.get('/hot', function (req, res, next) {
  superagent
    .get(`https://www.v2ex.com/api/topics/hot.json?t=${new Date().getTime()}`)
    .end((err, res1) => {
      if (err) {
        // 如果访问失败或者出错，会这行这里
        console.error(`获取最热主题失败 - ${err}`)
        res.send({ code: 500, msg: '获取最热主题失败' })
      } else {
        res.send({ code: 200, data: JSON.parse(res1.text), msg: '获取最热主题成功' })
      }
    })
})

/**
 * @api {get} /v2ex/latest 最新主题
 * @apiName 最新主题
 * @apiGroup v2ex
 * @apiDescription 最新主题 相当于首页的“全部”这个 tab 下的最新内容。
 */
router.get('/latest', function (req, res, next) {
  superagent
    .get(`https://www.v2ex.com/api/topics/latest.json?t=${new Date().getTime()}`)
    .end((err, res1) => {
      if (err) {
        // 如果访问失败或者出错，会这行这里
        console.error(`获取最新主题失败 - ${err}`)
        res.send({ code: 500, msg: '获取最新主题失败' })
      } else {
        res.send({ code: 200, data: JSON.parse(res1.text), msg: '获取最新主题成功' })
      }
    })
})

/**
 * @api {get} /v2ex/node 节点信息
 * @apiName 节点信息
 * @apiGroup v2ex
 * @apiDescription 节点信息 获得指定节点的名字，简介，URL 及头像图片的地址。
 */
router.get('/node', function (req, res, next) {
  if (!req.query.name) return res.send({ code: 500, msg: '获取节点信息失败' })
  const name = req.query.name
  superagent
    .get(`https://www.v2ex.com/api/nodes/show.json?name=${name}&t=${new Date().getTime()}`)
    .end((err, res1) => {
      if (err) {
        // 如果访问失败或者出错，会这行这里
        console.error(`获取节点信息失败 - ${err}`)
        res.send({ code: 500, msg: '获取节点信息失败' })
      } else {
        res.send({ code: 200, data: JSON.parse(res1.text), msg: '获取节点信息成功' })
      }
    })
})

module.exports = router
