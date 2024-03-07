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
    total?: number;u
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

export const getProblemReportingAndProgressReviewList = (params?: object) => {
  return http.request<ResultTable>("get", `${VITE_API_PATH}/api/problemReportingAndProgressReview/list`, { params });
};
export const getDBlist = (params?: object) => {
  return http.request<ResultTable>("get", `${VITE_API_PATH}/api/problemReportingAndProgressReview/DBList`, { params });
};

export const updateProblemReportingAndProgressReviewList = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/problemReportingAndProgressReview/update`, { data });
};

export const addProblemReportingAndProgressReview = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/problemReportingAndProgressReview/add`, { data });
};
export const delProblemReportingAndProgressReview = (data?: object) => {
  return http.request<ResultTable>("post", `${VITE_API_PATH}/api/problemReportingAndProgressReview/del`, { data });
};

