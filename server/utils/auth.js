const path = require('path')
const { secret } = require('./token')
const jwt = require('jsonwebtoken')

// 白名单
const whiteList = ['/api/user/login', '/api/user/refresh', '/api/user/register']

// 函数中间件
const auth = async (ctx, next) => {
  let code, msg, data = null
  let url = ctx.path
  // 登录和验证长token 添加白名单】
  console.log('ctx.path', ctx.path)
  if (whiteList.includes(url)) {

    // 执行下一步
    return await next()

  } else {
    // 获取请求头上的token，判断是否过期
    let token = ctx.request.headers["authorization"]
    console.log('ctx.request.headers', ctx.request.headers)
    if (!token) {
      code = 4003
      msg = 'accessToken 是无效的'
      ctx.body = {
        code,
        msg,
        data
      }

    } else {
      // 验证token是否有效
      await jwt.verify(token, secret, async (error) => {
        // token无效
        if (error) {
          code = 4003
          msg = 'accessToken 是无效的'
          ctx.body = {
            code,
            msg,
            data
          }

        } else {
          // 有效 执行下一步
          return await next()
        }

      })

    }

  }

}

module.exports = auth