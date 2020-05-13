import router from "./router";
import store from "./store";

import {
  GENERATE_ROUTES,
  UPDATE_USER,
  PERMISSION_NAMESPACE,
  USER_NAMESPACE,
  RESET_ROUTES
} from "@/store/types";
import { AUTHORIZATION } from "@/util/consts";
import { Message } from "element-ui";

// 不重定向白名单
const whiteList = ["/login"];

// 用户登录成功之后，我们会在全局钩子router.beforeEach中拦截路由，判断是否已获得token，
// 在获得token之后我们就要去获取用户的基本信息了
router.beforeEach(async (to, from, next) => {
  let thisRouter = router;
  if (to.path === "/") {
    next({ path: "/home" });
  }
  // 退出登录
  // console.log(to.path);
  // if (to.path === "/logout") {
  //   sessionStorage.clear();
  //   // await store.dispatch(PERMISSION_NAMESPACE + "/" + RESET_ROUTES);
  //   next({ path: "/login" });
  // }

  const hasAuth = sessionStorage.getItem(AUTHORIZATION);
  // 如果用户已经登录
  if (hasAuth) {
    // 如果已经登录就重定向
    if (to.path === "/login") {
      Message.error("请先退出");
      next({ path: "/home" });
    } else {
      // 判断当前用户是否已拉取完user_info信息
      let hasRole = store.getters.role;
      if (hasRole) {
        // 已经拉取完用户信息
        try {
          next();
        } catch (e) {
          console.log(e);
        }
      } else {
        // try {
        // 拉取user_info
        await store.dispatch(USER_NAMESPACE + "/" + UPDATE_USER);
        let role = store.getters.role;
        console.log("permission: ", role);

        // 动态生成路由，异步请求
        let accessedRoutes = await store.dispatch(
          PERMISSION_NAMESPACE + "/" + GENERATE_ROUTES,
          {
            role: role
          }
        );
        // 添加路由信息
        console.log("before: ", thisRouter);
        router.addRoutes(accessedRoutes);
        console.log("after: ", thisRouter);
        // console.log("permission routes: ", store.getters.permission_routes);

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true });
        // }
        // catch (error) {
        //   Message.error("身份验证错误，请重新登录");
        //   next({ path: "/login" });
        // }
      }
    }
  } else {
    // 如果没有登录
    // 如果不在白名单中
    if (whiteList.indexOf(to.path) === -1) {
      next({ path: "/login" });
    } else {
      next();
    }
  }
});
