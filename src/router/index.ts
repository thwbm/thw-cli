import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { t } from "@/i18n";

export const routes: Array<RouteRecordRaw> = [
  /** meat属性值的含义
   * title 菜单名称
   * isNoMenu 是否是菜单
   */
  {
    path: "/:pathMatch(.*)",
    redirect: "/",
    meta: {
      isNoMenu: true,
    },
  },
  {
    path: "/",
    redirect: { name: "login" },
    meta: {
      isNoMenu: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      isNoMenu: true,
    },
  },
  {
    path: "/general",
    name: "general",
    // alias: "/",
    redirect: { name: "jobDescription" },
    component: () => import("@/components/layout/index.vue"),
    meta: {
      title: t("aside.general.title"),
    },
    children: [
      {
        path: "jobDescription",
        name: "jobDescription",
        component: () =>
          import("@/components/general/jobDescription/index.vue"),
        meta: {
          title: t("aside.general.children.jobDescription.title"),
        },
      },
      {
        path: "profileData",
        name: "profileData",
        component: () => import("@/components/general/profileData/index.vue"),
        meta: {
          title: t("aside.general.children.profileData.title"),
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
