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

  let where = conditions.length ? `where ${conditions.join(' AND ')}` : ''
  let pageSize = Number(param.pageSize) || 10
  let currentPage = Number(param.currentPage) || 1
  let offset = (currentPage - 1) * pageSize

  let sql = `select * from accessManagementlist ${where} LIMIT ?, ?`
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

  let where = conditions.length ? `where ${conditions.join(' AND ')}` : ''
  let sql = `SELECT COUNT(*) AS total_count FROM accessManagementlist ${where}`

  return await exec(sql, params)
}

const repeatName = async (accessManagementManage = {}) => {
  const sql = `select * from accessManagementlist where name=?`
  return await exec(sql, [accessManagementManage.name])
}

const newAccessManagementManage = async (accessManagementManage = {}) => {
  const name = xss(accessManagementManage.name)
  const phone = xss(accessManagementManage.phone)
  const address = xss(accessManagementManage.address)
  const sex = xss(accessManagementManage.sex)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")

  const sql = `insert into accessManagementlist (name, phone, address, sex, createTime) values (?, ?, ?, ?, ?)`
  const insertData = await exec(sql, [name, phone, address, sex, createTime])
  return { id: insertData.insertId }
}

const updateAccessManagementManage = async (accessManagementManage) => {
  const name = xss(accessManagementManage.name)
  const phone = xss(accessManagementManage.phone)
  const address = xss(accessManagementManage.address)
  const sex = xss(accessManagementManage.sex)
  const id = accessManagementManage.id

  const sql = `update accessManagementlist set name=?, phone=?, sex=?, address=? where id=?`
  const updateData = await exec(sql, [name, phone, sex, address, id])
  return updateData.affectedRows > 0
}

const getDetail = async (id) => {
  const sql = `select * from accessManagementlist where id=?`
  const rows = await exec(sql, [id])
  return rows[0]
}

const delAccessManagementManage = async (id) => {
  const sql = `delete from accessManagementlist where id=?`
  const delData = await exec(sql, [id])
  return delData.affectedRows > 0
}

module.exports = {
  getList,
  newAccessManagementManage,
  updateAccessManagementManage,
  getDetail,
  delAccessManagementManage,
  getTotal,
  repeatName
}
