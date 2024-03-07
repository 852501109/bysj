export default {
  path: "/emergencyRescuePlan",
  redirect: "/emergencyRescuePlan/list/index",
  meta: {
    icon: "ep:set-up",
    title: "应急救援预案",
    rank: 6
  },
  children: [
    {
      path: "/emergencyRescuePlan/list/index",
      name: "应急救援预案",
      component: () => import("@/views/emergencyRescuePlan/list/index.vue"),
      meta: {
        title: "应急救援预案",
        roles: ["admin"]
      }
    }
  ]
} satisfies RouteConfigsTable;
