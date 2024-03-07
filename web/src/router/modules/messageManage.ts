export default {
  path: "/messageManage",
  redirect: "/messageManage/list/index",
  meta: {
    icon: "ri:list-check",
    title: "配套设施安全",
    rank: 3
  },
  children: [
    {
      path: "/messageManage/list/index",
      name: "配套设施安全",
      component: () => import("@/views/messageManage/list/index.vue"),
      meta: {
        title: "配套设施安全",
        roles: ["admin"]
      }
    }
  ]
} satisfies RouteConfigsTable;
