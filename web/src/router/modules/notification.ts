export default {
  path: "/notification",
  redirect: "/notification/index",
  meta: {
    icon: "ri:artboard-line",
    title: "通知公告",
    rank: 1
  },
  children: [
    {
      path: "/notification/list/index",
      name: "通知公告",
      component: () => import("@/views/notification/list/index.vue"),
      meta: {
        title: "通知公告",
        roles: ["admin"]
      }
    },

  ]
} satisfies RouteConfigsTable;
