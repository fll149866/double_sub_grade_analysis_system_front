import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home/Home"),
  },
  // 登录页
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Login"),
  },

  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
