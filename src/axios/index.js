import axios from "axios";
import store from "@/store/index";
import { AUTHORIZATION } from "@/util/const";
import { ROLE } from "@/util/const";
import { GET_EXCEPTION } from "@/store/type";

axios.defaults.baseURL = "/";

axios.interceptors.request.use(
  req => {
    // 每次请求都将权限信息从session storage中取出放入请求头
    let auth = sessionStorage.getItem(AUTHORIZATION);
    let role = sessionStorage.getItem(ROLE);
    // 在请求头添加authorization
    if (auth != null) {
      req.headers[AUTHORIZATION] = auth;
      req.headers[ROLE] = role;
    }
    return req;
  },
  error => {
    // 请求的错误，Promise 有两个参数 [resolve, reject]
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  // 返回200
  resp => {
    return resp;
  },
  // 全局异常处理
  error => {
    console.log("响应异常");
    console.log(error);

    // 获取错误信息
    let resp = error.response;
    console.log(resp);

    store.commit(GET_EXCEPTION, resp.data.message);
  }
);

// 将对象暴露出去
export default axios;
