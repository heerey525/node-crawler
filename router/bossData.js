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
 * @api {post} /bossData boss直聘
 * @apiName boss直聘
 * @apiGroup bossData
 * @apiDescription boss直聘会读取cookie，没有cookie或者cookie失效则返回空，如希望能正常爬取，则需替换最新的cookie信息
 */
router.get('/', function (req, res, next) {
  superagent
  .get(`https://www.zhipin.com/job_detail/?city=100010000&source=10&query=%E5%89%8D%E7%AB%AF`)
  .set('Cookie', 'lastCity=101210100; __zp_seo_uuid__=dd00feda-8c6f-461b-88d4-42197394b21a; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1607836826,1609117593; __g=-; __l=r=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DJU8cMvyTUd2t8GKLv6CbMdYGO3ge9M_sy0LvPrvskL-LfLPABA4zr0y0szy71V2W%26ck%3D4154.1.57.210.188.210.188.32%26shh%3Dwww.baidu.com%26wd%3D%26eqid%3D944313c700017e26000000045fe92faa&l=%2Fwww.zhipin.com%2Fjob_detail%2F%3Fcity%3D100010000%26source%3D10%26query%3D%25E5%2589%258D%25E7%25AB%25AF&s=3&g=&friend_source=0&s=3&friend_source=0; ___gtid=1069318173; __fid=c84e2cb99ce69979542f551e9c30aed9; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1609136926; __c=1607836826; __a=75525697.1607836826..1607836826.32.1.32.32; __zp_stoken__=18aebAGsiLEpifxpXej1gUxNAN2VTRVcNa24VDyNOUl4IVTlVYkxHR3IsXQBTICxhPEcPbTx7FzU8NxwuKEs8EzREZUgpRGEPMEQnMGAvCzcffX0gDh1ZUV0TeygDJzwXOhYFfnhbRDxIQEtNLA%3D%3D')
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
