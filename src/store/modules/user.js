import Vue from "vue";
import Vuex from "vuex";
import * as types from "@/store/types";
import * as consts from "@/util/const";
import axios from "@/util/axios";
import { updateRoutes } from "@/router/index";

Vue.use(Vuex);

const myState = {
  user: null,
  role: null,
  isLogin: false
};

const myMutations = {
  [types.LOGIN](state, data) {
    state.isLogin = data;
  },
  [types.UPDATE_ROLE](state, data) {
    state.role = data;
  },
  [types.UPDATE_USER](state, data) {
    state.user = data;
  }
};

const myActions = {
  async [types.LOGIN]({ commit }, data) {
    console.log("准备登陆");
    let resp = await axios.post("login", data);

    // 登录成功则resp不为null
    if (resp != null) {
      commit(types.GET_MESSAGE, "登录成功");
      // 身份信息存入session storage
      sessionStorage.setItem(
        consts.AUTHORIZATION,
        resp.headers[consts.AUTHORIZATION]
      );
      sessionStorage.setItem(consts.ROLE, resp.data.role);
      // 更新路由
      updateRoutes();
      commit(types.LOGIN, true);
    }
  },

  async [types.RESET_EXCEPTION]({ commit }, data) {
    commit(types.RESET_EXCEPTION);
  },

  async [types.RESET_MESSAGE]({ commit }, data) {
    commit(types.RESET_MESSAGE);
  },

  async [types.SWITCH_COLLAPSE]({ commit }) {
    commit(types.SWITCH_COLLAPSE);
  },

  async [types.GET_USER]({ commit }) {
    let resp = await axios.get("profile");
    console.log(resp.data.user);
    commit(types.UPDATE_USER, resp.data.user);
  }
};

export const userModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  actions: myActions
};

// 需要进行判断是否登录
if (sessionStorage.getItem(consts.AUTHORIZATION) != null) {
  myState.isLogin = true;
}
