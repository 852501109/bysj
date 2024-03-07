import { http } from "@/utils/http";
const { VITE_API_PATH } = import.meta.env;
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

export const getUseManageList = (params?: object) => {
  return http.request<ResultTable>("get", `${VITE_API_PATH}/api/userManage/list`, { params });
};

export const updateUseManageList = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/userManage/update`, { data });
};

export const addUseManage = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/userManage/add`, { data });
};
export const delUseManage = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/userManage/del`, { data });
};

