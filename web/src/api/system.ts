import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: Array<any>;
};

type ResultTable = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

// ==================== 用户管理 ====================

/** 获取用户管理列表 */
export const getUserList = (data?: object) => {
  return http.request<ResultTable>("post", "localApi/user", { data });
};

/** 创建用户 */
export const createUser = (data?: object) => {
  return http.request<Result>("post", "localApi/user/create", { data });
};

/** 更新用户 */
export const updateUser = (data?: object) => {
  return http.request<Result>("post", "localApi/user/update", { data });
};

/** 删除用户 */
export const deleteUser = (id: number) => {
  return http.request<Result>("post", "localApi/user/delete", { data: { id } });
};

/** 更新用户状态 */
export const updateUserStatus = (id: number, status: number) => {
  return http.request<Result>("post", "localApi/user/status", { data: { id, status } });
};

/** 重置用户密码 */
export const resetUserPassword = (id: number, password: string) => {
  return http.request<Result>("post", "localApi/user/reset-password", { data: { id, password } });
};

// ==================== 角色管理 ====================

/** 获取角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<ResultTable>("post", "localApi/role", { data });
};

/** 创建角色 */
export const createRole = (data?: object) => {
  return http.request<Result>("post", "localApi/role/create", { data });
};

/** 更新角色 */
export const updateRole = (data?: object) => {
  return http.request<Result>("post", "localApi/role/update", { data });
};

/** 删除角色 */
export const deleteRole = (id: number) => {
  return http.request<Result>("post", "localApi/role/delete", { data: { id } });
};

/** 更新角色状态 */
export const updateRoleStatus = (id: number, status: number) => {
  return http.request<Result>("post", "localApi/role/status", { data: { id, status } });
};

/** 获取角色权限ID列表 */
export const getRolePermissions = (roleId: number) => {
  return http.request<Result>("post", "localApi/role/permissions", { data: { roleId } });
};

/** 保存角色权限 */
export const saveRolePermissions = (roleId: number, permissionIds: number[]) => {
  return http.request<Result>("post", "localApi/role/permissions/save", { data: { roleId, permissionIds } });
};

/** 获取所有权限列表 */
export const getPermissionList = () => {
  return http.request<Result>("get", "localApi/permission/list");
};

/** 获取所有角色列表（下拉用） */
export const getAllRoleList = () => {
  return http.request<Result>("get", "localApi/list-all-role");
};

/** 获取用户角色ID列表 */
export const getRoleIds = (data?: object) => {
  return http.request<Result>("post", "localApi/list-role-ids", { data });
};

/** 保存用户角色 */
export const saveUserRoles = (userId: number, roleIds: number[]) => {
  return http.request<Result>("post", "localApi/user/roles/save", { data: { userId, roleIds } });
};

// ==================== 部门管理 ====================

/** 获取部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<Result>("post", "localApi/dept", { data });
};

/** 创建部门 */
export const createDept = (data?: object) => {
  return http.request<Result>("post", "localApi/dept/create", { data });
};

/** 更新部门 */
export const updateDept = (data?: object) => {
  return http.request<Result>("post", "localApi/dept/update", { data });
};

/** 删除部门 */
export const deleteDept = (id: number) => {
  return http.request<Result>("post", "localApi/dept/delete", { data: { id } });
};

// ==================== 菜单管理 ====================

/** 获取菜单管理列表 */
export const getMenuList = (data?: object) => {
  return http.request<Result>("post", "localApi/menu", { data });
};

/** 创建菜单 */
export const createMenu = (data?: object) => {
  return http.request<Result>("post", "localApi/menu/create", { data });
};

/** 更新菜单 */
export const updateMenu = (data?: object) => {
  return http.request<Result>("post", "localApi/menu/update", { data });
};

/** 删除菜单 */
export const deleteMenu = (id: number) => {
  return http.request<Result>("post", "localApi/menu/delete", { data: { id } });
};
