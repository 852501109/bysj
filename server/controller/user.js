const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')
const xss = require('xss')
const sillyDateTime = require("silly-datetime");
const getTotal = async () => {
  let sql = `SELECT COUNT(*) AS total_count FROM users where roles='admin' AND username!='admin';`
  return await exec(sql)
}
const login = async (username, password, type) => {
  const rolesSql = type === 'admin' ? `(roles='admin' or roles='admin,superAdmin' or roles='superAdmin,admin')` : `roles='${type}'`
  console.log('rolesSql', rolesSql)
  username = escape(username)
  // 生成加密密码
  type = escape(type)
  password = genPassword(password)
  password = escape(password)
  const sql = `
        select username, realname, roles, department from users where username=${username} and password=${password} and ${rolesSql}
    `
  console.log('sql', sql)
  const rows = await exec(sql)
  console.log('rows[0]', rows[0])
  const loginTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")
  return rows[0] ? { username: rows[0].username, realname: rows[0].realname, roles: rows[0].roles.split(','), loginTime: loginTime, department: rows[0].department } : []
}
const getList = async () => {
  const sql = `
        select id, department, username, realname, roles from users where roles='admin' AND username!='admin'
    `
  const rows = await exec(sql)
  return rows
}
const getDBList = async (params) => {
  const sql = `
        select id, department, username, realname, roles from users where roles='admin' AND username!='admin' AND department != ''
    `
  const rows = await exec(sql)
  return rows
}
const updateUserList = async (userManage) => {
  const department = xss(userManage.department)
  const id = userManage.id
  const sql = `update users set department='${department}' where id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}
const repeatName = async (username) => {
  const searchNameSql = `select * from users where username='${username}'`
  const list = await exec(searchNameSql)
  return list
}
const register = async (username, password, roles) => {
  username = escape(username)
  // 生成加密密码
  password = genPassword(password)
  password = escape(password)
  roles = escape(roles)
  const sql = `insert into users (username, realname, password, roles, department) values (${username}, ${username}, ${password}, ${roles}, '');`
  const insertData = await exec(sql)
  return {
    id: insertData
  }
}

module.exports = {
  login,
  register,
  getTotal,
  getList,
  repeatName,
  updateUserList,
  getDBList
}