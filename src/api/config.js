import axios from "axios";

// 创建一个service实例
const service = axios.create({
  baseURL: "http://127.0.0.1:8081",
  // 设置响应超时时间为5秒
  timeout: 5000,
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    let res = {};
    res.status = response.status;
    res.data = response.data;
    return res;
  },
  (error) => console.log(error)
);

export default service;
