import { $t } from "@/plugins/i18n";
import { about } from "@/router/enums";

export default {
  path: "/about",
  redirect: "/about/index",
  meta: {
    icon: "ri:file-info-line",
    title: $t("menus.hsAbout"),
    rank: about,
    showLink: false
  },
  children: [
    {
      path: "/about/index",
      name: "About",
      component: () => import("@/views/about/index.vue"),
      meta: {
        title: $t("menus.hsAbout")
      }
    }
  ]
} satisfies RouteConfigsTable;
