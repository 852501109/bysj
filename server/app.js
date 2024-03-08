const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')
const auth = require('./utils/auth')
const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')
const notification = require('./routes/notification')
const userManage = require('./routes/userManage')
const messageManage = require('./routes/messageManage')
const dangerIdentify = require('./routes/dangerIdentify')
const accessManagement = require('./routes/accessManagement')
const safe = require('./routes/safe')
const emergencyRescuePlan = require('./routes/emergencyRescuePlan')
const problemReportingAndProgressReview = require('./routes/problemReportingAndProgressReview')
const { REDIS_CONF } = require('./conf/db')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(auth)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(morgan('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(morgan('combined', {
    stream: writeStream
  }));
}

// session 配置
app.keys = ['WJiol#23123_']
app.use(session({
  // 配置 cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  // 配置 redis
  store: redisStore({
    // all: '127.0.0.1:6379'   // 写死本地的 redis
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(notification.routes(), notification.allowedMethods())
app.use(userManage.routes(), userManage.allowedMethods())
app.use(messageManage.routes(), messageManage.allowedMethods())
app.use(dangerIdentify.routes(), dangerIdentify.allowedMethods())
app.use(safe.routes(), safe.allowedMethods())
app.use(emergencyRescuePlan.routes(), emergencyRescuePlan.allowedMethods())
app.use(problemReportingAndProgressReview.routes(), problemReportingAndProgressReview.allowedMethods())
app.use(accessManagement.routes(), accessManagement.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
