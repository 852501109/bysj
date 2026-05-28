const { createClient } = require('redis')
const { REDIS_CONF } = require('../conf/db')

let client = null
let connecting = false

async function getClient() {
  if (client && client.isOpen) return client
  if (connecting) return null

  try {
    connecting = true
    if (client) {
      try { await client.quit() } catch {}
      client = null
    }
    client = createClient({
      socket: {
        host: REDIS_CONF.host || '127.0.0.1',
        port: REDIS_CONF.port || 6379,
        connectTimeout: 3000,
        reconnectStrategy: false
      }
    })
    client.on('error', () => {})
    await client.connect()
    console.log('Redis 已连接')
    return client
  } catch {
    client = null
    return null
  } finally {
    connecting = false
  }
}

async function getCachedPermissions(userId) {
  try {
    const c = await getClient()
    if (!c || !c.isOpen) return null
    const data = await c.get(`user:perm:${userId}`)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

async function cacheUserPermissions(userId, permissions) {
  try {
    const c = await getClient()
    if (!c || !c.isOpen) return
    await c.setEx(`user:perm:${userId}`, 3600, JSON.stringify(permissions))
  } catch {}
}

async function clearUserPermissionCache(userId) {
  try {
    const c = await getClient()
    if (!c || !c.isOpen) return
    await c.del(`user:perm:${userId}`)
  } catch {}
}

async function addTokenBlacklist(token, expiresIn) {
  try {
    const c = await getClient()
    if (!c || !c.isOpen) return
    await c.setEx(`bl:token:${token}`, expiresIn, '1')
  } catch {}
}

async function isTokenBlacklisted(token) {
  try {
    const c = await getClient()
    if (!c || !c.isOpen) return false
    return !!(await c.exists(`bl:token:${token}`))
  } catch {
    return false
  }
}

module.exports = {
  getClient,
  cacheUserPermissions,
  getCachedPermissions,
  clearUserPermissionCache,
  addTokenBlacklist,
  isTokenBlacklisted,
}
