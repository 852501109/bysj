import { ppt } from "@/router/enums";
const IFrame = () => import("@/layout/frameView.vue");

export default {
  path: "/ppt",
  redirect: "/ppt/index",
  meta: {
    icon: "ri:file-ppt-2-line",
    title: "PPT",
    rank: ppt,
        showLink: false
  },
  children: [
    {
      path: "/ppt/index",
      name: "FramePpt",
      component: IFrame,
      meta: {
        title: "PPT",
        frameSrc: "https://pipipi-pikachu.github.io/PPTist/",
        frameLoading: false
      }
    }
  ]
} satisfies RouteConfigsTable;