const { secret } = require('./token')
const jwt = require('jsonwebtoken')

// 公开接口，无需认证
const whiteList = ['/api/user/login', '/api/user/refresh', '/api/user/register']

const auth = async (ctx, next) => {
  const url = ctx.path

  if (whiteList.includes(url)) {
    return await next()
  }

  const token = ctx.request.headers["authorization"]
  if (!token) {
    ctx.body = { code: 4003, msg: 'accessToken 是无效的', data: null }
    return
  }

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return reject(err)
        resolve(decoded)
      })
    })
    ctx.state.user = { userId: decoded.userId, username: decoded.username }
    return await next()
  } catch (error) {
    ctx.body = { code: 4003, msg: 'accessToken 是无效的', data: null }
  }
}

module.exports = auth
