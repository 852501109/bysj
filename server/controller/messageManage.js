const xss = require('xss')
const { exec } = require('../db/mysql')
const sillyDateTime = require("silly-datetime");
const getList = async (param) => {

  let name = param.name ? `name='${decodeURI(param.name)}'` : true
  let sql
  if (param.department === 'admin') {
    sql = `select * from messagelist where ${name}  LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`
  } else if (param.department !== '' && !param.department !== 'admin') {
    sql = `select * from messagelist where ${name} AND department=${param.department} LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`
  } else {
    sql = `select * from messagelist  where false`
  }

  // if (keyword) {
  //   sql += `and title like '%${keyword}%' `
  // }
  // sql += `order by createtime desc;`

  return await exec(sql)
}
const getTotal = async (param) => {
  let name = param.name ? `name='${decodeURI(param.name)}'` : true
  let sql
  if (param.department === 'admin') {
    sql = `SELECT COUNT(*) AS total_count FROM messagelist where ${name}`
  } else if (param.department !== '' && !param.department !== 'admin') {
    sql = `SELECT COUNT(*) AS total_count FROM messagelist where ${name} AND department=${param.department}`
  } else {
    sql = `SELECT COUNT(*) AS total_count FROM messagelist  where false`
  }
  console.log('1111sql', sql)
  return await exec(sql)
}


const repeatName = async (messageManage = {}) => {
  const searchNameSql = `select * from messagelist where name='${messageManage.name}'`
  const list = await exec(searchNameSql)
  return list
}
const newMessageManage = async (messageManage = {}) => {

  const name = xss(messageManage.name)
  const phone = xss(messageManage.phone)
  const position = xss(messageManage.position)
  const address = xss(messageManage.address)
  const sex = xss(messageManage.sex)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")
  const sql = `insert into messagelist (name, phone, position, address, sex, createTime) values ('${name}', '${phone}', '${position}', ${address}, '${sex}', '${createTime}');`
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateMessageManage = async (messageManage) => {
  const name = xss(messageManage.name)
  const phone = xss(messageManage.phone)
  const position = xss(messageManage.position)
  const address = xss(messageManage.address)
  const sex = xss(messageManage.sex)
  const id = messageManage.id
  const sql = `update messagelist set name='${name}', position='${position}', phone='${phone}', sex='${sex}', address='${address}' where id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delMessageManage = async (id) => {
  const sql = `delete from messagelist where id=${id};`
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  newMessageManage,
  updateMessageManage,
  delMessageManage,
  getTotal,
  repeatName
}