<script setup lang="ts">
import { ref, toRaw, watch, computed, reactive, onMounted } from "vue";
import { router } from "@/router";
import userAvatar from "@/assets/user.jpg";
import { useNav } from "@/layout/hooks/useNav";
const { username, loginTime, roles, department } = useNav();
import management from "@iconify-icons/ep/management";
import ticket from "@iconify-icons/ep/shop";
import finance from "@iconify-icons/ep/platform";
import marketing from "@iconify-icons/ep/goods";
import date from "@iconify-icons/ep/odometer";
import dayjs from "dayjs";
import {
  getDBUserList,
} from "@/api/user";
import {
  getProblemReportingAndProgressReviewList,
} from "@/api/problemReportingAndProgressReview";
import {
  getNotificationList,
} from "@/api/notification";
const DBList = ref([])
const problemList = ref([])
const notificationList = ref([])
onMounted(() => {
  // console.log('roles',toRaw(roles.value).join(','))
  getProblemReportingAndProgressReviewList({
    currentPage: 1,
    pageSize: 999,
    username: toRaw(username.value),
    department: toRaw(department.value)
  }).then(res => {
    if(toRaw(department.value) === 'admin') {
      problemList.value = res.data.data.filter(item => item.approvalStatus === '等待批示')
    } else {
      problemList.value = res.data.data.filter(item => item.approvalStatus !== '已解决')
    }

  })
  getDBUserList().then(res => {
    DBList.value = res.data.data
  });
  getNotificationList({currentPage:1,pageSize:999,status:'1'}).then(res => {
    notificationList.value = res.data.data.splice(0, 10)
  })
  window.WIDGET = {
    CONFIG: {
      modules: "20134",
      background: "5",
      tmpColor: "000000",
      tmpSize: 15,
      cityColor: "000000",
      citySize: 15,
      aqiColor: "000000",
      aqiSize: 15,
      weatherIconSize: 15,
      alertIconSize: 5,
      shadow: "0",
      language: "auto",
      fixed: "true",
      vertical: "center",
      horizontal: "left",
      city: "CN101120205",
      key: "f7c514b6716d4d8c8e769651d517adbf"
    }
  };
  let script = document.createElement("script");
  script.className = "loadtianqi";
  script.src =
    "https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0";
  document.body.appendChild(script);
});

const getDate = computed(() => {
  const timestamp = new Date().getTime(); // 时间戳
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; //月份是从0开始的，所以要加1
  const day = date.getDate();

  const result = year + "-" + month + "-" + day;
  return result;
});
const getWeek = computed(() => {
  let str = new Date();
  let week = Math.ceil(str.getDate() / 7);
  let month = str.getMonth() + 1;
  if (str.getDate() < 7) {
    if (str.getDay() !== 1) {
      week = 5;
      month = str.getMonth();
    }
  }
  return week;
});

const toAccount = () => {
  router.push('/account/list/index')
}
const toProblem =() => {
  router.push('/messageManage/list/index')
}
defineOptions({
  name: "个人中心"
});
</script>

<template>
  <div style="width: 100%">
    <el-row :gutter="24">
      <el-col :span="8">
        <el-card shadow="always">
          <template #header> 个人中心 </template>
          <div class="avatar">
            <img :src="userAvatar" />
            <div class="detail">
              <div class="user">用户名：{{ username }}</div>
              <div class="user">上次登录：{{ loginTime }}</div>
            </div>
          </div>
          <div class="item">
            <div>
              <div>
                <IconifyIconOffline
                  :icon="management"
                  style="margin: 5px; color: #66b1ff; font-size: 26px"
                />
              </div>
              每日巡检
            </div>
            <div>
              <div>
                <IconifyIconOffline
                  :icon="finance"
                  style="margin: 5px; color: #66b1ff; font-size: 26px"
                />
              </div>
              信息上报
            </div>
            <div>
              <div>
                <IconifyIconOffline
                  :icon="ticket"
                  style="margin: 5px; color: #66b1ff; font-size: 26px"
                />
              </div>
              问题反馈
            </div>
            <div>
              <div>
                <IconifyIconOffline
                  :icon="marketing"
                  style="margin: 5px; color: #66b1ff; font-size: 26px"
                />
              </div>
              故障排查
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-row :gutter="24">
          <el-col :span="14"
            ><el-card shadow="always">
              <div class="date right_head">
                <div class="date_left">
                  <IconifyIconOffline
                    :icon="date"
                    style="margin: 5px; color: #66b1ff; font-size: 26px"
                  />
                  <div>{{ getDate }}</div>
                </div>
                <div>
                  第<span style="color: #409eff">{{ getWeek }}</span
                  >周
                </div>
              </div>
            </el-card></el-col
          >
          <el-col :span="10"
            ><div>
              <el-card shadow="always">
                <div class="right_head"></div>
              </el-card>
              <div id="he-plugin-simple"></div></div
          ></el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="tab">
              <el-tabs type="border-card">
                <el-tab-pane label="个人待办">
                  <div class="daiban" v-if="roles.includes('superAdmin')">
                    <div>账号管理待授权 </div>
                    <div v-if="DBList.length === 0">暂无</div>
                    <div v-if="DBList.length !== 0" style="cursor: pointer;" @click="toAccount">去处理 <div class="dotted" v-if="DBList.length !== 0">{{DBList.length}}</div></div>
                  </div>
                  <div class="daiban">
                    <div>问题上报待批示</div>
                    <div v-if="problemList.length === 0">暂无</div>
                    <div v-if="problemList.length !== 0" style="cursor: pointer;" @click="toProblem">去处理 <div class="dotted" v-if="problemList.length !== 0">{{problemList.length}}</div></div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="近期公告">
                  <el-table
                    :data="notificationList"
                    style="width: 100%">
                    <el-table-column
                      prop="name"
                      label="公告名称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      label="公告内容">
                    </el-table-column>
                    <el-table-column
                      prop="createTime"
                      label="公告创建时间">
                      <template #default="scope">
                        <div>{{ dayjs(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- <div class="avatar">
      <img :src="userAvatar" />
    </div>
    <div class="user">用户名：{{ username }}</div> -->
  </div>
</template>
<style scoped lang="scss">
::v-deep #he-plugin-simple {
  position: absolute !important;
  right: 20%;
  top: 19px;
  width: 112px;
  background: #fff;
  z-index: 9999;
  >div {
    >div {
      height: 300px!important;
      >div{
        height: 300px!important;
      }
    }
  }
}
.daiban {
  border-bottom: 1px dotted #bfbfbf;
  padding-bottom:5px;
  >div {
    position:relative;

    .dotted {
      position:absolute;
      color:#fff;
      right: -20px;
      top: -10px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 20px;
      text-align:center;
      background:#f00;
    }
  }
  width: 96%;
  ;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.avatar {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  padding: 20px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
  }
  .between {
    text-align: left;
  }
}
.tab {
  width: 100%;
  margin-top: 10px;
}
.date {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .date_left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
.item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  > div {
    width: 50%;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    align-items: center;
    margin: 5px 0;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50px;
      background: #d5e8f5;
    }
  }
}
.right_head {
  height: 20px;
}
.user {
  width: 100%;
  text-align: left;
  padding: 0 0 0 18px;
}
</style>
