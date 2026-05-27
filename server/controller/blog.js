const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1`
  let params = []
  if (author) {
    sql += ` and author=?`
    params.push(author)
  }
  if (keyword) {
    sql += ` and title like ?`
    params.push(`%${keyword}%`)
  }
  sql += ` order by createtime desc`

  return await exec(sql, params)
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id=?`
  const rows = await exec(sql, [id])
  return rows[0]
}

const newBlog = async (blogData = {}) => {
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const author = blogData.author
  const createTime = Date.now()

  const sql = `insert into blogs (title, content, createtime, author) values (?, ?, ?, ?)`
  const insertData = await exec(sql, [title, content, createTime, author])
  return {
    id: insertData.insertId
  }
}

const updateBlog = async (id, blogData = {}) => {
  const title = xss(blogData.title)
  const content = xss(blogData.content)

  const sql = `update blogs set title=?, content=? where id=?`
  const updateData = await exec(sql, [title, content, id])
  return updateData.affectedRows > 0
}

const delBlog = async (id, author) => {
  const sql = `delete from blogs where id=? and author=?`
  const delData = await exec(sql, [id, author])
  return delData.affectedRows > 0
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
