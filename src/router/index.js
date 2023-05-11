import Vue from "vue";
import VueRouter from "vue-router";

const strokeAnalysis = () => import("@/pages/home/index.vue");
const summerpc = () => import("@/pages/summerpc/index.vue");
const summerh5 = () => import("@/pages/summerh5/index.vue");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: strokeAnalysis,
  },
  {
    path: "/summer_pc",
    name: "summer_pc",
    component: summerpc,
  },
  {
    path: "/summer_h5",
    name: "summer_h5",
    component: summerh5,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior: () => ({ y: 0 }),
});

export default router;
