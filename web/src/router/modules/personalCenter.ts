export default {
  path: "/personalCenter",
  redirect: "/personalCenter/index",
  meta: {
    icon: "ri:artboard-line",
    title: "个人中心",
    rank: 7
  },
  children: [
    {
      path: "/personalCenter/index",
      name: "个人中心",
      component: () => import("@/views/personalCenter/index.vue"),
      meta: {
        title: "个人中心",
        roles: ["admin"]
      }
    }
  ]
} satisfies RouteConfigsTable;
