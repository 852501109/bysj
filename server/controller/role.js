const { exec } = require('../db/mysql')

// ====== 角色 CRUD ======

const getList = async (param) => {
  let conditions = []
  let params = []

  if (param.name) {
    conditions.push('name LIKE ?')
    params.push(`%${param.name}%`)
  }

  let where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  let pageSize = Number(param.pageSize) || 10
  let currentPage = Number(param.currentPage) || 1
  let offset = (currentPage - 1) * pageSize

  const sql = `SELECT * FROM roles ${where} LIMIT ?, ?`
  params.push(offset, pageSize)
  return await exec(sql, params)
}

const getTotal = async (param) => {
  let conditions = []
  let params = []

  if (param.name) {
    conditions.push('name LIKE ?')
    params.push(`%${param.name}%`)
  }

  let where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const sql = `SELECT COUNT(*) AS total_count FROM roles ${where}`
  return await exec(sql, params)
}

const getAll = async () => {
  return await exec(`SELECT id, name, code FROM roles WHERE status = 1 ORDER BY id`)
}

const repeatName = async (role) => {
  return await exec(`SELECT * FROM roles WHERE name = ? OR code = ?`, [role.name, role.code])
}

const createRole = async (role) => {
  const sql = `INSERT INTO roles (name, code, description) VALUES (?, ?, ?)`
  const result = await exec(sql, [role.name, role.code, role.description || ''])
  return { id: result.insertId }
}

const updateRole = async (role) => {
  const sql = `UPDATE roles SET name = ?, code = ?, description = ? WHERE id = ?`
  await exec(sql, [role.name, role.code, role.description || '', role.id])
  return true
}

const deleteRole = async (id) => {
  // 不允许删除 superAdmin
  const role = await exec(`SELECT code FROM roles WHERE id = ?`, [id])
  if (role[0] && role[0].code === 'superAdmin') {
    return { error: '不能删除超级管理员角色' }
  }
  await exec(`DELETE FROM roles WHERE id = ?`, [id])
  return true
}

// ====== 角色权限 ======

const getRolePermissions = async (roleId) => {
  const sql = `
    SELECT p.id, p.code, p.name, p.resource, p.action
    FROM permissions p
    INNER JOIN role_permissions rp ON p.id = rp.permission_id
    WHERE rp.role_id = ?
  `
  return await exec(sql, [roleId])
}

const setRolePermissions = async (roleId, permissionIds) => {
  // 删除旧权限
  await exec(`DELETE FROM role_permissions WHERE role_id = ?`, [roleId])
  // 插入新权限
  if (permissionIds && permissionIds.length > 0) {
    const values = permissionIds.map(id => `(${roleId}, ${id})`).join(',')
    await exec(`INSERT INTO role_permissions (role_id, permission_id) VALUES ${values}`)
  }
  return true
}

// ====== 权限列表 ======

const getPermissionList = async () => {
  return await exec(`SELECT * FROM permissions ORDER BY resource, action`)
}

// ====== 用户角色 ======

const getUserRoles = async (userId) => {
  const sql = `
    SELECT r.id, r.name, r.code
    FROM roles r
    INNER JOIN user_roles ur ON r.id = ur.role_id
    WHERE ur.user_id = ?
  `
  return await exec(sql, [userId])
}

const setUserRoles = async (userId, roleIds) => {
  await exec(`DELETE FROM user_roles WHERE user_id = ?`, [userId])
  if (roleIds && roleIds.length > 0) {
    const values = roleIds.map(id => `(${userId}, ${id})`).join(',')
    await exec(`INSERT INTO user_roles (user_id, role_id) VALUES ${values}`)
  }
  return true
}

// ====== 菜单 ======

const getUserMenus = async (userId) => {
  const sql = `
    SELECT DISTINCT m.id, m.parent_id, m.name, m.path, m.icon, m.sort, m.type, m.visible
    FROM menus m
    LEFT JOIN permissions p ON m.permission_code = p.code
    LEFT JOIN role_permissions rp ON p.id = rp.permission_id
    LEFT JOIN user_roles ur ON rp.role_id = ur.role_id
    WHERE ur.user_id = ? OR m.permission_code IS NULL
    ORDER BY m.sort, m.id
  `
  return await exec(sql, [userId])
}

module.exports = {
  getList,
  getTotal,
  getAll,
  repeatName,
  createRole,
  updateRole,
  deleteRole,
  getRolePermissions,
  setRolePermissions,
  getPermissionList,
  getUserRoles,
  setUserRoles,
  getUserMenus,
}
