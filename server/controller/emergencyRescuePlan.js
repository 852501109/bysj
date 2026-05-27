const xss = require('xss')
const { exec } = require('../db/mysql')
const sillyDateTime = require("silly-datetime")

const getList = async (param) => {
  let conditions = []
  let params = []

  if (param.type) {
    conditions.push('type = ?')
    params.push(param.type)
  }

  let where = conditions.length ? `where ${conditions.join(' AND ')}` : ''
  let pageSize = Number(param.pageSize) || 10
  let currentPage = Number(param.currentPage) || 1
  let offset = (currentPage - 1) * pageSize

  let sql = `select * from emergencyRescuePlanlist ${where} LIMIT ?, ?`
  params.push(offset, pageSize)

  return await exec(sql, params)
}

const getTotal = async (param) => {
  let conditions = []
  let params = []

  if (param.type) {
    conditions.push('type = ?')
    params.push(param.type)
  }

  let where = conditions.length ? `where ${conditions.join(' AND ')}` : ''
  let sql = `SELECT COUNT(*) AS total_count FROM emergencyRescuePlanlist ${where}`

  return await exec(sql, params)
}

const repeatName = async (emergencyRescuePlanManage = {}) => {
  const sql = `select * from emergencyRescuePlanlist where type=?`
  return await exec(sql, [emergencyRescuePlanManage.name || emergencyRescuePlanManage.type])
}

const newEmergencyRescuePlan = async (emergencyRescuePlanManage = {}) => {
  const type = xss(emergencyRescuePlanManage.type)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")

  const sql = `insert into emergencyRescuePlanlist (type, createTime) values (?, ?)`
  const insertData = await exec(sql, [type, createTime])
  return { id: insertData.insertId }
}

const updateEmergencyRescuePlan = async (emergencyRescuePlanManage) => {
  const type = xss(emergencyRescuePlanManage.type)
  const id = emergencyRescuePlanManage.id

  const sql = `update emergencyRescuePlanlist set type=? where id=?`
  const updateData = await exec(sql, [type, id])
  return updateData.affectedRows > 0
}

const getDetail = async (id) => {
  const sql = `select * from emergencyRescuePlanlist where id=?`
  const rows = await exec(sql, [id])
  return rows[0]
}

const delEmergencyRescuePlan = async (id) => {
  const sql = `delete from emergencyRescuePlanlist where id=?`
  const delData = await exec(sql, [id])
  return delData.affectedRows > 0
}

module.exports = {
  getList,
  newEmergencyRescuePlan,
  updateEmergencyRescuePlan,
  getDetail,
  delEmergencyRescuePlan,
  getTotal,
  repeatName
}
