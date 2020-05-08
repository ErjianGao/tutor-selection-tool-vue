import Vue from "vue";
import Vuex from "vuex";
import store from "@/store/index";
import * as types from "@/store/types";
import * as consts from "@/util/consts";
import axios from "@/util/axios";
import { STUDENT_ROLE } from "@/util/consts";
import { TEACHER_ROLE } from "@/util/consts";
import { ADMIN_ROLE } from "@/util/consts";
import { ROLE } from "@/util/consts";

Vue.use(Vuex);

function decodeRole(roleKey) {
  switch (roleKey) {
    case STUDENT_ROLE:
      return "student";
    case TEACHER_ROLE:
      return "teacher";
    case ADMIN_ROLE:
      return "admin";
  }
}

const myState = {
  // user
  name: null,
  identityNo: null,
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
  [types.UPDATE_NAME](state, data) {
    state.name = data;
  },
  [types.UPDATE_IDENTITY_NO](state, data) {
    state.identityNo = data;
  }
};

const myActions = {
  async [types.LOGIN]({ commit }, data) {
    console.log("准备登陆");
    let resp = await axios.post("login", data);

    // 登录成功则resp不为null
    if (resp != null) {
      // 身份信息存入session storage
      sessionStorage.setItem(
        consts.AUTHORIZATION,
        resp.headers[consts.AUTHORIZATION]
      );
      let role = resp.data.role;
      console.log("login role: ", role);
      sessionStorage.setItem(ROLE, role);
      commit(types.LOGIN, true);
    }
  },

  async [types.UPDATE_USER]({ commit }) {
    let resp = await axios.get("profile");
    console.log("user: ", resp.data.user);

    commit(types.UPDATE_NAME, resp.data.user.name);
    commit(types.UPDATE_IDENTITY_NO, resp.data.user.identityNo);
    commit(types.UPDATE_ROLE, decodeRole(sessionStorage.getItem(ROLE)));
  },

  async [types.LOGOUT]({ commit }) {
    commit(types.UPDATE_NAME, null);
    commit(types.UPDATE_IDENTITY_NO, null);
    commit(types.UPDATE_ROLE, null);
    commit(types.LOGIN, false);
  }
};

export const userModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  actions: myActions
};
