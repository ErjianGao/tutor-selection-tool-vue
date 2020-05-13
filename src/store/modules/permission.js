// store/permission.js
import { asyncRouterMap, constantRouterMap } from "@/router";
import * as types from "@/store/types";
import { RESET_ROUTES } from "@/store/types";

/**
 * Use meta.role to determine if the current user has permission
 * @param role user's role
 * @param routerObject
 * @returns {boolean}
 */
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

/**
 * Filter asynchronous routing tables by recursion
 * @param role
 * @param routeObjects
 * @return {[]} return the filtered routing table
 */
function filterAsyncRouterMap(role, routeObjects) {
  const res = [];
  routeObjects.forEach(routeObject => {
    // 注意这里一定要先复制一份路由对象
    // 不能写 const tmp = routeObject;
    const tmp = { ...routeObject };
    if (hasPermission(role, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouterMap(role, tmp.children);
      }
      res.push(tmp);
    }
  });
  return res;
}

const myState = {
  routes: constantRouterMap,
  addRoutes: []
};

const myMutations = {
  [types.UPDATE_ROUTES](state, routes) {
    state.addRoutes = routes;
    state.routes = constantRouterMap.concat(routes);
  },
  [RESET_ROUTES](state) {
    state.addRoutes = [];
    state.routes = constantRouterMap;
  }
};

const myActions = {
  [types.GENERATE_ROUTES]({ commit }, data) {
    // 返回Promise对象处理异步请求
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(resolve => {
      console.log("Generate routes");
      const role = data.role;
      console.log("async routes in actions", asyncRouterMap);

      const accessedRouters = filterAsyncRouterMap(role, asyncRouterMap);

      commit(types.UPDATE_ROUTES, accessedRouters);
      // 激活调用者的then方法，并且将参数作为返回值返回
      resolve(accessedRouters);
    }).catch(reason => {
      console.log("generate route error");
      console.log(reason);
    });
  },

  async [RESET_ROUTES]({ commit }, data) {
    commit(RESET_ROUTES);
  }
};

export const permissionModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  actions: myActions
};
