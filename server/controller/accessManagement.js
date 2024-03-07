const xss = require('xss')
const { exec } = require('../db/mysql')
const sillyDateTime = require("silly-datetime");
const getList = async (param) => {

  let name = param.name ? `name='${decodeURI(param.name)}'` : true
  let sql = `select * from accessManagementlist where ${name} LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`
  // if (keyword) {
  //   sql += `and title like '%${keyword}%' `
  // }
  // sql += `order by createtime desc;`
  return await exec(sql)
}
const getTotal = async (param) => {
  let name = param.name ? `name='${decodeURI(param.name)}'` : true
  let sql = `SELECT COUNT(*) AS total_count FROM accessManagementlist where ${name};`

  return await exec(sql)
}


const repeatName = async (accessManagementManage = {}) => {
  const searchNameSql = `select * from accessManagementlist where name='${accessManagementManage.name}'`
  const list = await exec(searchNameSql)
  return list
}
const newAccessManagementManage = async (accessManagementManage = {}) => {

  const name = xss(accessManagementManage.name)
  const phone = xss(accessManagementManage.phone)
  const address = xss(accessManagementManage.address)
  const sex = xss(accessManagementManage.sex)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")
  const sql = `insert into accessManagementlist (name, phone, address, sex, createTime)
        values ('${name}', '${phone}', '${address}', '${sex}', '${createTime}');
    `
  console.log('111sql', sql)
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateAccessManagementManage = async (accessManagementManage) => {
  const name = xss(accessManagementManage.name)
  const phone = xss(accessManagementManage.phone)
  const address = xss(accessManagementManage.address)
  const sex = xss(accessManagementManage.sex)
  const id = accessManagementManage.id
  const sql = `update accessManagementlist set name='${name}', phone='${phone}', sex='${sex}', address='${address}' where id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delAccessManagementManage = async (id) => {
  const sql = `delete from accessManagementlist where id=${id};`
  console.log('执行sql', sql)
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  newAccessManagementManage,
  updateAccessManagementManage,
  delAccessManagementManage,
  getTotal,
  repeatName
}