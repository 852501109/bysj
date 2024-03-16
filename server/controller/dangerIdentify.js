const xss = require('xss')
const { exec } = require('../db/mysql')
const sillyDateTime = require("silly-datetime");
const getList = async (param) => {

  let name = param.name ? `name='${decodeURI(param.name)}'` : true
  let sql = `select * from dangerIdentifylist where ${name} LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`
  return await exec(sql)
}
const getTotal = async (param) => {
  let name = param.name ? `name='${decodeURI(param.name)}'` : true
  let sql = `SELECT COUNT(*) AS total_count FROM dangerIdentifylist where ${name};`

  return await exec(sql)
}


const repeatName = async (dangerIdentifyManage = {}) => {
  const searchNameSql = `select * from dangerIdentifylist where name='${dangerIdentifyManage.name}'`
  const list = await exec(searchNameSql)
  return list
}
const newDangerIdentify = async (dangerIdentifyManage = {}) => {

  const name = xss(dangerIdentifyManage.name)
  const detail = xss(dangerIdentifyManage.detail)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")
  const sql = `insert into dangerIdentifylist (name, detail,createTime) values ('${name}', '${detail}', '${createTime}');`
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateDangerIdentify = async (dangerIdentifyManage) => {
  const name = xss(dangerIdentifyManage.name)
  const detail = xss(dangerIdentifyManage.detail)
  const id = dangerIdentifyManage.id
  const sql = `update dangerIdentifylist set name='${name}', detail='${detail}' where id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delDangerIdentify = async (id) => {
  const sql = `delete from dangerIdentifylist where id=${id};`
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  newDangerIdentify,
  updateDangerIdentify,
  delDangerIdentify,
  getTotal,
  repeatName
}