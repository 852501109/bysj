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

  let where
  if (param.roles !== 'normal') {
    if (param.department === 'admin') {
      where = conditions.length ? `where ${conditions.join(' AND ')}` : ''
    } else if (param.department) {
      conditions.push('approvalDepartment = ?')
      params.push(param.department)
      where = `where ${conditions.join(' AND ')}`
    } else {
      where = 'where false'
    }
  } else {
    if (param.username) {
      conditions.push('username = ?')
      params.push(param.username)
    }
    where = `where ${conditions.join(' AND ')}`
  }

  let pageSize = Number(param.pageSize) || 10
  let currentPage = Number(param.currentPage) || 1
  let offset = (currentPage - 1) * pageSize

  let sql = `select * from problemReportingAndProgressReviewlist ${where} LIMIT ?, ?`
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

  let where
  if (param.roles !== 'normal') {
    if (param.department === 'admin') {
      where = conditions.length ? `where ${conditions.join(' AND ')}` : ''
    } else if (param.department) {
      conditions.push('approvalDepartment = ?')
      params.push(param.department)
      where = `where ${conditions.join(' AND ')}`
    } else {
      where = 'where false'
    }
  } else {
    if (param.username) {
      conditions.push('username = ?')
      params.push(param.username)
    }
    where = `where ${conditions.join(' AND ')}`
  }

  let sql = `SELECT COUNT(*) AS total_count FROM problemReportingAndProgressReviewlist ${where}`

  return await exec(sql, params)
}

const repeatName = async (problemReportingAndProgressReview = {}) => {
  const sql = `select * from problemReportingAndProgressReviewlist where name=?`
  return await exec(sql, [problemReportingAndProgressReview.name])
}

const newProblemReportingAndProgressReview = async (problemReportingAndProgressReview = {}) => {
  const name = xss(problemReportingAndProgressReview.name)
  const content = xss(problemReportingAndProgressReview.content)
  const approvalDepartment = xss(problemReportingAndProgressReview.approvalDepartment)
  const approvalStatus = xss(problemReportingAndProgressReview.approvalStatus)
  const username = xss(problemReportingAndProgressReview.username)
  const createTime = sillyDateTime.format(new Date(), "YYYY-MM-DD HH:mm:ss")

  const sql = `insert into problemReportingAndProgressReviewlist (name, content, approvalDepartment, approvalStatus, username, createTime) values (?, ?, ?, ?, ?, ?)`
  const insertData = await exec(sql, [name, content, approvalDepartment, approvalStatus, username, createTime])
  return { id: insertData.insertId }
}

const updateProblemReportingAndProgressReview = async (problemReportingAndProgressReview) => {
  const name = xss(problemReportingAndProgressReview.name)
  const content = xss(problemReportingAndProgressReview.content)
  const approvalDepartment = xss(problemReportingAndProgressReview.approvalDepartment)
  const approvalStatus = xss(problemReportingAndProgressReview.approvalStatus)
  const id = problemReportingAndProgressReview.id

  const sql = `update problemReportingAndProgressReviewlist set name=?, content=?, approvalDepartment=?, approvalStatus=? where id=?`
  const updateData = await exec(sql, [name, content, approvalDepartment, approvalStatus, id])
  return updateData.affectedRows > 0
}

const delProblemReportingAndProgressReview = async (id) => {
  const sql = `delete from problemReportingAndProgressReviewlist where id=?`
  const delData = await exec(sql, [id])
  return delData.affectedRows > 0
}

const getDBList = async () => {
  const sql = `select * from problemReportingAndProgressReviewlist where approvalStatus=?`
  return await exec(sql, ['等待批示'])
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
