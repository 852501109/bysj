const router = require('koa-router')()
const {
  getAsyncRoutes,
  getUserList, createUser, updateUser, deleteUser, updateUserStatus, resetUserPassword,
  getRoleList, createRole, updateRole, deleteRole, updateRoleStatus,
  getRolePermissions, setRolePermissions, getPermissionList,
  getRoleIds, setUserRoles, getAllRoleList,
  getDeptList, createDept, updateDept, deleteDept,
  getMenuList, createMenu, updateMenu, deleteMenu,
} = require('../controller/system')
const permission = require('../middleware/permission')

// =================== 动态路由 ===================

router.get('/get-async-routes', async (ctx) => {
  const user = ctx.state.user
  if (!user) { ctx.body = { success: false, data: [] }; return }
  ctx.body = await getAsyncRoutes(user.userId)
})

// =================== 用户管理 ===================

router.post('/user', permission('user:list'), async (ctx) => {
  ctx.body = await getUserList(ctx.request.body)
})

router.post('/user/create', permission('user:create'), async (ctx) => {
  ctx.body = await createUser(ctx.request.body)
})

router.post('/user/update', permission('user:update'), async (ctx) => {
  ctx.body = await updateUser(ctx.request.body)
})

router.post('/user/delete', permission('user:delete'), async (ctx) => {
  ctx.body = await deleteUser(ctx.request.body.id)
})

router.post('/user/status', permission('user:update'), async (ctx) => {
  const { id, status } = ctx.request.body
  ctx.body = await updateUserStatus(id, status)
})

router.post('/user/reset-password', permission('user:update'), async (ctx) => {
  const { id, password } = ctx.request.body
  ctx.body = await resetUserPassword(id, password)
})

// =================== 角色管理 ===================

router.post('/role', permission('role:list'), async (ctx) => {
  ctx.body = await getRoleList(ctx.request.body)
})

router.post('/role/create', permission('role:create'), async (ctx) => {
  ctx.body = await createRole(ctx.request.body)
})

router.post('/role/update', permission('role:update'), async (ctx) => {
  ctx.body = await updateRole(ctx.request.body)
})

router.post('/role/delete', permission('role:delete'), async (ctx) => {
  ctx.body = await deleteRole(ctx.request.body.id)
})

router.post('/role/status', permission('role:update'), async (ctx) => {
  const { id, status } = ctx.request.body
  ctx.body = await updateRoleStatus(id, status)
})

// =================== 角色权限 ===================

router.post('/role/permissions', permission('role:detail'), async (ctx) => {
  ctx.body = await getRolePermissions(ctx.request.body.roleId)
})

router.post('/role/permissions/save', permission('role:assignPermission'), async (ctx) => {
  const { roleId, permissionIds } = ctx.request.body
  ctx.body = await setRolePermissions(roleId, permissionIds)
})

router.get('/permission/list', async (ctx) => {
  ctx.body = await getPermissionList()
})

// =================== 用户-角色关联 ===================

router.get('/list-all-role', permission('role:assignUser'), async (ctx) => {
  ctx.body = await getAllRoleList()
})

router.post('/list-role-ids', permission('role:assignUser'), async (ctx) => {
  ctx.body = await getRoleIds(ctx.request.body)
})

router.post('/user/roles/save', permission('role:assignUser'), async (ctx) => {
  const { userId, roleIds } = ctx.request.body
  ctx.body = await setUserRoles(userId, roleIds)
})

// =================== 部门管理 ===================

router.post('/dept', permission('role:assignUser'), async (ctx) => {
  ctx.body = await getDeptList()
})

router.post('/dept/create', permission('role:assignUser'), async (ctx) => {
  ctx.body = await createDept(ctx.request.body)
})

router.post('/dept/update', permission('role:assignUser'), async (ctx) => {
  ctx.body = await updateDept(ctx.request.body)
})

router.post('/dept/delete', permission('role:assignUser'), async (ctx) => {
  ctx.body = await deleteDept(ctx.request.body.id)
})

// =================== 菜单管理 ===================

router.post('/menu', permission('role:list'), async (ctx) => {
  ctx.body = await getMenuList()
})

router.post('/menu/create', permission('role:list'), async (ctx) => {
  ctx.body = await createMenu(ctx.request.body)
})

router.post('/menu/update', permission('role:list'), async (ctx) => {
  ctx.body = await updateMenu(ctx.request.body)
})

router.post('/menu/delete', permission('role:list'), async (ctx) => {
  ctx.body = await deleteMenu(ctx.request.body.id)
})

module.exports = router
