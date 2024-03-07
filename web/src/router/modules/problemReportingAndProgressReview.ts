export default {
  path: "/problemReportingAndProgressReview",
  redirect: "/problemReportingAndProgressReview/list/index",
  meta: {
    icon: "ri:artboard-line",
    title: "问题上报及进度查看",
    rank: 1
  },
  children: [
    {
      path: "/problemReportingAndProgressReview/list/index",
      name: "问题上报及进度查看",
      component: () => import("@/views/problemReportingAndProgressReview/list/index.vue"),
      meta: {
        title: "问题上报及进度查看",
        roles: ["normal"]
      }
    },

  ]
} satisfies RouteConfigsTable;
