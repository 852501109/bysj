const router = require('koa-router')()
const { login, register, repeatName, getList, getTotal, updateUserList, getDBList } = require('../controller/user')
const jwt = require('jsonwebtoken')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getAccesstoken, getRefershtoken, secret } = require('../utils/token')
const { validateId, validateRequired } = require('../utils/validate')
const sillyDateTime = require("silly-datetime")

router.prefix('/api/user')

router.get('/userList', async function (ctx, next) {
  const listData = await getList()
  const total = await getTotal()
  const data = {
    total: total[0].total_count,
    data: listData
  }
  ctx.body = new SuccessModel(data)
})

router.get('/DBList', async function (ctx, next) {
  const listData = await getDBList()
  const data = { data: listData }
  ctx.body = new SuccessModel(data)
})

router.post('/update', async function (ctx, next) {
  const err = validateId(ctx.request.body.id)
  if (err) { ctx.body = new ErrorModel(err); return }
  const val = await updateUserList(ctx.request.body)
  if (val) {
    ctx.body = new SuccessModel(val, '编辑成功')
  } else {
    ctx.body = new ErrorModel('编辑失败')
  }
})

router.post('/login', async function (ctx, next) {
  const { username, password, type } = ctx.request.body
  const err = validateRequired(ctx.request.body, ['username', 'password'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const user = await login(username, password, type)
  if (user.username) {
    user.accessToken = getAccesstoken(user)
    user.refreshToken = getRefershtoken(user)
    user.expires = '2030/10/30 00:00:00'
    ctx.body = new SuccessModel(user, '登录成功')
    return
  }
  ctx.body = new ErrorModel('登录失败')
})

router.post('/register', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const err = validateRequired(ctx.request.body, ['username', 'password'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const repeat = await repeatName(username)
  if (repeat.length > 0) {
    ctx.body = new ErrorModel('账号名已存在，请重新注册')
    return
  }
  const result = await register(username, password)
  if (result.id) {
    ctx.body = new SuccessModel('注册成功')
    return
  }
  ctx.body = new ErrorModel('注册失败')
})

router.post('/refresh', async (ctx) => {
  const err = validateRequired(ctx.request.body, ['refreshToken'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const r_tk = ctx.request.body.refreshToken
  const loginTime = sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss')

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(r_tk, secret, (error, decoded) => {
        if (error) return reject(error)
        resolve(decoded)
      })
    })
    const user = { id: decoded.userId, username: decoded.username }
    ctx.body = new SuccessModel({
      accessToken: getAccesstoken(user),
      refreshToken: getRefershtoken(user),
      loginTime
    })
  } catch (error) {
    ctx.body = new ErrorModel({ code: 4006, msg: '登录时效过期，请重新登录' })
  }
})

module.exports = router
