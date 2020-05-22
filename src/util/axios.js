import axios from "axios";
import store from "@/store/index";
import { Message } from "element-ui";
import { AUTHORIZATION } from "@/util/consts";
import { ROLE } from "@/util/consts";
import { GET_EXCEPTION } from "@/store/types";

axios.defaults.baseURL = "/api/";

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
    let status = error.status;
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
    let status = error.response.status;
    switch (status) {
      case 400:
        Message.error("该学生已完成互选");
        break;
      case 405:
        Message.error("您的互选学生数量已达上限");
        break;
    }
    console.log("响应异常信息：" + error);

    // 获取错误信息
    let resp = error.response;
    console.log(resp);
    console.log(resp.data.message);

    // store.commit(GET_EXCEPTION, resp.data.message);
    // 返回一个新的rejected Promise对象
    return Promise.reject(error);
  }
);

// 将对象暴露出去
export default axios;
