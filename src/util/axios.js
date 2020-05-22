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
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误(400)";
          break;
        case 401:
          error.message = "未授权，请重新登录(401)";
          break;
        case 403:
          error.message = "拒绝访问(403)";
          break;
        case 404:
          error.message = "请求出错(404)";
          break;
        case 408:
          error.message = "请求超时(408)";
          break;
        case 500:
          error.message = "服务器错误(500)";
          break;
        case 501:
          error.message = "服务未实现(501)";
          break;
        case 502:
          error.message = "网络错误(502)";
          break;
        case 503:
          error.message = "服务不可用(503)";
          break;
        case 504:
          error.message = "网络超时(504)";
          break;
        case 505:
          error.message = "HTTP版本不受支持(505)";
          break;
        default:
          error.message = `连接出错(${error.response.status})!`;
      }
    } else {
      error.message = "连接服务器失败!";
    }
    Message.error({ message: error.message });
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
