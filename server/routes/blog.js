const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { validateId, validateRequired } = require('../utils/validate')
const permission = require('../middleware/permission')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''

    if (ctx.query.isadmin) {
        if (!ctx.state.user) {
            ctx.body = new ErrorModel('未登录')
            return
        }
        author = ctx.state.user.username
    }

    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData)
})

router.get('/detail', async function (ctx, next) {
    const err = validateId(ctx.query.id)
    if (err) { ctx.body = new ErrorModel(err); return }
    const data = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(data)
})

router.post('/new', permission('blog:create'), async function (ctx, next) {
  const body = ctx.request.body
  const err = validateRequired(body, ['title', 'content'])
  if (err) { ctx.body = new ErrorModel(err); return }
  body.author = ctx.state.user.username
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', permission('blog:update'), async function (ctx, next) {
    const err = validateId(ctx.query.id) || validateRequired(ctx.request.body, ['title', 'content'])
    if (err) { ctx.body = new ErrorModel(err); return }
    const val = await updateBlog(ctx.query.id, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('更新博客失败')
    }
})

router.post('/del', permission('blog:delete'), async function (ctx, next) {
  const err = validateId(ctx.query.id)
  if (err) { ctx.body = new ErrorModel(err); return }
  const author = ctx.state.user.username
  const val = await delBlog(ctx.query.id, author)
  if (val) {
      ctx.body = new SuccessModel()
  } else {
      ctx.body = new ErrorModel('删除博客失败')
  }
})

module.exports = router
