<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";
const trainingTypeOptions = [
  {
    value: "0",
    label: "心肺复苏"
  },
  {
    value: "1",
    label: "紧急情况的处置"
  },
  {
    value: "2",
    label: "伤口包扎"
  },
  {
    value: "3",
    label: "灭火器的使用方法"
  },
  {
    value: "4",
    label: "安全规章制度"
  },
  {
    value: "5",
    label: "消防栓的正常使用"
  }
];
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    name: "",
    content: "",
    address: "",
    person: "",
    trainingType: "",
    trainingTime: ""
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
        <el-form-item label="培训内容" prop="trainingType">
          <el-select
            v-model="newFormInline.trainingType"
            placeholder="请选择培训内容"
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in trainingTypeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="培训人" prop="person">
          <el-input
            v-model="newFormInline.person"
            clearable
            placeholder="请输入培训人"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="培训时间" prop="trainingTime">
          <el-date-picker
            value-format="YYYY-MM-DD HH:mm:ss"
            v-model="newFormInline.trainingTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </re-col>

      <re-col>
        <el-form-item label="培训地点" prop="address">
          <el-input
            v-model="newFormInline.address"
            clearable
            type="textarea"
            placeholder="请输入地点"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
