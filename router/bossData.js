const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

let bossDatas = []
/**
 * index.js
 * [description] - 抓取boss直聘页面数据
 */
let getBossDatas = (res) => {
  /* 使用cheerio模块的cherrio.load()方法，将HTMLdocument作为参数传入函数
     以后就可以使用类似jQuery的$(selectior)的方式来获取页面元素
   */
  let $ = cheerio.load(res.text)

  // 找到目标数据所在的页面元素，获取数据
  $('div#main div.job-box div.job-list ul li div.job-primary').each(
    (idx, ele) => {
      const company = $(ele).find('.info-company .company-text .name').text()
      const job_title = $(ele)
        .find('.info-primary .primary-box .job-title .job-name')
        .text()
      const salary = $(ele).find('.info-primary .job-limit .red').text()

      const description = $(ele).find('.info-primary p').text()
      const area = $(ele)
        .find(
          '.info-primary .primary-box .job-title .job-area-wrapper .job-area'
        )
        .text()
      const href =
        'https://www.zhipin.com' +
        $(ele).find('.info-primary .primary-box').attr('href')
      const item = {
        company: company,
        job_title: job_title,
        salary: salary,
        description: description,
        area: area,
        href: href,
      }
      bossDatas.push(item)
    }
  )
  return bossDatas
}

/**
 * @api {get} /bossData boss直聘爬取
 * @apiName boss直聘爬取
 * @apiGroup bossData
 * @apiDescription boss直聘会读取cookie，没有cookie或者cookie失效则返回空，如希望能正常爬取，则需替换最新的cookie信息 （请求一次爬取一次）
 */
router.get('/', async function (req, res, next) {
  bossDatas = []
  try {
    //把await及获取它的值的操作放在try里
    // await apiGet(2)
    for(let page=1; page<5; page++){
      console.log('page', page)
      await apiGet(page)
    }
    await fs.writeFileSync(
      path.join(__dirname, '../static/bossData.json'),
      JSON.stringify(bossDatas),
      'utf-8',
      (err) => {
        if (err) {
          res.send('error')
        } else {
          res.send('ok')
        }
      }
    )
  } catch (error) {
    //失败的操作放在catch里
    res.send('err')
  }
})

/**
 * @api {get} /bossData/list boss直聘
 * @apiName boss直聘
 * @apiGroup bossData
 * @apiDescription boss直聘
 */
router.get('/list', function (req, res, next) {
  //  读取本地数据
  fs.readFile(path.join(__dirname, '../static/bossData.json'), 'utf-8', (err, data) => {
    if (err) {
      res.send({ code: 500, msg: '疫情数据获取失败'})
    } else {
      res.send({ code: 200, data: JSON.parse(data), msg: '疫情数据获取成功'})
    }
  })
})

// 爬取boss数据
function apiGet(page) {
  return new Promise((resolve, reject) => {
    superagent
      .get(
        `https://www.zhipin.com/c100010000/?query=%E5%89%8D%E7%AB%AF&page=${page}&ka=page-${page}`
      )
      .set(
        'Cookie',
        `lastCity=100010000; toUrl=https%3A%2F%2Fwww.zhipin.com%2F; __zp_seo_uuid__=e3e3ab8f-3909-4aea-93b7-8321004d37b5; __g=-; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1610000184,1610414313,1610949092,1610949687; __c=1610002050; __l=r=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DgDUmvkAKGS70FFC2_EJ-vp2cSKA2Oqo0yyK85Xaw7W0PU8NYicX6gbxtk5D9dOp8%26wd%3D%26eqid%3Dbab3600a000ad86c0000000460052476&l=%2Fwww.zhipin.com%2Fc100010000%2F%3Fquery%3D%25E5%2589%258D%25E7%25AB%25AF%26page%3D1%26ka%3Dpage-1&s=3&g=&friend_source=0&s=3&friend_source=0; __a=55105593.1610002050..1610002050.26.1.26.26; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=${((new Date()).getTime())/1000}; __zp_stoken__=ce26bZ1Idc0x5OihNfwhMen4OPT01bmpsZW1ncj51SD9OAT9ob1pYX1VSS0AfFXllHh8PIE4CJXFPSjcaY3QYBAQcR143Vngfbi4RAElpOFskSn9HCV1JGw07Ox8dHT8ZGE4FGX99IHdsQHV5YQ%3D%3D`
      )
      .end((err, res) => {
        if (err) {
          // 如果访问失败或者出错，会这行这里
          // console.log(`boss直聘数据抓取失败 - ${err}`)
          // res.send({ code: 500, msg: 'boss直聘数据抓取失败' })
          reject(err)
        } else {
          // 抓取boss直聘数据
          const bossDatas = getBossDatas(res)
          bossDatas.length ? resolve(bossDatas) : reject('err')
        }
      })
  })
}

module.exports = router
