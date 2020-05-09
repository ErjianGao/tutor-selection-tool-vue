// store/permission.js
import { asyncRouterMap, constantRouterMap } from "@/router";
import * as types from "@/store/types";

function hasPermission(role, routerObject) {
  // 非管理员
  if (routerObject.meta && routerObject.meta.roles) {
    // 检测meta.roles中是否存在role，存在则返回true
    if (routerObject.meta.roles.includes(role)) return true;
  } else {
    // 没有指定权限
    return true;
  }
}

const myState = {
  routes: [],
  addRoutes: []
};

const myMutations = {
  [types.UPDATE_ROUTES](state, routes) {
    state.addRoutes = routes;
    state.routes = constantRouterMap.concat(routes);
  }
};

const myActions = {
  [types.GENERATE_ROUTES]({ commit }, data) {
    // 返回Promise对象处理异步请求
    return new Promise(resolve => {
      // console.log("Generate routes");
      const role = data.role;
      const accessedRouters = asyncRouterMap.filter(routerObject => {
        // console.log(routerObject);
        // 管理员全部返回true
        if (role === "admin") return true;

        // 对非管理员进行判断
        if (hasPermission(role, routerObject)) {
          // 如果有嵌套路由
          if (routerObject.children && routerObject.children.length > 0) {
            routerObject.children = routerObject.children.filter(child => {
              if (hasPermission(role, child)) {
                return child;
              }
              return false;
            });
            return routerObject;
          } else {
            return routerObject;
          }
        }

        return false;
      });
      // console.log(accessedRouters);
      commit(types.UPDATE_ROUTES, accessedRouters);
      // 激活调用者的then方法，并且将参数作为返回值返回
      resolve(accessedRouters);
    });
  }
};

export const permissionModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  actions: myActions
};
