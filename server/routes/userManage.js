const router = require('koa-router')()
const {
  getList,
  getDetail,
  newUserManage,
  updateUserManage,
  delUserManage,
  getTotal,
  repeatName,
} = require('../controller/userManage')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { validatePage, validateId, validateRequired } = require('../utils/validate')
const permission = require('../middleware/permission')

router.prefix('/api/userManage')

router.get('/list', async function (ctx, next) {
  const err = validatePage(ctx.query)
  if (err) { ctx.body = new ErrorModel(err); return }
  const listData = await getList(ctx.query)
  const total = await getTotal(ctx.query)
  const data = {
    total: total[0].total_count,
    data: listData
  }
  ctx.body = new SuccessModel(data)
})

router.get('/detail', async function (ctx, next) {
  const err = validateId(ctx.query.id)
  if (err) { ctx.body = new ErrorModel(err); return }
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

router.post('/add', permission('userManage:create'), async function (ctx, next) {
  const body = ctx.request.body
  const err = validateRequired(body, ['name'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const repeat = await repeatName(body)
  if (repeat.length > 0) {
    ctx.body = new ErrorModel('名称已存在')
  } else {
    const data = await newUserManage(body)
    ctx.body = new SuccessModel(data)
  }

})


router.post('/update', permission('userManage:update'), async function (ctx, next) {
  const body = ctx.request.body
  const err = validateId(body.id) || validateRequired(body, ['name'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const repeat = await repeatName(body)
  if (repeat.length > 0 && repeat[0].id !== body.id) {
    ctx.body = new ErrorModel('名称不可与其他名称重复')
  } else {
    const val = await updateUserManage(ctx.request.body)
    if (val) {
      ctx.body = new SuccessModel(val, '编辑成功')
    } else {
      ctx.body = new ErrorModel('编辑公告失败')
    }
  }

})

router.post('/del', permission('userManage:delete'), async function (ctx, next) {
  const err = validateId(ctx.request.body.id)
  if (err) { ctx.body = new ErrorModel(err); return }
  const val = await delUserManage(ctx.request.body.id)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除失败')
  }
})

module.exports = router
