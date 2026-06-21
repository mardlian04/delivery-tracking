import { createRouter, createWebHistory } from "vue-router";

import DriverLogin from "../views/DriverLogin.vue";
import DashboardPage from "../views/DashboardPage.vue";

const routes = [
  {
    path: "/",
    component: DriverLogin,
  },
  {
    path: "/dashboard",
    component: DashboardPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
