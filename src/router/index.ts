import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { t } from "@/i18n";

export const routes: Array<RouteRecordRaw> = [
  /** meat属性值的含义
   * title 菜单名称
   * icon 图标
   * isNoMenu 是否是菜单
   * path 路由地址
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
    redirect: { name: "userCenter" },
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
    path: "/userCenter",
    name: "userCenter",
    redirect: { name: "userControl" },
    component: () => import("@/components/layout/index.vue"),
    meta: {
      title: t("aside.userCenter.title"),
      icon: "el-icon-user-solid",
    },
    children: [
      {
        path: "userControl",
        name: "userControl",
        component: () => import("@/views/userCenter/userControl/index.vue"),
        meta: {
          title: t("aside.userCenter.children.userControl.title"),
          path: "/userCenter/userControl",
        },
      },
    ],
  },
  {
    path: "/general",
    name: "general",
    redirect: { name: "jobDescription" },
    component: () => import("@/components/layout/index.vue"),
    meta: {
      title: t("aside.general.title"),
      icon: "el-icon-s-order",
    },
    children: [
      {
        path: "jobDescription",
        name: "jobDescription",
        component: () =>
          import("@/components/general/jobDescription/index.vue"),
        meta: {
          title: t("aside.general.children.jobDescription.title"),
          path: "/general/jobDescription",
        },
      },
      {
        path: "profileData",
        name: "profileData",
        component: () => import("@/components/general/profileData/index.vue"),
        meta: {
          title: t("aside.general.children.profileData.title"),
          path: "/general/profileData",
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
