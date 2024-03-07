<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";
const typeOptions = [
  {
    value: "0",
    label: "高处坠落应急预案"
  },
  {
    value: "1",
    label: "触电事故应急预案"
  },
  {
    value: "2",
    label: "物体打击应急预案"
  },
  {
    value: "3",
    label: "车辆伤害应急预案"
  },
  {
    value: "4",
    label: "机械伤害应急预案"
  },
  {
    value: "5",
    label: "火灾事故应急预案"
  },
  {
    value: "6",
    label: "坍塌事故应急预案"
  },
  {
    value: "7",
    label: "其他事故应急预案"
  }
];
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    name: "",
    content: "",
    type: ""
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
    label-width="120px"
  >
    <el-row :gutter="30">
      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="应急预案内容" prop="type">
          <el-select
            v-model="newFormInline.type"
            placeholder="请选择应急预案内容"
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in typeOptions"
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
