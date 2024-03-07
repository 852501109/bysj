import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { isPhone, isEmail } from "@pureadmin/utils";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  approvalDepartment: [{ required: true, message: "批示部门为必填项", trigger: "change" }],
  approvalStatus: [{ required: true, message: "批示状态为必填项", trigger: "change" }],
});
