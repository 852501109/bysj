const jwt = require('jsonwebtoken')
// 密钥
const secret = '2204A_lzr_/wp_2023'

/*
expiresIn：单位是已秒为单位
比如过期时间为5秒 expiresIn:5
也可以这样写: expiresIn:1d 过期时间1天 1h 就是1小时
*/

// 生成短token
const getAccesstoken = () => {
  return jwt.sign({ name: "Whilt" }, secret, { expiresIn: '5h' }) // 短token 过期时间
}
// 生成长token
const getRefershtoken = () => {
  return jwt.sign({ name: 'Whilt' }, secret, { expiresIn: '7d' })  // 长token 过期时间
}

module.exports = {
  getAccesstoken,
  getRefershtoken,
  secret
}