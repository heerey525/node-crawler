const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const cheerio = require('cheerio')
// 2、 使用
var helperTb = require('../util/helper_tbsign')

/**
 * @api {get} /taobaoke 淘宝客-公用-淘宝客商品详情查询(简版)
 * @apiName 淘宝客-公用-淘宝客商品详情查询(简版)
 * @apiGroup 淘宝客
 * @apiDescription 淘宝客-公用-淘宝客商品详情查询(简版)
 *
 * @apiParam {Number|String} num_iids    商品id（例如 634021037690）
 */
router.get('/', function (req, res, next) {
  const num_iids = req.query.num_iids || ''
  if (!num_iids) return res.send({ code: 500, msg: '商品id为空' })
  const postData = {
    app_key: '自己的AppKey',
    format: 'json',
    method: 'taobao.tbk.item.info.get',
    sign_method: 'hmac',
    v: '2.0',
    num_iids: num_iids,
    platform: 1,
    // ip: ''
  }
  const sign = helperTb.tbSign(postData)
  const temp = { ...sign, ...postData }
  let url = 'http://gw.api.taobao.com/router/rest?'
  const data = Object.keys(temp).map(key => `${key}=${temp[key]}`).join('&')
  url += data
  superagent
    .get(url)
    .end((err, res1) => {
      if (err) {
        // 如果访问失败或者出错，会这行这里
        console.error(`淘宝客商品详情查询失败 - ${err}`)
        res.send({ code: 500, msg: '淘宝客商品详情查询失败' })
      } else {
        res.send({ code: 200, data: JSON.parse(res1.text), msg: '淘宝客商品详情查询成功' })
      }
    })
})

/**
 * @api {get} /taobaoke/ele 淘宝客-公用-饿了么推广
 * @apiName 淘宝客-公用-饿了么推广
 * @apiGroup 淘宝客
 * @apiDescription 淘宝客-公用-饿了么推广
 *
 */
router.get('/ele', function (req, res, next) {
  const postData = {
    app_key: '自己的AppKey',
    format: 'json',
    method: 'taobao.tbk.activity.info.get',
    sign_method: 'hmac',
    v: '2.0',
    adzone_id: '自己的adzone_id', // 推广位最后一位
    activity_material_id: '自己的activity_material_id'
    // ip: ''
  }
  const sign = helperTb.tbSign(postData)
  const temp = { ...sign, ...postData }
  let url = 'http://gw.api.taobao.com/router/rest?'
  const data = Object.keys(temp).map(key => `${key}=${temp[key]}`).join('&')
  url += data
  superagent
    .get(url)
    .end((err, res1) => {
      if (err) {
        // 如果访问失败或者出错，会这行这里
        console.error(`饿了么推广查询失败 - ${err}`)
        res.send({ code: 500, msg: '饿了么推广查询失败' })
      } else {
        res.send({ code: 200, data: JSON.parse(res1.text), msg: '饿了么推广查询成功' })
      }
    })
})

/**
 * @api {get} /taobaoke/coupon 淘宝客-公用-推广券查询(个人开发者没有该权限)
 * @apiName 淘宝客-公用-推广券查询(个人开发者没有该权限)
 * @apiGroup 淘宝客
 * @apiDescription 淘宝客-公用-推广券查询(个人开发者没有该权限)
 *
 */
router.get('/coupon', function (req, res, next) {
  const item_id = req.query.item_id || ''
  if (!item_id) return res.send({ code: 500, msg: '商品id为空' })
  const postData = {
    app_key: '自己的AppKey',
    format: 'json',
    method: 'taobao.tbk.coupon.convert',
    sign_method: 'hmac',
    v: '2.0',
    adzone_id: '自己的adzone_id',
    item_id: item_id
    // ip: ''
  }
  const sign = helperTb.tbSign(postData)
  const temp = { ...sign, ...postData }
  let url = 'http://gw.api.taobao.com/router/rest?'
  const data = Object.keys(temp).map(key => `${key}=${temp[key]}`).join('&')
  url += data
  superagent
    .get(url)
    .end((err, res1) => {
      if (err) {
        // 如果访问失败或者出错，会这行这里
        console.error(`饿了么推广查询失败 - ${err}`)
        res.send({ code: 500, msg: '饿了么推广查询失败' })
      } else {
        res.send({ code: 200, data: JSON.parse(res1.text), msg: '饿了么推广查询成功' })
      }
    })
})

module.exports = router
