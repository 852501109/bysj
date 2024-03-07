export default {
  path: "/dataReport",
  redirect: "/dataReport/list/index",
  meta: {
    icon: "ri:bank-card-line",
    title: "数据上报",
    rank: 5
  },
  children: [
    {
      path: "/dataReport/list/index",
      name: "数据上报",
      component: () => import("@/views/dataReport/list/index.vue"),
      meta: {
        title: "数据上报",
        roles: ["admin"]
      }
    },

  ]
} satisfies RouteConfigsTable;
