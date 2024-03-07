import "./reset.css";
import dayjs from "dayjs";
import editForm from "../form/index.vue";
import { zxcvbn } from "@zxcvbn-ts/core";
import { message } from "@/utils/message";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import type { PaginationProps } from "@pureadmin/table";
import type { FormItemProps, RoleFormItemProps,  DataItem } from "../utils/types";
import { hideTextAtIndex, getKeyList, isAllEmpty } from "@pureadmin/utils";
import { utils, writeFile } from "xlsx";
import {
  getEmergencyRescuePlanList,
  addEmergencyRescuePlan,
  updateEmergencyRescuePlanList,
  delEmergencyRescuePlan,
} from "@/api/emergencyRescuePlan";
import {
  ElForm,
  ElInput,
  ElFormItem,
  ElProgress,
  ElMessageBox
} from "element-plus";
import {
  type Ref,
  h,
  ref,
  toRaw,
  watch,
  computed,
  reactive,
  onMounted
} from "vue";
const typeOptions = [
  {
    value: '0',
    label: "高处坠落应急预案"
  },
  {
    value: '1',
    label: "触电事故应急预案"
  },
  {
    value: '2',
    label: "物体打击应急预案"
  },
  {
    value: '3',
    label: "车辆伤害应急预案"
  },
  {
    value: '4',
    label: "机械伤害应急预案"
  },
  {
    value: '5',
    label: "火灾事故应急预案"
  },
  {
    value: '6',
    label: "坍塌事故应急预案"
  },
  {
    value: '7',
    label: "其他事故应急预案"
  }
];
export function useObj(tableRef: Ref, treeRef: Ref) {
  const form = reactive({
    type: "",
  });
  const formRef = ref();
  const ruleFormRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  // 上传头像信息
  const avatarInfo = ref();
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const higherDeptOptions = ref();
  const treeData = ref([]);
  const treeLoading = ref(true);
  const selectedNum = ref(0);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [


    {
      label: "应急预案内容",
      prop: "type",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <span>
          {typeOptions.find(item => item.value === row.type).label}
        </span>
      )
    },
    {
      label: "创建时间",
      minWidth: 90,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });
  // 重置的新密码
  const pwdForm = reactive({
    newPwd: ""
  });
  const pwdProgress = [
    { color: "#e74242", text: "非常弱" },
    { color: "#EFBD47", text: "弱" },
    { color: "#ffa500", text: "一般" },
    { color: "#1bbf1b", text: "强" },
    { color: "#008000", text: "非常强" }
  ];
  // 当前密码强度（0-4）
  const curScore = ref();



  function handleUpdate(row) {
    console.log(row);
  }

  function handleDelete(row) {
    delEmergencyRescuePlan({id: row.id}).then(() => {
      message(`您删除了名称为${typeOptions.find(item => item.value === row.type).label}的这条数据`, { type: "success" });
      onSearch();
    })
  }

  function handleSizeChange(val: number) {
    pagination.currentPage = 1
    pagination.pageSize = val
    onSearch()
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
    pagination.currentPage = val
    onSearch()
  }

  /** 当CheckBox选择项发生变化时会触发该事件 */
  function handleSelectionChange(val) {
    selectedNum.value = val.length;
    // 重置表格高度
    tableRef.value.setAdaptive();
  }

  /** 取消选择 */
  function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多选表格，清空应急预案的选择
    tableRef.value.getTableRef().clearSelection();
  }

  const initExcel = (data) => {
    const title = ['name', 'content', 'person', 'address', 'trainingType', 'trainingTime','createTime']
    const res: string[][] = data.map(item => {
      let arr = []
      title.forEach((key) => {
        arr.push(item[key])
      })
      return arr
    })
    const titleList: string[] = ['应急预案名称', '应急预案内容', '应急预案人', '应急预案地址', '应急预案类型', '应急预案时间', '创建时间' ];
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "数据报表");
    writeFile(workBook, "应急预案.xlsx");
  };
  function exportExcel() {
    // 返回当前选中的行
    const curSelected = tableRef.value.getTableRef().getSelectionRows();
    console.log(toRaw(curSelected[0]))
    if(curSelected.length === 0) {
      message('请勾选要导出的数据', {type: 'error'})
    } else {
      initExcel(toRaw(dataList.value))
    }

  }

  async function onSearch() {
    loading.value = true;
    const newForm = toRaw(form)
    const param = toRaw(pagination)
    param.type = newForm.type
    const { data } = await getEmergencyRescuePlanList(param);
    dataList.value = data.data;
    pagination.total = data.total;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };



  function formatHigherDeptOptions(treeList) {
    // 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，用于上级部门级联选择器的展示（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，这时需要前端自行根据后端返回的某些字段做逻辑处理）
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].disabled = treeList[i].status === 0 ? true : false;
      formatHigherDeptOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    return newTreeList;
  }

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}应急预案`,
      props: {
        formInline: {
          id: row?.id ?? '',
          type: row?.type ?? "",
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了内容为${typeOptions.find(item => item.value === curData.type).label}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              addEmergencyRescuePlan(curData).then((res) => {
                if(res.errno === 0) {
                  chores();
                } else {
                  message(res.message, {
                    type: "error"
                  });
                }

              })

            } else {
              // 实际开发先调用修改接口，再进行下面操作
              updateEmergencyRescuePlanList(curData).then((res) => {
                if(res.errno === 0) {
                  chores();
                } else {
                  message(res.message, {
                    type: "error"
                  });
                }
              })
            }
          }
        });
      }
    });
  }

  const cropRef = ref();


  watch(
    pwdForm,
    ({ newPwd }) =>
      (curScore.value = isAllEmpty(newPwd) ? -1 : zxcvbn(newPwd).score)
  );

  onMounted(async () => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    treeData,
    treeLoading,
    selectedNum,
    pagination,
    buttonClass,
    onSearch,
    resetForm,
    exportExcel,
    openDialog,
    handleUpdate,
    handleDelete,
    handleSizeChange,
    onSelectionCancel,
    handleCurrentChange,
    handleSelectionChange
  };
}
