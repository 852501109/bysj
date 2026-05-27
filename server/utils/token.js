const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || '2204A_lzr_/wp_2023'

// 生成短token（access token，含用户身份）
const getAccesstoken = (user) => {
  const payload = { userId: user.id, username: user.username }
  return jwt.sign(payload, secret, { expiresIn: '2h' })
}

// 生成长token（refresh token）
const getRefershtoken = (user) => {
  const payload = { userId: user.id, username: user.username }
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

module.exports = {
  getAccesstoken,
  getRefershtoken,
  secret
}
