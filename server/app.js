const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
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
const role = require('./routes/role')
const system = require('./routes/system')

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
  app.use(morgan('dev'))
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, { flags: 'a' })
  app.use(morgan('combined', { stream: writeStream }))
}

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
app.use(role.routes(), role.allowedMethods())
app.use(system.routes(), system.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
