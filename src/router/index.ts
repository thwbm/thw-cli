import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { t } from "@/i18n";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/general",
    name: "general",
    alias: "/",
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
