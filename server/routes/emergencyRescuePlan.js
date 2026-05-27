const router = require('koa-router')()
const {
  getList,
  getDetail,
  newEmergencyRescuePlan,
  updateEmergencyRescuePlan,
  delEmergencyRescuePlan,
  getTotal,
  repeatName,
} = require('../controller/emergencyRescuePlan')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { validatePage, validateId, validateRequired } = require('../utils/validate')
const permission = require('../middleware/permission')

router.prefix('/api/emergencyRescuePlan')

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

router.post('/add', permission('emergencyRescuePlan:create'), async function (ctx, next) {
  const body = ctx.request.body
  const err = validateRequired(body, ['type'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const data = await newEmergencyRescuePlan(body)
  ctx.body = new SuccessModel(data)
})


router.post('/update', permission('emergencyRescuePlan:update'), async function (ctx, next) {
  const body = ctx.request.body
  const err = validateId(body.id) || validateRequired(body, ['type'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const val = await updateEmergencyRescuePlan(ctx.request.body)
  if (val) {
    ctx.body = new SuccessModel(val, '编辑成功')
  } else {
    ctx.body = new ErrorModel('编辑公告失败')
  }

})

router.post('/del', permission('emergencyRescuePlan:delete'), async function (ctx, next) {
  const err = validateId(ctx.request.body.id)
  if (err) { ctx.body = new ErrorModel(err); return }
  const val = await delEmergencyRescuePlan(ctx.request.body.id)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除失败')
  }
})

module.exports = router
