// 系统管理适配层 — 将 RBAC 数据转为前端期望的 { success, data } 格式
const { exec } = require('../db/mysql')

// =================== 动态路由 ===================

const getAsyncRoutes = async (userId) => {
  const sql = `
    SELECT DISTINCT m.id, m.parent_id, m.name, m.path, m.icon, m.sort,
           m.type, m.visible, m.permission_code, m.component,
           m.redirect, m.keep_alive, m.hidden_tag, m.show_parent,
           m.frame_src, m.frame_loading
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

  const roleSql = `
    SELECT r.code FROM roles r
    INNER JOIN user_roles ur ON r.id = ur.role_id
    WHERE ur.user_id = ?
  `
  const userRoles = await exec(roleSql, [userId])
  const roleCodes = userRoles.map(r => r.code)

  // 构建路由树
  const menuMap = {}
  const roots = []

  for (const m of menus) {
    menuMap[m.id] = {
      path: m.path,
      name: m.name,
      component: m.component || undefined,
      redirect: m.redirect || undefined,
      meta: {
        title: m.name,
        icon: m.icon || '',
        rank: m.sort,
        showLink: m.visible === 1,
        roles: roleCodes,
        keepAlive: m.keep_alive === 1,
        hiddenTag: m.hidden_tag === 1,
        showParent: m.show_parent === 1,
        frameSrc: m.frame_src || undefined,
        frameLoading: m.frame_loading === 1
      },
      children: []
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

  function processTree(routes) {
    for (const r of routes) {
      if (r.children && r.children.length > 0) {
        r.redirect = r.children[0].path
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
      if (!r.component && r.children && r.children.length > 0) {
        delete r.component
      }
    }
  }
  processTree(roots)

  return { success: true, data: roots }
}

// =================== 用户管理 CRUD ===================

const getUserList = async (param) => {
  let conditions = ['1=1']
  let params = []

  if (param.username) {
    conditions.push('u.username LIKE ?')
    params.push(`%${param.username}%`)
  }
  if (param.phone) {
    conditions.push('u.phone LIKE ?')
    params.push(`%${param.phone}%`)
  }
  if (param.status !== '' && param.status !== undefined && param.status !== null) {
    conditions.push('u.status = ?')
    params.push(Number(param.status))
  }
  if (param.deptId) {
    conditions.push('u.dept_id = ?')
    params.push(Number(param.deptId))
  }

  let pageSize = Number(param.pageSize) || 10
  let currentPage = Number(param.currentPage) || 1
  let offset = (currentPage - 1) * pageSize

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

  const sql = `
    SELECT u.id, u.username, u.realname, u.nickname, u.phone, u.email,
           u.sex, u.dept_id, u.status, u.avatar, u.remark, u.created_at AS createTime,
           d.id AS dept_id_val, d.name AS dept_name
    FROM users u
    LEFT JOIN depts d ON u.dept_id = d.id
    ${where}
    ORDER BY u.id DESC
    LIMIT ?, ?
  `
  const countSql = `SELECT COUNT(*) AS total FROM users u ${where}`

  const list = await exec(sql, [...params, offset, pageSize])
  const total = await exec(countSql, params)

  // 批量查询角色（避免 N+1 并发查询）
  const userIds = list.map(u => u.id)
  let roleMap = {}
  if (userIds.length > 0) {
    const roleRows = await exec(
      `SELECT ur.user_id, r.code, r.name FROM roles r
       INNER JOIN user_roles ur ON r.id = ur.role_id
       WHERE ur.user_id IN (?)`, [userIds]
    )
    for (const row of roleRows) {
      if (!roleMap[row.user_id]) roleMap[row.user_id] = []
      roleMap[row.user_id].push({ code: row.code, name: row.name })
    }
  }

  const mapped = list.map(u => {
    const roles = roleMap[u.id] || []
    return {
      ...u,
      dept: u.dept_name ? { id: u.dept_id_val, name: u.dept_name } : null,
      roles: roles.map(r => r.code),
      roleNames: roles.map(r => r.name).join(',')
    }
  })

  return {
    success: true,
    data: { list: mapped, total: total[0].total, pageSize, currentPage }
  }
}

const createUser = async (body) => {
  const crypto = require('crypto')
  const pwd = crypto.createHash('md5').update(body.password || '123456').digest('hex')
  // 前端表单使用 parentId 作为部门ID
  const deptId = body.parentId || 0
  const sql = `
    INSERT INTO users (username, password, realname, nickname, phone, email, sex, dept_id, status, remark, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `
  const result = await exec(sql, [
    body.username, pwd, body.realname || '', body.nickname || '',
    body.phone || '', body.email || '', body.sex || 0,
    deptId, body.status ?? 1, body.remark || ''
  ])
  return { success: true, data: { id: result.insertId } }
}

const updateUser = async (body) => {
  const deptId = body.parentId || 0
  const sql = `
    UPDATE users SET username=?, realname=?, nickname=?, phone=?, email=?,
    sex=?, dept_id=?, status=?, remark=?
    WHERE id=?
  `
  await exec(sql, [
    body.username, body.realname || '', body.nickname || '',
    body.phone || '', body.email || '', body.sex || 0,
    deptId, body.status ?? 1, body.remark || '',
    body.id
  ])
  return { success: true }
}

const deleteUser = async (id) => {
  await exec(`DELETE FROM user_roles WHERE user_id = ?`, [id])
  await exec(`DELETE FROM users WHERE id = ?`, [id])
  return { success: true }
}

const updateUserStatus = async (id, status) => {
  await exec(`UPDATE users SET status = ? WHERE id = ?`, [status, id])
  return { success: true }
}

const resetUserPassword = async (id, password) => {
  const crypto = require('crypto')
  const pwd = crypto.createHash('md5').update(password || '123456').digest('hex')
  await exec(`UPDATE users SET password = ? WHERE id = ?`, [pwd, id])
  return { success: true }
}

// =================== 角色管理 CRUD ===================

const getRoleList = async (param) => {
  let conditions = []
  let params = []

  if (param.name) {
    conditions.push('name LIKE ?')
    params.push(`%${param.name}%`)
  }
  if (param.code) {
    conditions.push('code LIKE ?')
    params.push(`%${param.code}%`)
  }
  if (param.status !== '' && param.status !== undefined && param.status !== null) {
    conditions.push('status = ?')
    params.push(Number(param.status))
  }

  let where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  let pageSize = Number(param.pageSize) || 10
  let currentPage = Number(param.currentPage) || 1
  let offset = (currentPage - 1) * pageSize

  const sql = `SELECT * FROM roles ${where} ORDER BY id LIMIT ?, ?`
  const countSql = `SELECT COUNT(*) AS total FROM roles ${where}`

  const list = await exec(sql, [...params, offset, pageSize])
  const total = await exec(countSql, params)

  // 转换为前端期望的 createTime 字段名
  const mapped = list.map(r => ({
    ...r,
    createTime: r.created_at,
    remark: r.description
  }))

  return {
    success: true,
    data: { list: mapped, total: total[0].total, pageSize, currentPage }
  }
}

const createRole = async (body) => {
  const sql = `INSERT INTO roles (name, code, description) VALUES (?, ?, ?)`
  const result = await exec(sql, [body.name, body.code, body.remark || ''])
  return { success: true, data: { id: result.insertId } }
}

const updateRole = async (body) => {
  const sql = `UPDATE roles SET name=?, code=?, description=? WHERE id=?`
  await exec(sql, [body.name, body.code, body.remark || '', body.id])
  return { success: true }
}

const deleteRole = async (id) => {
  const row = await exec(`SELECT code FROM roles WHERE id = ?`, [id])
  if (row[0] && row[0].code === 'superAdmin') {
    return { success: false, msg: '不能删除超级管理员角色' }
  }
  await exec(`DELETE FROM role_permissions WHERE role_id = ?`, [id])
  await exec(`DELETE FROM user_roles WHERE role_id = ?`, [id])
  await exec(`DELETE FROM roles WHERE id = ?`, [id])
  return { success: true }
}

const updateRoleStatus = async (id, status) => {
  await exec(`UPDATE roles SET status = ? WHERE id = ?`, [status, id])
  return { success: true }
}

// =================== 角色权限分配 ===================

const getRolePermissions = async (roleId) => {
  const sql = `
    SELECT p.id FROM permissions p
    INNER JOIN role_permissions rp ON p.id = rp.permission_id
    WHERE rp.role_id = ?
  `
  const rows = await exec(sql, [roleId])
  return { success: true, data: rows.map(r => r.id) }
}

const setRolePermissions = async (roleId, permissionIds) => {
  await exec(`DELETE FROM role_permissions WHERE role_id = ?`, [roleId])
  if (permissionIds && permissionIds.length > 0) {
    const values = permissionIds.map(id => `(${roleId}, ${id})`).join(',')
    await exec(`INSERT INTO role_permissions (role_id, permission_id) VALUES ${values}`)
  }
  return { success: true }
}

const getPermissionList = async () => {
  const rows = await exec(`SELECT * FROM permissions ORDER BY resource, action`)
  return { success: true, data: rows }
}

// =================== 用户角色分配 ===================

const getRoleIds = async (data) => {
  const rows = await exec(`SELECT role_id FROM user_roles WHERE user_id = ?`, [data.userId])
  return { success: true, data: rows.map(r => r.role_id) }
}

const setUserRoles = async (userId, roleIds) => {
  await exec(`DELETE FROM user_roles WHERE user_id = ?`, [userId])
  if (roleIds && roleIds.length > 0) {
    const values = roleIds.map(id => `(${userId}, ${id})`).join(',')
    await exec(`INSERT INTO user_roles (user_id, role_id) VALUES ${values}`)
  }
  return { success: true }
}

const getAllRoleList = async () => {
  const list = await exec(`SELECT id, name, code FROM roles WHERE status = 1`)
  return { success: true, data: list }
}

// =================== 部门管理 CRUD ===================

const getDeptList = async () => {
  const rows = await exec(`SELECT * FROM depts ORDER BY sort, id`)
  // 转为前端期望字段格式: parentId
  const list = rows.map(r => ({
    id: r.id,
    parentId: r.parent_id,
    name: r.name,
    principal: r.principal,
    phone: r.phone,
    email: r.email,
    sort: r.sort,
    status: r.status,
    remark: r.remark,
    createTime: r.created_at
  }))
  return { success: true, data: list }
}

const createDept = async (body) => {
  const sql = `
    INSERT INTO depts (parent_id, name, principal, phone, email, sort, status, remark, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `
  const result = await exec(sql, [
    body.parentId || 0, body.name, body.principal || '',
    body.phone || '', body.email || '', body.sort || 0,
    body.status ?? 1, body.remark || ''
  ])
  return { success: true, data: { id: result.insertId } }
}

const updateDept = async (body) => {
  const sql = `
    UPDATE depts SET parent_id=?, name=?, principal=?, phone=?, email=?,
    sort=?, status=?, remark=?
    WHERE id=?
  `
  await exec(sql, [
    body.parentId || 0, body.name, body.principal || '',
    body.phone || '', body.email || '', body.sort || 0,
    body.status ?? 1, body.remark || '', body.id
  ])
  return { success: true }
}

const deleteDept = async (id) => {
  // 检查是否有子部门
  const children = await exec(`SELECT COUNT(*) AS cnt FROM depts WHERE parent_id = ?`, [id])
  if (children[0].cnt > 0) {
    return { success: false, msg: '该部门下有子部门，请先删除子部门' }
  }
  await exec(`DELETE FROM depts WHERE id = ?`, [id])
  return { success: true }
}

// =================== 菜单管理 CRUD ===================

const getMenuList = async () => {
  const rows = await exec(`SELECT * FROM menus ORDER BY sort, id`)
  const list = rows.map(r => ({
    id: r.id,
    parentId: r.parent_id,
    title: r.name,
    name: r.name,
    path: r.path,
    component: r.component || '',
    icon: r.icon || '',
    redirect: r.redirect || '',
    rank: r.sort,
    menuType: r.type === 'menu' ? 0 : r.type === 'iframe' ? 1 : r.type === 'link' ? 2 : 3,
    auths: r.permission_code || '',
    showLink: r.visible === 1,
    keepAlive: r.keep_alive === 1,
    hiddenTag: r.hidden_tag === 1,
    showParent: r.show_parent === 1,
    frameSrc: r.frame_src || '',
    frameLoading: r.frame_loading === 1,
    createTime: r.created_at
  }))
  return { success: true, data: list }
}

const createMenu = async (body) => {
  const menuTypeMap = { 0: 'menu', 1: 'iframe', 2: 'link', 3: 'button' }
  const sql = `
    INSERT INTO menus (parent_id, name, path, component, icon, permission_code, sort,
      type, visible, redirect, keep_alive, hidden_tag, show_parent, frame_src, frame_loading, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `
  const result = await exec(sql, [
    body.parentId || 0,
    body.title || body.name,
    body.path || '',
    body.component || '',
    body.icon || '',
    body.auths || '',
    body.rank || 99,
    menuTypeMap[body.menuType] || 'menu',
    body.showLink !== false ? 1 : 0,
    body.redirect || null,
    body.keepAlive ? 1 : 0,
    body.hiddenTag ? 1 : 0,
    body.showParent ? 1 : 0,
    body.frameSrc || null,
    body.frameLoading !== false ? 1 : 0
  ])
  return { success: true, data: { id: result.insertId } }
}

const updateMenu = async (body) => {
  const menuTypeMap = { 0: 'menu', 1: 'iframe', 2: 'link', 3: 'button' }
  const sql = `
    UPDATE menus SET parent_id=?, name=?, path=?, component=?, icon=?,
    permission_code=?, sort=?, type=?, visible=?, redirect=?,
    keep_alive=?, hidden_tag=?, show_parent=?, frame_src=?, frame_loading=?
    WHERE id=?
  `
  await exec(sql, [
    body.parentId || 0,
    body.title || body.name,
    body.path || '',
    body.component || '',
    body.icon || '',
    body.auths || '',
    body.rank || 99,
    menuTypeMap[body.menuType] || 'menu',
    body.showLink !== false ? 1 : 0,
    body.redirect || null,
    body.keepAlive ? 1 : 0,
    body.hiddenTag ? 1 : 0,
    body.showParent ? 1 : 0,
    body.frameSrc || null,
    body.frameLoading !== false ? 1 : 0,
    body.id
  ])
  return { success: true }
}

const deleteMenu = async (id) => {
  // 删除子菜单
  await exec(`DELETE FROM menus WHERE parent_id = ?`, [id])
  await exec(`DELETE FROM menus WHERE id = ?`, [id])
  return { success: true }
}

module.exports = {
  getAsyncRoutes,
  // 用户
  getUserList, createUser, updateUser, deleteUser, updateUserStatus, resetUserPassword,
  // 角色
  getRoleList, createRole, updateRole, deleteRole, updateRoleStatus,
  // 角色权限
  getRolePermissions, setRolePermissions, getPermissionList,
  // 用户角色
  getRoleIds, setUserRoles, getAllRoleList,
  // 部门
  getDeptList, createDept, updateDept, deleteDept,
  // 菜单
  getMenuList, createMenu, updateMenu, deleteMenu,
}
