import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/scss/reset.scss";
import "element-ui/lib/theme-chalk/index.css";

import ElementUI from "element-ui";
import http from "@/api/config.js";

Vue.config.productionTip = false;
Vue.use(ElementUI);

// 设置父类http为当前http实例
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
