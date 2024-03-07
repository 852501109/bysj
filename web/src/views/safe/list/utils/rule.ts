import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { isPhone, isEmail } from "@pureadmin/utils";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "培训名称为必填项", trigger: "blur" }],
  content: [{ required: true, message: "培训内容为必填项", trigger: "blur" }],
  address: [{ required: true, message: "培训地点为必填项", trigger: "blur" }],
  person: [{ required: true, message: "培训人为必填项", trigger: "blur" }],
  trainingType: [{ required: true, message: "培训类型为必填项", trigger: "change" }],
  trainingTime: [{ required: true, message: "培训时间为必填项", trigger: "change" }],


});
