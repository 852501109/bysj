const router = require('koa-router')()
const {
  getList, getTotal, getAll, repeatName,
  createRole, updateRole, deleteRole,
  getRolePermissions, setRolePermissions,
  getPermissionList,
  getUserRoles, setUserRoles,
  getUserMenus,
} = require('../controller/role')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { validatePage, validateId, validateRequired } = require('../utils/validate')
const permission = require('../middleware/permission')

router.prefix('/api')

// ====== 角色管理 ======

router.get('/role/list', permission('role:list'), async (ctx) => {
  const err = validatePage(ctx.query)
  if (err) { ctx.body = new ErrorModel(err); return }
  const listData = await getList(ctx.query)
  const total = await getTotal(ctx.query)
  ctx.body = new SuccessModel({ total: total[0].total_count, data: listData })
})

router.get('/role/all', permission('role:list'), async (ctx) => {
  const data = await getAll()
  ctx.body = new SuccessModel(data)
})

router.post('/role/create', permission('role:create'), async (ctx) => {
  const body = ctx.request.body
  const err = validateRequired(body, ['name', 'code'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const repeat = await repeatName(body)
  if (repeat.length > 0) {
    ctx.body = new ErrorModel('角色名称或标识已存在')
    return
  }
  const data = await createRole(body)
  ctx.body = new SuccessModel(data, '创建成功')
})

router.post('/role/update', permission('role:update'), async (ctx) => {
  const body = ctx.request.body
  const err = validateId(body.id) || validateRequired(body, ['name', 'code'])
  if (err) { ctx.body = new ErrorModel(err); return }
  const repeat = await repeatName(body)
  if (repeat.length > 0 && repeat[0].id !== body.id) {
    ctx.body = new ErrorModel('角色名称或标识不可与其他角色重复')
    return
  }
  const val = await updateRole(body)
  ctx.body = val ? new SuccessModel(val, '编辑成功') : new ErrorModel('编辑失败')
})

router.post('/role/delete', permission('role:delete'), async (ctx) => {
  const err = validateId(ctx.request.body.id)
  if (err) { ctx.body = new ErrorModel(err); return }
  const val = await deleteRole(ctx.request.body.id)
  if (val.error) { ctx.body = new ErrorModel(val.error); return }
  ctx.body = new SuccessModel(val, '删除成功')
})

// ====== 角色权限 ======

router.get('/role/:id/permissions', permission('role:detail'), async (ctx) => {
  const data = await getRolePermissions(ctx.params.id)
  ctx.body = new SuccessModel(data)
})

router.post('/role/:id/permissions', permission('role:assignPermission'), async (ctx) => {
  const { permissionIds } = ctx.request.body
  await setRolePermissions(ctx.params.id, permissionIds)
  ctx.body = new SuccessModel(null, '权限分配成功')
})

// ====== 权限列表 ======

router.get('/permission/list', async (ctx) => {
  const data = await getPermissionList()
  ctx.body = new SuccessModel(data)
})

// ====== 用户角色 ======

router.get('/user/:id/roles', permission('role:assignUser'), async (ctx) => {
  const data = await getUserRoles(ctx.params.id)
  ctx.body = new SuccessModel(data)
})

router.post('/user/:id/roles', permission('role:assignUser'), async (ctx) => {
  const { roleIds } = ctx.request.body
  await setUserRoles(ctx.params.id, roleIds)
  ctx.body = new SuccessModel(null, '角色分配成功')
})

// ====== 当前用户菜单 ======

router.get('/user/menus', async (ctx) => {
  const user = ctx.state.user
  if (!user) { ctx.body = new ErrorModel('未登录'); return }
  const data = await getUserMenus(user.userId)
  ctx.body = new SuccessModel(data)
})

module.exports = router
