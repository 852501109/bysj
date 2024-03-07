<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";
const departmentOptions = [
  {
    value: "物业部门",
    label: "物业部门"
  },
  {
    value: "安保部门",
    label: "安保部门"
  },
  {
    value: "巡逻部门",
    label: "巡逻部门"
  },
  {
    value: "维修部门",
    label: "维修部门"
  },
  {
    value: "社区医院",
    label: "社区医院"
  }
];
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    name: "",
    phone: "",
    sex: "",
    position: "",
    address: ""
  })
});

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="122px"
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="账号">
          <el-input disabled v-model="newFormInline.username" />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="角色权限">
          <el-input disabled v-model="newFormInline.roles" />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="授权为部门" prop="department">
          <el-select
            v-model="newFormInline.department"
            placeholder="请分配所属部门"
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in departmentOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
