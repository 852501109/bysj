const xss = require('xss')
const { exec } = require('../db/mysql')
const sillyDateTime = require("silly-datetime");
const getList = async (param) => {

  let name = param.name ? `name='${decodeURI(param.name)}'` : true
  let status = param.status ? `status=${param.status}` : true
  let sql = `select * from notificationList where ${name} AND ${status} LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`

  return await exec(sql)
}
const getTotal = async (param) => {
  let name = param.name ? `name='${decodeURI(param.name)}'` : true
  let status = param.status ? `status=${param.status}` : true
  let sql = `SELECT COUNT(*) AS total_count FROM notificationlist where ${name} AND ${status};`

  return await exec(sql)
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return rows[0]
}
const repeatName = async (notifiData = {}) => {
  const searchNameSql = `select * from notificationlist where name='${notifiData.name}'`
  const list = await exec(searchNameSql)
  return list
}
const newNotifiData = async (notifiData = {}) => {

  const name = xss(notifiData.name)
  const content = xss(notifiData.content)
  const institution = xss(notifiData.institution)
  const status = xss(notifiData.status)
  const remark = xss(notifiData.remark)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")
  const sql = `insert into notificationlist (name, content, institution, status, remark, createTime)
        values ('${name}', '${content}', '${institution}', ${status}, '${remark || ''}', '${createTime}');
    `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateNotifiData = async (notifiData) => {
  const name = xss(notifiData.name)
  const content = xss(notifiData.content)
  const institution = xss(notifiData.institution)
  const status = xss(notifiData.status)
  const remark = xss(notifiData.remark)
  const id = notifiData.id
  const sql = `update notificationlist set name='${name}', content='${content}', institution='${institution}', status=${status}, remark='${remark}' where id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}
const updateNotifistatus = async (notifiData) => {
  const status = xss(notifiData.status)
  const id = notifiData.id
  const sql = `update notificationlist set status=${status} where id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}
const delNotifiData = async (id) => {
  // id 就是要删除的 id
  const sql = `delete from notificationlist where id=${id};`
  console.log('执行sql', sql)
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
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