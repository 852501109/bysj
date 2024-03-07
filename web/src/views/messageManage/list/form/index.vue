<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";
import { useUserStoreHook } from "@/store/modules/user";
const statusOptions = [
  {
    value: "等待批示",
    label: "等待批示"
  },
  {
    value: "处理中",
    label: "处理中"
  },
  {
    value: "已解决",
    label: "已解决"
  }
];
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
    label-width="82px"
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          label="批示部门"
          prop="approvalDepartment"
          v-if="useUserStoreHook()?.department === 'admin'"
        >
          <el-select
            v-model="newFormInline.approvalDepartment"
            placeholder="请选择只能部门"
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
        <el-form-item
          label="状态变更"
          prop="approvalStatus"
          v-if="useUserStoreHook()?.department !== 'admin'"
        >
          <el-select
            v-model="newFormInline.approvalStatus"
            placeholder="请选择只能部门"
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in statusOptions"
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
