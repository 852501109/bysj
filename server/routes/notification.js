const router = require('koa-router')()
const {
  getList,
  getDetail,
  newNotifiData,
  updateNotifiData,
  delNotifiData,
  getTotal,
  repeatName,
  updateNotifistatus
} = require('../controller/notification')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { validatePage, validateId, validateRequired } = require('../utils/validate')
const permission = require('../middleware/permission')

router.prefix('/api/notification')

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

router.post('/add', permission('notification:create'), async function (ctx, next) {
  const body = ctx.request.body
  const err = validateRequired(body, ['name', 'content'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const repeat = await repeatName(body)
  if (repeat.length > 0) {
    ctx.body = new ErrorModel('此名称已存在')
  } else {
    const data = await newNotifiData(body)
    ctx.body = new SuccessModel(data)
  }

})

router.post('/updateStatus', permission('notification:update'), async function (ctx, next) {
  const err = validateId(ctx.request.body.id) || validateRequired(ctx.request.body, ['status'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const val = await updateNotifistatus(ctx.request.body)
  if (val) {
    ctx.body = new SuccessModel(val, '更新状态成功')
  } else {
    ctx.body = new ErrorModel('更新状态失败')
  }
})
router.post('/update', permission('notification:update'), async function (ctx, next) {
  const body = ctx.request.body
  const err = validateId(body.id) || validateRequired(body, ['name', 'content'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const repeat = await repeatName(body)
  if (repeat.length > 0 && repeat[0].id !== body.id) {
    ctx.body = new ErrorModel('名称不可与其他名称重复')
  } else {
    const val = await updateNotifiData(ctx.request.body)
    if (val) {
      ctx.body = new SuccessModel(val, '编辑成功')
    } else {
      ctx.body = new ErrorModel('编辑失败')
    }
  }

})

router.post('/del', permission('notification:delete'), async function (ctx, next) {
  const err = validateId(ctx.request.body.id)
  if (err) { ctx.body = new ErrorModel(err); return }
  const val = await delNotifiData(ctx.request.body.id)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除失败')
  }
})

module.exports = router
