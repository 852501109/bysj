const xss = require('xss')
const { exec } = require('../db/mysql')
const sillyDateTime = require("silly-datetime");
const getList = async (param) => {
  let name = param.name ? `name='${decodeURI(param.name)}'` : true
  let username = param.username ? `username='${param.username}'` : true
  let sql
  if (param.roles !== 'normal') {
    if (param.department === 'admin') {
      sql = `select * from problemReportingAndProgressReviewlist where ${name}  LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`
    } else if (param.department !== '' && !param.department !== 'admin') {
      sql = `select * from problemReportingAndProgressReviewlist where ${name} AND approvalDepartment='${param.department}' LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`
    } else {
      sql = `select * from problemReportingAndProgressReviewlist  where false`
    }
  } else {
    sql = `select * from problemReportingAndProgressReviewlist where ${name} AND ${username}  LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`
  }

  return await exec(sql)
}
const getTotal = async (param) => {
  let name = param.name ? `name='${decodeURI(param.name)}'` : true
  let username = param.username ? `username='${param.username}'` : true
  let sql
  if (param.roles !== 'normal') {
    if (param.department === 'admin') {
      sql = `SELECT COUNT(*) AS total_count FROM problemReportingAndProgressReviewlist where ${name}  LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`
    } else if (param.department !== '' && !param.department !== 'admin') {
      sql = `SELECT COUNT(*) AS total_count FROM problemReportingAndProgressReviewlist where ${name} AND approvalDepartment='${param.department}' LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`
    } else {
      sql = `SELECT COUNT(*) AS total_count FROM problemReportingAndProgressReviewlist  where false`
    }
  } else {
    sql = `SELECT COUNT(*) AS total_count FROM problemReportingAndProgressReviewlist where ${name} AND ${username}  LIMIT ${(param.currentPage - 1) * param.pageSize}, ${param.pageSize}`
  }
  return await exec(sql)
}


const repeatName = async (problemReportingAndProgressReview = {}) => {
  const searchNameSql = `select * from problemReportingAndProgressReviewlist where name='${problemReportingAndProgressReview.name}'`
  const list = await exec(searchNameSql)
  return list
}
const newProblemReportingAndProgressReview = async (problemReportingAndProgressReview = {}) => {

  const name = xss(problemReportingAndProgressReview.name)
  const content = xss(problemReportingAndProgressReview.content)
  const approvalDepartment = xss(problemReportingAndProgressReview.approvalDepartment)
  const approvalStatus = xss(problemReportingAndProgressReview.approvalStatus)
  const username = xss(problemReportingAndProgressReview.username)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")
  const sql = `insert into problemReportingAndProgressReviewlist (name, content, approvalDepartment, approvalStatus,username, createTime)
        values ('${name}', '${content}', '${approvalDepartment}', '${approvalStatus}','${username}','${createTime}');
    `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateProblemReportingAndProgressReview = async (problemReportingAndProgressReview) => {
  const name = xss(problemReportingAndProgressReview.name)
  const content = xss(problemReportingAndProgressReview.content)
  const approvalDepartment = xss(problemReportingAndProgressReview.approvalDepartment)
  const approvalStatus = xss(problemReportingAndProgressReview.approvalStatus)
  const id = problemReportingAndProgressReview.id
  const sql = `update problemReportingAndProgressReviewlist set name='${name}', content='${content}', approvalDepartment='${approvalDepartment}', approvalStatus='${approvalStatus}' where id=${id}`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delProblemReportingAndProgressReview = async (id) => {
  const sql = `delete from problemReportingAndProgressReviewlist where id=${id};`
  console.log('执行sql', sql)
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}
const getDBList = async () => {
  const sql = `select * from problemReportingAndProgressReviewlist where approvalStatus='等待批示'`
  return await exec(sql)
}
module.exports = {
  getList,
  newProblemReportingAndProgressReview,
  updateProblemReportingAndProgressReview,
  delProblemReportingAndProgressReview,
  getTotal,
  repeatName,
  getDBList
}