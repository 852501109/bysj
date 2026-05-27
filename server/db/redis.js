const { createClient } = require('redis')
const { REDIS_CONF } = require('../conf/db')

let client = null

function getClient() {
  if (!client) {
    client = createClient({
      socket: {
        host: REDIS_CONF.host || '127.0.0.1',
        port: REDIS_CONF.port || 6379,
      }
    })
    client.on('error', (err) => {
      console.error('Redis error:', err.message)
    })
    client.connect().catch(() => {
      client = null
    })
  }
  return client
}

// 缓存用户权限
async function cacheUserPermissions(userId, permissions) {
  const c = getClient()
  if (!c || !c.isOpen) return
  await c.setEx(`user:perm:${userId}`, 3600, JSON.stringify(permissions))
}

// 获取缓存的用户权限
async function getCachedPermissions(userId) {
  const c = getClient()
  if (!c || !c.isOpen) return null
  const data = await c.get(`user:perm:${userId}`)
  return data ? JSON.parse(data) : null
}

// 清除用户权限缓存
async function clearUserPermissionCache(userId) {
  const c = getClient()
  if (!c || !c.isOpen) return
  await c.del(`user:perm:${userId}`)
}

// token 黑名单
async function addTokenBlacklist(token, expiresIn) {
  const c = getClient()
  if (!c || !c.isOpen) return
  await c.setEx(`bl:token:${token}`, expiresIn, '1')
}

async function isTokenBlacklisted(token) {
  const c = getClient()
  if (!c || !c.isOpen) return false
  return !!(await c.exists(`bl:token:${token}`))
}

module.exports = {
  getClient,
  cacheUserPermissions,
  getCachedPermissions,
  clearUserPermissionCache,
  addTokenBlacklist,
  isTokenBlacklisted,
}
