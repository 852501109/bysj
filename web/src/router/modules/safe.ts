export default {
  path: "/safe",
  redirect: "/safe/index",
  meta: {
    icon: "ri:ubuntu-fill",
    title: "安全培训",
    rank: 4
  },
  children: [
    {
      path: "/safe/list/index",
      name: "安全培训",
      component: () => import("@/views/safe/list/index.vue"),
      meta: {
        title: "安全培训",
        roles: ["admin"]
      }
    }
  ]
} satisfies RouteConfigsTable;
