const fs = require('fs')
const path = require('path')
const nodeSchedule = require('node-schedule')
const crawlItems = require('./crawlItems')

// 每分钟的第30秒触发： '30 * * * * *'
// 每小时的1分30秒触发 ：'30 1 * * * *'
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
// 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'

// 每15分钟爬取一次
nodeSchedule.scheduleJob('* 15 * * * *', async function () {
  // 微博热搜
  try {
    const hotList = await crawlItems.getHotSearchList()
    await fs.writeFileSync(
      path.join(__dirname, '../static/hotSearch.json'),
      JSON.stringify(hotList),
      'utf-8'
    )
  } catch (error) {
    console.error(error)
  }
})
// 每15分钟爬取一次
nodeSchedule.scheduleJob('* 15 * * * *', async function () {
  // 丁香园疫情
  try {
    const originDataObj = await crawlItems.getPneumoniaData()
    await fs.writeFileSync(
      path.join(__dirname, '../static/pneumonia.json'),
      JSON.stringify(originDataObj),
      'utf-8'
    )
  } catch (error) {
    console.error(error)
  }
})
