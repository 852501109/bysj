const xss = require('xss')
const { exec } = require('../db/mysql')
const sillyDateTime = require("silly-datetime");
const getList = async (param) => {

  let type = param.type ? `type='${param.type}'` : true
  let sql = `select * from emergencyRescuePlanlist where ${type} LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`
  return await exec(sql)
}
const getTotal = async (param) => {
  let type = param.type ? `type='${param.type}'` : true
  let sql = `SELECT COUNT(*) AS total_count FROM emergencyRescuePlanlist where ${type};`

  return await exec(sql)
}


const repeatName = async (emergencyRescuePlanManage = {}) => {
  const searchNameSql = `select * from emergencyRescuePlanlist where name='${emergencyRescuePlanManage.name}'`
  const list = await exec(searchNameSql)
  return list
}
const newEmergencyRescuePlan = async (emergencyRescuePlanManage = {}) => {
  const type = xss(emergencyRescuePlanManage.type)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")
  const sql = `insert into emergencyRescuePlanlist ( type, createTime) values ('${type}', '${createTime}');`
  console.log('sql', sql)
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateEmergencyRescuePlan = async (emergencyRescuePlanManage) => {
  const type = xss(emergencyRescuePlanManage.type)
  const id = emergencyRescuePlanManage.id
  const sql = `update emergencyRescuePlanlist set type='${type}' where id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delEmergencyRescuePlan = async (id) => {
  const sql = `delete from emergencyRescuePlanlist where id=${id};`
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  newEmergencyRescuePlan,
  updateEmergencyRescuePlan,
  delEmergencyRescuePlan,
  getTotal,
  repeatName
}