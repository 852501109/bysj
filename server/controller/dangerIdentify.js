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

  let sql = `select * from dangerIdentifylist ${where} LIMIT ?, ?`
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
  let sql = `SELECT COUNT(*) AS total_count FROM dangerIdentifylist ${where}`

  return await exec(sql, params)
}

const repeatName = async (dangerIdentifyManage = {}) => {
  const sql = `select * from dangerIdentifylist where name=?`
  return await exec(sql, [dangerIdentifyManage.name])
}

const newDangerIdentify = async (dangerIdentifyManage = {}) => {
  const name = xss(dangerIdentifyManage.name)
  const detail = xss(dangerIdentifyManage.detail)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")

  const sql = `insert into dangerIdentifylist (name, detail, createTime) values (?, ?, ?)`
  const insertData = await exec(sql, [name, detail, createTime])
  return { id: insertData.insertId }
}

const updateDangerIdentify = async (dangerIdentifyManage) => {
  const name = xss(dangerIdentifyManage.name)
  const detail = xss(dangerIdentifyManage.detail)
  const id = dangerIdentifyManage.id

  const sql = `update dangerIdentifylist set name=?, detail=? where id=?`
  const updateData = await exec(sql, [name, detail, id])
  return updateData.affectedRows > 0
}

const delDangerIdentify = async (id) => {
  const sql = `delete from dangerIdentifylist where id=?`
  const delData = await exec(sql, [id])
  return delData.affectedRows > 0
}

module.exports = {
  getList,
  newDangerIdentify,
  updateDangerIdentify,
  delDangerIdentify,
  getTotal,
  repeatName
}
