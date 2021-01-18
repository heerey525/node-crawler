const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const cheerio = require('cheerio')

/**
 * @api {get} /other/hitokoto 一言
 * @apiName 一言
 * @apiGroup other
 * @apiDescription 一言（https://developer.hitokoto.cn/）
 */
router.get('/hitokoto', function (req, res, next) {
  superagent.get('https://v1.hitokoto.cn/?encode=json').end((err, res1) => {
    if (err) {
      // 如果访问失败或者出错，会这行这里
      console.error(`获取一言失败 - ${err}`)
      res.send({ code: 500, msg: '获取一言失败' })
    } else {
      res.send({ code: 200, data: JSON.parse(res1.text), msg: '获取一言成功' })
    }
  })
})

/**
 * @api {get} /other/one 一个
 * @apiName 一个
 * @apiGroup other
 * @apiDescription 一个（http://www.wufazhuce.com/）
 */
router.get('/one', function (req, res, next) {
  superagent.get('http://www.wufazhuce.com').end((err, res1) => {
    if (err) {
      // 如果访问失败或者出错，会这行这里
      console.error(`获取one失败 - ${err}`)
      res.send({ code: 500, msg: '获取one失败' })
    } else {
      const $ = cheerio.load(res1.text)
      const content = $('#carousel-one .carousel-inner .item.active .fp-one-cita a').text()
      const url = $('#carousel-one .carousel-inner .item.active .fp-one-cita a').attr('href')
      const title = $('.fp-one-articulo .corriente .one-articulo-titulo a').text().replace(/\s+/g, '')
      const titleUrl = $('.fp-one-articulo .corriente .one-articulo-titulo a').attr('href')
      res.send({ code: 200, data: { title, titleUrl, content, url }, msg: '获取one成功' })
    }
  })
})

/**
 * @api {get} /other/toutiao 今日头条
 * @apiName 今日头条
 * @apiGroup other
 * @apiDescription 今日头条
 */
router.get('/toutiao', function (req, res, next) {
  superagent
   .get(`https://m.toutiao.com/list/?tag=__all__&ac=wap&count=20&format=json_raw&as=A1F6A0D09524BF3&cp=6005444B9F23FE1&min_behot_time=${new Date().getTime()/1000}&_signature=jDjIjgAA7Eu6I3z.j1asr4w4yJ&i=1610953483`)
   .set(
      'Cookie',
      `tt_webid=6900746381620758029; csrftoken=36af0129a4a3397d03195470f632fa58; _ga=GA1.2.1130190460.1609835774; ttcid=ae3b89f6f44542848e02fdcb1436bb2127; MONITOR_WEB_ID=2d324a48-8d70-4070-8a2c-55a40c2317bd; ttwid=1%7CFs4lylkb2m2DrnK4xkWdBKEhsHtXaXzsB9wAtkgQxrw%7C1610959755%7C12f0728f74ff33ed40535ea391e9d6290653dca31b0eca01c8cd52f3379e6744; W2atIF=1; _gid=GA1.2.833523543.1610959710; __tasessionId=hbcmvoudq1610959714073`
    )
   .end((err, res1) => {
    if (err) {
      // 如果访问失败或者出错，会这行这里
      console.error(`获取头条失败 - ${err}`)
      res.send({ code: 500, msg: '获取头条失败' })
    } else {
      // const $ = cheerio.load(res1.text)
      // const content = $('#carousel-one .carousel-inner .item.active .fp-one-cita a').text()
      // const url = $('#carousel-one .carousel-inner .item.active .fp-one-cita a').attr('href')
      // const title = $('.fp-one-articulo .corriente .one-articulo-titulo a').text().replace(/\s+/g, '')
      // const titleUrl = $('.fp-one-articulo .corriente .one-articulo-titulo a').attr('href')
      res.send({ code: 200, data: JSON.parse(res1.text), msg: '获取头条成功' })
    }
  })
})

/**
 * @api {get} /other/movie 豆瓣热门电影
 * @apiName 豆瓣热门电影
 * @apiGroup other
 * @apiDescription 豆瓣热门电影
 * 
 * @apiParam {Number} pageNo    页数（默认：1）
 * @apiParam {Number} pageSize  每页条数（默认：10）
 */
router.get('/movie', function (req, res, next) {
  const pageNo = req.query.pageNo || 1
  const pageSize = req.query.pageSize || 10
  superagent
    .get(`https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&page_limit=${pageSize}&page_start=${(pageNo-1) * pageSize}`)
    .end((err, res1) => {
      if (err) {
        // 如果访问失败或者出错，会这行这里
        console.error(`获取豆瓣热门电影失败 - ${err}`)
        res.send({ code: 500, msg: '获取豆瓣热门电影失败' })
      } else {
        res.send({ code: 200, data: JSON.parse(res1.text), msg: '获取豆瓣热门电影成功' })
      }
    })
})

module.exports = router
