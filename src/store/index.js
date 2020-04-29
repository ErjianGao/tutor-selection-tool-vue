import Vue from "vue";
import Vuex from "vuex";
import * as types from "./type";
import * as consts from "@/util/const";
import axios from "@/axios/index";
import { updateRoutes } from "@/router/index";

Vue.use(Vuex);

const myState = {
  exception: null,
  message: null,
  isLogin: false
};

const myMutations = {
  [types.LOGIN](state, data) {
    state.isLogin = data;
  },
  [types.GET_EXCEPTION](state, data) {
    console.log("mutation");
    console.log(data);

    state.exception = data;
  },
  [types.GET_MESSAGE](state, data) {
    state.message = data;
  }
};

const myActions = {
  async [types.LOGIN]({ commit }, data) {
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
  }
};

export default new Vuex.Store({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});

// 需要进行判断是否登录
if (sessionStorage.getItem(types.AUTHORIZATION) != null) {
  myState.isLogin = true;
}
