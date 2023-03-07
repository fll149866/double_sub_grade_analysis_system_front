import Cookie from "js-cookie";

export default {
  state: {
    token: "",
  },
  getters: {},
  mutations: {
    // 同步任务
    // 设置登录token
    setToken(state, val) {
      state.token = val;
      Cookie.set("token", val);
    },

    // 获取token
    getToken(state) {
      state.token = Cookie.get("token");
      if (!state.token) {
        state.token = localStorage.getItem("token");
      }
    },

    // 清除token
    clearToken(state) {
      state.token = "";
      Cookie.remove("token");
      localStorage.removeItem("token");
    },
  },
  actions: {},
  modules: {},
};
