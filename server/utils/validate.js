function isPosInt(n) {
  const num = Number(n)
  return Number.isInteger(num) && num > 0
}

function validatePage(query) {
  if (query.pageSize !== undefined && !isPosInt(query.pageSize)) {
    return 'pageSize 必须是正整数'
  }
  if (query.currentPage !== undefined && !isPosInt(query.currentPage)) {
    return 'currentPage 必须是正整数'
  }
  return null
}

function validateId(id) {
  if (!isPosInt(id)) {
    return 'id 无效'
  }
  return null
}

function validateRequired(body, fields) {
  for (const field of fields) {
    const val = body[field]
    if (val === undefined || val === null || (typeof val === 'string' && !val.trim())) {
      return `${field} 不能为空`
    }
  }
  return null
}

module.exports = { validatePage, validateId, validateRequired }
