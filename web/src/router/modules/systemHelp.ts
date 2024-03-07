export default {
  path: "/systemHelp",
  redirect: "/systemHelp/index",
  meta: {
    icon: "ri:settings-3-line",
    title: "系统帮助",
    rank: 8
  },
  children: [
    {
      path: "/systemHelp/index",
      name: "系统帮助",
      component: () => import("@/views/systemHelp/index.vue"),
      meta: {
        title: "系统帮助",
        roles: ["admin"]
      }
    }
  ]
} satisfies RouteConfigsTable;
