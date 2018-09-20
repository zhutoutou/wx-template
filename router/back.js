/**
 * ajax 服务路由集合
 */
const mapDir = require('../tools/mapDir')

const router = require('koa-router')({
    prefix: '/api'
})

const controllers = require(mapDir('../controllers'))

// 从 sdk 中取出中间件
const { order: { notifyorderMiddleware, unifiedorderMiddleware }, sign: { signMiddleware } } = require('../tools/wxUtils')

// GET 验证服务
// 微信验证
router.get('/', controllers.wx.get)
// 普通消息管理
router.post('/', controllers.wx.post)
// GET 公众号登陆请求
router.get('/login', controllers.login)
// GET 公众号授权
router.get('/oauth2', controllers.ouath2)
// GET 公众号SKD配置获取
router.get('/jssdk', controllers.jssdk)
// GET 统一下单接口
router.get('/unified', unifiedorderMiddleware, controllers.unified)
// GET 支付通知接口
router.post('/notify', notifyorderMiddleware, controllers.notify.post)
// GET 签名验证测试接口
router.get('/test', signMiddleware, controllers.test)

// POST 公众号支付通知小程序
router.post('/paymininotify', controllers.paymininotify)

// 获取小程序对应的openid
router.get('/miniopenid', controllers.miniopenid)

// 获取明星信息
router.get('/starlist', controllers.starlist)
// 获取明星信息
router.get('/findstar', controllers.findstar)

module.exports = router
