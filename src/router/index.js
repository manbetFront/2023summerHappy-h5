import Vue from "vue";
import VueRouter from "vue-router";

const strokeAnalysis = () => import("@/pages/home/index.vue");
const newyearpc = () => import("@/pages/newyearpc/index.vue");
const newyearh5 = () => import("@/pages/newyearh5/index.vue");
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
    path: "/newyear_pc",
    name: "cnewyear_pc",
    component: newyearpc,
  },
  {
    path: "/newyear_h5",
    name: "newyear_h5",
    component: newyearh5,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior: () => ({ y: 0 }),
});

export default router;
