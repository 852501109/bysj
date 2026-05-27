const router = require('koa-router')()
const {
  getAsyncRoutes, getUserList, getRoleList,
  getAllRoleList, getRoleIds, getDeptList, getMenuList,
} = require('../controller/system')
const permission = require('../middleware/permission')

// 动态路由（所有登录用户都需要）
router.get('/get-async-routes', async (ctx) => {
  const user = ctx.state.user
  if (!user) { ctx.body = { success: false, data: [] }; return }
  ctx.body = await getAsyncRoutes(user.userId)
})

// 以下接口仅 superAdmin 可访问
router.post('/user', permission('role:assignUser'), async (ctx) => {
  ctx.body = await getUserList(ctx.request.body)
})

router.get('/list-all-role', permission('role:assignUser'), async (ctx) => {
  ctx.body = await getAllRoleList()
})

router.post('/list-role-ids', permission('role:assignUser'), async (ctx) => {
  ctx.body = await getRoleIds(ctx.request.body)
})

router.post('/role', permission('role:list'), async (ctx) => {
  ctx.body = await getRoleList(ctx.request.body)
})

router.post('/dept', permission('role:assignUser'), async (ctx) => {
  ctx.body = await getDeptList()
})

router.post('/menu', permission('role:list'), async (ctx) => {
  ctx.body = await getMenuList()
})

module.exports = router
