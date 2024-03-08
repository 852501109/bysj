const router = require('koa-router')()
const { login, register, repeatName, getList, getTotal, updateUserList, getDBList } = require('../controller/user')
const jwt = require('jsonwebtoken')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getAccesstoken, getRefershtoken, secret } = require('../utils/token')
const sillyDateTime = require("silly-datetime");
router.prefix('/api/user')

router.get('/userList', async function (ctx, next) {
  const listData = await getList()
  const total = await getTotal(ctx.query)
  const data = {
    total: total[0].total_count,
    data: listData
  }
  ctx.body = new SuccessModel(data)
})
router.get('/DBList', async function (ctx, next) {
  const listData = await getDBList(ctx.query)
  const data = {
    data: listData
  }
  ctx.body = new SuccessModel(data)
})

router.post('/update', async function (ctx, next) {
  const val = await updateUserList(ctx.request.body)
  if (val) {
    ctx.body = new SuccessModel(val, '编辑成功')
  } else {
    ctx.body = new ErrorModel('编辑公告失败')
  }
})
router.post('/login', async function (ctx, next) {
  const { username, password, type } = ctx.request.body
  const data = await login(username, password, type)
  if (data.username) {
    const user = data

    user.accessToken = getAccesstoken()
    user.refreshToken = getRefershtoken()
    // user.accessToken = 'eyJhbGciOiJIUzUxMiJ9.admin'
    // user.refreshToken = 'eyJhbGciOiJIUzUxMiJ9.adminRefresh'
    user.expires = "2030/10/30 00:00:00"
    ctx.body = new SuccessModel(user, '登录成功')

    return
  }
  ctx.body = new ErrorModel('登录失败')
})

router.post('/register', async function (ctx, next) {
  const { username, password, roles } = ctx.request.body
  const repeat = await repeatName(username)
  if (repeat.length > 0) {
    ctx.body = new ErrorModel('账号名已存在，请重新注册')
    return
  }
  const id = await register(username, password, roles)
  if (id) {
    ctx.body = new SuccessModel('注册成功')
    return
  }
  ctx.body = new ErrorModel('注册失败')
})
router.post('/refresh', async (ctx) => {
  let data = null
  //获取请求头中携带的长token
  console.log('ctx.request.body.refreshToken', ctx.request.body)
  let r_tk = ctx.request.body.refreshToken
  //解析token 参数 token 密钥 回调函数返回信息
  const loginTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")
  await jwt.verify(r_tk, secret, (error) => {
    if (error) {
      data = {
        code: 4006,
        msg: '登录时效过期，请重新登录'
      }
      ctx.body = new ErrorModel(data)
    } else {
      data = {
        accessToken: getAccesstoken(),
        refreshToken: getRefershtoken(),
        loginTime: loginTime
      }
      ctx.body = new SuccessModel(data)
    }
  })
})

module.exports = router