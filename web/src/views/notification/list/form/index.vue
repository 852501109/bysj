<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    name: '',
    content: "",
    institution: "",
    status: '1',
    remark: "",
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
          <el-form-item label="公告名称" prop="name">
            <el-input
              v-model="newFormInline.name"
              clearable
              placeholder="请输入公告名称"
            />
          </el-form-item>
        </re-col>

      <re-col :value="12" :xs="24" :sm="24">
      <el-form-item label="公告机构" prop="institution">
          <el-input
            v-model="newFormInline.institution"
            clearable
            placeholder="请输公告机构"
          />
        </el-form-item>
      </re-col>
      <re-col
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="公告状态">
          <el-switch
            v-model="newFormInline.status"
            inline-prompt
            active-value="1"
            inactive-value="0"
            active-text="启用"
            inactive-text="停用"
            :style="switchStyle"
          />
        </el-form-item>
      </re-col>
      <re-col>
          <el-form-item label="公告内容" prop="content">
            <el-input
              v-model="newFormInline.content"
              type="textarea"
              clearable
              placeholder="请输入公告内容"
            />
          </el-form-item>
        </re-col>

    </el-row>
  </el-form>
</template>
