<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";
const sexOptions = [
  {
    value: '0',
    label: "男"
  },
  {
    value: '1',
    label: "女"
  }
];
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    name: "",
    phone: "",
    sex: "",
    position: "",
    address: "",
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
    label-width="100px"
  >
    <el-row :gutter="30">
        <re-col :value="24" :xs="24" :sm="24">
          <el-form-item label="危险源名称" prop="name">
            <el-input
              v-model="newFormInline.name"
              clearable
              placeholder="请输入危险源"
            />
          </el-form-item>
        </re-col>
        <re-col>
          <el-form-item label="危险源详情" prop="detail">
            <el-input
              v-model="newFormInline.detail"
              clearable
              type="textarea"
              placeholder="请输入详情"
            />
          </el-form-item>
        </re-col>
    </el-row>
  </el-form>
</template>
