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

  let sql = `select * from notificationlist ${where} LIMIT ?, ?`
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
  let sql = `SELECT COUNT(*) AS total_count FROM notificationlist ${where}`

  return await exec(sql, params)
}

const getDetail = async (id) => {
  const sql = `select * from notificationlist where id=?`
  const rows = await exec(sql, [id])
  return rows[0]
}

const repeatName = async (notifiData = {}) => {
  const sql = `select * from notificationlist where name=?`
  return await exec(sql, [notifiData.name])
}

const newNotifiData = async (notifiData = {}) => {
  const name = xss(notifiData.name)
  const content = xss(notifiData.content)
  const institution = xss(notifiData.institution)
  const status = xss(notifiData.status)
  const remark = xss(notifiData.remark)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")

  const sql = `insert into notificationlist (name, content, institution, status, remark, createTime) values (?, ?, ?, ?, ?, ?)`
  const insertData = await exec(sql, [name, content, institution, status, remark || '', createTime])
  return { id: insertData.insertId }
}

const updateNotifiData = async (notifiData) => {
  const name = xss(notifiData.name)
  const content = xss(notifiData.content)
  const institution = xss(notifiData.institution)
  const status = xss(notifiData.status)
  const remark = xss(notifiData.remark)
  const id = notifiData.id

  const sql = `update notificationlist set name=?, content=?, institution=?, status=?, remark=? where id=?`
  const updateData = await exec(sql, [name, content, institution, status, remark, id])
  return updateData.affectedRows > 0
}

const updateNotifistatus = async (notifiData) => {
  const status = xss(notifiData.status)
  const id = notifiData.id

  const sql = `update notificationlist set status=? where id=?`
  const updateData = await exec(sql, [status, id])
  return updateData.affectedRows > 0
}

const delNotifiData = async (id) => {
  const sql = `delete from notificationlist where id=?`
  const delData = await exec(sql, [id])
  return delData.affectedRows > 0
}

module.exports = {
  getList,
  getDetail,
  newNotifiData,
  updateNotifiData,
  delNotifiData,
  getTotal,
  updateNotifistatus,
  repeatName
}
