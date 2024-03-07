<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";
const sexOptions = [
  {
    value: "0",
    label: "男"
  },
  {
    value: "1",
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
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入姓名"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="性别" prop="sex">
          <el-select
            v-model="newFormInline.sex"
            placeholder="请选择性别"
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in sexOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="newFormInline.phone"
            clearable
            placeholder="请输入手机号"
          />
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item label="地址" prop="address">
          <el-input
            v-model="newFormInline.address"
            clearable
            type="textarea"
            placeholder="请输入地址"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
