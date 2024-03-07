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
  getSafeList,
  addSafe,
  updateSafeList,
  delSafe,
} from "@/api/safe";
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
const trainingTypeOptions = [
  {
    value: '0',
    label: "心肺复苏"
  },
  {
    value: '1',
    label: "紧急情况的处置"
  },
  {
    value: '2',
    label: "伤口包扎"
  },
  {
    value: '3',
    label: "灭火器的使用方法"
  },
  {
    value: '4',
    label: "安全规章制度"
  },
  {
    value: '5',
    label: "消防栓的正常使用"
  }
];
export function useObj(tableRef: Ref, treeRef: Ref) {
  const form = reactive({
    trainingType: "",
    trainingRanger: []
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
      label: "勾选列", // 如果需要表格多选，此处label必须设置
      type: "selection",
      fixed: "left",
      reserveSelection: true // 数据刷新后保留选项
    },
    // {
    //   label: "培训名称",
    //   prop: "name",
    //   minWidth: 130
    // },
    // {
    //   label: "培训内容",
    //   prop: "content",
    //   minWidth: 130
    // },
    {
      label: "培训人",
      prop: "person",
      minWidth: 130
    },
    {
      label: "培训地点",
      prop: "address",
      minWidth: 130
    },
    {
      label: "培训内容",
      prop: "trainingType",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <span>
          {trainingTypeOptions.find(item => item.value === row.trainingType).label}
        </span>
      )
    },
    {
      label: "培训时间",
      prop: "trainingTime",
      minWidth: 130,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
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
    delSafe({id: row.id}).then(() => {
      message(`您删除了内容为${trainingTypeOptions.find(item => item.value === row.trainingType).label}的这条数据`, { type: "success" });
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
    // 用于多选表格，清空安全培训的选择
    tableRef.value.getTableRef().clearSelection();
  }

  const initExcel = (data) => {
    const title = ['person', 'address', 'trainingType', 'trainingTime','createTime']
    const res: string[][] = data.map(item => {
      let arr = []
      title.forEach((key) => {
        arr.push(item[key])
      })
      return arr
    })
    const titleList: string[] = ['培训人', '培训地址', '培训内容', '培训时间', '创建时间' ];
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "数据报表");
    writeFile(workBook, "安全培训.xlsx");
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
    param.start = newForm.trainingRanger[0] || ''
    param.end = newForm.trainingRanger[1] || ''
    param.trainingType = newForm.trainingType
    const { data } = await getSafeList(param);
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
      title: `${title}安全培训`,
      props: {
        formInline: {
          id: row?.id ?? '',
          person:row?.person ?? '',
          address: row?.address ?? "",
          trainingType: row?.trainingType ?? "",
          trainingTime: row?.trainingTime ?? "",
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
          message(`您${title}了内容为${trainingTypeOptions.find(item => item.value === curData.trainingType).label}的这条数据`, {
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
              addSafe(curData).then((res) => {
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
              updateSafeList(curData).then((res) => {
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
