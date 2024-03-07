const xss = require('xss')
const { exec } = require('../db/mysql')
const sillyDateTime = require("silly-datetime");
const getList = async (param) => {
  let trainingType = param.trainingType ? `trainingType='${decodeURI(param.trainingType)}'` : true
  let start = param.start ? sillyDateTime.format(new Date(param.start), "YYYY-MM-DD HH:mm:ss") : '1900-01-01'
  let end = param.end ? sillyDateTime.format(new Date(param.end), "YYYY-MM-DD HH:mm:ss") : '2900-01-01'
  let time = `trainingTime BETWEEN '${start}' AND '${end}'`
  let sql = `select * from safelist where ${trainingType} AND ${time} LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`

  return await exec(sql)
}
const getTotal = async (param) => {
  let trainingType = param.trainingType ? `trainingType='${decodeURI(param.trainingType)}'` : true
  let start = param.start ? sillyDateTime.format(new Date(param.start), "YYYY-MM-DD HH:mm:ss") : '1900-01-01'
  let end = param.end ? sillyDateTime.format(new Date(param.end), "YYYY-MM-DD HH:mm:ss") : '2900-01-01'
  let time = `trainingTime BETWEEN '${start}' AND '${end}'`
  let sql = `SELECT COUNT(*) AS total_count FROM safelist where ${trainingType} AND ${time};`

  return await exec(sql)
}


const repeatName = async (safe = {}) => {
  const searchNameSql = `select * from safelist where trainingType='${safe.trainingType}'`
  const list = await exec(searchNameSql)
  return list
}
const newSafe = async (safe = {}) => {

  const person = xss(safe.person)
  const address = xss(safe.address)
  const trainingType = xss(safe.trainingType)
  const trainingTime = xss(safe.trainingTime)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")
  const sql = `insert into safelist (person, address, trainingType, trainingTime, createTime)
        values ( '${person}', '${address}', '${trainingType}', '${trainingTime}', '${createTime}');
    `
  console.log('怎么回事sql', sql)
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateSafe = async (safe) => {
  const person = xss(safe.person)
  const address = xss(safe.address)
  const trainingType = xss(safe.trainingType)
  const trainingTime = sillyDateTime.format(new Date(safe.trainingTime), "YYYY-MM-DD HH:mm:ss")
  const id = safe.id
  const sql = `update safelist set  person='${person}', trainingType='${trainingType}',trainingTime='${trainingTime}', address='${address}' where id=${id}`

  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delSafe = async (id) => {
  const sql = `delete from safelist where id=${id};`
  console.log('执行sql', sql)
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  newSafe,
  updateSafe,
  delSafe,
  getTotal,
  repeatName
}