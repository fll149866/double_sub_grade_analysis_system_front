import axios from "./config.js";

// 登录接口
export const loginApi = (username, password, userType) =>
  axios.post("/api/v1/pub/login", {
    username,
    password,
    user_type: userType,
  });

// 获取图形验证码
export const captchaApi = () => axios.get("/api/v1/pub/send_captcha");

// 邮箱发送服务
export const sendCodeApi = (username, userType, to) =>
  axios.post("/api/v1/pub/send_code", {
    username,
    userType,
    to,
  });

// 校验验证码
export const checkCodeApi = (to, code, resetToken) =>
  axios.post("/api/v1/pub/check_code", {
    to,
    code,
    resetToken,
  });

// 重置密码操作
export const resetPassApi = (idNumber, userType, password, passwordAgain, resetToken, contact) =>
  axios.post("/api/v1/pub/reset_pass", {
    idNumber,
    userType,
    password,
    passwordAgain,
    resetToken,
    contact,
  });
