const xss = require('xss')
const { exec } = require('../db/mysql')
const sillyDateTime = require("silly-datetime")

const getList = async (param) => {
  let conditions = []
  let params = []

  if (param.trainingType) {
    conditions.push('trainingType = ?')
    params.push(decodeURI(param.trainingType))
  }

  let start = param.start ? sillyDateTime.format(new Date(param.start), "YYYY-MM-DD HH:mm:ss") : '1900-01-01'
  let end = param.end ? sillyDateTime.format(new Date(param.end), "YYYY-MM-DD HH:mm:ss") : '2900-01-01'
  conditions.push('trainingTime BETWEEN ? AND ?')
  params.push(start, end)

  let pageSize = Number(param.pageSize) || 10
  let currentPage = Number(param.currentPage) || 1
  let offset = (currentPage - 1) * pageSize

  let sql = `select * from safelist where ${conditions.join(' AND ')} LIMIT ?, ?`
  params.push(offset, pageSize)

  return await exec(sql, params)
}

const getTotal = async (param) => {
  let conditions = []
  let params = []

  if (param.trainingType) {
    conditions.push('trainingType = ?')
    params.push(decodeURI(param.trainingType))
  }

  let start = param.start ? sillyDateTime.format(new Date(param.start), "YYYY-MM-DD HH:mm:ss") : '1900-01-01'
  let end = param.end ? sillyDateTime.format(new Date(param.end), "YYYY-MM-DD HH:mm:ss") : '2900-01-01'
  conditions.push('trainingTime BETWEEN ? AND ?')
  params.push(start, end)

  let sql = `SELECT COUNT(*) AS total_count FROM safelist where ${conditions.join(' AND ')}`
  return await exec(sql, params)
}

const repeatName = async (safe = {}) => {
  const sql = `select * from safelist where trainingType=?`
  return await exec(sql, [safe.trainingType])
}

const newSafe = async (safe = {}) => {
  const person = xss(safe.person)
  const address = xss(safe.address)
  const trainingType = xss(safe.trainingType)
  const trainingTime = xss(safe.trainingTime)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")

  const sql = `insert into safelist (person, address, trainingType, trainingTime, createTime) values (?, ?, ?, ?, ?)`
  const insertData = await exec(sql, [person, address, trainingType, trainingTime, createTime])
  return { id: insertData.insertId }
}

const updateSafe = async (safe) => {
  const person = xss(safe.person)
  const address = xss(safe.address)
  const trainingType = xss(safe.trainingType)
  const trainingTime = sillyDateTime.format(new Date(safe.trainingTime), "YYYY-MM-DD HH:mm:ss")
  const id = safe.id

  const sql = `update safelist set person=?, trainingType=?, trainingTime=?, address=? where id=?`
  const updateData = await exec(sql, [person, trainingType, trainingTime, address, id])
  return updateData.affectedRows > 0
}

const delSafe = async (id) => {
  const sql = `delete from safelist where id=?`
  const delData = await exec(sql, [id])
  return delData.affectedRows > 0
}

module.exports = {
  getList,
  newSafe,
  updateSafe,
  delSafe,
  getTotal,
  repeatName
}
