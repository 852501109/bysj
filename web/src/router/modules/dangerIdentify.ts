export default {
  path: "/dangerIdentify",
  redirect: "/dangerIdentify/list/index",
  meta: {
    icon: "ri:information-line",
    title: "危险源辨识",
    rank: 5
  },
  children: [
    {
      path: "/dangerIdentify/list/index",
      name: "危险源辨识",
      component: () => import("@/views/dangerIdentify/list/index.vue"),
      meta: {
        title: "危险源辨识",
        roles: ["admin"]
      }
    },

  ]
} satisfies RouteConfigsTable;
