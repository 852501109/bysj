export default {
  path: "/userManage",
  redirect: "/userManage/index",
  meta: {
    icon: "ri:table-line",
    title: "用户管理",
    rank: 2
  },
  children: [
    {
      path: "/userManage/list/index",
      name: "用户管理",
      component: () => import("@/views/userManage/list/index.vue"),
      meta: {
        title: "用户管理",
        roles: ["admin"]
      }
    }
  ]
} satisfies RouteConfigsTable;
