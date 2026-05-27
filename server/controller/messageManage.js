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

  let where
  if (param.department === 'admin') {
    where = conditions.length ? `where ${conditions.join(' AND ')}` : ''
  } else if (param.department) {
    conditions.push('department = ?')
    params.push(param.department)
    where = `where ${conditions.join(' AND ')}`
  } else {
    where = 'where false'
  }

  let pageSize = Number(param.pageSize) || 10
  let currentPage = Number(param.currentPage) || 1
  let offset = (currentPage - 1) * pageSize

  let sql = `select * from messagelist ${where} LIMIT ?, ?`
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

  let where
  if (param.department === 'admin') {
    where = conditions.length ? `where ${conditions.join(' AND ')}` : ''
  } else if (param.department) {
    conditions.push('department = ?')
    params.push(param.department)
    where = `where ${conditions.join(' AND ')}`
  } else {
    where = 'where false'
  }

  let sql = `SELECT COUNT(*) AS total_count FROM messagelist ${where}`
  return await exec(sql, params)
}

const repeatName = async (messageManage = {}) => {
  const sql = `select * from messagelist where name=?`
  return await exec(sql, [messageManage.name])
}

const newMessageManage = async (messageManage = {}) => {
  const name = xss(messageManage.name)
  const phone = xss(messageManage.phone)
  const position = xss(messageManage.position)
  const address = xss(messageManage.address)
  const sex = xss(messageManage.sex)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")

  const sql = `insert into messagelist (name, phone, position, address, sex, createTime) values (?, ?, ?, ?, ?, ?)`
  const insertData = await exec(sql, [name, phone, position, address, sex, createTime])
  return { id: insertData.insertId }
}

const updateMessageManage = async (messageManage) => {
  const name = xss(messageManage.name)
  const phone = xss(messageManage.phone)
  const position = xss(messageManage.position)
  const address = xss(messageManage.address)
  const sex = xss(messageManage.sex)
  const id = messageManage.id

  const sql = `update messagelist set name=?, position=?, phone=?, sex=?, address=? where id=?`
  const updateData = await exec(sql, [name, position, phone, sex, address, id])
  return updateData.affectedRows > 0
}

const getDetail = async (id) => {
  const sql = `select * from messagelist where id=?`
  const rows = await exec(sql, [id])
  return rows[0]
}

const delMessageManage = async (id) => {
  const sql = `delete from messagelist where id=?`
  const delData = await exec(sql, [id])
  return delData.affectedRows > 0
}

module.exports = {
  getList,
  newMessageManage,
  updateMessageManage,
  getDetail,
  delMessageManage,
  getTotal,
  repeatName
}
