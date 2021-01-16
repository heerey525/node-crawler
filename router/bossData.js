const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const cheerio = require('cheerio')

/**
 * index.js
 * [description] - 抓取boss直聘页面数据
 */
let getBossDatas = (res) => {
  let bossDatas = []
  /* 使用cheerio模块的cherrio.load()方法，将HTMLdocument作为参数传入函数
     以后就可以使用类似jQuery的$(selectior)的方式来获取页面元素
   */
  let $ = cheerio.load(res.text)

  // 找到目标数据所在的页面元素，获取数据
  $('div#main div.job-box div.job-list ul li div.job-primary').each((idx, ele) => {
    const company = $(ele)
      .find('.info-company .company-text .name')
      .text()
    const job_title = $(ele)
      .find('.info-primary .primary-box .job-title .job-name')
      .text()
    const salary = $(ele).find('.info-primary .job-limit .red').text()
    
    const description = $(ele).find('.info-primary p').text()
    const area = $(ele)
      .find('.info-primary .primary-box .job-title .job-area-wrapper .job-area')
      .text()
    const href = 'https://www.zhipin.com' + $(ele)
    .find('.info-primary .primary-box')
    .attr('href')
    const item = {
      company: company,
      job_title: job_title,
      salary: salary,
      description: description,
      area: area,
      href: href
    }
    bossDatas.push(item)
  })
  return bossDatas
}

/**
 * @api {get} /bossData boss直聘
 * @apiName boss直聘
 * @apiGroup bossData
 * @apiDescription boss直聘会读取cookie，没有cookie或者cookie失效则返回空，如希望能正常爬取，则需替换最新的cookie信息
 */
router.get('/', function (req, res, next) {
  superagent
  // .get(`https://www.zhipin.com/job_detail/?city=100010000&source=10&query=%E5%89%8D%E7%AB%AF`)
  .get(`https://www.zhipin.com/c100010000/?query=%E5%89%8D%E7%AB%AF&page=1&ka=page-1`)
  .set('Cookie', 'Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1607836826,1609117593,1609136980,1610000184; lastCity=100010000; __g=-; __zp_stoken__=7d39bC0BcM15VZwRVGQg8In9hE1N0XnFuPAMlelZXO2x5Mgt4Vkl7RH8YeX4HDwxxD2QSTG1VEWpOeQYCblpmW3c7UFUVezZQXwldH01gSRovPBQrZ3sCZAgPdw5hb39aCTUYdVxfYGxPBTZhHQ%3D%3D; toUrl=https%3A%2F%2Fwww.zhipin.com%2F; __c=1610002050; __a=55105593.1610002050..1610002050.3.1.3.3; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1610002782')
  .end((err, res1) => {
    if (err) {
      // 如果访问失败或者出错，会这行这里
      console.log(`boss直聘数据抓取失败 - ${err}`)
      res.send({ code: 500, msg: 'boss直聘数据抓取失败' })
    } else {
      // 抓取boss直聘数据
      const bossDatas = getBossDatas(res1)
      res.send({ code: 200, msg: 'boss直聘数据抓取成功', bossDatas: bossDatas })
    }
  })


  // return
  // var page = 1 //当前页数
  // var list = [] //保存记录
  // async.whilst(
  //   function () {
  //     return page < 2
  //   },
  //   function (callback) {
  //     requests(
  //       `https://www.zhipin.com/c101280100-p100901/?page=${page}&ka=page-next`
  //     )
  //       .on('data', function (chunk) {
  //         var $ = cheerio.load(chunk.toString())
  //         $('.job-primary').each(function () {
  //           var company = $(this)
  //             .find('.info-company .company-text .name')
  //             .text()
  //           var job_title = $(this)
  //             .find('.info-primary .name .job-title')
  //             .text()
  //           var salary = $(this).find('.info-primary .name .red').text()
  //           var description = $(this)
  //             .find('.info-company .company-text p')
  //             .text()
  //           var area = $(this).find('.info-primary p').text()
  //           var item = {
  //             company: company,
  //             job_title: job_title,
  //             salary: salary,
  //             description: description,
  //             area: area,
  //           }
  //           list.push(item)
  //         })
  //         page++
  //         callback()
  //       })
  //       .on('end', function (err) {
  //         if (err) {
  //           console.log(err)
  //         }
  //         if (page == 10) {
  //           res.render('index', {
  //             lists: list,
  //           })
  //         }
  //       })
  //   },
  //   function (err) {
  //     console.log(err)
  //   }
  // )
})

module.exports = router
