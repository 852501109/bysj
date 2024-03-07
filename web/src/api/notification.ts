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

export const getNotificationList = (params?: object) => {
  return http.request<ResultTable>("get", `${VITE_API_PATH}/api/notification/list`, { params });
};

export const updateNotificationList = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/notification/update`, { data });
};
export const updateNotificationStatus = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/notification/updateStatus`, { data });
};
export const addNotification = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/notification/add`, { data });
};
export const delNotification = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/notification/del`, { data });
};





