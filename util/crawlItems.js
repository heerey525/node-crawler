const cheerio = require('cheerio')
const superagent = require('superagent')
const weiboURL = 'https://s.weibo.com'
const hotSearchURL = 'https://s.weibo.com/top/summary?cate=realtimehot'
const pneumoniaURL = 'https://ncov.dxy.cn/ncovh5/view/pneumonia'

let crawlItems = {
  getHotSearchList,
  getPneumoniaData,
}
// 微博热搜
function getHotSearchList() {
  return new Promise((resolve, reject) => {
    superagent.get(hotSearchURL, (err, res) => {
      if (err) reject('request error')
      const $ = cheerio.load(res.text)
      let hotList = []
      $('#pl_top_realtimehot table tbody tr').each(function (index) {
        if (index !== 0) {
          const $td = $(this).children().eq(1)
          const link = weiboURL + $td.find('a').attr('href')
          const text = $td.find('a').text()
          const hotValue = $td.find('span').text()
          const icon = $td.find('img').attr('src')
            ? 'https:' + $td.find('img').attr('src')
            : ''
          hotList.push({
            index,
            link,
            text,
            hotValue,
            icon,
          })
        }
      })
      hotList.length ? resolve(hotList) : reject('errer')
    })
  })
}
// 丁香园疫情数据
function getPneumoniaData() {
  return new Promise((resolve, reject) => {
    superagent.get(pneumoniaURL, (err, res) => {
      if (err) reject('request error')
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
      const $getListByCountryTypeService2true = $(
        '#getListByCountryTypeService2true'
      ).html()
      //  昨日国内疫情
      const $fetchRecentStat = $('#fetchRecentStat').html()
      //  获取国内疫情
      const $getAreaStat = $('#getAreaStat').html()
      //  疫情热点
      const $getTimelineService1 = $('#getTimelineService1').html()
      //  国内&全球统计数据
      const $getStatisticsService = $('#getStatisticsService').html()
      //  执行函数获取数据
      evalJsStr(
        $getListByCountryTypeService2true,
        $fetchRecentStat,
        $getAreaStat,
        $getTimelineService1,
        $getStatisticsService
      )
      JSON.stringify(originDataObj) === '{}' ? reject('errer') : resolve(originDataObj)
    })
  })
}

module.exports = crawlItems
