const xss = require('xss')
const { exec } = require('../db/mysql')
const sillyDateTime = require("silly-datetime");
const getList = async (param) => {

  let name = param.name ? `name='${decodeURI(param.name)}'` : true
  let status = param.status ? `status=${param.status}` : true
  let sql = `select * from userlist where ${name} AND ${status} LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`
  // if (keyword) {
  //   sql += `and title like '%${keyword}%' `
  // }
  // sql += `order by createtime desc;`

  return await exec(sql)
}
const getTotal = async (param) => {
  let name = param.name ? `name='${decodeURI(param.name)}'` : true
  let status = param.status ? `status=${param.status}` : true
  let sql = `SELECT COUNT(*) AS total_count FROM userlist where ${name} AND ${status} ;`

  return await exec(sql)
}


const repeatName = async (userManage = {}) => {
  const searchNameSql = `select * from userlist where name='${userManage.name}'`
  const list = await exec(searchNameSql)
  return list
}
const newUserManage = async (userManage = {}) => {

  const name = xss(userManage.name)
  const phone = xss(userManage.phone)
  const position = xss(userManage.position)
  const address = xss(userManage.address)
  const sex = xss(userManage.sex)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")
  const sql = `insert into userlist (name, phone, position, address, sex, createTime)
        values ('${name}', '${phone}', '${position}', ${address}, '${sex}', '${createTime}');
    `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateUserManage = async (userManage) => {
  const name = xss(userManage.name)
  const phone = xss(userManage.phone)
  const position = xss(userManage.position)
  const address = xss(userManage.address)
  const sex = xss(userManage.sex)
  const id = userManage.id
  const sql = `update userlist set name='${name}', position='${position}', phone='${phone}', sex='${sex}', address='${address}' where id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delUserManage = async (id) => {
  const sql = `delete from userlist where id=${id};`
  console.log('执行sql', sql)
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  newUserManage,
  updateUserManage,
  delUserManage,
  getTotal,
  repeatName
}