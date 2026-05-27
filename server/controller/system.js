// 前端系统管理适配层 — 将 RBAC 数据转为前端期望的 { success, data } 格式
const { exec } = require('../db/mysql')

// 获取用户动态路由
const getAsyncRoutes = async (userId) => {
  const sql = `
    SELECT DISTINCT m.id, m.parent_id, m.name, m.path, m.icon, m.sort,
           m.type, m.visible, m.permission_code
    FROM menus m
    LEFT JOIN permissions p ON m.permission_code = p.code
    LEFT JOIN role_permissions rp ON p.id = rp.permission_id
    LEFT JOIN user_roles ur ON rp.role_id = ur.role_id
    WHERE ur.user_id = ? OR m.permission_code IS NULL
    ORDER BY m.sort, m.id
  `
  const menus = await exec(sql, [userId])

  if (menus.length === 0) {
    return { success: true, data: [] }
  }

  // 获取用户角色，用于路由权限过滤
  const roleSql = `
    SELECT r.code FROM roles r
    INNER JOIN user_roles ur ON r.id = ur.role_id
    WHERE ur.user_id = ?
  `
  const userRoles = await exec(roleSql, [userId])
  const roleCodes = userRoles.map(r => r.code)

  // 组件路径映射（对应 src/views/ 下的实际 .vue 文件）
  const componentMap = {
    '/dashboard': 'welcome/index',
    '/safe': 'safe/list/index',
    '/dangerIdentify': 'dangerIdentify/list/index',
    '/accessManagement': 'accessManagement/list/index',
    '/emergencyRescuePlan': 'emergencyRescuePlan/list/index',
    '/notification': 'notification/list/index',
    '/messageManage': 'messageManage/list/index',
    '/userManage': 'userManage/list/index',
    '/problemReporting': 'problemReportingAndProgressReview/list/index',
    '/system': 'system/index',
    '/system/role': 'system/role/index',
    '/system/menu': 'system/menu/index',
    '/system/user': 'system/user/index',
    '/system/dept': 'system/dept/index',
  }

  // 构建路由树
  const menuMap = {}
  const roots = []

  for (const m of menus) {
    menuMap[m.id] = {
      path: m.path,
      name: m.name,
      redirect: undefined,
      meta: {
        title: m.name,
        icon: m.icon || '',
        rank: m.sort,
        showLink: m.visible === 1,
        roles: roleCodes
      },
      children: []
    }
    // 只有叶子节点设置 component
    const comp = componentMap[m.path]
    if (comp) {
      menuMap[m.id].component = comp
    }
  }

  for (const m of menus) {
    const node = menuMap[m.id]
    if (m.parent_id === 0 || !menuMap[m.parent_id]) {
      roots.push(node)
    } else {
      menuMap[m.parent_id].children.push(node)
    }
  }

  // 清理：父节点设 redirect，删空 children
  function processTree(routes) {
    for (const r of routes) {
      if (r.children && r.children.length > 0) {
        r.redirect = r.children[0].path
        // 只有 role:* 权限的用户才能看到系统管理
        if (r.path === '/system') {
          r.meta.roles = ['superAdmin']
          for (const c of r.children) {
            c.meta.roles = ['superAdmin']
          }
        }
        processTree(r.children)
      } else {
        delete r.children
      }
      // 父节点无 component 时删除 component 字段，让前端用 redirect
      if (!r.component && r.children && r.children.length > 0) {
        delete r.component
      }
    }
  }
  processTree(roots)

  return { success: true, data: roots }
}

// 用户列表
const getUserList = async (param) => {
  let pageSize = Number(param.pageSize) || 10
  let currentPage = Number(param.currentPage) || 1
  let offset = (currentPage - 1) * pageSize

  const sql = `
    SELECT u.id, u.username, u.realname, u.department, u.status, u.created_at,
           GROUP_CONCAT(r.code) AS roles, GROUP_CONCAT(r.name) AS roleNames
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    GROUP BY u.id
    LIMIT ?, ?
  `
  const countSql = `SELECT COUNT(*) AS total FROM users`
  const list = await exec(sql, [offset, pageSize])
  const total = await exec(countSql)

  return {
    success: true,
    data: { list, total: total[0].total, pageSize, currentPage }
  }
}

// 角色列表
const getRoleList = async (param) => {
  let pageSize = Number(param.pageSize) || 10
  let currentPage = Number(param.currentPage) || 1
  let offset = (currentPage - 1) * pageSize

  const sql = `SELECT * FROM roles LIMIT ?, ?`
  const countSql = `SELECT COUNT(*) AS total FROM roles`
  const list = await exec(sql, [offset, pageSize])
  const total = await exec(countSql)

  return {
    success: true,
    data: { list, total: total[0].total, pageSize, currentPage }
  }
}

// 所有角色（下拉用）
const getAllRoleList = async () => {
  const list = await exec(`SELECT id, name, code FROM roles WHERE status = 1`)
  return { success: true, data: list }
}

// 用户角色 IDs
const getRoleIds = async (data) => {
  const rows = await exec(`SELECT role_id FROM user_roles WHERE user_id = ?`, [data.userId])
  return { success: true, data: rows.map(r => r.role_id) }
}

// 部门列表
const getDeptList = async () => {
  const rows = await exec(`SELECT DISTINCT department AS id, department AS name FROM users WHERE department != ''`)
  return { success: true, data: rows }
}

// 菜单列表
const getMenuList = async () => {
  const rows = await exec(`SELECT * FROM menus ORDER BY sort, id`)
  // 转型为前端期望字段: parentId, hidden → visible 取反
  const list = rows.map(r => ({
    ...r,
    parentId: r.parent_id,
    title: r.name,
    rank: r.sort,
    showLink: r.visible === 1,
    hidden: r.visible === 0
  }))
  return { success: true, data: list }
}

module.exports = {
  getAsyncRoutes,
  getUserList,
  getRoleList,
  getAllRoleList,
  getRoleIds,
  getDeptList,
  getMenuList,
}
