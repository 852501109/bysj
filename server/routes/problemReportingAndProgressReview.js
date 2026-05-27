const router = require('koa-router')()
const {
  getList,
  newProblemReportingAndProgressReview,
  updateProblemReportingAndProgressReview,
  delProblemReportingAndProgressReview,
  getTotal,
  repeatName,
  getDBList
} = require('../controller/problemReportingAndProgressReview')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { validatePage, validateId, validateRequired } = require('../utils/validate')

router.prefix('/api/problemReportingAndProgressReview')
router.get('/DBList', async function (ctx, next) {
  const listData = await getDBList(ctx.query)
  const data = {
    data: listData
  }
  ctx.body = new SuccessModel(data)
})
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

router.post('/add', async function (ctx, next) {
  const body = ctx.request.body
  const err = validateRequired(body, ['name', 'content'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const repeat = await repeatName(body)
  if (repeat.length > 0) {
    ctx.body = new ErrorModel('名称已存在')
  } else {
    const data = await newProblemReportingAndProgressReview(body)
    ctx.body = new SuccessModel(data)
  }

})


router.post('/update', async function (ctx, next) {
  const body = ctx.request.body
  const err = validateId(body.id) || validateRequired(body, ['name', 'content'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const repeat = await repeatName(body)
  if (repeat.length > 0 && repeat[0].id !== body.id) {
    ctx.body = new ErrorModel('名称不可与其他名称重复')
  } else {
    const val = await updateProblemReportingAndProgressReview(ctx.request.body)
    if (val) {
      ctx.body = new SuccessModel(val, '编辑成功')
    } else {
      ctx.body = new ErrorModel('编辑公告失败')
    }
  }

})

router.post('/del', async function (ctx, next) {
  const err = validateId(ctx.request.body.id)
  if (err) { ctx.body = new ErrorModel(err); return }
  const val = await delProblemReportingAndProgressReview(ctx.request.body.id)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除失败')
  }
})

module.exports = router
