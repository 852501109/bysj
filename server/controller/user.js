const { exec } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')
const xss = require('xss')
const sillyDateTime = require('silly-datetime')

const getTotal = async () => {
  const sql = `SELECT COUNT(*) AS total_count FROM users u
    INNER JOIN user_roles ur ON u.id = ur.user_id
    INNER JOIN roles r ON ur.role_id = r.id
    WHERE r.code = 'admin' AND u.username != 'admin'`
  return await exec(sql)
}

const login = async (username, password, type) => {
  let rolesSql, rolesParams
  if (type === 'admin') {
    rolesSql = `r.code IN ('admin', 'superAdmin')`
  } else {
    rolesSql = `r.code = ?`
    rolesParams = [type]
  }

  password = genPassword(password)

  const sql = `
    SELECT u.id, u.username, u.realname, u.department, GROUP_CONCAT(r.code) AS role_codes
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    WHERE u.username = ? AND u.password = ? AND ${rolesSql}
    GROUP BY u.id
  `

  const params = [username, password]
  if (rolesParams) params.push(...rolesParams)

  const rows = await exec(sql, params)
  const loginTime = sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss')

  if (!rows[0]) return []
  const row = rows[0]
  return {
    id: row.id,
    username: row.username,
    realname: row.realname,
    roles: row.role_codes ? row.role_codes.split(',') : [],
    loginTime,
    department: row.department,
  }
}

const getList = async () => {
  const sql = `
    SELECT u.id, u.department, u.username, u.realname, GROUP_CONCAT(r.code) AS role_codes
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    WHERE u.username != 'admin'
    GROUP BY u.id
  `
  return await exec(sql)
}

const getDBList = async () => {
  const sql = `
    SELECT u.id, u.department, u.username, u.realname, GROUP_CONCAT(r.code) AS role_codes
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    WHERE u.username != 'admin' AND (u.department = '' OR u.department IS NULL)
    GROUP BY u.id
  `
  return await exec(sql)
}

const updateUserList = async (userManage) => {
  const department = xss(userManage.department)
  const id = userManage.id

  const sql = `UPDATE users SET department = ? WHERE id = ?`
  const updateData = await exec(sql, [department, id])
  return updateData.affectedRows > 0
}

const repeatName = async (username) => {
  const sql = `SELECT * FROM users WHERE username = ?`
  return await exec(sql, [username])
}

const register = async (username, password) => {
  password = genPassword(password)

  const sql = `INSERT INTO users (username, realname, password, department) VALUES (?, ?, ?, '')`
  const insertData = await exec(sql, [username, username, password])

  // 新用户默认分配 normal 角色
  const normalRole = await exec(`SELECT id FROM roles WHERE code = 'normal'`)
  if (normalRole.length > 0) {
    await exec(`INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)`, [insertData.insertId, normalRole[0].id])
  }

  return { id: insertData.insertId }
}

module.exports = {
  login,
  register,
  getTotal,
  getList,
  repeatName,
  updateUserList,
  getDBList,
}
