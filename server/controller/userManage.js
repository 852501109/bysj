const xss = require('xss')
const { exec } = require('../db/mysql')
const sillyDateTime = require("silly-datetime")

const getList = async (param) => {
  let conditions = []
  let params = []

  if (param.name) {
    conditions.push('name = ?')
    params.push(decodeURI(param.name))
  }
  if (param.status) {
    conditions.push('status = ?')
    params.push(param.status)
  }

  let where = conditions.length ? `where ${conditions.join(' AND ')}` : ''
  let pageSize = Number(param.pageSize) || 10
  let currentPage = Number(param.currentPage) || 1
  let offset = (currentPage - 1) * pageSize

  let sql = `select * from userlist ${where} LIMIT ?, ?`
  params.push(offset, pageSize)

  return await exec(sql, params)
}

const getTotal = async (param) => {
  let conditions = []
  let params = []

  if (param.name) {
    conditions.push('name = ?')
    params.push(decodeURI(param.name))
  }
  if (param.status) {
    conditions.push('status = ?')
    params.push(param.status)
  }

  let where = conditions.length ? `where ${conditions.join(' AND ')}` : ''
  let sql = `SELECT COUNT(*) AS total_count FROM userlist ${where}`

  return await exec(sql, params)
}

const repeatName = async (userManage = {}) => {
  const sql = `select * from userlist where name=?`
  return await exec(sql, [userManage.name])
}

const newUserManage = async (userManage = {}) => {
  const name = xss(userManage.name)
  const phone = xss(userManage.phone)
  const position = xss(userManage.position)
  const address = xss(userManage.address)
  const sex = xss(userManage.sex)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")

  const sql = `insert into userlist (name, phone, position, address, sex, createTime) values (?, ?, ?, ?, ?, ?)`
  const insertData = await exec(sql, [name, phone, position, address, sex, createTime])
  return { id: insertData.insertId }
}

const updateUserManage = async (userManage) => {
  const name = xss(userManage.name)
  const phone = xss(userManage.phone)
  const position = xss(userManage.position)
  const address = xss(userManage.address)
  const sex = xss(userManage.sex)
  const id = userManage.id

  const sql = `update userlist set name=?, position=?, phone=?, sex=?, address=? where id=?`
  const updateData = await exec(sql, [name, position, phone, sex, address, id])
  return updateData.affectedRows > 0
}

const getDetail = async (id) => {
  const sql = `select * from userlist where id=?`
  const rows = await exec(sql, [id])
  return rows[0]
}

const delUserManage = async (id) => {
  const sql = `delete from userlist where id=?`
  const delData = await exec(sql, [id])
  return delData.affectedRows > 0
}

module.exports = {
  getList,
  newUserManage,
  updateUserManage,
  getDetail,
  delUserManage,
  getTotal,
  repeatName
}
