import axios from "./config.js";

// 登录接口
export const loginApi = (username, password, userType) =>
  axios.post("/api/v1/pub/login", {
    username,
    password,
    user_type: userType,
  });
