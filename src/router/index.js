import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  if (!onComplete && !onAbort && typeof Promise !== "undefined") {
    return originalPush.call(this, location, onComplete, onAbort).catch((err) => {
      err;
    });
  } else {
    // <router-link>进行路由跳转时，传了一个oncomplate方法
    originalPush.call(this, location, onComplete, onAbort);
  }
};

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
  // 重置密码页
  {
    path: "/resetPass",
    name: "resetPass",
    component: () => import("@/views/ResetPass/ResetPass"),
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
