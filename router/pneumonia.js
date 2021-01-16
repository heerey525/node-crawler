const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

function evil(fn) {
  var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
  return new Fn('return ' + fn)();
}

/**
 * index.js
 * [description] - 处理疫情数据
 */
let getPneumoniaDatas = (res) => {
  //  封装eval解析js字符串函数
  let originDataObj = {}
  //  封装执行js字符串函数
  function evalJsStr() {
    if (arguments.length <= 0) return
    for (let i = 0; i < arguments.length; i++) {
      let params = arguments[i].replace(/window/gi, 'originDataObj')
      eval(params)
    }
  }
  //  获取数据
  const $ = cheerio.load(res.text)
  //  各国疫情
  const $getListByCountryTypeService2true = $('#getListByCountryTypeService2true').html()
  //  昨日国内疫情
  const $fetchRecentStat = $('#fetchRecentStat').html()
  //  获取国内疫情
  const $getAreaStat = $('#getAreaStat').html()
  //  疫情热点
  const $getTimelineService1 = $('#getTimelineService1').html()
  //  国内&全球统计数据
  const $getStatisticsService = $('#getStatisticsService').html()
  //  执行函数获取数据
  evalJsStr($getListByCountryTypeService2true, $fetchRecentStat, $getAreaStat, $getTimelineService1, $getStatisticsService)

  fs.writeFile(path.join(__dirname, '../static/pneumonia.json'), JSON.stringify(originDataObj), err => {
    if (err) throw err
    console.log('数据写入成功')
  })
  // console.log(originDataObj)
}

/**
 * @api {get} /pneumonia （丁香园）疫情
 * @apiName 疫情
 * @apiGroup pneumonia
 * @apiDescription （丁香园）疫情爬取
 */
router.get('/', function (req, res, next) {
  superagent
  .get(`https://ncov.dxy.cn/ncovh5/view/pneumonia`)
  .end((err, res1) => {
    if (err) {
      // 如果访问失败或者出错，会这行这里
      console.log(`丁香园疫情数据抓取失败 - ${err}`)
      res.send({ code: 500, msg: '丁香园疫情数据抓取失败' })
    } else {
      // 处理疫情数据
      const pneumoniaDatas = getPneumoniaDatas(res1)
      res.send({ code: 200, msg: '丁香园疫情数据数据抓取成功', pneumoniaDatas: pneumoniaDatas })
    }
  })
})

/**
 * @api {get} /pneumonia （丁香园）疫情数据请求
 * @apiName 疫情数据请求
 * @apiGroup pneumonia
 * @apiDescription （丁香园）疫情数据请求
 */
router.get('/list', function (req, res, next) {
  //  读取本地数据
  fs.readFile(path.join(__dirname, '../static/pneumonia.json'), 'utf8', (err, data) => {
    if (err) {
      res.send({ code: 500, msg: '疫情数据获取失败'})
    } else {
      res.send({ code: 200, data: JSON.parse(data), msg: '疫情数据获取成功'})
    }
  })
})


module.exports = router
