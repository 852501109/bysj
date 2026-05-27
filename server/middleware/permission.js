const { exec } = require('../db/mysql')
const { getCachedPermissions, cacheUserPermissions } = require('../db/redis')

// 查询用户的所有权限码
async function getUserPermissions(userId) {
  // 先查 Redis 缓存
  const cached = await getCachedPermissions(userId)
  if (cached) return cached

  // 查 DB
  const sql = `
    SELECT DISTINCT p.code
    FROM permissions p
    INNER JOIN role_permissions rp ON p.id = rp.permission_id
    INNER JOIN user_roles ur ON rp.role_id = ur.role_id
    WHERE ur.user_id = ?
  `
  const rows = await exec(sql, [userId])
  const permissions = rows.map(r => r.code)

  // 写入缓存
  await cacheUserPermissions(userId, permissions)
  return permissions
}

// 权限中间件工厂：传入一个或多个权限码
function permission(...requiredPermissions) {
  return async (ctx, next) => {
    const user = ctx.state.user
    if (!user) {
      ctx.body = { code: 4003, msg: '未登录', data: null }
      return
    }

    const permissions = await getUserPermissions(user.userId)

    // superAdmin 角色拥有所有权限
    if (permissions.includes('*:*')) {
      return await next()
    }

    // 检查是否拥有任一所需权限
    const hasPermission = requiredPermissions.some(code => permissions.includes(code))
    if (!hasPermission) {
      ctx.body = { code: 4001, msg: '权限不足', data: null }
      return
    }

    await next()
  }
}

module.exports = permission
