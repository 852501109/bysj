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

export const getAccessManagementList = (params?: object) => {
  return http.request<ResultTable>("get", `${VITE_API_PATH}/api/accessManagement/list`, { params });
};

export const updateAccessManagementList = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/accessManagement/update`, { data });
};

export const addAccessManagement = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/accessManagement/add`, { data });
};
export const delAccessManagement = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/accessManagement/del`, { data });
};

