import { defineStore } from "pinia";
import { message } from "@/utils/message";
import { store } from "@/store";
import type { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { router, resetRouter } from "@/router";
import { storageLocal } from "@pureadmin/utils";
import { getLogin,register, refreshTokenApi } from "@/api/user";
import type { UserResult, RefreshTokenResult } from "@/api/user";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { type DataInfo, setToken, removeToken, userKey } from "@/utils/auth";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 登录时间
    loginTime: storageLocal().getItem<DataInfo<number>>(userKey)?.loginTime ?? "",
    department: storageLocal().getItem<DataInfo<number>>(userKey)?.department ?? "",
    // 用户名
    username: storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "",
    // 页面级别权限
    roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
    // 前端生成的验证码（按实际需求替换）
    verifyCode: "",
    // 判断登录页面显示哪个组件（0：登录（默认）、1：手机登录、2：二维码登录、3：注册、4：忘记密码）
    currentPage: 0,
    // 是否勾选了登录页的免登录
    isRemembered: false,
    // 登录页的免登录存储几天，默认7天
    loginDay: 7
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储时间 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储角色 */
    SET_LOGINTIME(loginTime: string) {
      this.loginTime = loginTime;
    },
    SET_DEPARTMENT(department: string) {
      this.department = department;
    },
    /** 存储前端生成的验证码 */
    SET_VERIFYCODE(verifyCode: string) {
      this.verifyCode = verifyCode;
    },
    /** 存储登录页面显示哪个组件 */
    SET_CURRENTPAGE(value: number) {
      this.currentPage = value;
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_ISREMEMBERED(bool: boolean) {
      this.isRemembered = bool;
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGINDAY(value: number) {
      this.loginDay = Number(value);
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            console.log(data)
            if (data.errno === 0) {
              setToken(data.data);
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 注册 */
    async loginRegister(data) {
      return new Promise<UserResult>((resolve, reject) => {
        register(data)
          .then(data => {
            if (data.errno === 0) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      const beforeRoles = this.roles[0]
      this.username = "";
      this.roles = [];
      this.department = '';
      this.loginTime = '';
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      if(beforeRoles.includes('admin')) router.push("/login");
      else  router.push("/loginnormal");
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi(data)
          .then(data => {
            if (data.data && data.data.code === 4006) {
              this.logOut()
              message(data.data.msg , {type: "error"});
            } else{
              setToken(data.data);
              resolve(data);
            }
          })
          .catch(error => {

            reject(error);
          });
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
