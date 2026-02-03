import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/ModeSelectPage.vue"),
    },
    {
      path: "/master/auth",
      component: () => import("../pages/MasterAuthPage.vue"),
    },
    {
      path: "/master",
      component: () => import("../pages/MasterHomePage.vue"),
    },
    {
      path: "/master/spells",
      component: () => import("../pages/SpellsArchivePage.vue"),
    },
    {
      path: "/master/npcs",
      component: () => import("../pages/NpcsArchivePage.vue"),
    },
    {
      path: "/player",
      component: () => import("../pages/PlayerPage.vue"),
    },
    {
      path: "/company",
      component: () => import("../pages/CompanyPage.vue"),
    },
  ],
});
