export default {
  path: "/accessManagement",
  redirect: "/userManage/index",
  meta: {
    icon: "ri:table-line",
    title: "外来人员出入管理",
    rank: 4
  },
  children: [
    {
      path: "/accessManagement/list/index",
      name: "外来人员出入管理",
      component: () => import("@/views/accessManagement/list/index.vue"),
      meta: {
        title: "外来人员出入管理",
        roles: ["admin"]
      }
    }
  ]
} satisfies RouteConfigsTable;
