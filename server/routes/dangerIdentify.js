const router = require('koa-router')()
const {
  getList,
  newDangerIdentify,
  updateDangerIdentify,
  delDangerIdentify,
  getTotal,
  repeatName,
} = require('../controller/dangerIdentify')
const { SuccessModel, ErrorModel } = require('../model/resModel')
// const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/dangerIdentify')

router.get('/list', async function (ctx, next) {
  const listData = await getList(ctx.query)
  const total = await getTotal(ctx.query)
  const data = {
    total: total[0].total_count,
    data: listData
  }
  ctx.body = new SuccessModel(data)
})

router.get('/detail', async function (ctx, next) {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

router.post('/add', async function (ctx, next) {
  const body = ctx.request.body
  const repeat = await repeatName(body)
  if (repeat.length > 0) {
    ctx.body = new ErrorModel('名称已存在')
  } else {
    const data = await newDangerIdentify(body)
    ctx.body = new SuccessModel(data)
  }

})


router.post('/update', async function (ctx, next) {
  const body = ctx.request.body
  const repeat = await repeatName(body)
  if (repeat.length > 0 && repeat[0].id !== body.id) {
    ctx.body = new ErrorModel('名称不可与其他名称重复')
  } else {
    const val = await updateDangerIdentify(ctx.request.body)
    if (val) {
      ctx.body = new SuccessModel(val, '编辑成功')
    } else {
      ctx.body = new ErrorModel('编辑公告失败')
    }
  }

})

router.post('/del', async function (ctx, next) {
  console.log('ctx.body', ctx.request.body)
  const val = await delDangerIdentify(ctx.request.body.id)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除失败')
  }
})

module.exports = router
