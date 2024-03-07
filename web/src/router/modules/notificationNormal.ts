export default {
  path: "/notificationNormal",
  redirect: "/notificationNormal/index",
  meta: {
    icon: "ri:artboard-line",
    title: "公告",
    rank: 1
  },
  children: [
    {
      path: "/notificationNormal/list/index",
      name: "公告",
      component: () => import("@/views/notificationNormal/list/index.vue"),
      meta: {
        title: "公告",
        roles: ["normal"]
      }
    },

  ]
} satisfies RouteConfigsTable;
