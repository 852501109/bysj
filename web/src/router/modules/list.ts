import { $t } from "@/plugins/i18n";
import { list } from "@/router/enums";

export default {
  path: "/list",
  redirect: "/list/card",
  meta: {
    icon: "ep:lollipop",
    title: $t("menus.hsList"),
    rank: list,
    showLink: true
  },
  children: [
    {
      path: "/list/card",
      name: "ListCard",
      component: () => import("@/views/list/card/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: $t("menus.hsListCard"),
        showLink: false
      }
    }
  ]
} satisfies RouteConfigsTable;
