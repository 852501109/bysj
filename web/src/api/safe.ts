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

export const getSafeList = (params?: object) => {
  return http.request<ResultTable>("get", `${VITE_API_PATH}/api/safe/list`, { params });
};

export const updateSafeList = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/safe/update`, { data });
};

export const addSafe = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/safe/add`, { data });
};
export const delSafe = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/safe/del`, { data });
};

