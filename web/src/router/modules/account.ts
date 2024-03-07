export default {
  path: "/account",
  redirect: "/account/index",
  meta: {
    icon: "ep:set-up",
    title: "账号管理",
    rank: 2
  },
  children: [
    {
      path: "/account/list/index",
      name: "账号管理",
      component: () => import("@/views/account/list/index.vue"),
      meta: {
        title: "账号管理",
        roles: ['superAdmin']
      }
    }
  ]
} satisfies RouteConfigsTable;
