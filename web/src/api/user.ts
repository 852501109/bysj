import { http } from "@/utils/http";

export type UserResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};
/** 获取账号列表 */
export const getUserList= (params?: object) => {
  return http.request<UserResult>("get", "localApi/api/user/userList", { params });
};
export const getDBUserList = (params?: object) => {
  return http.request<UserResult>("get", "localApi/api/user/DBList", { params });
};
/** 更新账号列表 */
export const updateUserList= (data?: object) => {
  return http.request<UserResult>("post", "localApi/api/user/update", { data });
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "localApi/api/user/login", { data });
};
/** 注册 */
export const register = (data?: object) => {
  return http.request<UserResult>("post", "localApi/api/user/register", { data });
};
/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "localApi/api/user/refresh", { data });
};
