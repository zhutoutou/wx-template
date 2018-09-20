const Koa = require('koa')
const app = new Koa()
const config = require('./config')
const debug = require('debug')('koa-wxapp-demo')
const { bodyParser } = require('./tools/wxUtils')
const { moment } = require('moment')

app.use(async (ctx, next) => {
    console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')}  method:${ctx.request.method}   url:${ctx.request.url}  remoteIP:${ctx.request.header['x-real-ip']}`)
    await next()
})

// 对Request的参数进行解析
app.use(bodyParser)

// 使用前端路由
const forwardRouter = require('./router/forward')
app.use(forwardRouter)

// 使用后端路由
const backRouter = require('./router/back')
app.use(backRouter)

// 建立监听
app.listen(config.port, () => debug(`listening on port ${config.port}`))
