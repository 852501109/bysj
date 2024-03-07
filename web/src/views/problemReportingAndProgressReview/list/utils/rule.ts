import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { isPhone, isEmail } from "@pureadmin/utils";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "上报名称为必填项", trigger: "blur" }],
  content: [{ required: true, message: "上报内容为必填项", trigger: "blur" }],
});
