//1、 helper_tbsign 文件
var md5 = require('blueimp-md5')
// 淘宝网的App信息
var config = {
  AppKey: '自己的AppKey',
  AppSecret: '自己的AppSecret',
}

var tbSign = function (obj) {
  // 时间戳
  var time = new Date()
  var timestamp =
    time.getFullYear() +
    '-' +
    ('0' + (time.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + time.getDate()).slice(-2) +
    ' ' +
    ('0' + time.getHours()).slice(-2) +
    ':' +
    ('0' + time.getMinutes()).slice(-2) +
    ':' +
    ('0' + time.getSeconds()).slice(-2)
  obj.timestamp = timestamp //此处timestamp根据和java的 timestamp字段保持一致

  // 程序key
  obj.app_key = config.AppKey //此处app_key根据和java的 key字段保持一致

  // 参数数组
  var arr = []
  // 循环添加参数项
  for (var p in obj) {
    //此处可以判断字段和对象是否为空白 空 的字符串 和java保持一致
    arr.push(p + obj[p])
  }
  // 排序
  arr.sort()
  // 参数喘
  var msg = arr.join('')
//   console.log(msg)

  // Hmac 签名
  var sign = md5(msg, config.AppSecret)

  // 返回
  return {
    timestamp: timestamp,
    sign: sign.toUpperCase(),
  }
}
module.exports.tbSign = tbSign
